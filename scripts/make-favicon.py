from pathlib import Path

import pymupdf
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

ROOT = Path(__file__).resolve().parent.parent
FONT = (
    ROOT
    / "node_modules/@fontsource-variable/fraunces/files/fraunces-latin-wght-normal.woff2"
)
OUT = ROOT / "public"

ESPRESSO = "#2b1d16"
GOLD = "#c9a27a"
SIZE = 64
CORNER = 14
LETTER = "A"
CAP_RATIO = 0.7
TOUCH_ICON_PX = 180


def letter_path():
    font = TTFont(FONT)
    font.flavor = None
    instantiateVariableFont(font, {"wght": 600}, inplace=True, updateFontNames=False)

    glyph_set = font.getGlyphSet()
    glyph_name = font.getBestCmap()[ord(LETTER)]
    pen = SVGPathPen(glyph_set)
    glyph_set[glyph_name].draw(pen)

    units = font["head"].unitsPerEm
    cap_height = font["OS/2"].sCapHeight
    width = glyph_set[glyph_name].width
    return pen.getCommands(), units, cap_height, width


def build_svg():
    commands, units, cap_height, advance = letter_path()
    scale = (SIZE * CAP_RATIO) / cap_height
    x = (SIZE - advance * scale) / 2
    y = (SIZE + cap_height * scale) / 2

    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {SIZE} {SIZE}">'
        f'<rect width="{SIZE}" height="{SIZE}" rx="{CORNER}" fill="{ESPRESSO}"/>'
        f'<g transform="translate({x:.2f} {y:.2f}) scale({scale:.5f} {-scale:.5f})">'
        f'<path fill="{GOLD}" d="{commands}"/>'
        f"</g></svg>\n"
    )


def build_png(svg, path, pixels):
    document = pymupdf.open(stream=svg.encode(), filetype="svg")
    document[0].get_pixmap(matrix=pymupdf.Matrix(pixels / SIZE, pixels / SIZE)).save(path)


if __name__ == "__main__":
    svg = build_svg()
    (OUT / "favicon.svg").write_text(svg)
    build_png(svg, OUT / "apple-touch-icon.png", TOUCH_ICON_PX)
    build_png(svg, OUT / "favicon-96.png", 96)
    for name in ("favicon.svg", "apple-touch-icon.png", "favicon-96.png"):
        print(f"  public/{name}")
