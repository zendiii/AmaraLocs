#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."
RAW_PHOTOS=src/data/photos
RAW_GALLERY=src/data/gallery
OUT=src/assets/media
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT
mkdir -p "$OUT"

image() {
  local filter="${3:+$3,}scale='min(1200,iw)':-2"
  ffmpeg -v error -y -i "$1" -vf "$filter" -q:v 4 "$OUT/$2"
  echo "  $2"
}

video() {
  local filter="${3:+$3,}scale=720:-2,format=yuv420p"
  ffmpeg -v error -y -i "$1" -vf "$filter" -an \
    -c:v libx264 -profile:v high -crf 26 -preset slow -movflags +faststart \
    "$OUT/$2.mp4"
  ffmpeg -v error -y -i "$OUT/$2.mp4" -frames:v 1 -q:v 4 "$OUT/$2-poster.jpg"
  echo "  $2.mp4 (+ poster)"
}

echo "Photos"
image "$RAW_PHOTOS/headshot.png" about-headshot.jpg "crop=iw:ih*0.97:0:ih*0.03"
image "$RAW_PHOTOS/amara 3.jpeg" amara-locs.jpg
image "$RAW_PHOTOS/amara 2.jpeg" about-casual.jpg "crop=ih*0.6:ih*0.75:iw*0.406:0"

sips -s format jpeg "$RAW_GALLERY/IMG_0445.heic" --out "$TMP/soft-locs.jpg" >/dev/null
image "$TMP/soft-locs.jpg" soft-locs.jpg "crop=iw*0.60:ih*0.795:iw*0.20:ih*0.205"

image "$RAW_GALLERY/3BDE941B-6DC6-49FD-B6BF-D6D3CE4F9F90.jpeg" retwist-diamond-parts.jpg "crop=iw-386:ih-4:193:0"
image "$RAW_GALLERY/645B75EA-A33D-45C5-BEB2-DE8AC3E9E9CD.jpeg" color-locs-twists.jpg "crop=iw-110:ih-4:55:0"
image "$RAW_GALLERY/7B7188EB-8BB5-4EF6-91EC-8B162E3A9778.jpeg" retwist-short-locs.jpg "crop=iw-110:ih:55:0"
image "$RAW_GALLERY/7C1AE0B7-9ABA-43D0-8D9C-BA93C39175A8.jpeg" retwist-parts-detail.jpg
image "$RAW_GALLERY/8EB0F3B3-689D-4850-A940-AEB884604192.jpeg" grown-locs.jpg "crop=iw-110:ih:55:0"
image "$RAW_GALLERY/BEDF3E83-830F-41B2-844D-0C45AA0397CA.jpeg" kids-locs-top-knot.jpg "crop=iw-118:ih-3:59:0"
image "$RAW_GALLERY/E4468721-4280-4D1B-8B10-93E21988D24C.jpeg" retwist-grid-parts.jpg

echo "Print"
mkdir -p print/assets
ffmpeg -v error -y -f lavfi -i color=c=0x2b1d16:s=930x1350 -i "$TMP/soft-locs.jpg" \
  -filter_complex "[1]crop=iw*0.34:ih*0.37:iw*0.26:ih*0.40,scale=930:1350,curves=all='0/0 0.35/0.27 1/0.54',colorbalance=rs=0.06:rm=0.05:bs=-0.04:bm=-0.03,format=rgba,geq=r='r(X,Y)':g='g(X,Y)':b='b(X,Y)':a='clip((X/W-0.24)/0.34*255,0,255)'[fade];[0][fade]overlay=0:0" \
  -frames:v 1 -q:v 3 print/assets/locs-panel.jpg
echo "  print/assets/locs-panel.jpg"

echo "Videos"
video "$RAW_GALLERY/3433038888983368199.mov" short-locs-retwist
video "$RAW_GALLERY/IMG_6183.MOV" two-strand-retwist \
  "colorspace=all=bt709:iall=bt2020:itrc=bt2020-10:format=yuv420p"

du -sh "$OUT"
