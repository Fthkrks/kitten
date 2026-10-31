"""Application browser checks. Requires Python Playwright and localhost:3000/:3002.

All submissions use synthetic data and require an unconfigured email service.
The success view is tested with an intercepted response; no real email is sent.
"""
import asyncio
import json
from pathlib import Path
from playwright.async_api import async_playwright

OUT = Path(__file__).resolve().parents[1] / 'tmp/qa'
OUT.mkdir(parents=True, exist_ok=True)
NAV_ROUTES = ['/', '/available-kittens', '/our-cats', '/adoption-process', '/faq', '/blog']


async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={'width': 1440, 'height': 1000})
        errors = []
        page.on('pageerror', lambda error: errors.append(str(error)))
        await page.goto('http://localhost:3002/kittenapp', wait_until='domcontentloaded')
        await page.locator('form textarea').first.wait_for()
        old = await page.locator('form > div').evaluate_all('''nodes => nodes.filter(n => n.querySelector('textarea,input[type=radio]')).map(n => ({
          question: n.querySelector(':scope > label').textContent.trim(),
          isElective: !!n.querySelector('input[type=radio]'),
          options: [...n.querySelectorAll('input[type=radio]')].map(i=>i.value)
        }))''')
        assert await page.locator('form input[required]').count() == 8
        assert await page.locator('form textarea[required],form input[type=radio][required]').count() == 0

        for route in NAV_ROUTES:
            response = await page.goto('http://localhost:3000' + route, wait_until='domcontentloaded')
            assert response.status == 200, route
            assert await page.locator('.nav-apply').get_attribute('href') == '/kitten-application', route
            assert await page.locator('#mobile-navigation .primary-button').get_attribute('href') == '/kitten-application', route
            assert await page.locator('.desktop-links a').count() == 6, route
            assert await page.locator('#mobile-navigation nav a').count() == 6, route
            apply_links = await page.locator('a[href]').evaluate_all('''nodes => nodes.filter(a => /apply|waitlist/i.test(a.textContent)).map(a=>({text:a.textContent.trim(),href:a.getAttribute('href')}))''')
            assert all(a['href'] == '/kitten-application' for a in apply_links), (route, apply_links)

        response = await page.goto('http://localhost:3000/kitten-application', wait_until='domcontentloaded')
        assert response.status == 200
        await page.locator('[data-question-id]').first.wait_for()
        new = await page.locator('[data-question-id]').evaluate_all('''nodes => nodes.map(n => ({
          question: n.querySelector('legend').textContent.replace(/^\\d+/, '').trim(),
          isElective: !!n.querySelector('input[type=radio]'),
          options: [...n.querySelectorAll('input[type=radio]')].map(i=>i.value)
        }))''')
        assert old == new, 'Legacy questions, order, types, or options differ'
        assert await page.locator('main form input[required]').count() == 8
        assert await page.locator('main form textarea[required],main form input[type=radio][required]').count() == 0
        assert await page.locator('main form input:not([type=radio]),main form textarea').evaluate_all('nodes => nodes.every(n=>document.querySelector(`label[for="${n.id}"]`))')
        assert await page.locator('.application-card').evaluate('n=>getComputedStyle(n).borderRadius') == '20px'
        assert await page.locator('#application-firstName').evaluate('n=>getComputedStyle(n).borderRadius') == '10px'
        assert await page.locator('.kitten-application').evaluate('n=>getComputedStyle(n).backgroundColor') == 'rgb(248, 238, 251)'
        assert await page.locator('[id]').evaluate_all('nodes=>new Set(nodes.map(n=>n.id)).size===nodes.length'), 'Duplicate element IDs'
        await page.evaluate('document.fonts.ready')
        await page.screenshot(path=str(OUT / 'kitten-application-desktop-viewport.png'), animations='disabled')
        await page.screenshot(path=str(OUT / 'kitten-application-desktop.png'), full_page=True, animations='disabled')
        await page.get_by_role('button', name='Submit Application', exact=True).click()
        assert await page.locator('.application-field-error').count() == 8
        assert await page.locator('#application-firstName').evaluate('n=>n===document.activeElement')
        await page.locator('#application-email').fill('invalid')
        await page.get_by_role('button', name='Submit Application', exact=True).click()
        assert await page.locator('#application-email-error').inner_text() == 'Enter a valid email address.'
        details = dict(firstName='Test', lastName='Applicant', email='test@example.com', phone='555-0100', streetAddress='123 Test Street', city='Austin', state='TX', zip='78701')
        for name, value in details.items():
            await page.locator('#application-' + name).fill(value)

        # Hold the request to verify that the submitting state disables repeat submissions.
        started, release = asyncio.Event(), asyncio.Event()

        async def delayed_submission(route):
            started.set()
            await release.wait()
            await route.continue_()

        await page.route('**/api/kitten-app-submit', delayed_submission)
        await page.get_by_role('button', name='Submit Application', exact=True).click()
        await started.wait()
        assert await page.get_by_role('button', name='Submitting…', exact=True).is_disabled()
        assert await page.locator('.application-spinner').count() == 1
        assert await page.locator('#application-firstName').is_disabled()
        async with page.expect_response('**/api/kitten-app-submit') as pending_response:
            release.set()
        assert (await pending_response.value).status == 503, 'Email must be unconfigured for this test'
        await page.locator('.application-submit-error').wait_for()
        assert 'has not been received' in await page.locator('.application-submit-error').inner_text()
        assert await page.locator('.application-submit-error a').get_attribute('href') == 'mailto:astridmooncattery@gmail.com'
        assert await page.locator('#application-firstName').input_value() == 'Test', 'Failed submission must keep answers'
        assert not await page.get_by_role('button', name='Submit Application', exact=True).is_disabled()
        await page.unroute('**/api/kitten-app-submit', delayed_submission)

        for width in [320, 390, 768]:
            await page.set_viewport_size({'width': width, 'height': 844})
            assert await page.evaluate('document.documentElement.scrollWidth <= innerWidth'), f'{width}px overflow'
            assert await page.locator('#application-firstName').evaluate('n=>n.getBoundingClientRect().width > 200')
        await page.set_viewport_size({'width': 390, 'height': 844})
        await page.locator(':focus').evaluate_all('nodes=>nodes.forEach(n=>n.blur())')
        await page.evaluate('window.scrollTo(0,0)')
        await page.evaluate('new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))')
        await page.screenshot(path=str(OUT / 'kitten-application-mobile-viewport.png'), animations='disabled')
        await page.screenshot(path=str(OUT / 'kitten-application-mobile.png'), full_page=True, animations='disabled')
        await page.get_by_role('button', name='Open navigation menu', exact=True).click()
        await page.locator('#mobile-navigation[open] .primary-button').click()
        assert page.url.endswith('/kitten-application')
        assert not await page.locator('#mobile-navigation').evaluate('n=>n.open')

        # Exercise both confirmation outcomes without contacting SMTP.
        for confirmation_sent in [True, False]:
            await page.reload(wait_until='domcontentloaded')
            for name, value in details.items():
                await page.locator('#application-' + name).fill(value)

            async def accepted(route):
                await route.fulfill(status=200, content_type='application/json', body=json.dumps({'success': True, 'confirmationSent': confirmation_sent}))

            await page.route('**/api/kitten-app-submit', accepted)
            await page.get_by_role('button', name='Submit Application', exact=True).click()
            await page.get_by_role('heading', name='Thank you for your application!').wait_for()
            assert await page.locator('main form').count() == 0
            assert await page.locator('[role=status]').get_attribute('aria-live') == 'polite'
            if not confirmation_sent:
                assert 'don’t need to submit again' in await page.locator('[role=status]').inner_text()
            await page.unroute('**/api/kitten-app-submit', accepted)
        assert not errors, errors
        report = dict(oldQuestions=len(old), newQuestions=len(new), radioGroups=sum(q['isElective'] for q in new), textareas=sum(not q['isElective'] for q in new), navPagesChecked=len(NAV_ROUTES), mobileWidths=[320, 390, 768], consoleErrors=errors, checks='validation, submit spinner, no-env 503, preserved answers, drawer navigation, mocked success and confirmation failure')
        (OUT / 'kitten-application-check.json').write_text(json.dumps(report, indent=2), encoding='utf-8')
        print(json.dumps(report, indent=2))
        await browser.close()


asyncio.run(main())
