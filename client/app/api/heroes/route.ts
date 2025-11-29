import { NextResponse } from 'next/server';
import { fetchHeroesData } from '@/services/api';

// Force dynamic rendering and disable caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  console.log('🔵 API Route /api/heroes called');
  try {
    const data = await fetchHeroesData();
    console.log('✅ API Route /api/heroes: Data fetched successfully');
    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('❌ API Route: Error fetching heroes data:', errorMessage);
    
    // Check if it's a connection error
    if (errorMessage.includes('ECONNREFUSED') || errorMessage.includes('fetch failed')) {
      console.warn('⚠️ Strapi API is not available, using fallback heroes data');
    } else {
      console.warn('⚠️ Using fallback heroes data due to error');
    }
    
    // Always return JSON, never HTML
    return NextResponse.json({
      siteTitle: "Ethereal Persians",
      phoneNumber: "(941) 822-4016"
    }, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  }
}


