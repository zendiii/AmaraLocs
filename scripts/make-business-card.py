import io
import sys
from pathlib import Path

import segno
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from reportlab.lib.colors import HexColor
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont as PDFFont
from reportlab.pdfgen import canvas

ROOT = Path(__file__).resolve().parent.parent
FONTS = ROOT / "node_modules"
OUT = ROOT / "print"
PANEL = OUT / "assets" / "locs-panel.jpg"

CREAM = HexColor("#f8f3ec")
SAND = HexColor("#ede3d6")
GOLD = HexColor("#c9a27a")
CLAY = HexColor("#9a5236")
ESPRESSO = HexColor("#2b1d16")
INK = HexColor("#1d130e")

TRIM_W, TRIM_H = 3.5 * inch, 2.0 * inch
BLEED = 0.125 * inch
PAGE_W, PAGE_H = TRIM_W + 2 * BLEED, TRIM_H + 2 * BLEED
SAFE = BLEED + 0.16 * inch
PANEL_W = 1.5 * inch

NAME_TOP = "Amara"
NAME_BOTTOM = "Locs & Co."
TAGLINE = "Healthy locs · Beautifully maintained"
SERVICES = "Retwists · Repairs · Maintenance · Styling"
DOMAIN = "amaralocs.com"
INSTAGRAM = ""
PHONE = ""

TARGETS = {
    "site": "https://amaralocs.com/book",
    "square": "https://book.squareup.com/appointments/eqbaqfxdzb1q2s/location/L48SPRGGYPKCG",
}


def register_font(name, woff2, axes):
    font = TTFont(FONTS / woff2)
    font.flavor = None
    available = {axis.axisTag for axis in font["fvar"].axes}
    font = instantiateVariableFont(
        font,
        {tag: value for tag, value in axes.items() if tag in available},
        inplace=True,
        updateFontNames=False,
    )
    buffer = io.BytesIO()
    font.save(buffer)
    buffer.seek(0)
    pdfmetrics.registerFont(PDFFont(name, buffer))
    return name


DISPLAY = register_font(
    "Fraunces-Semibold",
    "@fontsource-variable/fraunces/files/fraunces-latin-wght-normal.woff2",
    {"wght": 600},
)
DISPLAY_ITALIC = register_font(
    "Fraunces-Italic",
    "@fontsource-variable/fraunces/files/fraunces-latin-wght-italic.woff2",
    {"wght": 400},
)
BODY = register_font(
    "DMSans-Regular",
    "@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2",
    {"wght": 400},
)
BODY_MEDIUM = register_font(
    "DMSans-Medium",
    "@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2",
    {"wght": 500},
)


def tracked_width(pdf, text, font, size, tracking):
    return pdf.stringWidth(text, font, size) + tracking * (len(text) - 1)


def tracked_string(pdf, text, size, tracking, center_x, y, font, color):
    pdf.setFont(font, size)
    pdf.setFillColor(color)
    x = center_x - tracked_width(pdf, text, font, size, tracking) / 2
    for char in text:
        pdf.drawString(x, y, char)
        x += pdf.stringWidth(char, font, size) + tracking


def background(pdf, color):
    pdf.setFillColor(color)
    pdf.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)


def rule(pdf, center_x, y, half_width, color=GOLD, width=0.6):
    pdf.setStrokeColor(color)
    pdf.setLineWidth(width)
    pdf.line(center_x - half_width, y, center_x + half_width, y)


def front(pdf):
    background(pdf, ESPRESSO)
    center = PAGE_W / 2

    tracked_string(pdf, NAME_TOP.upper(), 27, 3.0, center, PAGE_H / 2 + 0.2 * inch, DISPLAY, GOLD)

    pdf.setFont(DISPLAY_ITALIC, 16)
    pdf.setFillColor(SAND)
    pdf.drawCentredString(center, PAGE_H / 2 - 0.03 * inch, NAME_BOTTOM)

    rule(pdf, center, PAGE_H / 2 - 0.2 * inch, 0.95 * inch)
    tracked_string(
        pdf, TAGLINE.upper(), 6, 0.95, center, PAGE_H / 2 - 0.36 * inch, BODY, SAND
    )
    tracked_string(pdf, SERVICES.upper(), 5.6, 0.85, center, SAFE, BODY_MEDIUM, GOLD)


def contact_lines():
    lines = [DOMAIN.upper()]
    if INSTAGRAM:
        lines.append(f"@{INSTAGRAM.lstrip('@').upper()}")
    if PHONE:
        lines.append(PHONE)
    return lines


def back(pdf, url):
    background(pdf, ESPRESSO)

    if PANEL.exists():
        pdf.drawImage(str(PANEL), PAGE_W - PANEL_W, 0, PANEL_W, PAGE_H)
    else:
        print(f"note: {PANEL.relative_to(ROOT)} missing — run scripts/optimize-media.sh")

    column_right = PAGE_W - PANEL_W
    center = (SAFE + column_right) / 2

    qr = segno.make(url, error="q")
    matrix = list(qr.matrix)
    modules = len(matrix)
    qr_size = 0.8 * inch
    module = qr_size / modules
    pad = 3 * module
    panel = qr_size + 2 * pad
    panel_x = center - panel / 2
    panel_y = PAGE_H - SAFE - 0.03 * inch - panel

    pdf.setFillColor(CREAM)
    pdf.roundRect(panel_x, panel_y, panel, panel, 0.05 * inch, stroke=0, fill=1)
    pdf.setFillColor(INK)
    for row_index, row in enumerate(matrix):
        for col_index, dark in enumerate(row):
            if dark:
                pdf.rect(
                    panel_x + pad + col_index * module,
                    panel_y + pad + qr_size - (row_index + 1) * module,
                    module,
                    module,
                    stroke=0,
                    fill=1,
                )

    caption_y = panel_y - 0.16 * inch
    tracked_string(pdf, "SCAN TO BOOK", 7, 1.5, center, caption_y, BODY_MEDIUM, GOLD)

    line_y = caption_y - 0.145 * inch
    for line in contact_lines():
        tracked_string(pdf, line, 6, 0.85, center, line_y, BODY, SAND)
        line_y -= 0.12 * inch

    name = f"{NAME_TOP} {NAME_BOTTOM}".upper().rstrip(".")
    tracked_string(pdf, name, 6.2, 1.2, center, SAFE, BODY_MEDIUM, SAND)


def build(variant, url):
    OUT.mkdir(exist_ok=True)
    path = OUT / f"business-card-{variant}.pdf"
    pdf = canvas.Canvas(str(path), pagesize=(PAGE_W, PAGE_H))
    pdf.setTitle(f"{NAME_TOP} {NAME_BOTTOM} business card ({variant})")
    front(pdf)
    pdf.showPage()
    back(pdf, url)
    pdf.showPage()
    pdf.save()
    print(f"{path.relative_to(ROOT)}  QR → {url}")


if __name__ == "__main__":
    wanted = sys.argv[1:] or list(TARGETS)
    for variant in wanted:
        build(variant, TARGETS[variant])
