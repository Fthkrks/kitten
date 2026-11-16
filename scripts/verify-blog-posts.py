"""HTTP and desktop/mobile blog checks against a running site.

Usage: py -3 scripts/verify-blog-posts.py http://localhost:3005
Requires Python Playwright and BeautifulSoup (same as existing project tools).
"""
from pathlib import Path
from urllib.parse import urlsplit
import json
import sys

from bs4 import BeautifulSoup
from playwright.sync_api import expect, sync_playwright

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "tmp/qa/blog"
OUT.mkdir(parents=True, exist_ok=True)
BASE = (sys.argv[1] if len(sys.argv) > 1 else "http://localhost:3005").rstrip("/")
POSTS = json.loads((ROOT / "lib/posts.json").read_text(encoding="utf-8"))
ROUTES = {"/", "/available-kittens", "/our-cats", "/adoption-process", "/faq", "/blog", "/kitten-application"} | {p["href"] for p in POSTS}

results = []
errors = []
with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context(viewport={"width": 1440, "height": 1000})
    content = json.loads((ROOT / "lib/posts/content.json").read_text(encoding="utf-8"))
    image_urls = {post["image"] for post in POSTS}
    image_urls.update(img["src"] for post in content.values() for img in BeautifulSoup(post["html"], "html.parser").find_all("img"))
    # Verify live image URLs once, then reuse those exact bytes for screenshots.
    # Repeated viewport checks should not redownload ~20 MB for every navigation.
    assets = {}
    for url in sorted(image_urls):
        response = context.request.get(url, timeout=30000)
        assert response.status == 200, url
        assert response.headers.get("content-type", "").startswith("image/"), url
        assets[url] = {"body": response.body(), "content_type": response.headers["content-type"]}
    def cached_image(route):
        asset = assets.get(route.request.url)
        if asset:
            route.fulfill(status=200, **asset)
        else:
            route.continue_()
    context.route("https://backend.kittenaroundragdolls.com/wp-content/uploads/**", cached_image)
    page = context.new_page()
    page.on("pageerror", lambda error: errors.append(str(error)))
    for post in POSTS:
        response = context.request.get(BASE + post["href"])
        assert response.status == 200, post["slug"]
        html = response.text()
        soup = BeautifulSoup(html, "html.parser")
        assert soup.title.get_text() == post["title"] + " | Astrid Moon Cattery"
        assert soup.find("meta", attrs={"name": "description"})["content"] == post["excerpt"]
        assert soup.find("meta", attrs={"property": "og:image"})["content"] == post["image"]
        assert soup.find("meta", attrs={"property": "og:type"})["content"] == "article"
        assert "(916)" not in html
        assert "kittenaroundragdolls.com/blog" not in html
        body = soup.select_one(".post-body")
        assert len(body.get_text()) > 3000
        assert "Sacramento" not in body.get_text() and "Kitten Around" not in body.get_text()
        for a in body.select("a[href]"):
            href = a["href"]
            if not urlsplit(href).netloc and not href.startswith("mailto:"):
                assert href in ROUTES, href
        related = soup.select(".post-related .blog-card h2 a")
        assert len(related) == 3
        assert all(a["href"] in ROUTES and a["href"] != post["href"] for a in related)
        assert soup.select_one(".post-cta a")["href"] == "/kitten-application"
        for width in (1440, 390):
            page.set_viewport_size({"width": width, "height": 1000 if width == 1440 else 844})
            page.goto(BASE + post["href"], wait_until="domcontentloaded")
            page.locator(".post-body").wait_for()
            assert page.locator("h1").count() == 1
            assert page.evaluate("document.documentElement.scrollWidth <= innerWidth"), (post["slug"], width)
            body_width = page.locator(".post-body").bounding_box()["width"]
            assert body_width <= 721
            if post["slug"] in {"are-ragdoll-cats-good-with-dogs", "ragdoll-vs-birman", "buffy-ragdoll-lovers-giveaway-october-2026"}:
                for img in page.locator(".post-featured-image img, .post-body img, .post-related img").all():
                    img.scroll_into_view_if_needed()
                    page.wait_for_function("src => [...document.images].filter(img => img.src === src).every(img => img.complete && img.naturalWidth > 0)", arg=img.get_attribute("src"), timeout=20000)
                page.evaluate("window.scrollTo(0, 0)")
                page.screenshot(path=str(OUT / f"{post['slug']}-{width}.png"), full_page=True, animations="disabled")
        results.append({"slug": post["slug"], "status": 200, "metadata": "pass", "desktopMobile": "pass"})
        print(post["slug"], "PASS", flush=True)

    assert context.request.get(BASE + "/blog/does-not-exist").status == 404
    response = page.goto(BASE + "/blog/does-not-exist", wait_until="domcontentloaded")
    assert response.status == 404
    expect(page.get_by_role("heading", name="Article not found")).to_be_visible()
    page.get_by_role("link", name="Back to the blog", exact=True).click()
    page.wait_for_url(BASE + "/blog")
    page.get_by_role("button", name="Load More", exact=True).click()
    cards = page.locator("main .blog-card h2 a")
    expect(cards).to_have_count(9)
    assert set(cards.evaluate_all("nodes => nodes.map(a => a.getAttribute('href'))")) == {p["href"] for p in POSTS}
    assert all(value is None for value in cards.evaluate_all("nodes => nodes.map(a => a.getAttribute('target'))"))
    cards.first.click()
    page.wait_for_url(BASE + POSTS[0]["href"])
    page.locator(".post-back").first.click()
    page.wait_for_url(BASE + "/blog")
    page.goto(BASE, wait_until="domcontentloaded")
    home_links = page.locator("[aria-labelledby=blog-heading] article h3 a")
    assert home_links.count() == 3
    assert all(href in ROUTES for href in home_links.evaluate_all("nodes => nodes.map(a => a.getAttribute('href'))"))
    assert all(value is None for value in home_links.evaluate_all("nodes => nodes.map(a => a.getAttribute('target'))"))
    home_links.first.click()
    page.wait_for_url(BASE + POSTS[0]["href"])
    browser.close()

assert not errors, errors
(OUT / "report.json").write_text(json.dumps({"routes": results, "unknownSlug": 404, "liveImagesVerified": len(assets), "errors": errors}, indent=2), encoding="utf-8")
print("Nine posts, metadata, desktop/mobile, card navigation and unknown slug: PASS")
