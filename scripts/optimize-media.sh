#!/usr/bin/env bash
#
# Turns the raw phone originals in src/data/{photos,gallery}/ into web-ready
# files in src/assets/media/. Originals are gitignored (tens of MB, and HEIC /
# HEVC don't play outside Safari); the optimized output is committed.
#
# Why each conversion:
#   - HEIC → JPEG: only Safari can display HEIC.
#   - HEVC .mov → H.264 .mp4: Chrome/Firefox on many devices can't play HEVC.
#     Audio is stripped — the videos autoplay, and browsers only autoplay muted.
#   - iPhone HDR (HLG) video is converted to SDR bt709, otherwise it looks
#     washed out on the web.
#   - Posters (first frame) show instantly while the video loads.
#
# macOS only (uses `sips` for HEIC). Needs ffmpeg: brew install ffmpeg
# Usage: bash scripts/optimize-media.sh
set -euo pipefail

cd "$(dirname "$0")/.."
RAW_PHOTOS=src/data/photos
RAW_GALLERY=src/data/gallery
OUT=src/assets/media
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT
mkdir -p "$OUT"

# image <input> <output.jpg> [extra ffmpeg filter before scaling]
image() {
  local filter="${3:+$3,}scale='min(1200,iw)':-2"
  ffmpeg -v error -y -i "$1" -vf "$filter" -q:v 4 "$OUT/$2"
  echo "  $2"
}

# video <input> <name> [extra filter]
video() {
  local filter="${3:+$3,}scale=720:-2,format=yuv420p"
  ffmpeg -v error -y -i "$1" -vf "$filter" -an \
    -c:v libx264 -profile:v high -crf 26 -preset slow -movflags +faststart \
    "$OUT/$2.mp4"
  ffmpeg -v error -y -i "$OUT/$2.mp4" -frames:v 1 -q:v 4 "$OUT/$2-poster.jpg"
  echo "  $2.mp4 (+ poster)"
}

echo "Photos"
# Screenshot of a selfie — trim the phone's status-bar pill off the top edge.
image "$RAW_PHOTOS/headshot.png" about-headshot.jpg "crop=iw:ih*0.97:0:ih*0.03"
image "$RAW_PHOTOS/amara 3.jpeg" amara-locs.jpg
# Landscape selfie — crop to a 4:5 head-and-shoulders portrait of her.
image "$RAW_PHOTOS/amara 2.jpeg" about-casual.jpg "crop=ih*0.6:ih*0.75:iw*0.406:0"

# HEIC → full-size JPEG first (ffmpeg's HEIC support is unreliable).
sips -s format jpeg "$RAW_GALLERY/IMG_0445.heic" --out "$TMP/soft-locs.jpg" >/dev/null
# Crop to the client's hair: removes bystanders in the background.
image "$TMP/soft-locs.jpg" soft-locs.jpg "crop=iw*0.60:ih*0.795:iw*0.20:ih*0.205"

echo "Videos"
video "$RAW_GALLERY/3433038888983368199.mov" short-locs-retwist
video "$RAW_GALLERY/IMG_6183.MOV" two-strand-retwist \
  "colorspace=all=bt709:iall=bt2020:itrc=bt2020-10:format=yuv420p"

du -sh "$OUT"
