"use client";
import { useState } from "react";
import CardImage from "../_components/CardImage";

// FAQ Data Structure
interface FaqQuestions {
  [key: string]: string; // Question as key, Answer as value
}

interface FaqSection {
  title: string;
  questions: FaqQuestions;
}

// FAQ Data - Kullanıcı buraya kendi sorularını ekleyebilir
const faq: FaqSection[] = [
  {
    title: "General Questions",
    questions: {
      "What is your return policy?": "Our return policy allows returns within 30 days of purchase.",
      "How can I contact support?": "You can contact us through email or phone during business hours.",
      "Do you offer shipping?": "Yes, we offer shipping to most locations worldwide.",
    },
  },
  {
    title: "About Our Products",
    questions: {
      "What materials are used?": "We use only the finest materials in our products.",
      "Are your products eco-friendly?": "Yes, all our products are environmentally friendly and sustainably sourced.",
      "Do you have a warranty?": "Yes, all products come with a 1-year warranty.",
    },
  },
  {
    title: "Shipping & Delivery",
    questions: {
      "How long does shipping take?": "Standard shipping takes 5-7 business days.",
      "What are your shipping rates?": "Shipping rates vary by location and package weight.",
      "Do you ship internationally?": "Yes, we ship to most countries worldwide.",
    },
  },
];

export default function FAQPage() {
  const [openSections, setOpenSections] = useState<Set<number>>(new Set());
  const [openQuestions, setOpenQuestions] = useState<Map<string, boolean>>(new Map());

  const toggleSection = (sectionIndex: number) => {
    const newOpenSections = new Set(openSections);
    if (newOpenSections.has(sectionIndex)) {
      newOpenSections.delete(sectionIndex);
    } else {
      newOpenSections.add(sectionIndex);
    }
    setOpenSections(newOpenSections);
  };

  const toggleQuestion = (sectionIndex: number, question: string) => {
    const key = `${sectionIndex}-${question}`;
    const newOpenQuestions = new Map(openQuestions);
    newOpenQuestions.set(key, !newOpenQuestions.get(key));
    setOpenQuestions(newOpenQuestions);
  };

  const isSectionOpen = (sectionIndex: number) => openSections.has(sectionIndex);
  const isQuestionOpen = (sectionIndex: number, question: string) => {
    const key = `${sectionIndex}-${question}`;
    return openQuestions.get(key) || false;
  };

  const cardImage = {
    heroImage: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&q=80&w=1800",
    heading: "FAQ",
    cardTitle: "FREQUENTLY ASKED QUESTIONS",
    cardText: "Find answers to common questions about our products and services.",
    overlayColor: "rgba(0,0,0,0.10)",
    parallaxSpeed: 0.3,
    backgroundColor: "#f9f1f1",
  }

  return (
    <section className="w-full py-16 md:py-24 px-4 bg-white">
                <CardImage {...cardImage} />
      <div className="max-w-4xl mx-auto md:mt-20 mt-10">

        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="font-lora text-4xl md:text-5xl text-[#3a2b28] mb-4 font-bold">
            Frequently Asked Questions
          </h1>
          <div className="mx-auto h-px w-32 bg-gray-300" />
        </div>

        {/* FAQ Sections */}
        <div className="space-y-6">
          {faq.map((section, sectionIndex) => {
            const sectionOpen = isSectionOpen(sectionIndex);
            const questions = Object.entries(section.questions);

            return (
              <div
                key={sectionIndex}
                className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
              >
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(sectionIndex)}
                  className="w-full flex items-center justify-between px-6 py-4 bg-[#eefafd] hover:bg-[#e3f3f6] transition-colors"
                >
                  <h2 className="text-xl md:text-2xl font-lora font-semibold text-[#3a2b28]">
                    {section.title}
                  </h2>
                  <svg
                    className={`w-6 h-6 text-[#84adac] transition-transform duration-300 ${
                      sectionOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Section Questions */}
                {sectionOpen && (
                  <div className="bg-white">
                    {questions.map(([question, answer], questionIndex) => {
                      const questionOpen = isQuestionOpen(sectionIndex, question);

                      return (
                        <div
                          key={questionIndex}
                          className="border-t border-gray-200 last:border-b-0"
                        >
                          {/* Question */}
                          <button
                            onClick={() => toggleQuestion(sectionIndex, question)}
                            className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                          >
                            <span className="font-semibold text-gray-800 pr-4">
                              {question}
                            </span>
                            <svg
                              className={`w-5 h-5 text-gray-600 shrink-0 transition-transform duration-300 ${
                                questionOpen ? "rotate-180" : ""
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </button>

                          {/* Answer */}
                          <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${
                              questionOpen
                                ? "max-h-[500px] opacity-100"
                                : "max-h-0 opacity-0"
                            }`}
                          >
                            <div className="px-6 py-4 bg-[#fdeeee] text-[#58483b]">
                              {answer}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

