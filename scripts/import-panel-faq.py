"""Replace the FAQ accordions with Astrid's FAQ from the Strapi panel.

Usage: python -I scripts/import-panel-faq.py <panel faq.json>
The panel JSON comes from GET /api/faq-page?populate[FaqSection][populate]=*.
"""
import html
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DETAILS = re.compile(r"<details\b.*?</details>", re.S)
QUESTION = re.compile(r'(leading-snug[^"]*">)(.*?)(</span>)', re.S)
ANSWER = re.compile(r"(<p class=[^>]*>)(.*?)(</p></details>)", re.S)


def load_panel(path):
    data = json.loads(Path(path).read_text(encoding="utf-8"))["data"]
    pairs = []
    for section in data["FaqSection"]:
        for group in section["questions"]:
            pairs.extend(group["question"].items())
    assert pairs, "panel returned no FAQ questions"
    return pairs


def answer_html(text):
    paragraphs = [html.escape(p.strip(), quote=False) for p in text.split("\n\n") if p.strip()]
    return "<br/><br/>".join(p.replace("\n", "<br/>") for p in paragraphs)


def rebuild(block, pairs):
    """Rebuild the accordion in block with pairs, reusing its first two items as templates."""
    items = DETAILS.findall(block)
    assert len(items) >= 2, "expected an accordion with at least two items"
    first, rest = items[0], items[1]
    out = []
    for i, (q, a) in enumerate(pairs):
        item = first if i == 0 else rest
        item = QUESTION.sub(lambda m: m[1] + html.escape(q, quote=False) + m[3], item, count=1)
        item = ANSWER.sub(lambda m: m[1] + answer_html(a) + m[3], item, count=1)
        out.append(item)
    start = block.index(items[0])
    end = block.index(items[-1]) + len(items[-1])
    return block[:start] + "".join(out) + block[end:]


def update(path, pairs, limit=None):
    page = json.loads(path.read_text(encoding="utf-8"))
    for section in page["sections"]:
        if "<details" in section["html"]:
            keep = len(DETAILS.findall(section["html"])) if limit else len(pairs)
            section["html"] = rebuild(section["html"], pairs[:keep])
    return page


def main():
    pairs = load_panel(sys.argv[1])

    faq_path = ROOT / "lib" / "faq.json"
    faq = update(faq_path, pairs)
    faq["source"] = "https://astridmoonadminpanel.store/api/faq-page"
    faq["description"] = "Answers about adopting a kitten from Astrid Moon Cattery: waitlist, reservations and deposits, health testing, pickup and payment."
    heading = faq["sections"][0]
    heading["html"] = re.sub(
        r"(text-kar-chocolate-soft\">)Everything we are asked most often.*?(</p>)",
        r"\1Everything we are asked most often about our kittens: the waitlist, reservations, health testing, pickup and payment.\2",
        heading["html"],
        count=1,
        flags=re.S,
    )
    faq_path.write_text(json.dumps(faq, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    # The home page previews the first few FAQ items; keep its item count.
    home_path = ROOT / "lib" / "home.json"
    home = update(home_path, pairs, limit=True)
    home_path.write_text(json.dumps(home, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    rendered = json.dumps(faq, ensure_ascii=False)
    for q, _ in pairs:
        assert html.escape(q, quote=False) in rendered, q
    print(f"FAQ page: {len(pairs)} questions; home preview updated")


if __name__ == "__main__":
    main()
