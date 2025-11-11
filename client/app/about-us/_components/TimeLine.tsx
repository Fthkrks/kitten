"use client";
import { useState } from "react";

interface TimelineEvent {
  year: string;
  title: string;
  desc: string;
  position: string;
}

interface TimeLineProps {
  events?: TimelineEvent[];
}

const defaultEvents: TimelineEvent[] = [
  {
    year: "2010",
    title: "Jason and I Met",
    desc: "We were coworkers at Ace Hardware",
    position: "left"
  },
  {
    year: "2012",
    title: "We Purchased Our First Home Together",
    desc:
      "In Sarasota . . . and Julian - Jasons Son, was 2 when we started cohabiting.",
    position: "right"
  },
  {
    year: "2015",
    title: "We Created Ethereal Persians Cattery",
    desc:
      "It felt like a dream come true! We welcomed our first two Persians, Milo - a white, and Shaila - a blue smoke.",
    position: "left"
  },
  {
    year: "2016",
    title: "We Focused on Breeding Doll Face Persians",
    desc: "We were enamored with persians that did not tear.",
    position: "right"
  },
  {
    year: "2017",
    title: "We Almost Closed The Cattery Due to Ringworm",
    desc:
      "This was a nightmare season in our life. Disease management become a challenge.",
    position: "left"
  },
  {
    year: "2018",
    title: "We Started Shipping Kittens and Began Raw Feeding",
    desc:
      "We wouldn't be breeding today if we hadn't switched from feeding feed-grade kibble and canned food to human-grade raw food, health problems significantly decreased.",
    position: "right"
  },
  {
    year: "2019",
    title: "We Began Breeding Extreme-Faced Persians",
    desc:
      "The secret to breeding healthy extremes that do not tear or have breathing problems was elusive at this time.",
    position: "left"
  },
  {
    year: "2020",
    title: "We Decided to Specialize in Silver, Golden & Blue-Golden Persians",
    desc:
      "Cats of this color division are rare. Acquiring our first for breeding - a silver - took us 2 years!",
    position: "right"
  },
  {
    year: "2021",
    title: "We Decided to Specialize in Silver, Golden & Blue-Golden Persians",
    desc:
      "Cats of this color division are rare. Acquiring our first for breeding - a silver - took us 2 years!",
    position: "left"
  },
  {
    year: "2022",
    title: "We Decided to Specialize in Silver, Golden & Blue-Golden Persians",
    desc:
      "Cats of this color division are rare. Acquiring our first for breeding - a silver - took us 2 years!",
    position: "right"
  }
];

export default function TimeLine({ events = defaultEvents }: TimeLineProps) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  return (
    <section className="w-full pt-12 pb-8 bg-white flex flex-col items-center min-h-[700px]">
      <h2 className="font-lora text-2xl md:text-3xl font-normal text-center mb-2 mt-2">Our Timeline</h2>
      <div className="mb-8 h-3 w-44 border-t border-dotted border-[#bca4a4] mx-auto" />
      <div className="relative w-full max-w-5xl mx-auto min-h-[500px] flex">
        {/* Dikey çizgi */}
        <div className="absolute left-1/2 -translate-x-1/2 w-1 bg-[#ded1d1] h-full top-0 z-0" style={{minHeight:'80%'}}></div>
        <div className="flex flex-col w-full gap-0 z-10">
          {events.map((ev, idx) => {
            const isLeft = ev.position === 'left';
            const itemAlign = isLeft ? "justify-start pr-6 md:pr-16" : "justify-end pl-6 md:pl-16";
            const contentAlign = isLeft ? "md:mr-auto md:ml-0" : "md:ml-auto md:mr-0";
            const isHovered = hoverIdx === idx;
            return (
              <div
                className={`w-full flex flex-col md:flex-row items-center my-0 py-0 relative ${itemAlign}`}
                key={ev.year + ev.title}
              >
                {/* Sol kutu veya boşluk */}
                {isLeft && <div className={`hidden md:block flex-1`} />}

                {/* Yıl dairesi ve çizgi ile hizalama */}
                <div className="flex flex-col items-center shrink-0 md:mx-2 relative z-10">
                  {/* YIL DAİRESİ */}
                  <div
                    onMouseEnter={() => setHoverIdx(idx)}
                    onMouseLeave={() => setHoverIdx(null)}
                    className={`
                      rounded-full border-2 transition
                      w-16 h-16 flex items-center justify-center text-xl font-lora mb-2 shadow cursor-pointer
                      ${isHovered ? 'border-[#e8bdbd] bg-[#fae9e9] text-[#a05e5e]' : 'border-[#bca4a4] bg-white text-[#a48b99]'}
                    `}
                  >
                    <span>{ev.year}</span>
                  </div>
                  {/* Bağlantı çizgi*/}
                  {idx !== events.length - 1 && (
                    <div className={`w-1 h-12 md:h-20 ${isHovered ? 'bg-[#e5b7b3]' : 'bg-[#ded1d1]'} mx-auto transition`}/>
                  )}
                </div>

                {/* Sağ kutu */}
                <div
                  className={`relative flex-1 max-w-[350px] md:max-w-[400px] py-2 md:py-3 ${contentAlign}`}
                  onMouseEnter={() => setHoverIdx(idx)}
                  onMouseLeave={() => setHoverIdx(null)}
                >
                  <div
                    className={`
                      rounded shadow-md border border-dotted transition
                      p-5 min-h-[72px] bg-[#f6f6f6]
                      ${isHovered ? 'bg-[#faeded] border-[#b88686] text-[#a05e5e]' : 'border-[#ddd] text-[#564c48]'}
                    `}
                  >
                    <div className="font-serif text-lg font-normal mb-2 ">{ev.title}</div>
                    <div className="text-sm text-[#888] font-light leading-snug">{ev.desc}</div>
                  </div>
                </div>
                {!isLeft && <div className={`hidden md:block flex-1`} />}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
