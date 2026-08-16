from pathlib import Path
from zipfile import ZipFile

from PIL import Image, ImageOps


PROJECT = Path(r"C:\Users\29969\Documents\Codex\2026-08-11\ui-ux-ai-1-ppt-gis")
PHOTO_SOURCE = Path(r"C:\Users\29969\Desktop\社会实践\以数为媒，传扬侨魂 调研照片")
LOGO_SOURCE = Path(r"C:\Users\29969\Desktop\社会实践\团队logo.png")

PHOTO_NAMES = [
    "P1025904.JPG",
    "P1025907.JPG",
    "P1025908.JPG",
    "P1025923.JPG",
    "P1025924.JPG",
    "P1025926.JPG",
    "P1025928.JPG",
    "P1025929.JPG",
    "P1025930.JPG",
    "P1025931.JPG",
    "P1025932.JPG",
    "P1025938.JPG",
    "P1025939.JPG",
    "P1025940.JPG",
    "P1025942.JPG",
    "P1025943.JPG",
    "P1025945.JPG",
    "P1025950.JPG",
]


def resized(image: Image.Image, longest_edge: int) -> Image.Image:
    width, height = image.size
    scale = min(1.0, longest_edge / max(width, height))
    if scale == 1.0:
        return image.copy()
    size = (round(width * scale), round(height * scale))
    return image.resize(size, Image.Resampling.LANCZOS)


def save_webp(source: Path, target: Path, longest_edge: int, quality: int) -> None:
    target.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(source) as raw:
        image = ImageOps.exif_transpose(raw).convert("RGB")
        image = resized(image, longest_edge)
        image.save(target, "WEBP", quality=quality, method=6)


def prepare_photos() -> None:
    target_dir = PROJECT / "public" / "images" / "museum"
    for index, name in enumerate(PHOTO_NAMES, start=1):
        source = PHOTO_SOURCE / name
        stem = f"museum-{index:02d}"
        save_webp(source, target_dir / f"{stem}.webp", 1800, 84)
        save_webp(source, target_dir / f"{stem}-thumb.webp", 760, 76)


def prepare_covers_and_logo() -> None:
    cover_dir = PROJECT / "public" / "images" / "classes" / "covers"
    for course_id in ("war", "youth", "qiaopi"):
        save_webp(
            cover_dir / f"{course_id}-cover.png",
            cover_dir / f"{course_id}-cover.webp",
            1600,
            86,
        )
    save_webp(
        LOGO_SOURCE,
        PROJECT / "public" / "images" / "team" / "team-logo.webp",
        900,
        88,
    )


def extract_video(ppt_name: str, media_name: str, output_name: str) -> None:
    ppt_path = PROJECT / "public" / "resources" / "ppt" / ppt_name
    output_path = PROJECT / "public" / "videos" / output_name
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with ZipFile(ppt_path) as archive:
        output_path.write_bytes(archive.read(f"ppt/media/{media_name}"))


def prepare_videos() -> None:
    # These files are embedded in the team's supplied courseware. The website
    # labels them for rights review before any public production deployment.
    extract_video("war-course.pptx", "media1.mp4", "war-memory.mp4")
    extract_video("youth-course.pptx", "media2.mp4", "youth-craft.mp4")

    poster_dir = PROJECT / "public" / "images" / "videos"
    save_webp(
        PROJECT / "work" / "ppt_slides" / "war" / "slide-09.jpg",
        poster_dir / "war-memory.webp",
        1280,
        84,
    )
    save_webp(
        PROJECT / "work" / "ppt_slides" / "youth" / "slide-11.jpg",
        poster_dir / "youth-craft.webp",
        1280,
        84,
    )


def prepare_slide_previews() -> None:
    selections = {
        "war": (3, 5, 8, 11, 12, 20),
        "youth": (2, 4, 5, 8, 9, 10),
        "qiaopi": (3, 4, 5, 6, 11, 14),
    }
    for course_id, slide_numbers in selections.items():
        target_dir = PROJECT / "public" / "images" / "classes" / course_id
        for slide_number in slide_numbers:
            save_webp(
                PROJECT
                / "work"
                / "ppt_slides"
                / course_id
                / f"slide-{slide_number:02d}.jpg",
                target_dir / f"slide-{slide_number:02d}.webp",
                1280,
                84,
            )


if __name__ == "__main__":
    prepare_photos()
    prepare_covers_and_logo()
    prepare_videos()
    prepare_slide_previews()
    print("Prepared photos, covers, logo, videos, and slide previews.")
