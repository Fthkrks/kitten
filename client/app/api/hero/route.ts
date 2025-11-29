import { NextResponse } from 'next/server';
import { fetchHeroData } from '@/services/api';

// Force dynamic rendering and disable caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Fallback data when API is unavailable
const fallbackHeroData = {
  heroImage: {
    src: "https://images.unsplash.com/photo-1513366208864-87536b8bd7b4?w=1200&h=900&fit=crop",
    alt: "Hero Image"
  },
  logo: {
    src: "/images/logo.png",
    alt: "Logo"
  },
  welcomeText: "Welcome to EPC",
  title: "ETHEREAL PERSIANS CATTERY",
  motto: "The only thing we love more than our kittens is seeing the joy they bring to your family.",
  description: "Our goal is to use our knowledge and experience with the Persian breed to pawsitively impact the life of your family.",
  collageImages: {
    image1: { src: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&h=1200&fit=crop", alt: "Collage Image 1" },
    image2: { src: "https://images.unsplash.com/photo-1513366208864-87536b8bd7b4?w=800&h=1200&fit=crop", alt: "Collage Image 2" },
    image3: { src: "https://images.unsplash.com/photo-1513366208864-87536b8bd7b4?w=800&h=1200&fit=crop", alt: "Collage Image 3" }
  },
  aboutSection: {
    greeting: "HEY FRIEND!",
    introduction: "My name is Roxy and I'm glad you've found my online home.",
    listItems: ["Loading content from API..."],
    conclusion: "Please wait while we load the content.",
    buttonText: "MORE ABOUT US"
  }
};

export async function GET() {
  console.log('🔵 API Route /api/hero called');
  try {
    const data = await fetchHeroData();
    console.log('✅ API Route /api/hero: Data fetched successfully');
    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('❌ API Route: Error fetching hero data:', errorMessage);
    
    // Check if it's a connection error
    if (errorMessage.includes('ECONNREFUSED') || errorMessage.includes('fetch failed')) {
      console.warn('⚠️ Strapi API is not available, using fallback hero data');
    } else {
      console.warn('⚠️ Using fallback hero data due to error');
    }
    
    // Always return JSON, never HTML
    return NextResponse.json(fallbackHeroData, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  }
}

