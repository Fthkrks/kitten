"""Capture every public route at both requested widths; compare text and pixels."""
import json, sys
from pathlib import Path
from playwright.sync_api import sync_playwright
from PIL import Image, ImageChops
ROOT = Path(__file__).resolve().parents[1]
phase = sys.argv[1]
out = ROOT / 'tmp/parity' / phase
out.mkdir(parents=True, exist_ok=True)
routes = ['/', '/available-kittens', '/our-cats', '/adoption-process', '/faq', '/blog', '/kitten-application'] + [p['href'] for p in json.loads((ROOT/'lib/posts.json').read_text(encoding='utf-8'))]
if len(sys.argv)>2: routes=sys.argv[2:]
results = [r for r in json.loads((out/'results.json').read_text()) if r['route'] not in routes] if (out/'results.json').exists() else []
with sync_playwright() as p:
    browser = p.chromium.launch()
    for width in [1440, 390]:
        page = browser.new_page(viewport={'width':width, 'height':900 if width == 1440 else 844}, device_scale_factor=1)
        for route in routes:
            response = page.goto('http://localhost:3005'+route, wait_until='domcontentloaded', timeout=60000)
            try: page.wait_for_load_state('networkidle', timeout=12000)
            except Exception: pass
            page.evaluate('document.fonts.ready')
            for y in range(0, page.evaluate('document.documentElement.scrollHeight'), 800):
                page.evaluate('(y)=>scrollTo(0,y)', y)
                page.wait_for_timeout(50)
            page.evaluate('scrollTo(0,0)')

            try: page.wait_for_load_state('networkidle', timeout=12000)
            except Exception: pass
            page.add_style_tag(content='nextjs-portal{display:none!important} *,*::before,*::after{animation:none!important;transition:none!important}')
            name = (route.strip('/').replace('/','__') or 'home') + f'-{width}'
            text = page.locator('body').inner_text()
            (out/(name+'.txt')).write_text(text, encoding='utf-8')
            page.screenshot(path=str(out/(name+'.png')), full_page=True, animations='disabled')
            result = {'route':route, 'width':width, 'status':response.status}
            baseline = ROOT/'tmp/parity/before'
            if phase != 'before':
                before_text=(baseline/(name+'.txt')).read_text(encoding='utf-8')
                result['text_identical'] = text == before_text
                result['content_text_identical'] = text.removesuffix('\n\n\u2191') == before_text.removesuffix('\n\n\u2191')
                a, b = Image.open(baseline/(name+'.png')).convert('RGB'), Image.open(out/(name+'.png')).convert('RGB')
                result['dimensions_identical'] = a.size == b.size
                if a.size == b.size:
                    diff = ImageChops.difference(a,b)
                    result['changed_pixel_percent'] = round(sum(1 for rgb in diff.getdata() if max(rgb)>16)*100/(a.width*a.height),4)
            results.append(result)
            print(json.dumps(result), flush=True)
        page.close()
    browser.close()
(out/'results.json').write_text(json.dumps(results,indent=2), encoding='utf-8')
