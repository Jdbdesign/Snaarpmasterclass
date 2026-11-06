import sys
from PIL import Image, ImageChops
import os

d = os.path.join(os.path.dirname(os.path.abspath(__file__)), "shots")
for w in (1920, 1440, 1180, 768, 390):
    a = Image.open(os.path.join(d, f"orig-{w}.png")).convert("RGB")
    b = Image.open(os.path.join(d, f"next-{w}.png")).convert("RGB")
    if a.size != b.size:
        print(w, "SIZE MISMATCH", a.size, b.size)
        continue
    diff = ImageChops.difference(a, b)
    bbox = diff.getbbox()
    n = 0
    if bbox:
        n = sum(1 for p in diff.crop(bbox).getdata() if p != (0, 0, 0))
    print(w, a.size, "diff pixels:", n, "bbox:", bbox)
