"use client";

import Link from "next/link";

export default function NewsletterFloatingButton() {
  return (
    <Link
      href="/newsletter"
      className="fixed bottom-20 right-6 flex items-center justify-center bg-[#b1868e] hover:bg-[#a67d8f] text-white w-11 h-11 rounded-full shadow-lg transition-all duration-300 z-50 hover:scale-110"
      aria-label="Subscribe to newsletter"
      title="Subscribe to our newsletter"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M2 7l10 7 10-7" />
      </svg>
    </Link>
  );
}
