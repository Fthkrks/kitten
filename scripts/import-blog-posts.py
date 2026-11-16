"""Import the nine blog articles as sanitized local HTML (never run by Next.js).

Requires BeautifulSoup, like import-source.py. Raw REST responses are cached in
ignored tmp/blog-source, so reruns do not refetch articles already downloaded.
"""
from pathlib import Path
from urllib.parse import parse_qs, urlencode, urljoin, urlsplit
from urllib.request import urlopen
import hashlib
import html
import json
import re

from bs4 import BeautifulSoup, Comment

ROOT = Path(__file__).resolve().parents[1]
ORIGIN = "https://kittenaroundragdolls.com"
BACKEND = "https://backend.kittenaroundragdolls.com"
ROUTES = {"/", "/available-kittens", "/our-cats", "/adoption-process", "/faq", "/blog", "/kitten-application"}
REMAP = {
    "/adoption-application": "/kitten-application",
    "/application": "/kitten-application",
    "/waitlist": "/kitten-application",
    "/kings-and-queens": "/our-cats",
    "/companion-ragdoll-kittens": "/adoption-process",
}
ALLOWED_TAGS = set("a p h2 h3 h4 ul ol li strong em b i blockquote q br hr figure figcaption img table thead tbody tr th td div span sup sub iframe".split())
DROP_TAGS = set("script style template noscript object embed form input button textarea select link meta svg math".split())
ARCHIVE_NOTICE = "Archived giveaway: entries closed October 25, 2026. The original entry form, official rules, and giveaway privacy notice are not available on this site."


def adapt_text(text):
    text = re.sub(r"[\w.+-]+@(?:[\w-]+\.)*kittenaroundragdolls\.com", "astridmooncattery@gmail.com", text, flags=re.I)
    text = re.sub(r"(?:\+?1[ .-]?)?\(?916\)?[ .-]*545[ .-]*5703", "", text)
    text = text.replace("Kitten Around Ragdolls", "Astrid Moon Cattery").replace("Kitten Around", "Astrid Moon Cattery")
    text = text.replace("Greater Sacramento Area", "Austin, Texas")
    text = text.replace("Sacramento, California", "Austin, Texas").replace("Sacramento", "Austin, Texas")
    return text.replace("Northern California", "Central Texas")


def local_href(href, slugs):
    try:
        url = urlsplit(urljoin(ORIGIN, href.strip()))
    except ValueError:
        return None
    if url.scheme == "mailto":
        return "mailto:astridmooncattery@gmail.com" if "kittenaroundragdolls.com" in href.lower() else None
    if url.scheme not in ("https", "http") or url.username or url.password:
        return None
    if url.hostname in ("kittenaroundragdolls.com", "www.kittenaroundragdolls.com", "backend.kittenaroundragdolls.com"):
        path = url.path.rstrip("/") or "/"
        path = REMAP.get(path, path)
        return path if path in ROUTES or path in {f"/blog/{slug}" for slug in slugs} else None
    # The source giveaway form collects entries for another business. Its rules
    # and privacy document cannot serve as Astrid Moon's rules or privacy notice.
    if url.hostname == "docs.google.com":
        return None
    if url.scheme != "https":
        return None
    query = [(k, v) for k, values in parse_qs(url.query).items() for v in values
             if not k.lower().startswith("utm_") and k.lower() not in {"fbclid", "gclid"}]
    return url._replace(query=urlencode(query)).geturl()


def sanitize_content(content, slugs):
    soup = BeautifulSoup(content, "html.parser")
    for node in soup.find_all(string=lambda value: isinstance(value, Comment)):
        node.extract()
    for node in list(soup.find_all(True)):
        if node.parent is None:
            continue
        if node.name in DROP_TAGS:
            node.decompose()
        elif node.name not in ALLOWED_TAGS:
            node.unwrap()

    unlinked = set()
    for node in list(soup.find_all(True)):
        if node.parent is None:
            continue
        attrs = node.attrs.copy()
        node.attrs = {}  # Drop styles, scripts, events, srcsets and tracking attrs.
        if node.name == "a":
            old = attrs.get("href", "")
            href = local_href(old, slugs) if old else None
            if href:
                node["href"] = href
                if href.startswith("https://"):
                    node["rel"] = "noopener noreferrer"
                    node["target"] = "_blank"
            else:
                old_url = urlsplit(old)
                unlinked.add(old_url.path + ("#" + old_url.fragment if old_url.fragment else "") if old_url.hostname in {"kittenaroundragdolls.com", "backend.kittenaroundragdolls.com"} else old)
                node.unwrap()
        elif node.name == "img":
            src = urljoin(ORIGIN, attrs.get("src", ""))
            url = urlsplit(src)
            if url.path == "/_next/image":
                src = urljoin(ORIGIN, parse_qs(url.query).get("url", [""])[0])
                url = urlsplit(src)
            if url.scheme != "https" or not url.hostname or url.username or url.password or any(attrs.get(n) == "1" for n in ("width", "height")):
                node.decompose()
                continue
            node["src"] = url._replace(query="", fragment="").geturl()
            node["alt"] = adapt_text(attrs.get("alt", ""))
            node["loading"] = "lazy"
            node["decoding"] = "async"
            for attr in ("width", "height"):
                if str(attrs.get(attr, "")).isdigit():
                    node[attr] = attrs[attr]
        elif node.name == "iframe":
            url = urlsplit(attrs.get("src", ""))
            if url.scheme != "https" or url.hostname not in {"www.youtube.com", "www.youtube-nocookie.com", "youtube.com"} or not re.fullmatch(r"/embed/[\w-]+", url.path):
                node.decompose()
                continue
            node["src"] = "https://www.youtube-nocookie.com" + url.path
            node["title"] = adapt_text(attrs.get("title", "YouTube video"))
            node["loading"] = "lazy"
            node["allowfullscreen"] = ""
            node["referrerpolicy"] = "strict-origin-when-cross-origin"
        elif node.name in {"td", "th"}:
            for attr in ("colspan", "rowspan"):
                if str(attrs.get(attr, "")).isdigit():
                    node[attr] = attrs[attr]
            if node.name == "th" and attrs.get("scope") in {"row", "col"}:
                node["scope"] = attrs["scope"]

    for text in list(soup.find_all(string=True)):
        # Preserve quotations/testimonials verbatim. Cat names (Buffy, Kuromi,
        # registered names, etc.) are never targets of the replacement rules.
        if not text.find_parent(["blockquote", "q"]):
            text.replace_with(adapt_text(str(text)))

    # Wide source comparison tables scroll within the article on small screens.
    for table in soup.find_all("table"):
        wrapper = soup.new_tag("div", attrs={"class": "article-table", "tabindex": "0", "role": "region", "aria-label": "Comparison table"})
        table.wrap(wrapper)
    return soup.decode_contents(), sorted(unlinked)


def main():
    posts = json.loads((ROOT / "lib/posts.json").read_text(encoding="utf-8"))
    slugs = {post.get("slug") or post["href"].rstrip("/").rsplit("/", 1)[-1] for post in posts}
    cache = ROOT / "tmp/blog-source"
    cache.mkdir(parents=True, exist_ok=True)
    content = {}
    provenance = []
    for post in posts:
        slug = post.get("slug") or post["href"].rstrip("/").rsplit("/", 1)[-1]
        endpoint = f"{BACKEND}/wp-json/wp/v2/posts?slug={slug}&_embed"
        raw = cache / f"{slug}.json"
        if not raw.exists():
            with urlopen(endpoint, timeout=45) as response:
                raw.write_bytes(response.read())
        source, = json.loads(raw.read_text(encoding="utf-8"))
        assert source["slug"] == slug and source["content"]["rendered"]
        body, unlinked = sanitize_content(source["content"]["rendered"], slugs)
        categories = source.get("_embedded", {}).get("wp:term", [[]])[0]
        category = html.unescape(categories[0]["name"]) if categories else "From the Cattery"
        content[slug] = {
            "category": adapt_text(category),
            "publishedAt": source["date_gmt"] + "Z",
            "html": body,
            "notice": ARCHIVE_NOTICE if slug == "buffy-ragdoll-lovers-giveaway-october-2026" else None,
        }
        post.update(slug=slug, href=f"/blog/{slug}", title=adapt_text(html.unescape(source["title"]["rendered"])))
        provenance.append({"slug": slug, "endpoint": endpoint, "modified": source["modified_gmt"], "sourceContentSha256": hashlib.sha256(source["content"]["rendered"].encode()).hexdigest(), "unlinked": unlinked})

    output = ROOT / "lib/posts"
    output.mkdir(exist_ok=True)
    (output / "content.json").write_text(json.dumps(content, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    (output / "provenance.json").write_text(json.dumps(provenance, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    (ROOT / "lib/posts.json").write_text(json.dumps(posts, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    # The home page stores pre-rendered HTML rather than reading posts.json.
    home_path = ROOT / "lib/home.json"
    home = json.loads(home_path.read_text(encoding="utf-8"))
    for section in home["sections"]:
        if section["key"] != "blog-heading":
            continue
        soup = BeautifulSoup(section["html"], "html.parser")
        for anchor in soup.find_all("a", href=True):
            href = local_href(anchor["href"], slugs)
            if href and href.startswith("/blog/"):
                anchor["href"] = href
                anchor.attrs.pop("target", None)
                anchor.attrs.pop("rel", None)
        section["html"] = soup.decode_contents()
    home_path.write_text(json.dumps(home, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Imported {len(content)} articles; {sum(len(x['unlinked']) for x in provenance)} unsupported link occurrences unlinked (see provenance.json).")


if __name__ == "__main__":
    main()
