"use client";

import { useState, useEffect } from "react";
import { fetchKittenAppData } from "@/services/api";

interface Question {
  id: number;
  question: string;
  isElective: boolean;
  options?: string[];
}

export default function KittenApplicationPage() {
  const [title, setTitle] = useState("KITTEN APPLICATION");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    streetAddress: "",
    city: "",
    state: "",
    zip: "",
    dynamicAnswers: {} as Record<number, string>,
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Load data from API
  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchKittenAppData();
        setTitle(data.title);
        setDescription(data.description);
        setQuestions(data.questions);
      } catch (error) {
        console.error("Error loading kitten app data:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");

    try {
      // Prepare questions with answers
      const questionsWithAnswers = questions.map((q) => ({
        id: q.id,
        question: q.question,
        answer: formData.dynamicAnswers[q.id] || "",
      }));

      const response = await fetch("/api/kitten-app-submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          questions: questionsWithAnswers,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit application");
      }

      setSubmitSuccess(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9F9F9] py-12 px-4 flex items-center justify-center">
        <div className="text-[#5A5A5A] text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F9F9] py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 shadow-lg">
        {/* Header */}
        <h1 className="text-center font-lora text-[#5A5A5A] text-3xl md:text-4xl tracking-wider mb-8">
          {title}
        </h1>

        {/* Description */}
        <p className="text-center text-[#5A5A5A]/80 text-sm md:text-base leading-relaxed mb-8 whitespace-pre-line">
          {description}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* First Name & Last Name */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[#5A5A5A] text-sm font-medium mb-2">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8EA58E] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-[#5A5A5A] text-sm font-medium mb-2">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8EA58E] focus:border-transparent"
              />
            </div>
          </div>

          {/* Email & Phone */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[#5A5A5A] text-sm font-medium mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8EA58E] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-[#5A5A5A] text-sm font-medium mb-2">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8EA58E] focus:border-transparent"
              />
            </div>
          </div>

          {/* Street Address */}
          <div>
            <label className="block text-[#5A5A5A] text-sm font-medium mb-2">
              Street Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.streetAddress}
              onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8EA58E] focus:border-transparent"
            />
          </div>

          {/* City, State, Zip */}
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-[#5A5A5A] text-sm font-medium mb-2">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8EA58E] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-[#5A5A5A] text-sm font-medium mb-2">
                State <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8EA58E] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-[#5A5A5A] text-sm font-medium mb-2">
                Zip <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.zip}
                onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8EA58E] focus:border-transparent"
              />
            </div>
          </div>

          {/* Dynamic Questions from API */}
          {questions.map((q) => (
            <div key={q.id}>
              <label className="block text-[#5A5A5A] text-sm font-medium mb-3">
                {q.question}
              </label>

              {/* If NOT elective (isElective: false) → Textarea (resizable) */}
              {!q.isElective && (
                <textarea
                  value={formData.dynamicAnswers[q.id] || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      dynamicAnswers: {
                        ...formData.dynamicAnswers,
                        [q.id]: e.target.value,
                      },
                    })
                  }
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8EA58E] focus:border-transparent resize-y min-h-[100px]"
                />
              )}

              {/* If elective (isElective: true) → Radio buttons with options */}
              {q.isElective && q.options && (
                <div className="space-y-2">
                  {q.options.map((option) => (
                    <label key={option} className="flex items-center space-x-2 text-[#5A5A5A]">
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        value={option}
                        checked={formData.dynamicAnswers[q.id] === option}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            dynamicAnswers: {
                              ...formData.dynamicAnswers,
                              [q.id]: e.target.value,
                            },
                          })
                        }
                        className="w-4 h-4 text-[#8EA58E] focus:ring-[#8EA58E]"
                      />
                      <span className="text-sm">{option}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Error Message */}
          {submitError && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm">{submitError}</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={submitting}
              className="w-full md:w-auto px-12 py-3 bg-[#8EA58E] hover:bg-[#7A9580] text-white font-medium tracking-wide transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "SUBMITTING..." : "SUBMIT APPLICATION"}
            </button>
          </div>
        </form>

        {/* Success Modal */}
        {submitSuccess && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
            <div className="bg-white rounded-lg p-10 max-w-lg w-full shadow-2xl transform transition-all animate-slideUp">
              <div className="text-center">
                {/* Animated Success Icon */}
                <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mb-6 animate-scaleIn">
                  <svg
                    className="w-12 h-12 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>

                {/* Title */}
                <h2 className="text-3xl font-lora text-[#5A5A5A] mb-4 tracking-wide">
                  Application Submitted Successfully!
                </h2>

                {/* Message */}
                <p className="text-[#5A5A5A]/70 text-base leading-relaxed mb-8 px-4">
                  Thank you for your interest in adopting a kitten from Astrid Moon Cattery.
                  <br />
                  <br />
                  We have received your application and will carefully review it. You can expect
                  to hear back from us within <strong>1-3 business days</strong>.
                </p>

                {/* Divider */}
                <div className="w-16 h-1 bg-[#8EA58E] mx-auto mb-8 rounded"></div>

                {/* Button */}
                <button
                  onClick={() => {
                    setSubmitSuccess(false);
                    window.location.href = "/";
                  }}
                  className="px-10 py-3 bg-gradient-to-r from-[#8EA58E] to-[#7A9580] hover:from-[#7A9580] hover:to-[#6B8571] text-white font-medium tracking-wider rounded-md transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  RETURN TO HOMEPAGE
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
