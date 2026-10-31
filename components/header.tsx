"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import site from "@/lib/site.json";

export function Socials() {
  return <div className="social-links">{site.socials.map(s => <a key={s.label} href={s.href} aria-label={s.label} target="_blank" rel="noopener noreferrer" dangerouslySetInnerHTML={{ __html: s.icon }} />)}</div>;
}
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [paused, setPaused] = useState(false);
  const drawer = useRef<HTMLDialogElement>(null);
  const announcement = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (open) drawer.current?.showModal();
    else drawer.current?.close();
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  return <>
    <div className="utility-bar"><div className="container utility-inner"><Socials /><a href={`mailto:${site.email}`}><span aria-hidden="true">✉</span> {site.email}</a></div></div>
    <header className="site-header"><nav className="container nav-inner" aria-label="Main navigation">
      <Link href="/" aria-label={`${site.brand} — home`} className="brand-logo"><img src={site.logo} alt={site.brand} width={355} height={376} /></Link>
      <div className="desktop-links">{site.navigation.map(item => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined}>{item.label}</Link>)}</div>
      <Link href="/adoption-process" className="primary-button nav-apply">{site.applyLabel}</Link>
      <button type="button" className="drawer-toggle" aria-label="Open navigation menu" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(true)}><span /><span /><span /></button>
    </nav></header>
    <div ref={announcement} className="announcement" data-paused={paused} onClick={event => {
      const button = (event.target as HTMLElement).closest('[data-marquee-toggle]');
      if (button) {
        const next = !paused;
        setPaused(next);
        announcement.current?.querySelector('aside')?.setAttribute('data-paused', String(next));
        button.setAttribute('aria-label', next ? 'Play scrolling announcement' : 'Pause scrolling announcement');
        const label = button.querySelector('[class*=motionLabel]');
        const icon = button.querySelector('[class*=motionIcon]');
        if (label) label.textContent = next ? site.ui.play : site.ui.pause;
        if (icon) icon.textContent = next ? '▶' : 'Ⅱ';
      }
    }} dangerouslySetInnerHTML={{ __html: site.announcement }} />
    {site.seasonal && <div dangerouslySetInnerHTML={{ __html: site.seasonal }} />}
    <dialog ref={drawer} id="mobile-navigation" className="mobile-drawer" aria-label="Navigation menu" onCancel={() => setOpen(false)} onClick={event => { if (event.target === drawer.current) setOpen(false); }}>
      <div className="drawer-panel"><div className="drawer-head"><img src={site.logo} alt={site.brand} width={355} height={376} /><button className="close-button" aria-label="Close navigation menu" onClick={() => setOpen(false)}>×</button></div>
        <Link href="/adoption-process" className="primary-button" onClick={() => setOpen(false)}>{site.applyLabel}</Link>
        <nav aria-label="Mobile navigation">{site.navigation.map(item => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined} onClick={() => setOpen(false)}>{item.label}<span aria-hidden="true">→</span></Link>)}</nav>
        <div className="drawer-contact"><a href={`mailto:${site.email}`}>{site.email}</a><Socials /></div>
      </div>
    </dialog>
  </>;
}
