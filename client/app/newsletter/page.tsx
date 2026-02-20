"use client";

import { useState, FormEvent } from "react";
import { SubscribeResponse } from "@/types/newsletter";

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage(null);

    if (!email.trim()) {
      setMessage({
        type: "error",
        text: "Please enter your email address",
      });
      return;
    }

    if (!validateEmail(email)) {
      setMessage({
        type: "error",
        text: "Please enter a valid email address",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data: SubscribeResponse = await response.json();

      if (response.ok && data.success) {
        setMessage({
          type: "success",
          text: "Thank you for subscribing! Check your inbox for updates.",
        });
        setEmail("");
      } else {
        setMessage({
          type: "error",
          text: data.error || "Something went wrong. Please try again.",
        });
      }
    } catch {
      setMessage({
        type: "error",
        text: "Connection error. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      className="py-16 md:py-20"
      style={{
        background: "linear-gradient(to bottom, #F9F1F1, #E0F2F7)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <svg
              className="w-12 h-12 md:w-16 md:h-16 opacity-60"
              style={{ color: "#b1868e" }}
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C10.9 2 10 2.9 10 4C10 5.1 10.9 6 12 6C13.1 6 14 5.1 14 4C14 2.9 13.1 2 12 2M8 4C6.9 4 6 4.9 6 6C6 7.1 6.9 8 8 8C9.1 8 10 7.1 10 6C10 4.9 9.1 4 8 4M16 4C14.9 4 14 4.9 14 6C14 7.1 14.9 8 16 8C17.1 8 18 7.1 18 6C18 4.9 17.1 4 16 4M5 8C3.9 8 3 8.9 3 10C3 11.1 3.9 12 5 12C6.1 12 7 11.1 7 10C7 8.9 6.1 8 5 8M19 8C17.9 8 17 8.9 17 10C17 11.1 17.9 12 19 12C20.1 12 21 11.1 21 10C21 8.9 20.1 8 19 8M12 10C9.79 10 8 11.79 8 14C8 16.21 9.79 18 12 18C14.21 18 16 16.21 16 14C16 11.79 14.21 10 12 10Z" />
            </svg>
          </div>

          <h2
            className="font-lora text-3xl md:text-4xl lg:text-5xl mb-4 tracking-wide"
            style={{ color: "#b1868e" }}
          >
            JOIN OUR CATTERY FAMILY
          </h2>

          <p
            className="text-base md:text-lg mb-8 leading-relaxed"
            style={{ color: "#7c7175" }}
          >
            Love beautiful, well-raised kittens? Get early access to available
            kittens, litter announcements, waitlist openings, and trusted care
            tips — straight to your inbox.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              disabled={isLoading}
              className="flex-1 max-w-md px-4 py-3 md:py-4 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                borderColor: "#9a868d",
                color: "#3a2b28",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#84adac";
                e.target.style.boxShadow = "0 0 0 3px rgba(132, 173, 172, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#9a868d";
                e.target.style.boxShadow = "none";
              }}
            />

            <button
              type="submit"
              disabled={isLoading}
              className="px-6 md:px-8 py-3 md:py-4 rounded-lg font-bold uppercase tracking-wide shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: "#b1868e",
                color: "white",
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor = "#9a868d";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#b1868e";
              }}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Subscribing...
                </span>
              ) : (
                "Subscribe"
              )}
            </button>
          </form>

          {message && (
            <div
              className={`mt-6 p-4 rounded-lg flex items-center justify-center gap-3 animate-slideUp ${
                message.type === "success"
                  ? "bg-green-50 border-2 border-green-200"
                  : "bg-red-50 border-2 border-red-200"
              }`}
            >
              {message.type === "success" ? (
                <svg
                  className="w-6 h-6 flex-shrink-0"
                  style={{ color: "#10b981" }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6 flex-shrink-0"
                  style={{ color: "#ef4444" }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
              <p
                className="text-sm md:text-base font-medium"
                style={{
                  color: message.type === "success" ? "#10b981" : "#ef4444",
                }}
              >
                {message.text}
              </p>
            </div>
          )}

          <p
            className="text-xs md:text-sm mt-6 opacity-75"
            style={{ color: "#9a868d" }}
          >
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
