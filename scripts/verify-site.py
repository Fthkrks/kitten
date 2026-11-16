"""Browser checks against an already running site (Python Playwright).

Usage: py -3 scripts/verify-site.py http://localhost:3005
"""
from pathlib import Path
from playwright.sync_api import sync_playwright
import json
import sys

OUT = Path(__file__).resolve().parents[1] / 'tmp/qa'
OUT.mkdir(parents=True, exist_ok=True)
ROUTES = ['/', '/available-kittens', '/our-cats', '/adoption-process', '/faq', '/blog']
BLOG_ROUTES = {p['href'] for p in json.loads((OUT.parents[1] / 'lib/posts.json').read_text(encoding='utf-8'))}
BASE_URL = (sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:3005').rstrip('/')
results = []
errors = []
with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 1440, 'height': 900}, device_scale_factor=1)
    page.on('pageerror', lambda error: errors.append(str(error)))
    for route in ROUTES:
        response = page.goto(BASE_URL + route, wait_until='networkidle')
        page.evaluate('document.fonts.ready')
        # Exercise lazy image loading before inspecting the full visual page.
        height = page.evaluate('document.documentElement.scrollHeight')
        for y in range(0, height, 750):
            page.evaluate('(y) => window.scrollTo(0,y)', y)
            page.wait_for_timeout(65)
        page.evaluate('window.scrollTo(0,0)')
        page.wait_for_load_state('networkidle')
        page.evaluate('''async () => {
          await Promise.allSettled([...document.images].filter(i=>i.complete&&i.naturalWidth).map(i=>i.decode()));
          await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
        }''')
        page.screenshot(path=str(OUT / (route.strip('/') or 'home')) + '-desktop.png', full_page=True, animations='disabled')
        result = page.evaluate('''() => ({
          overflow: document.documentElement.scrollWidth > innerWidth,
          internalHrefs: [...new Set([...document.querySelectorAll('a[href]')].map(a=>a.getAttribute('href')).filter(h=>h.startsWith('/') || h.startsWith('#')))].sort(),
          nav: [...document.querySelectorAll('.desktop-links a')].map(a=>a.textContent),
          h1: [...document.querySelectorAll('h1')].map(h=>h.textContent),
          failedImages: [...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src)
        })''')
        assert response.status == 200, route
        assert not result['overflow'], route + ' desktop overflow'
        assert not (set(result['internalHrefs']) - set(ROUTES) - BLOG_ROUTES - {'/kitten-application'}), route + ' invalid hrefs'
        assert len(result['nav']) == 6, route + ' navigation'
        if route == '/':
            track = page.locator('[data-carousel-track]')
            page.locator('[data-carousel-direction="1"]').click()
            page.wait_for_function('document.querySelector("[data-carousel-track]").scrollLeft > 10')
            result['reviews'] = page.locator('[aria-roledescription=slide]').count()
            assert result['reviews'] == 5
            # The current homepage uses Austin service copy instead of regional cards.
            service_copy = page.locator('[aria-labelledby=where-we-serve-heading]').inner_text()
            assert 'Austin, Texas' in service_copy
            assert 'Sacramento' not in service_copy
            page.locator('[data-review]').first.click()
            assert page.locator('.content-dialog[open]').count() == 1
            assert 'My kitten' in page.locator('.full-review').inner_text()
            page.get_by_role('button', name='Close dialog', exact=True).click()
            assert page.locator('.announcement').count() == 0
        elif route == '/available-kittens':
            page.locator('[data-profile]').first.click()
            assert page.locator('.content-dialog[open] video source').get_attribute('src').endswith('.mp4')
            assert page.locator('.photo-strip button').count() == 2
            page.get_by_role('button', name='Close dialog', exact=True).click()
            page.locator('[data-filter=reserved]').click()
            assert page.locator('[data-kitten-status]:visible').count() == 0
            page.locator('[data-filter=available]').click()
            assert page.locator('[data-kitten-status]:visible').count() == 2
            result['kittenFiltersAndVideo'] = 'pass'
        elif route == '/our-cats':
            result['cats'] = page.locator('main article').count()
            assert result['cats'] == 16
        elif route == '/faq':
            assert page.locator('main details').count() == 20
            page.locator('main summary').nth(7).click()
            assert page.locator('main details[open]').count() == 1
            result['faqAnswers'] = 20
        elif route == '/blog':
            assert page.locator('main article').count() == 6
            page.get_by_role('button', name='Load More', exact=True).click()
            assert page.locator('main article').count() == 9
            result['blogCardsAfterLoadMore'] = 9
        elif route == '/adoption-process':
            assert page.locator('main form, main input, main textarea').count() == 0
            result['staticAdoptionPage'] = 'pass'
        page.set_viewport_size({'width': 390, 'height': 844})
        page.evaluate('window.scrollTo(0,0)')
        page.screenshot(path=str(OUT / (route.strip('/') or 'home')) + '-mobile.png', full_page=True, animations='disabled')
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), route + ' mobile overflow'
        page.get_by_role('button', name='Open navigation menu', exact=True).click()
        assert page.locator('.mobile-drawer[open]').count() == 1
        assert page.locator('.mobile-drawer nav a').count() == 6
        page.keyboard.press('Escape')
        assert page.locator('.mobile-drawer[open]').count() == 0
        result.update(route=route, status=response.status, mobileDrawer='pass', mobileOverflow=False)
        results.append(result)
        print(route, 'PASS', flush=True)
        page.set_viewport_size({'width':1440,'height':900})
    browser.close()
report = dict(routes=results, errors=errors)
(OUT/'browser-check.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
assert not errors, errors
print('Six routes, desktop/mobile, all interactions: PASS. No browser page errors.')
