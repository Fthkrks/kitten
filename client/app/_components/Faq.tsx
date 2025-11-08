"use client";
import { useState } from "react";

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqProps {
  title?: string;
  questions: FaqItem[];
}

export default function Faq({ title = "FAQ", questions }: FaqProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <section className="w-full py-16 px-2 transition-all duration-700 bg-white flex flex-col items-center">
      <h2 className="font-serif text-3xl md:text-4xl text-center text-[#3a2b28] mb-1 font-normal">{title}</h2>
      <div className="w-full max-w-2xl mx-auto mb-8">
        <hr className="border-t border-[#e9dddd]" />
      </div>
      <div className="max-w-3xl w-full border border-[#8eb3bf] rounded-sm overflow-hidden mx-auto bg-white">
        {questions.map((item, i) => {
          const isOpen = openIdx === i;
          const isFirst = i === 0;
          return (
            <div className="transition-all duration-700" key={item.question + '-' + i}>
              <button
                className={`w-full flex cursor-pointer  items-center  justify-between px-5 py-3 md:py-4 text-left
                  border-b border-[#8eb3bf]
                  ${isFirst
                    ? 'bg-[#eefafd] font-bold text-[#333] text-base md:text-lg !border-b-0 relative' :
                    'bg-[#f6fdff] text-[#2d6887] hover:bg-[#e3f3f6] font-semibold text-sm md:text-base'
                  }
                  ${isFirst ? 'shadow-sm' : ''}
                `}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                onClick={() => setOpenIdx(isOpen ? null : i)}
                style={isFirst ? { borderTop: '2px solid #e7d6d6'} : {}}
              >
                <div className="flex items-center gap-2">
                  
                  <span className={`${isFirst ? 'font-bold text-[#332a26]' : ''}`}>{item.question}</span>
                </div>
                {/* Right indicator: none for first when closed; paw when open; arrow for others when closed */}
                {isOpen ? (
                  <span className="text-[#eb9e9e] ml-2">{/* Paw icon on open */}
                    <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><ellipse cx="7.5" cy="10.5" rx="1.25" ry="2"/><ellipse cx="16.5" cy="10.5" rx="1.25" ry="2"/><ellipse cx="12" cy="7.5" rx="2.25" ry="2"/><ellipse cx="8.5" cy="14.5" rx="2.5" ry="2"/><ellipse cx="15.5" cy="14.5" rx="2.5" ry="2"/></svg>
                  </span>
                ) : (
                  !isFirst && (
                    <svg
                      className={`w-6 h-6 ml-2 transition-transform duration-1000 text-[#84adac]`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={3.2}
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                    </svg>
                  )
                )}
              </button>
              {/* Answer panel with slow expand/collapse */}
              <div
                id={`faq-panel-${i}`}
                className={`bg-[#fdeeee] text-[#58483b] text-base px-5 border-b border-[#8eb3bf] overflow-hidden transition-[max-height,opacity] duration-1200 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100 py-4' : 'max-h-0 opacity-0 py-0'}`}
              >
                {item.answer}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
