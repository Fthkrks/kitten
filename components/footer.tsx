"use client";
import { useEffect, useState } from "react";
import type {ContentMap,PublicLists,SiteSettings} from '@/lib/cms-types';
import {FooterContent,TrustContent} from './generated-content';
export function Footer({site,content,lists}:{site:SiteSettings;content:ContentMap;lists:PublicLists}) {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <>
    <div><TrustContent d={content["global.trust"]} lists={lists}/></div>
    <div onSubmit={event => {
      const form = event.target as HTMLFormElement;
      if (!form.matches('[data-newsletter]')) return;
      event.preventDefault();
      const email = String(new FormData(form).get('email') || '');
      // Email handoff only; never claim that a signup was saved by a nonexistent API.
      window.location.href = `mailto:${site.email}?subject=Subscribe&body=${encodeURIComponent(email)}`;
    }}><FooterContent d={content["global.footer"]} lists={lists}/></div>
    {showTop && <button className="back-to-top" type="button" aria-label="Scroll to top" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })}>↑</button>}
  </>;
}
