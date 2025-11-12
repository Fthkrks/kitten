import type { TransformedSpecialData } from '@/types/api';

export const specialData: TransformedSpecialData = {
  title: "WHAT MAKES US SPECIAL",
  features: [
    {
      id: "health",
      number: "01",
      title: "BREEDING FOR HEALTH",
      description: "Health is our top priority. Without good health, heartbreak inevitably ensues. For this reason, we follow strict protocols to ensure the health of our kittens and the happiness of your family.",
      buttonText: "HEALTH",
      image: {
        src: "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?w=1600&h=1000&fit=crop",
        alt: "Breeding for health"
      },
      imagePosition: "right"
    },
    {
      id: "disposition",
      number: "02",
      title: "BREEDING FOR DISPOSITION",
      description: "Purrsonality is what keeps us charmed with our kittens. Raising kittens to be confident and affection-seeking is fundamentally important. This process starts before birth and evolves for years to come.",
      buttonText: " ",
      image: {
        src: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=1600&h=1000&fit=crop",
        alt: "Breeding for disposition"
      },
      imagePosition: "left"
    },
    {
      id: "longevity",
      number: "03",
      title: "FEEDING FOR LONGEVITY",
      description: "We go the extra mile for our felines to make sure they receive the best quality nutrition, so they can live long, healthy lives by your side.",
      buttonText: "LONGEVITY",
      image: {
        src: "https://images.unsplash.com/photo-1511044568932-338cba0ad803?w=1600&h=1000&fit=crop",
        alt: "Feeding for longevity"
      },
      imagePosition: "right"
    }
  ]
};
