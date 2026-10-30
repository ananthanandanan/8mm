# Rasterise the 8mm icon (rounded rects only) to PNG with 4x supersampling.
import sys, zlib, struct, os

FILM = (0x2B, 0x27, 0x24); IVORY = (0xF6, 0xF2, 0xE8); AMBER = (0xC9, 0x8A, 0x1B)

def shapes(scale=1.0, bg_radius=0):
    # 64-unit grid. Content is scaled around the centre (for maskable safe zone).
    def s(x, y, w, h, r, c):
        cx = 32 + (x - 32) * scale; cy = 32 + (y - 32) * scale
        return (cx, cy, w * scale, h * scale, r * scale, c)
    out = [(0, 0, 64, 64, bg_radius, FILM)]
    for x in (7, 21, 35, 49):
        out.append(s(x, 7, 8, 6, 1.5, IVORY))
        out.append(s(x, 51, 8, 6, 1.5, IVORY))
    out.append(s(10, 19, 44, 26, 2.5, AMBER))
    return out

def inside(px, py, x, y, w, h, r):
    if px < x or py < y or px > x + w or py > y + h: return False
    cx = min(max(px, x + r), x + w - r); cy = min(max(py, y + r), y + h - r)
    return (px - cx) ** 2 + (py - cy) ** 2 <= r * r

def render(size, shp, ss=4):
    n = size * ss; u = 64 / n
    buf = [None] * (n * n)
    for (x, y, w, h, r, c) in shp:
        x0, y0 = max(int(x / u), 0), max(int(y / u), 0)
        x1, y1 = min(int((x + w) / u) + 1, n), min(int((y + h) / u) + 1, n)
        for j in range(y0, y1):
            py = (j + 0.5) * u; row = j * n
            for i in range(x0, x1):
                if inside((i + 0.5) * u, py, x, y, w, h, r): buf[row + i] = c
    raw = bytearray()
    for Y in range(size):
        raw.append(0)
        for X in range(size):
            rs = gs = bs = a = 0
            for j in range(ss):
                row = (Y * ss + j) * n + X * ss
                for i in range(ss):
                    c = buf[row + i]
                    if c: rs += c[0]; gs += c[1]; bs += c[2]; a += 1
            k = ss * ss
            raw += bytes((rs // a, gs // a, bs // a, 255 * a // k)) if a else b'\0\0\0\0'
    return raw

def png(path, size, raw):
    def chunk(t, d): return struct.pack('>I', len(d)) + t + d + struct.pack('>I', zlib.crc32(t + d) & 0xffffffff)
    data = b'\x89PNG\r\n\x1a\n' + chunk(b'IHDR', struct.pack('>IIBBBBB', size, size, 8, 6, 0, 0, 0))
    data += chunk(b'IDAT', zlib.compress(bytes(raw), 9)) + chunk(b'IEND', b'')
    open(path, 'wb').write(data)

out = sys.argv[1]
jobs = [
    ('favicon-32.png', 32, shapes(bg_radius=12)),
    ('apple-touch-icon.png', 180, shapes()),          # iOS rounds the corners itself
    ('icon-192.png', 192, shapes(bg_radius=12)),
    ('icon-512.png', 512, shapes(bg_radius=12)),
    ('icon-maskable-512.png', 512, shapes(scale=0.72)),  # content inside the 80% safe circle
]
for name, size, shp in jobs:
    png(os.path.join(out, name), size, render(size, shp))
    print(name)
