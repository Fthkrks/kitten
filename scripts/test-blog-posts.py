"""Offline import/content checks: py -3 scripts/test-blog-posts.py."""
import importlib.util
import json
from pathlib import Path
import sys
import unittest

from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
sys.dont_write_bytecode = True
spec = importlib.util.spec_from_file_location("blog_importer", ROOT / "scripts/import-blog-posts.py")
importer = importlib.util.module_from_spec(spec)
spec.loader.exec_module(importer)
POSTS = json.loads((ROOT / "lib/posts.json").read_text(encoding="utf-8"))
CONTENT = json.loads((ROOT / "lib/posts/content.json").read_text(encoding="utf-8"))
SLUGS = {post["slug"] for post in POSTS}


class BlogContentTests(unittest.TestCase):
    def test_active_content_events_and_tracking_are_removed(self):
        dirty = '<script>alert(1)</script><style>body{display:none}</style><img src="https://example.com/cat.jpg?utm_source=x" onerror="alert(1)" style="color:red"><iframe src="https://example.com/tracker"></iframe><a href="javascript:alert(1)">keep these words</a><form><input name="email"></form>'
        cleaned, _ = importer.sanitize_content(dirty, SLUGS)
        soup = BeautifulSoup(cleaned, "html.parser")
        self.assertFalse(soup.select("script, style, iframe, form, input, a"))
        self.assertEqual(soup.img["src"], "https://example.com/cat.jpg")
        self.assertFalse(soup.img.has_attr("onerror"))
        self.assertFalse(soup.img.has_attr("style"))
        self.assertIn("keep these words", soup.get_text())

    def test_only_youtube_embed_iframes_survive(self):
        cleaned, _ = importer.sanitize_content('<iframe src="https://www.youtube.com/embed/Abc_123-xyz?autoplay=1" onload="bad()"></iframe><iframe src="https://www.youtube.com.evil.test/embed/123"></iframe>', SLUGS)
        soup = BeautifulSoup(cleaned, "html.parser")
        self.assertEqual(len(soup.find_all("iframe")), 1)
        self.assertEqual(soup.iframe["src"], "https://www.youtube-nocookie.com/embed/Abc_123-xyz")
        self.assertFalse(soup.iframe.has_attr("onload"))

    def test_local_routes_and_reference_links(self):
        self.assertEqual(importer.local_href(importer.ORIGIN + "/kings-and-queens?utm_source=x", SLUGS), "/our-cats")
        self.assertEqual(importer.local_href("/waitlist", SLUGS), "/kitten-application")
        self.assertEqual(importer.local_href("/blog/ragdoll-vs-birman", SLUGS), "/blog/ragdoll-vs-birman")
        self.assertIsNone(importer.local_href("/blog/missing-article", SLUGS))
        self.assertIsNone(importer.local_href("/terms", SLUGS))
        self.assertIsNone(importer.local_href("https://docs.google.com/forms/source-entry", SLUGS))
        self.assertEqual(importer.local_href("https://tica.org/breed/ragdoll/?utm_source=source", SLUGS), "https://tica.org/breed/ragdoll/")

    def test_brand_contact_adaptation_and_quotation_preservation(self):
        original = '<p>Kitten Around Ragdolls in Sacramento, California. Call (916) 545-5703 or kiki@kittenaroundragdolls.com. Buffy and Kuromi.</p><blockquote>Kitten Around Ragdolls in Sacramento.</blockquote>'
        cleaned, _ = importer.sanitize_content(original, SLUGS)
        soup = BeautifulSoup(cleaned, "html.parser")
        self.assertIn("Astrid Moon Cattery in Austin, Texas", soup.p.get_text())
        self.assertIn("astridmooncattery@gmail.com", soup.p.get_text())
        self.assertIn("Buffy and Kuromi", soup.p.get_text())
        self.assertNotIn("916", soup.p.get_text())
        self.assertEqual(soup.blockquote.get_text(), "Kitten Around Ragdolls in Sacramento.")

    def test_all_nine_complete_articles_have_safe_destinations(self):
        self.assertEqual(len(SLUGS), 9)
        self.assertEqual(SLUGS, set(CONTENT))
        for post in POSTS:
            with self.subTest(slug=post["slug"]):
                self.assertEqual(post["href"], "/blog/" + post["slug"])
                soup = BeautifulSoup(CONTENT[post["slug"]]["html"], "html.parser")
                self.assertGreater(len(soup.get_text()), 3000)
                self.assertFalse(soup.select("script, style, form, input, object, embed"))
                self.assertNotRegex(soup.get_text(), r"Kitten Around|Sacramento|\(916\)|@kittenaroundragdolls\.com")
                for node in soup.find_all(True):
                    self.assertFalse(any(attr.lower().startswith("on") for attr in node.attrs))
                for anchor in soup.find_all("a", href=True):
                    href = anchor["href"]
                    self.assertNotIn("kittenaroundragdolls.com", href)
                    if href.startswith("/"):
                        self.assertIn(href, importer.ROUTES | {"/blog/" + slug for slug in SLUGS})
                for img in soup.find_all("img"):
                    self.assertTrue(img["src"].startswith("https://"))

    def test_expired_giveaway_has_notice_and_no_source_entry_or_rules_links(self):
        giveaway = CONTENT["buffy-ragdoll-lovers-giveaway-october-2026"]
        self.assertIn("entries closed October 25, 2026", giveaway["notice"])
        self.assertNotIn("docs.google.com", giveaway["html"])
        self.assertIn("Feyheart Pet Photography", giveaway["html"])
        self.assertIn("Sturdi Products", giveaway["html"])


if __name__ == "__main__":
    unittest.main()
