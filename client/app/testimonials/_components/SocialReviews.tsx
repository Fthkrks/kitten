"use client";
import { useState } from "react";
import Image from "next/image";

interface Review {
  id: string;
  name: string;
  avatar?: string; // Avatar image URL, if not provided, show initial
  timeAgo: string;
  rating: number;
  text: string;
  avatarColor?: string; // Color for initial avatar if no image
}

const reviews: Review[] = [
  {
    id: "1",
    name: "Ashley Scarpa",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    timeAgo: "8 months ago",
    rating: 5,
    text: "Roxy is such an AMAZING breeder!! I can't tell you how much I love my sweet little one, Violet. She has the best personality, beautiful features, and is the perfect...",
  },
  {
    id: "2",
    name: "Juliet",
    avatarColor: "#9333EA", // Purple
    timeAgo: "1 year ago",
    rating: 5,
    text: "I am so happy and grateful with my new kitten, thanks to Roxy. I found Etherial through google, it's the only professional looking cattery that I could find somewh...",
  },
  {
    id: "3",
    name: "Daniel Levy",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    timeAgo: "6 months ago",
    rating: 5,
    text: "We recently adopted two absolutely adorable Persian kittens from Ethereal Persians, and I couldn't be happier with the experience....",
  },
  {
    id: "4",
    name: "Maya Steel",
    avatarColor: "#22C55E", // Green
    timeAgo: "9 months ago",
    rating: 5,
    text: "I am so glad that I found Roxy when I was searching for my next Persian kitten. From the beginning, she was very responsive to communication, and she spent a great...",
  },
  {
    id: "5",
    name: "Lew N.",
    avatarColor: "#F97316", // Orange
    timeAgo: "1 year ago",
    rating: 5,
    text: "Purchasing a kitten from Ethereal Persians has been a wonderful experience. Roxy corresponded with my wife for about 2 months provided information and...",
  },
  {
    id: "6",
    name: "Deanne Daily",
    avatarColor: "#EF4444", // Red
    timeAgo: "2 years ago",
    rating: 5,
    text: "I cannot say enough about how wonderful her Persians are. Her passion for raising healthy and happy babies is evident, love at first sight!",
  },
  {
    id: "7",
    name: "K K",
    avatarColor: "#22C55E", // Green
    timeAgo: "1 year ago",
    rating: 5,
    text: "I don't normally post reviews online, but this one is long overdue. Ethereal Persians (EP) and its owners Roxy and Jason are exceptional! Never have I seen such...",
  },
  {
    id: "8",
    name: "Ashley",
    avatarColor: "#EF4444", // Red
    timeAgo: "10 months ago",
    rating: 5,
    text: "It was our family's first experience searching for the right breeder and they hit every point perfectly! Beautiful and social Kittens taken care of flawlessly wit...",
  },
  {
    id: "9",
    name: "Shahla Karimi",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200",
    timeAgo: "7 months ago",
    rating: 5,
    text: "Our family recently welcomed a beautiful Persian cat named Tuna into our family, all thanks to the amazing Roxy and her exceptional cattery. We couldn't be...",
  },
  {
    id: "10",
    name: "Tara Elwin",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    timeAgo: "1 year ago",
    rating: 5,
    text: "I can not recommend Roxy from Ethereal Persians enough. She has a long-standing reputation for breeding healthy and well-socialized Persian cats. Her breeding...",
  },
];

export default function SocialReviews() {
  const [expandedReviews, setExpandedReviews] = useState<Set<string>>(new Set());

  const toggleReview = (id: string) => {
    const newExpanded = new Set(expandedReviews);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedReviews(newExpanded);
  };

  const getInitial = (name: string): string => {
    const parts = name.trim().split(" ");
    if (parts.length > 1) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name[0].toUpperCase();
  };

  const getAvatarColor = (name: string, defaultColor?: string): string => {
    if (defaultColor) return defaultColor;
    const colors = [
      "#9333EA", // Purple
      "#22C55E", // Green
      "#F97316", // Orange
      "#EF4444", // Red
      "#3B82F6", // Blue
      "#8B5CF6", // Violet
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-lora text-[#6B6B6B] uppercase tracking-wide">
            SOCIAL REVIEWS (FB)
          </h2>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => {
            const isExpanded = expandedReviews.has(review.id);
            const displayText = isExpanded 
              ? review.text 
              : review.text.length > 150 
              ? review.text.substring(0, 150) + "..."
              : review.text;

            return (
              <div
                key={review.id}
                className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow relative"
              >
                {/* Facebook Icon */}
                <div className="absolute top-4 right-4">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                </div>

                {/* Reviewer Info */}
                <div className="flex items-start gap-3 mb-4">
                  {/* Avatar */}
                  <div className="shrink-0">
                    {review.avatar ? (
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <Image
                          src={review.avatar}
                          alt={review.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-lg"
                        style={{ backgroundColor: getAvatarColor(review.name, review.avatarColor) }}
                      >
                        {getInitial(review.name)}
                      </div>
                    )}
                  </div>

                  {/* Name and Time */}
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-800 text-sm">{review.name}</div>
                    <div className="text-gray-500 text-xs mt-1">{review.timeAgo}</div>
                  </div>
                </div>

                {/* Star Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Review Text */}
                <div className="text-gray-700 text-sm leading-relaxed">
                  {displayText}
                  {review.text.length > 150 && !isExpanded && (
                    <button
                      onClick={() => toggleReview(review.id)}
                      className="text-blue-600 hover:text-blue-800 ml-1 font-medium"
                    >
                      Read more
                    </button>
                  )}
                  {isExpanded && (
                    <button
                      onClick={() => toggleReview(review.id)}
                      className="text-blue-600 hover:text-blue-800 ml-1 font-medium"
                    >
                      Read less
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

