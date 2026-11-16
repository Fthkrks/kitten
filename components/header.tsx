"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type {SiteSettings} from "@/lib/cms-types";

export function Socials({site}:{site:SiteSettings}) {
  return <div className="social-links">{site.socials.map(s => <a key={s.label} href={s.href} aria-label={s.label} target="_blank" rel="noopener noreferrer" dangerouslySetInnerHTML={{ __html: s.icon }} />)}</div>;
}
export function Header({site}:{site:SiteSettings}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const drawer = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (open) drawer.current?.showModal();
    else drawer.current?.close();
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  return <>
    <div className="utility-bar"><div className="container utility-inner"><Socials site={site} /><a href={`mailto:${site.email}`}><span aria-hidden="true">✉</span> {site.email}</a></div></div>
    <header className="site-header"><nav className="container nav-inner" aria-label="Main navigation">
      <Link href="/" aria-label={`${site.brand} — home`} className="brand-logo"><img src={site.logo} alt={site.brand} width={355} height={376} /></Link>
      <div className="desktop-links">{site.navigation.map(item => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined}>{item.label}</Link>)}</div>
      <Link href="/kitten-application" className="primary-button nav-apply">{site.applyLabel}</Link>
      <button type="button" className="drawer-toggle" aria-label="Open navigation menu" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(true)}><span /><span /><span /></button>
    </nav></header>
    <dialog ref={drawer} id="mobile-navigation" className="mobile-drawer" aria-label="Navigation menu" onCancel={() => setOpen(false)} onClick={event => { if (event.target === drawer.current) setOpen(false); }}>
      <div className="drawer-panel"><div className="drawer-head"><img src={site.logo} alt={site.brand} width={355} height={376} /><button className="close-button" aria-label="Close navigation menu" onClick={() => setOpen(false)}>×</button></div>
        <Link href="/kitten-application" className="primary-button" onClick={() => setOpen(false)}>{site.applyLabel}</Link>
        <nav aria-label="Mobile navigation">{site.navigation.map(item => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined} onClick={() => setOpen(false)}>{item.label}<span aria-hidden="true">→</span></Link>)}</nav>
        <div className="drawer-contact"><a href={`mailto:${site.email}`}>{site.email}</a><Socials site={site} /></div>
      </div>
    </dialog>
  </>;
}
