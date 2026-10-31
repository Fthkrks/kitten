"use client";
import { useEffect, useRef, useState } from "react";
import reviews from "@/lib/reviews.json";
import profiles from "@/lib/profiles.json";
import site from "@/lib/site.json";
export type SourceData = { sections: { key: string; html: string }[] };
type DialogContent = { title: string; text?: string; html?: string; photos?: string[]; video?: string | null; apply?: boolean };
export function SourcePage({ data }: { data: SourceData }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [content, setContent] = useState<DialogContent | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  useEffect(() => {
    if (content) { dialog.current?.showModal(); document.body.style.overflow = 'hidden'; }
    else { dialog.current?.close(); document.body.style.overflow = ''; }
    return () => { document.body.style.overflow = ''; };
  }, [content]);
  return <div className="source-content" onClick={event => {
    const target = (event.target as HTMLElement).closest<HTMLElement>('button, [data-scroll-target]');
    if (!target) return;
    const direction = target.dataset.carouselDirection;
    if (direction) {
      const track = target.closest('[aria-roledescription=carousel]')?.querySelector<HTMLElement>('[data-carousel-track]');
      track?.scrollBy({ left: Number(direction) * (track.clientWidth / (window.innerWidth >= 768 ? 2 : 1) + 12), behavior: 'smooth' });
    }
    if (target.dataset.scrollTarget) document.getElementById(target.dataset.scrollTarget)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (target.dataset.filter) {
      const filter = target.dataset.filter;
      const section = target.closest('section');
      let count = 0;
      section?.querySelectorAll<HTMLElement>('[data-kitten-status]').forEach(card => {
        const show = filter === 'all' || filter === card.dataset.kittenStatus;
        card.hidden = !show;
        if (show) count++;
      });
      section?.querySelectorAll<HTMLElement>('[data-filter]').forEach(button => button.setAttribute('aria-pressed', String(button === target)));
      const status = [...(section?.querySelectorAll('p') || [])].find(p => /^Showing \d+ kittens/.test(p.textContent || ''));
      if (status) { status.textContent = `Showing ${count} kittens`; status.setAttribute('aria-live', 'polite'); }
      if (filter === 'upcoming') document.getElementById('december-litter-heading')?.closest('section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (target.dataset.profile) {
      const card = document.getElementById(target.dataset.profile);
      const name = card?.querySelector('h3')?.textContent || '';
      const profile = profiles[name.toLowerCase() as keyof typeof profiles];
      const details = card?.querySelector('dl')?.outerHTML || '';
      const paragraph = card?.querySelector('p.line-clamp-2');
      setSelectedPhoto(0);
      setContent({ title: name, html: (profile?.details || details) + (profile?.description ? `<p class="profile-description">${profile.description}</p>` : paragraph ? `<p class="profile-description">${paragraph.innerHTML}</p>` : ''), photos: profile?.photos || [], video: profile?.video, apply: true });
    }
    if (target.dataset.review) {
      const review = reviews.find(r => r.name === target.dataset.review);
      if (review) { setSelectedPhoto(0); setContent({ title: review.name, text: review.text, photos: review.photos }); }
    }
    if (target.dataset.photo) { setSelectedPhoto(0); setContent({ title: target.getAttribute('aria-label') || '', photos: [target.dataset.photo] }); }
  }}>
    {data.sections.map(section => <div key={section.key} dangerouslySetInnerHTML={{ __html: section.html }} />)}
    <dialog ref={dialog} className="content-dialog" aria-labelledby="dialog-heading" onCancel={() => setContent(null)} onClick={event => { if (event.target === dialog.current) setContent(null); }}>
      {content && <div className="dialog-inner"><div className="dialog-heading"><h2 id="dialog-heading">{content.title}</h2><button type="button" className="close-button" aria-label="Close dialog" onClick={() => setContent(null)}>×</button></div>
        {!!content.photos?.length && <><img className="dialog-photo" src={content.photos[selectedPhoto]} alt={content.title} />{content.photos.length > 1 && <div className="photo-strip">{content.photos.map((photo, i) => <button type="button" key={photo} aria-label={`View photo ${i + 1}`} aria-pressed={i === selectedPhoto} onClick={() => setSelectedPhoto(i)}><img src={photo} alt="" /></button>)}</div>}</>}
        {content.text && <p className="full-review">{content.text}</p>}
        {content.html && <div className="profile-copy" dangerouslySetInnerHTML={{ __html: content.html }} />}
        {content.video && <video key={content.video} className="profile-video" controls playsInline preload="none" poster={content.photos?.[0]}><source src={content.video} type="video/mp4" /></video>}
        {content.apply && <a className="primary-button profile-apply" href="/adoption-process">{site.applyLabel}</a>}
      </div>}
    </dialog>
  </div>;
}
