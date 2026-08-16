from pathlib import Path

from PIL import Image, ImageDraw


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "assets" / "branding"


def build_icon(size: int) -> None:
    scale = 4
    canvas_size = size * scale
    image = Image.new("RGBA", (canvas_size, canvas_size), "#EAF7EF")
    draw = ImageDraw.Draw(image)

    def point(x: float, y: float) -> tuple[int, int]:
        return round(x * canvas_size), round(y * canvas_size)

    green = "#07914A"
    dark_green = "#075F3D"
    orange = "#FF8A36"
    yellow = "#F5C842"

    draw.line(
        [point(.16, .26), point(.28, .26), point(.35, .70), point(.72, .70), point(.82, .38), point(.32, .38)],
        fill=green,
        width=round(.065 * canvas_size),
        joint="curve",
    )
    draw.ellipse([point(.38, .74), point(.50, .86)], fill=dark_green)
    draw.ellipse([point(.66, .74), point(.78, .86)], fill=dark_green)
    draw.ellipse([point(.36, .25), point(.57, .46)], fill=orange)
    draw.polygon([point(.46, .25), point(.54, .17), point(.63, .20), point(.55, .27)], fill="#65A944")
    draw.ellipse([point(.57, .25), point(.77, .45)], fill=yellow)
    draw.polygon([point(.67, .25), point(.74, .18), point(.82, .20), point(.75, .27)], fill=green)

    image.resize((size, size), Image.Resampling.LANCZOS).save(
        OUTPUT / f"comprando-grocerias-{size}.png",
        optimize=True,
    )


for icon_size in (192, 512):
    build_icon(icon_size)
