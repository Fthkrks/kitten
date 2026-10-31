"""Import read-only reference HTML as audited, script-free local content.

No JavaScript from the source is evaluated. RSC push payloads are JSON-decoded.
Run from the project root after downloading source CSS into tmp/source.
"""
from pathlib import Path
from bs4 import BeautifulSoup, Comment
from urllib.parse import urlsplit, parse_qs, urljoin
from copy import deepcopy
import json
import re

ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path('D:/projeler/_kar_src')
ORIGIN = 'https://kittenaroundragdolls.com'
ROUTES = {'/', '/available-kittens', '/our-cats', '/adoption-process', '/faq', '/blog'}
NAV = [dict(label=l, href=h) for l, h in [
    ('Home', '/'), ('Available Kittens', '/available-kittens'),
    ('Our Cats', '/our-cats'), ('Adoption Process', '/adoption-process'),
    ('FAQ', '/faq'), ('Blog', '/blog')]]
PAGES = {n: BeautifulSoup((SOURCE / (n + '.html')).read_text(encoding='utf-8'), 'html.parser')
         for n in ['home', 'available-kittens', 'kings-and-queens', 'adoption-application', 'faq', 'blog']}

def absolute_image(url):
    if '/_next/image?' in url:
        url = parse_qs(urlsplit(url).query)['url'][0]
    return urljoin(ORIGIN, url)

def local_href(href):
    url = urlsplit(href)
    if url.scheme in ('mailto', 'tel'):
        return href
    if url.netloc and url.netloc != 'kittenaroundragdolls.com':
        return href if url.scheme == 'https' else None
    path = url.path.rstrip('/') or '/'
    if path.startswith('/blog/'):
        return ORIGIN + path  # Consistently external original articles.
    if path in ROUTES:
        return path
    if path == '/kings-and-queens':
        return '/our-cats'
    if path in ('/adoption-application', '/waitlist', '/about-us', '/sample-contract', '/contact-us'):
        return '/adoption-process'
    if path.startswith('/available-kittens/'):
        return '/available-kittens'
    if not url.path and url.fragment:
        return None  # Turn in-page jumps into buttons below.
    return None

def clean(node):
    node = deepcopy(node)
    for x in node.find_all(string=lambda t: isinstance(t, Comment)):
        x.extract()
    for x in node.select('script,template,noscript,style,link,object,embed'):
        x.decompose()
    for x in [node, *node.find_all(True)]:
        if x.attrs is None:
            continue
        for attr in list(x.attrs):
            if attr.lower().startswith('on') or attr in ('srcset', 'sizes', 'data-nimg', 'data-framer-name', 'nonce'):
                del x[attr]
        if x.get('style'):
            style = x['style']
            # Reveal SSR animation placeholders; preserve image positioning and sizing.
            style = re.sub(r'opacity\s*:\s*0(?:;|$)', '', style)
            style = re.sub(r'transform\s*:[^;]*(?:;|$)', '', style)
            style = re.sub(r'color\s*:\s*transparent(?:;|$)', '', style)
            if 'url(' in style.lower() or 'expression(' in style.lower():
                del x['style']
            elif style.strip('; '):
                x['style'] = style
            else:
                del x['style']
        if x.name == 'img':
            x['src'] = absolute_image(x.get('src', ''))
            x['decoding'] = 'async'
        if x.name == 'iframe':
            src = x.get('src', '')
            if not src.startswith(('https://www.youtube.com/embed/', 'https://www.youtube-nocookie.com/embed/')):
                x.decompose()
        if x.name == 'a':
            old = x.get('href', '')
            if old.startswith('#'):
                x.name = 'button'
                x['type'] = 'button'
                x['data-scroll-target'] = old[1:]
                del x['href']
                continue
            href = local_href(old)
            if href:
                x['href'] = href
                if href.startswith('https://'):
                    x['rel'] = 'noopener noreferrer'
                    x['target'] = '_blank'
                else:
                    x.attrs.pop('target', None)
            else:
                # Retain explanatory words but remove unsupported destinations/CTA copy.
                if x.find_parent(['p', 'details']):
                    x.unwrap()
                elif x.find(['h2', 'h3', 'p', 'img']):
                    # Regional cards are content even though their dedicated routes
                    # are out of scope. Keep their exact layout and copy without a link.
                    x.name = 'div'
                    for attr in ('href', 'target', 'rel'):
                        x.attrs.pop(attr, None)
                    for span in x.find_all('span'):
                        if span.attrs is not None and span.get_text(' ', strip=True).startswith('EXPLORE '):
                            span.decompose()
                else:
                    li = x.find_parent('li')
                    (li or x).decompose()
    for a in node.select('a a'):
        if a.attrs is not None:
            a.name = 'span'
            for attr in ('href', 'target', 'rel'):
                a.attrs.pop(attr, None)
    for b in node.select('a button, button button'):
        b.name = 'span'
        b.attrs.pop('type', None)
    return node

def html(node):
    return str(clean(node))

def save(name, value):
    (ROOT / 'lib' / (name + '.json')).write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

def sections(name):
    return PAGES[name].find('main').find_all('section', recursive=False)

def flight_records(name):
    flight = ''
    for script in PAGES[name].find_all('script'):
        m = re.fullmatch(r'self\.__next_f\.push\((.*)\)', script.string or '', re.S)
        if m:
            v = json.loads(m[1])
            if len(v) > 1 and isinstance(v[1], str):
                flight += v[1]
    records = {}
    for line in flight.splitlines():
        m = re.match(r'^([0-9a-f]+):(.*)', line)
        if m:
            try:
                records[m[1]] = json.loads(m[2])
            except json.JSONDecodeError:
                pass  # RSC text references are not JavaScript or JSON records.
    return records

def find_props(value, key):
    if isinstance(value, dict):
        if key in value:
            return value[key]
        for child in value.values():
            match = find_props(child, key)
            if match is not None:
                return match
    if isinstance(value, list):
        for child in value:
            match = find_props(child, key)
            if match is not None:
                return match

def wire(node):
    """Identify source controls for our small, local interaction layer."""
    for button in node.find_all('button'):
        text = button.get_text(' ', strip=True)
        label = button.get('aria-label', '')
        if 'Apply for' in text:
            button.name = 'a'
            button['href'] = '/adoption-process'
            button.attrs.pop('type', None)
        elif text in ('All', 'Available', 'Reserved', 'Upcoming'):
            button['data-filter'] = text.lower()
        elif 'Pause scrolling' in label:
            button['data-marquee-toggle'] = ''
        elif text in ('Previous slide', 'Next slide'):
            button['data-carousel-direction'] = '-1' if text.startswith('Previous') else '1'
            button.attrs.pop('disabled', None)
            button['class'] = [c for c in button.get('class', []) if c != 'opacity-30']
        elif 'Full profile' in text:
            button['data-profile'] = button.find_parent('article')['id']
        elif text == 'Read their story':
            button['data-review'] = label.replace('Read the full review from ', '')
        elif label.startswith('Open photo'):
            button['data-photo'] = absolute_image(button.find('img')['src'])
        elif 'VIEW A REAL REPORT' in text:
            # This is the same Kuromi report linked on her source cat card.
            kuromi = next(a for a in PAGES['kings-and-queens'].select('article') if 'CH Kittenaround Kuromi' in a.get_text())
            report = next(a['href'] for a in kuromi.select('a') if 'GENETIC REPORT' in a.get_text())
            button.name = 'a'
            button['href'] = report
            button['target'] = '_blank'
            button['rel'] = 'noopener noreferrer'
        elif 'Watch' in label or ('Cat Butler' in label and button.find('svg')):
            button.name = 'a'
            button['href'] = 'https://www.youtube.com/watch?v=BBwpt9KE-1A'
            button['target'] = '_blank'
            button['rel'] = 'noopener noreferrer'
    for a in node.select('article[id^=kitten-] h3 a'):
        a.name = 'button'
        a.attrs.pop('href', None)
        a['type'] = 'button'
        a['data-profile'] = a.find_parent('article')['id']
    for card in node.select('article[id^=kitten-]'):
        card['data-kitten-status'] = 'available'
    for container in node.select('[aria-roledescription=carousel]'):
        slides = container.select('[aria-roledescription=slide]')
        if slides:
            track = slides[0].parent
            track['data-carousel-track'] = ''
            track['class'] = 'review-track'
            track.parent['class'] = 'review-window'
            for slide in slides:
                slide['class'] = 'review-slide'
    for details in node.select('details'):
        details.attrs.pop('open', None)
    return node

home = sections('home')
# Data for the common chrome comes straight from source header/footer.
top = deepcopy(PAGES['home'].find('main').find('div').find('div').find('div'))
social_links = PAGES['home'].find('main').select_one('div.flex.gap-1')
footer = deepcopy(PAGES['home'].find('footer'))
footer['class'].append('text-kar-ivory')
for f in footer.select('form'):
    # Frontend-only handoff: email opens the owner's mail client, never fakes a signup.
    f['data-newsletter'] = ''
    f.attrs.pop('novalidate', None)
    f.find('input')['required'] = ''
    f.find('button')['type'] = 'submit'
for heading in footer.find_all('h2'):
    if heading.get_text(strip=True) == 'Navigation':
        ul = heading.find_next_sibling('ul')
        if ul:
            ul.clear()
            for item in NAV:
                li = PAGES['home'].new_tag('li')
                a = PAGES['home'].new_tag('a', href=item['href'])
                a.string = item['label']
                li.append(a)
                ul.append(li)
    if heading.get_text(strip=True) == 'Policies':
        # The task explicitly excludes the source's three policy routes.
        parent = next((p for p in heading.parents if 'col-span-1' in p.get('class', [])), heading.parent)
        if parent:
            parent.decompose()
banner = wire(deepcopy(PAGES['home'].find('aside')))
seasonal_path = ROOT/'tmp/source/seasonal.html'
seasonal = html(BeautifulSoup(seasonal_path.read_text(encoding='utf-8'), 'html.parser').find()) if seasonal_path.exists() else ''
save('site', dict(brand='Kitten Around Ragdolls', email='kiki@kittenaroundragdolls.com',
    phone='(916) 545-5703', navigation=NAV,
    logo=ORIGIN + '/logo-landscape.png',
    socials=[dict(label=a.get('aria-label'), href=a['href'], icon=str(a.find('svg'))) for a in social_links.find_all('a')],
    announcement=html(banner), seasonal=seasonal, footer=html(footer), trust=html(home[-1]),
    applyLabel='Apply for a Kitten',
    ui=dict(loadMore='Load More', readMore='Read More', subscribe='Subscribe', pause='Pause', play='Play')))

for source_name, name in [('home', 'home'), ('available-kittens', 'available-kittens'),
                          ('kings-and-queens', 'our-cats'), ('faq', 'faq'), ('blog', 'blog')]:
    content = []
    for i, sec in enumerate(sections(source_name)[:-1]):  # Final section is common trust band.
        if name == 'blog' and i > 0:
            continue  # The listing is rendered from structured posts.json, without duplicate markup.
        sec = wire(deepcopy(sec))
        # The cats hero overlaps a transparent source header, which our ivory nav replaces.
        if name == 'our-cats' and i == 0:
            sec['class'] = [c for c in sec['class'] if not c.startswith(('-mt-', 'pt-[', 'sm:pt-[', 'lg:pt-['))] + ['py-14', 'sm:py-16', 'lg:py-20']
        content.append(dict(key=sec.get('aria-labelledby', f'{name}-{i}'), html=html(sec)))
    title = PAGES[source_name].find('title').get_text()
    desc = PAGES[source_name].find('meta', attrs={'name': 'description'})
    save(name, dict(source=ORIGIN + ('/' if source_name == 'home' else '/' + source_name), title=title,
                    description=desc['content'] if desc else '', sections=content))

# Decode all nine blog cards from the Flight data, including cards after the initial six.
posts = find_props(flight_records('blog'), 'posts')
save('posts', [dict(title=p['title'], excerpt=BeautifulSoup(p['excerpt'], 'html.parser').get_text(' ', strip=True),
    date=p['date'], image=p['featuredImgSourceUrl'], href=ORIGIN + '/blog/' + p['slug']) for p in posts])

# The adoption route combines the home process with explanatory application copy.
intro = deepcopy(sections('adoption-application')[0])
intro.find('h1').string = 'Kitten Adoption Process'  # Requested page/nav title.
aside = deepcopy(sections('adoption-application')[1].find('aside'))
aside.name = 'div'
aside['class'] = 'adoption-information'
aside.find('div')['class'] = 'adoption-information-inner'
process = wire(deepcopy(home[3]))
for a in process.select('a'):
    if a.attrs and a.get('href') in ('/adoption-application', '#blog-subscribe'):
        a.decompose()  # No circular application CTA or subscription jump on static process.
save('adoption-process', dict(source=[ORIGIN+'/', ORIGIN+'/adoption-application'],
    title='Kitten Adoption Process | Kitten Around Ragdolls',
    description=PAGES['adoption-application'].find('meta', attrs={'name': 'description'})['content'],
    sections=[dict(key='adoption-intro',html=html(intro)),dict(key='adoption-steps',html=html(process)),
              dict(key='adoption-information',html=html(aside))]))

# Read full review strings as JSON string literals; never execute the downloaded chunk.
js = (ROOT/'tmp/source/js/page-70b2d0d3d811d82d.js').read_text(encoding='utf-8')
reviews = []
for m in re.finditer(r'\{name:("(?:\\.|[^"\\])*"),imgSrc:("(?:\\.|[^"\\])*"),content:("(?:\\.|[^"\\])*"),attachments:(\[[^\]]*\])', js):
    reviews.append(dict(name=json.loads(m[1]), image=absolute_image(json.loads(m[2])), text=json.loads(m[3]).strip(),
                        photos=[absolute_image(x) for x in json.loads(m[4])]))
save('reviews', reviews)

# Keep all five original full reviews available to the local carousel and dialog.
home_data = json.loads((ROOT/'lib/home.json').read_text(encoding='utf-8'))
review_section = next(x for x in home_data['sections'] if x['key'] == 'happy-families-heading')
review_dom = BeautifulSoup(review_section['html'], 'html.parser')
track = review_dom.select_one('[data-carousel-track]')
if track and reviews:
    prototype = deepcopy(track.find('div', recursive=False))
    track.clear()
    for review in reviews:
        card = deepcopy(prototype)
        quote = card.select_one('p.inline')
        quote.clear()
        quote.string = review['text'][:300] + (' ...' if len(review['text']) > 300 else '')
        card.find('h3').string = review['name']
        author_img = card.select_one('img.rounded-full')
        if not author_img:
            author_img = card.find_all('img')[-1]
        author_img['src'] = review['image']
        author_img['alt'] = 'Photo of ' + review['name']
        button = card.select_one('[data-review]')
        button['data-review'] = review['name']
        button['aria-label'] = 'Read the full review from ' + review['name']
        photo_buttons = card.select('[data-photo]')
        if photo_buttons:
            photo_parent = photo_buttons[0].find_parent('ul')
            photo_template = deepcopy(photo_buttons[0].find_parent('li'))
            photo_parent.clear()
            for i, src in enumerate(review['photos']):
                item = deepcopy(photo_template)
                b = item.find('button')
                b['data-photo'] = src
                b['aria-label'] = f'Open photo {i+1} of {len(review["photos"])} from {review["name"]}'
                b.find('img')['src'] = src
                photo_parent.append(item)
        track.append(card)
    review_section['html'] = str(review_dom)
    save('home', home_data)

# Supplement card dialogs with original profile photos and video URLs.
profiles = {}
for slug in ['sokka', 'mystery']:
    path = ROOT/'tmp/source'/(slug+'.html')
    if not path.exists():
        continue
    profile = BeautifulSoup(path.read_text(encoding='utf-8'), 'html.parser')
    photos = list(dict.fromkeys(absolute_image(x['src']) for x in profile.select('main img')
                               if '/kittens/' in absolute_image(x['src'])))
    video = profile.select_one('video source')
    details = profile.select_one('main dl')
    personality = next((h.find_next('p') for h in profile.select('main h2') if h.get_text(strip=True) == 'Personality'), None)
    profiles[slug] = dict(photos=photos, video=video['src'] if video else None,
                         details=html(details) if details else '', description=personality.get_text(' ', strip=True) if personality else '')
save('profiles', profiles)

# Copy the exact verified source utilities and module styles, with fonts supplied by next/font.
css = (ROOT/'tmp/source/1e4d4da90f7f8f5a.css').read_text(encoding='utf-8')
css += '\n' + (ROOT/'tmp/source/1b6ccd74d59b8d05.css').read_text(encoding='utf-8')
css = css.replace('var(--font-londrinaSolid)', 'var(--font-playfair)').replace('var(--font-recursive)', 'var(--font-open-sans)')
# Source utilities were compiled with Tailwind 3. Its gradient values include stop
# positions, incompatible with v4's typed --tw-gradient-* @property declarations.
# Namespace those properties so original overlays and dividers stay exact in v4.
css = css.replace('--tw-gradient', '--kar-gradient')
css = re.sub(r'url\((/[^")]*)\)', lambda m: 'url(' + ORIGIN + m[1] + ')', css)
(ROOT/'app/source.css').write_text('/* Verified original site CSS; fonts are self-hosted with next/font/google. */\n'+css, encoding='utf-8')
print('Imported six pages,',len(posts),'blog cards and',len(reviews),'full reviews.')
