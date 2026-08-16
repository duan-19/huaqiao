import os
from pathlib import Path

from docx import Document
from docx.enum.text import WD_LINE_SPACING
from docx.oxml.ns import qn
from docx.shared import Pt


TARGET = Path(os.environ["APPLICATION_DOCX"])


def set_font(style, name, size):
    style.font.name = name
    style.font.size = Pt(size)
    rpr = style._element.get_or_add_rPr()
    rfonts = rpr.get_or_add_rFonts()
    for attr in ("ascii", "hAnsi", "eastAsia", "cs"):
        rfonts.set(qn(f"w:{attr}"), name)


document = Document(TARGET)
settings = {
    "TOC1": (10.5, 0, 16),
    "TOC2": (10, 18, 15),
    "TOC3": (9.5, 36, 14),
}

for style_id, (size, left, line) in settings.items():
    style = next((item for item in document.styles if item.style_id == style_id), None)
    if style is None:
        raise RuntimeError(f"Missing generated TOC style: {style_id}")
    set_font(style, "宋体", size)
    fmt = style.paragraph_format
    fmt.left_indent = Pt(left)
    fmt.right_indent = Pt(0)
    fmt.first_line_indent = Pt(0)
    fmt.space_before = Pt(0)
    fmt.space_after = Pt(0)
    fmt.line_spacing_rule = WD_LINE_SPACING.EXACTLY
    fmt.line_spacing = Pt(line)
    fmt.keep_with_next = False
    fmt.keep_together = False
    fmt.widow_control = False

document.save(TARGET)
print(TARGET)
