import { HomepageApiResponse, TransformedHeroData, TransformedKittenData, TransformedAdultsData, TransformedCommentsData, TransformedSpecialData, TransformedGaleriesData, TransformedTestimonialData, MediaLinksApiResponse, TransformedMediaData, MarketingLinksApiResponse, TransformedVideoData, AvailableKittenPageApiResponse, TransformedCardImageData, TransformedPetCardData, TransformedAdultsAvaibleData, TermsPageApiResponse, TransformedTermsCardImageData, TransformedTermsData, FaqPageApiResponse, TransformedFaqSection, KingsPageApiResponse, TransformedKingsCardData, QueensPageApiResponse, TransformedQueensCardData, BlogPageApiResponse, TransformedWhyBlogData, TransformedBlogPost, TestimonialPageApiResponse, TransformedTestimonialHeroData, TransformedTestimonialReview, GalleriesPageApiResponse, TransformedGalleryItem, AboutUsPageApiResponse, HistoryPageApiResponse, HealthPageApiResponse, RecipePageApiResponse, DietPageApiResponse, VaccinePageApiResponse, SpayingAndNeuteringPageApiResponse, ProductsRecommendPageApiResponse, HeroesApiResponse } from '@/types/api';

// Function to get API base URL at runtime (important for production)
// This ensures environment variables are read at runtime, not build-time
function getApiBaseUrl(): string {
  // Read environment variables at runtime
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 
                     process.env.NEXT_API_BASE_URL || 
                     process.env.API_BASE_URL || 
                     'http://127.0.0.1:1337';
  
  // Remove trailing slash if present
  return apiBaseUrl.replace(/\/$/, '');
}

// For backward compatibility, keep a constant but it will use runtime value
// This is only used in module-level code, fetch functions should use getApiBaseUrl()
const NEXT_API_BASE_URL = getApiBaseUrl();

// Validate API base URL in production (runtime check)
if (typeof window === 'undefined' && process.env.NODE_ENV === 'production') {
  const apiBaseUrl = getApiBaseUrl();
  const envVar = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_API_BASE_URL || process.env.API_BASE_URL;
  if (!envVar) {
    console.error('❌ NEXT_PUBLIC_API_BASE_URL, NEXT_API_BASE_URL, or API_BASE_URL is not set! This will cause connection errors.');
    console.error('⚠️ Please set one of these in Vercel environment variables.');
  } else if (apiBaseUrl.includes('127.0.0.1') || apiBaseUrl.includes('localhost')) {
    console.error('❌ API_BASE_URL is set to localhost! This will not work in production.');
    console.error('⚠️ Current value:', apiBaseUrl);
    console.error('⚠️ Please set the environment variable to your production Strapi API URL.');
  } else {
    console.log('✅ API_BASE_URL configured:', apiBaseUrl);
    console.log('🔍 Using environment variable:', envVar === process.env.NEXT_PUBLIC_API_BASE_URL ? 'NEXT_PUBLIC_API_BASE_URL' : 
                                                      envVar === process.env.NEXT_API_BASE_URL ? 'NEXT_API_BASE_URL' : 'API_BASE_URL');
  }
}

// Timeout for fetch requests (10 seconds)
const FETCH_TIMEOUT = 10000;

// Helper function to create a fetch with timeout
async function fetchWithTimeout(url: string, options: RequestInit = {}): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error(`Request timeout: ${url}`);
    }
    throw error;
  }
}

// Helper function to get fetch options with draft mode support
async function getFetchOptions(): Promise<{ cache: RequestCache; headers?: HeadersInit }> {
  // Check if we're in draft mode (Next.js)
  try {
    const { draftMode } = await import('next/headers');
    const { isEnabled } = await draftMode();
    
    if (isEnabled) {
      return {
        cache: 'no-store',
        headers: {
          'strapi-encode-source-maps': 'true',
        },
      };
    }
  } catch (error) {
    // draftMode is not available (e.g., in client components)
    // Fall back to normal fetch
  }
  
  return { cache: 'no-store' };
}

export async function fetchHeroData(): Promise<TransformedHeroData> {
  // Get API base URL at runtime (important for production)
  const apiBaseUrl = getApiBaseUrl();
  
  // Try simpler populate first, if it fails, use detailed populate
  // This helps with production environments that might have URL length limits
  let url = `${apiBaseUrl}/api/homepage?populate[heroContent][populate]=*`;
  
  // Log URL in production for debugging
  if (typeof window === 'undefined' && process.env.NODE_ENV === 'production') {
    console.log('🔵 fetchHeroData - Attempting with simple populate');
    console.log('🔵 fetchHeroData - Base URL:', apiBaseUrl);
    console.log('🔵 fetchHeroData - Full URL length:', url.length);
  }
  
  // First try with simple populate (works in most cases)
  let response;
  try {
    response = await fetchWithTimeout(url, {
      cache: 'no-store',
    });
    
    // If simple populate works, use it
    if (response.ok) {
      if (typeof window === 'undefined' && process.env.NODE_ENV === 'production') {
        console.log('✅ fetchHeroData - Simple populate worked');
      }
    } else {
      // If simple populate fails, try detailed populate
      if (typeof window === 'undefined' && process.env.NODE_ENV === 'production') {
        console.log('⚠️ fetchHeroData - Simple populate failed, trying detailed populate');
      }
      
      const populateQuery = [
        'populate[heroContent][populate][heroImage][fields][0]=url',
        'populate[heroContent][populate][logo][fields][0]=url',
        'populate[heroContent][populate][collageImage1][fields][0]=url',
        'populate[heroContent][populate][collageImage2][fields][0]=url',
        'populate[heroContent][populate][collageImage3][fields][0]=url',
        'populate[heroContent][populate][aboutSection][populate]=*'
      ].join('&');
      
      url = `${apiBaseUrl}/api/homepage?${populateQuery}`;
      response = await fetchWithTimeout(url, {
        cache: 'no-store',
      });
    }
  } catch (firstError) {
    // If first attempt fails, try detailed populate
    if (typeof window === 'undefined' && process.env.NODE_ENV === 'production') {
      console.log('⚠️ fetchHeroData - First attempt failed, trying detailed populate');
    }
    
    const populateQuery = [
      'populate[heroContent][populate][heroImage][fields][0]=url',
      'populate[heroContent][populate][logo][fields][0]=url',
      'populate[heroContent][populate][collageImage1][fields][0]=url',
      'populate[heroContent][populate][collageImage2][fields][0]=url',
      'populate[heroContent][populate][collageImage3][fields][0]=url',
      'populate[heroContent][populate][aboutSection][populate]=*'
    ].join('&');
    
    url = `${apiBaseUrl}/api/homepage?${populateQuery}`;
    response = await fetchWithTimeout(url, {
      cache: 'no-store',
    });
  }

  // Process the response
  if (!response.ok) {
    const errorText = await response.text();
    console.error('❌ fetchHeroData - HTTP Error:', response.status);
    console.error('❌ fetchHeroData - Error Response:', errorText.substring(0, 500));
    console.error('❌ fetchHeroData - Request URL:', url.substring(0, 200) + '...');
    throw new Error(`HTTP error! status: ${response.status}, response: ${errorText.substring(0, 200)}`);
  }

  // Check if response is JSON
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    const text = await response.text();
    throw new Error(`Expected JSON but got ${contentType}. Response: ${text.substring(0, 200)}`);
  }

  try {
    const data: HomepageApiResponse = await response.json();
    
    // Transform API data to match Hero component props
    const transformedData = transformHeroData(data);
    
    if (typeof window === 'undefined' && process.env.NODE_ENV === 'production') {
      console.log('✅ fetchHeroData - Data fetched successfully');
    }
    
    return transformedData;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('❌ Error fetching hero data:', errorMessage);
    console.error('❌ Error type:', error instanceof Error ? error.constructor.name : typeof error);
    
    // Check for specific error types
    if (errorMessage.includes('fetch failed') || errorMessage.includes('ECONNREFUSED')) {
      console.error('❌ Network error - Strapi API connection failed');
      console.error('🔍 Check if Strapi API is accessible:', NEXT_API_BASE_URL);
    } else if (errorMessage.includes('timeout')) {
      console.error('❌ Request timeout - URL might be too complex or API is slow');
    } else if (errorMessage.includes('Expected JSON')) {
      console.error('❌ Response is not JSON - API might be returning HTML error page');
    } else if (errorMessage.includes('Cannot read properties of null')) {
      console.error('❌ Null reference error - API response structure might be different');
      console.error('🔍 This usually means an image field is null in Strapi');
    }
    
    throw error;
  }
}

function transformHeroData(apiData: HomepageApiResponse): TransformedHeroData {
  // Get API base URL at runtime for image URLs
  const apiBaseUrl = getApiBaseUrl();
  const heroContent = apiData.data.heroContent;
  
  if (!heroContent) {
    throw new Error('heroContent not found in API response');
  }
  
  // Helper function to safely get image URL with null checks
  const getImageUrlSafe = (imageObj: any): string => {
    if (!imageObj || !imageObj.url) {
      console.warn('⚠️ Image object or URL is null, using fallback');
      return 'https://images.unsplash.com/photo-1548247416-ec66f4900b2e?auto=format&fit=crop&q=80&w=800';
    }
    const url = imageObj.url;
    return url.startsWith('http') ? url : `${apiBaseUrl}${url}`;
  };

  // Transform listItems from string with \n separators to array
  const listItems = heroContent.aboutSection?.listItems
    ? heroContent.aboutSection.listItems
        .split('\n')
        .map(item => item.trim())
        .filter(item => item.length > 0)
    : [];

  return {
    heroImage: {
      src: getImageUrlSafe(heroContent.heroImage),
      alt: "Hero Image"
    },
    logo: {
      src: getImageUrlSafe(heroContent.logo),
      alt: "Logo"
    },
    welcomeText: heroContent.welcomeText || "Welcome to EPC",
    title: heroContent.title || "ETHEREAL PERSIANS CATTERY",
    motto: heroContent.motto || "",
    description: heroContent.description || "",
    collageImages: {
      image1: {
        src: getImageUrlSafe(heroContent.collageImage1),
        alt: "Collage Image 1"
      },
      image2: {
        src: getImageUrlSafe(heroContent.collageImage2),
        alt: "Collage Image 2"
      },
      image3: {
        src: getImageUrlSafe(heroContent.collageImage3),
        alt: "Collage Image 3"
      }
    },
    aboutSection: {
      greeting: heroContent.aboutSection?.greeting || "HEY FRIEND!",
      introduction: heroContent.aboutSection?.introduction || "",
      listItems: listItems,
      conclusion: heroContent.aboutSection?.conclusion?.trim() || "",
      buttonText: heroContent.aboutSection?.buttonText?.trim() || "MORE ABOUT US"
    }
  };
}

// Helper function to get full image URL (uses runtime API base URL)
const getImageUrl = (url: string | undefined | null): string => {
  if (!url) {
    return 'https://images.unsplash.com/photo-1548247416-ec66f4900b2e?auto=format&fit=crop&q=80&w=800';
  }
  const apiBaseUrl = getApiBaseUrl();
  return url.startsWith('http') ? url : `${apiBaseUrl}${url}`;
};

export async function fetchKittenData(): Promise<TransformedKittenData> {
    const apiBaseUrl = getApiBaseUrl();
    const url = `${apiBaseUrl}/api/homepage?populate[KittenSection][populate][Kittens][populate][image][populate]=*`;

  try {
    const response = await fetchWithTimeout(url, {
      cache: 'no-store', // Always fetch fresh data
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unable to read error response');
      console.error('❌ API Error Response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText.substring(0, 200)}`);
    }

    const data: HomepageApiResponse = await response.json();
    
    // Transform API data to match Kitten component props
    const transformedData = transformKittenData(data);
    
    return transformedData;
  } catch (error) {
    console.error('❌ Error fetching kitten data:', error);
    throw error;
  }
}

function transformKittenData(apiData: HomepageApiResponse): TransformedKittenData {
  // Check if KittenSection exists
  if (!apiData.data.KittenSection) {
    console.warn('⚠️ KittenSection not found in homepage API, using fallback data');
    const { kittenData } = require('@/data/kittenData');
    return kittenData;
  }
  
  const kittenSection = apiData.data.KittenSection;
  
  // Check if Kittens exists
  if (!kittenSection.Kittens) {
    console.warn('⚠️ Kittens not found in KittenSection, using fallback data');
    const { kittenData } = require('@/data/kittenData');
    return {
      title: kittenSection.title,
      kittens: kittenData.kittens,
      buttonText: kittenSection.buttonText
    };
  }
  
  // Check if image exists
  if (!kittenSection.Kittens.image) {
    console.warn('⚠️ Kittens.image not found, using fallback data');
    const { kittenData } = require('@/data/kittenData');
    return {
      title: kittenSection.title,
      kittens: kittenData.kittens,
      buttonText: kittenSection.buttonText
    };
  }
  
  let imageItem = kittenSection.Kittens.image;
  
  // If image is an array, take the first element
  if (Array.isArray(imageItem)) {
    if (imageItem.length === 0) {
      console.warn('⚠️ Kitten images not found in API, using fallback data');
      console.info('💡 To use API data: Add images to KittenSection in Strapi admin panel');
      
      // Import and use fallback data
      const { kittenData } = require('@/data/kittenData');
      return {
        title: kittenSection.title,
        kittens: kittenData.kittens,
        buttonText: kittenSection.buttonText
      };
    }
    imageItem = imageItem[0];
  }
  
  // Check if imageItem has the expected structure
  if (!imageItem || typeof imageItem !== 'object') {
    console.warn('⚠️ Invalid kitten image structure, using fallback data');
    console.info('💡 Check KittenSection image configuration in Strapi');
    
    const { kittenData } = require('@/data/kittenData');
    return {
      title: kittenSection.title,
      kittens: kittenData.kittens,
      buttonText: kittenSection.buttonText
    };
  }
  
  // Check if src exists
  if (!imageItem.src) {
    console.warn('⚠️ Kitten image src not populated, using fallback data');
    console.info('💡 Make sure image media is properly uploaded in Strapi');
    
    const { kittenData } = require('@/data/kittenData');
    return {
      title: kittenSection.title,
      kittens: kittenData.kittens,
      buttonText: kittenSection.buttonText
    };
  }
  
  // Generate a unique ID from the image name
  const id = imageItem.src.name?.split('-').pop()?.replace(/\.[^/.]+$/, '') || 'kitten-1';
  
  // Extract name from alt text (e.g., "Silver Persian Kitten" -> "Silver")
  const name = imageItem.alt?.split(' ')[0] || 'Kitten';
  
  // For "Rainbow Collection", use shorter mobile title
  const mobileTitle = imageItem.alt?.includes('Collection') ? 'Rainbow' : undefined;
  
  // Create a single kitten object
  const kitten = {
    id,
    name: imageItem.alt?.includes('Collection') ? imageItem.alt : name,
    mobileTitle,
    image: {
      src: getImageUrl(imageItem.src.url),
      alt: imageItem.alt || 'Kitten'
    }
  };

  return {
    title: kittenSection.title,
    kittens: [kitten], // Wrap in array for component compatibility
    buttonText: kittenSection.buttonText
  };
}

export async function fetchAdultsData(): Promise<TransformedAdultsData> {
    const apiBaseUrl = getApiBaseUrl();
    const url = `${apiBaseUrl}/api/homepage?populate[AdultsSection][populate][cats][populate][image][populate]=src`;
  
  
  try {
    const response = await fetchWithTimeout(url, {
      cache: 'no-store', // Always fetch fresh data
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unable to read error response');
      console.error('❌ API Error Response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText.substring(0, 200)}`);
    }

    const data: HomepageApiResponse = await response.json();

    // Transform API data to match Adults component props
    const transformedData = transformAdultsData(data);

    return transformedData;
  } catch (error) {
    console.error('❌ Error fetching adults data:', error);
    throw error;
  }
}

function transformAdultsData(apiData: HomepageApiResponse): TransformedAdultsData {
  // Check if AdultsSection exists
  if (!apiData.data.AdultsSection) {
    console.warn('⚠️ AdultsSection not found in homepage API, using fallback data');
    const { adultsData } = require('@/data/adultsData');
    return adultsData;
  }
  
  const adultsSection = apiData.data.AdultsSection;
  
  // Check if cats array exists
  if (!adultsSection.cats || !Array.isArray(adultsSection.cats)) {
    console.warn('⚠️ cats array not found in AdultsSection, using fallback data');
    const { adultsData } = require('@/data/adultsData');
    return {
      title: adultsSection.title,
      cats: adultsData.cats
    };
  }
  
  // Transform the cats array with fallback for each cat
  const cats = adultsSection.cats.map((cat, index) => {
    // Check if image and src exist
    if (!cat.image || !cat.image.src) {
      console.warn(`⚠️ Cat ${index} image not populated, using fallback`);
      const { adultsData } = require('@/data/adultsData');
      return adultsData.cats[index] || adultsData.cats[0];
    }
    
    return {
      id: cat.id.toString(),
      title: cat.title,
      buttonText: cat.buttonText,
      image: {
        src: getImageUrl(cat.image.src.url),
        alt: cat.image.alt
      }
    };
  });

  return {
    title: adultsSection.title,
    cats
  };
}

export async function fetchCommentsData(): Promise<TransformedCommentsData> {
    const apiBaseUrl = getApiBaseUrl();
    const url = `${apiBaseUrl}/api/homepage?populate[CommentSection][populate][features][populate][image][populate]=src`;
  
  
  try {
    const response = await fetchWithTimeout(url, {
      cache: 'no-store', // Always fetch fresh data
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unable to read error response');
      console.error('❌ API Error Response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText.substring(0, 200)}`);
    }

    const data: HomepageApiResponse = await response.json();
    
    // Transform API data to match Comments component props
    const transformedData = transformCommentsData(data);

    return transformedData;
  } catch (error) {
    console.error('❌ Error fetching comments data:', error);
    throw error;
  }
}

function transformCommentsData(apiData: HomepageApiResponse): TransformedCommentsData {
  // Check if CommentSection exists
  if (!apiData.data.CommentSection) {
    console.warn('⚠️ CommentSection not found in homepage API, using fallback data');
    const { commentsData } = require('@/data/commentsData');
    return commentsData;
  }
  
  const commentSection = apiData.data.CommentSection;
  
  // Check if features is an array
  if (!Array.isArray(commentSection.features)) {
    console.warn('⚠️ features is not an array, using fallback data');
    const { commentsData } = require('@/data/commentsData');
    return {
      title: commentSection.title,
      description: commentSection.description,
      features: commentsData.features
    };
  }
  
  // Transform features array - each feature has a single image object
  const features = commentSection.features.map((featureItem, index) => {
    // Check if image and src exist
    if (!featureItem.image || !featureItem.image.src) {
      console.warn(`⚠️ Feature ${index} image not populated, using fallback`);
      const { commentsData } = require('@/data/commentsData');
      return commentsData.features[index] || commentsData.features[0];
    }
    
    return {
      id: featureItem.id.toString(),
      title: featureItem.title,
      icon: {
        src: getImageUrl(featureItem.image.src.url),
        alt: featureItem.image.alt
      }
    };
  });

  return {
    title: commentSection.title,
    description: commentSection.description,
    features
  };
}

export async function fetchSpecialData(): Promise<TransformedSpecialData> {
    const apiBaseUrl = getApiBaseUrl();
    const url = `${apiBaseUrl}/api/homepage?populate[SpecialSection][populate][features][populate][image][populate]=src`;
  
  
  try {
    const response = await fetchWithTimeout(url, {
      cache: 'no-store', // Always fetch fresh data
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unable to read error response');
      console.error('❌ API Error Response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText.substring(0, 200)}`);
    }

    const data: HomepageApiResponse = await response.json();

    // Transform API data to match Special component props
    const transformedData = transformSpecialData(data);

    return transformedData;
  } catch (error) {
    console.error('❌ Error fetching special data:', error);
    throw error;
  }
}

function transformSpecialData(apiData: HomepageApiResponse): TransformedSpecialData {
  // Check if SpecialSection exists
  if (!apiData.data.SpecialSection) {
    console.warn('⚠️ SpecialSection not found in homepage API, using fallback data');
    const { specialData } = require('@/data/specialData');
    return specialData;
  }
  
  const specialSection = apiData.data.SpecialSection;
  
  // Check if features is an array
  if (!Array.isArray(specialSection.features)) {
    console.warn('⚠️ features is not an array, using fallback data');
    const { specialData } = require('@/data/specialData');
    return {
      title: specialSection.title,
      features: specialData.features
    };
  }
  
  // Transform features array
  const features = specialSection.features.map((featureItem, index) => {
    // Check if image and src exist
    if (!featureItem.image || !featureItem.image.src) {
      console.warn(`⚠️ Feature ${index} image not populated, using fallback`);
      const { specialData } = require('@/data/specialData');
      return specialData.features[index] || specialData.features[0];
    }
    
    return {
      id: featureItem.id.toString(),
      number: featureItem.number,
      title: featureItem.title,
      description: featureItem.description,
      buttonText: featureItem.buttonText,
      imagePosition: featureItem.imagePosition,
      image: {
        src: getImageUrl(featureItem.image.src.url),
        alt: featureItem.image.alt
      }
    };
  });

  return {
    title: specialSection.title,
    features
  };
}

export async function fetchGaleriesData(): Promise<TransformedGaleriesData> {
    const apiBaseUrl = getApiBaseUrl();
    const url = `${apiBaseUrl}/api/homepage?populate[GaleriesSection][populate][images][populate]=src`;

  try {
    const response = await fetchWithTimeout(url, {
      cache: 'no-store', // Always fetch fresh data
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unable to read error response');
      console.warn(`⚠️ GaleriesSection API returned status: ${response.status}`);
      console.warn('⚠️ Error details:', errorText.substring(0, 200));
      console.warn('⚠️ Using fallback data from galeriesData.ts');
      console.info('💡 To fix: Add GaleriesSection to your homepage content type in Strapi');
      const { galeriesData } = require('@/data/galeriesData');
      return galeriesData;
    }

    const data: HomepageApiResponse = await response.json();

    // Transform API data to match Galeries component props
    const transformedData = transformGaleriesData(data);

    return transformedData;
  } catch (error) {
    console.error('❌ Error fetching galeries data:', error);
    console.warn('⚠️ Using fallback data from galeriesData.ts');
    const { galeriesData } = require('@/data/galeriesData');
    return galeriesData;
  }
}

function transformGaleriesData(apiData: HomepageApiResponse): TransformedGaleriesData {
  // Check if GaleriesSection exists
  if (!apiData.data.GaleriesSection) {
    console.warn('⚠️ GaleriesSection not found in homepage API, using fallback data');
    const { galeriesData } = require('@/data/galeriesData');
    return galeriesData;
  }
  
  const galeriesSection = apiData.data.GaleriesSection;
  
  // Check if images is an array
  if (!Array.isArray(galeriesSection.images)) {
    console.warn('⚠️ images is not an array, using fallback data');
    const { galeriesData } = require('@/data/galeriesData');
    return {
      title: galeriesSection.title,
      description: {
        mainText: galeriesSection.mainText,
        browsingText: galeriesSection.browsingText,
        eyeCandyText: galeriesSection.eyeCandyText
      },
      buttonText: galeriesSection.buttonText,
      images: galeriesData.images
    };
  }
  
  // Transform images array - only take first 3 images for fixed layout
  const images = galeriesSection.images.slice(0, 3).map((imageItem, index) => {
    // Check if src exists
    if (!imageItem.src) {
      console.warn(`⚠️ Image ${index} src not populated, using fallback`);
      const { galeriesData } = require('@/data/galeriesData');
      return galeriesData.images[index] || galeriesData.images[0];
    }
    
    return {
      id: imageItem.id.toString(),
      src: getImageUrl(imageItem.src.url),
      alt: imageItem.alt
    };
  });

  return {
    title: galeriesSection.title,
    description: {
      mainText: galeriesSection.mainText,
      browsingText: galeriesSection.browsingText,
      eyeCandyText: galeriesSection.eyeCandyText
    },
    buttonText: galeriesSection.buttonText,
    images
  };
}

export async function fetchTestimonialData(): Promise<TransformedTestimonialData> {
    const apiBaseUrl = getApiBaseUrl();
    const url = `${apiBaseUrl}/api/homepage?populate[TestiomonialSection][populate][testimonials][populate][image][fields][0]=url&populate[TestiomonialSection][populate][testimonials][populate][avatarImage][populate][src][fields][0]=url`;

  try {
    const response = await fetchWithTimeout(url, {
      cache: 'no-store', // Always fetch fresh data
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unable to read error response');
      console.warn(`⚠️ TestiomonialSection API returned status: ${response.status}`);
      console.warn('⚠️ Error details:', errorText.substring(0, 200));
      console.warn('⚠️ Using fallback data from testimonialData.ts');
      console.info('💡 To fix: Add TestiomonialSection to your homepage content type in Strapi');
      const { testimonialData } = require('@/data/testimonialData');
      return testimonialData;
    }

    const data: HomepageApiResponse = await response.json();

    // Transform API data to match Testimonial component props
    const transformedData = transformTestimonialData(data);

    return transformedData;
  } catch (error) {
    console.error('❌ Error fetching testimonial data:', error);
    console.warn('⚠️ Using fallback data from testimonialData.ts');
    const { testimonialData } = require('@/data/testimonialData');
    return testimonialData;
  }
}

function transformTestimonialData(apiData: HomepageApiResponse): TransformedTestimonialData {
  // Check if TestiomonialSection exists
  if (!apiData.data.TestiomonialSection) {
    console.warn('⚠️ TestiomonialSection not found in homepage API, using fallback data');
    const { testimonialData } = require('@/data/testimonialData');
    return testimonialData;
  }
  
  const testimonialSection = apiData.data.TestiomonialSection;
  
  // Check if testimonials is an array
  if (!Array.isArray(testimonialSection.testimonials)) {
    console.warn('⚠️ testimonials is not an array, using fallback data');
    const { testimonialData } = require('@/data/testimonialData');
    return {
      subtitle: testimonialSection.subtitle,
      title: testimonialSection.title,
      testimonials: testimonialData.testimonials
    };
  }
  
  // Transform testimonials array
  const testimonials = testimonialSection.testimonials.map((testimonialItem, index) => {
    // Check if image and avatarImage exist
    if (!testimonialItem.image || !testimonialItem.avatarImage || !testimonialItem.avatarImage.src) {
      console.warn(`⚠️ Testimonial ${index} image/avatarImage not populated, using fallback`);
      const { testimonialData } = require('@/data/testimonialData');
      return testimonialData.testimonials[index] || testimonialData.testimonials[0];
    }
    
    // Parse titleLines string into array
    // API returns: "Thank you, thank you, thank you,", "you!"
    // We need to split by ", " and clean up quotes
    let titleLinesArray: string[] = [];
    try {
      // Remove leading/trailing quotes and split by ", "
      const cleanedString = testimonialItem.titleLines.replace(/^"|"$/g, '');
      titleLinesArray = cleanedString.split('", "').map(line => line.trim());
    } catch (error) {
      console.warn(`⚠️ Error parsing titleLines for testimonial ${index}:`, error);
      titleLinesArray = [testimonialItem.titleLines];
    }
    
    return {
      id: testimonialItem.id.toString(),
      titleLines: titleLinesArray,
      body: testimonialItem.body,
      author: testimonialItem.author,
      location: testimonialItem.location,
      cats: testimonialItem.cats,
      image: getImageUrl(testimonialItem.image.url),
      avatarImage: {
        src: getImageUrl(testimonialItem.avatarImage.src.url),
        alt: testimonialItem.avatarImage.alt
      }
    };
  });

  return {
    subtitle: testimonialSection.subtitle,
    title: testimonialSection.title,
    testimonials
  };
}

export async function fetchMediaData(): Promise<TransformedMediaData> {
    const apiBaseUrl = getApiBaseUrl();
    const url = `${apiBaseUrl}/api/media-links?populate[SocialLinks][populate]=icon`;

  try {
    const response = await fetchWithTimeout(url, {
      cache: 'no-store', // Always fetch fresh data
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unable to read error response');
      console.error(`❌ Media links API returned status: ${response.status}`);
      console.error(`⚠️ Error details: ${errorText.substring(0, 500)}`);
      console.warn('⚠️ Using fallback data from mediaData.ts');
      console.info('💡 To fix: Add media-links content type in Strapi and check permissions');
      const { mediaData } = require('@/data/mediaData');
      return mediaData;
    }

    const data: MediaLinksApiResponse = await response.json();

    // Transform API data to match Media component props
    const transformedData = transformMediaData(data);

    return transformedData;
  } catch (error) {
    console.error('❌ Error fetching media data:', error);
    console.warn('⚠️ Using fallback data from mediaData.ts');
    const { mediaData } = require('@/data/mediaData');
    return mediaData;
  }
}

function transformMediaData(apiData: MediaLinksApiResponse): TransformedMediaData {
  // Check if data array exists and has items
  if (!apiData.data || !Array.isArray(apiData.data) || apiData.data.length === 0) {
    console.warn('⚠️ No media links found in API, using fallback data');
    const { mediaData } = require('@/data/mediaData');
    return mediaData;
  }
  
  // Get the first item (should only be one)
  const mediaItem = apiData.data[0];
  
  // Check if SocialLinks exists
  if (!Array.isArray(mediaItem.SocialLinks)) {
    console.warn('⚠️ SocialLinks is not an array, using fallback data');
    const { mediaData } = require('@/data/mediaData');
    return {
      title: mediaItem.title,
      socialLinks: mediaData.socialLinks
    };
  }
  
  // Transform social links array
  const socialLinks = mediaItem.SocialLinks.map((linkItem, index) => {
    // Check if icon exists
    if (!linkItem.icon || !linkItem.icon.url) {
      console.warn(`⚠️ Social link ${index} icon not populated, using fallback`);
      const { mediaData } = require('@/data/mediaData');
      return mediaData.socialLinks[index] || mediaData.socialLinks[0];
    }
    
    return {
      id: linkItem.id.toString(),
      name: linkItem.name,
      href: linkItem.href,
      icon: getImageUrl(linkItem.icon.url)
    };
  });

  return {
    title: mediaItem.title,
    socialLinks
  };
}

export async function fetchVideoData(): Promise<TransformedVideoData> {
    const apiBaseUrl = getApiBaseUrl();
    const url = `${apiBaseUrl}/api/marketing-links?populate[items][populate]=src`;

  try {
    const response = await fetchWithTimeout(url, {
      cache: 'no-store', // Always fetch fresh data
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unable to read error response');
      console.warn(`⚠️ Marketing links API returned status: ${response.status}`);
      console.warn('⚠️ Error details:', errorText.substring(0, 200));
      console.warn('⚠️ Using fallback data from videoData.ts');
      console.info('💡 To fix: Add marketing-links content type in Strapi');
      const { videoData } = require('@/data/videoData');
      return videoData;
    }

    const data: MarketingLinksApiResponse = await response.json();

    // Transform API data to match Video component props
    const transformedData = transformVideoData(data);

    return transformedData;
  } catch (error) {
    console.error('❌ Error fetching video data:', error);
    console.warn('⚠️ Using fallback data from videoData.ts');
    const { videoData } = require('@/data/videoData');
    return videoData;
  }
}

function transformVideoData(apiData: MarketingLinksApiResponse): TransformedVideoData {
  // Check if data array exists and has items
  if (!apiData.data || !Array.isArray(apiData.data) || apiData.data.length === 0) {
    console.warn('⚠️ No marketing links found in API, using fallback data');
    const { videoData } = require('@/data/videoData');
    return videoData;
  }
  
  // Get the first item (should only be one)
  const marketingItem = apiData.data[0];
  
  // Check if items exists
  if (!Array.isArray(marketingItem.items)) {
    console.warn('⚠️ items is not an array, using fallback data');
    const { videoData } = require('@/data/videoData');
    return videoData;
  }
  
  // Transform items array
  const items = marketingItem.items
    .filter(item => item.src !== null) // Filter out items without src
    .map((item, index) => {
      // Check if src exists
      if (!item.src || !item.src.url) {
        console.warn(`⚠️ Item ${index} src not populated, skipping`);
        return null;
      }
      
      // Parse label string into array
      // API returns: "Xena, Ming, Girl, Boy1"
      // We need to split by ", " and trim
      let labelsArray: string[] | undefined = undefined;
      if (item.label && item.label.trim()) {
        try {
          labelsArray = item.label.split(',').map(label => label.trim()).filter(label => label.length > 0);
        } catch (error) {
          console.warn(`⚠️ Error parsing labels for item ${index}:`, error);
        }
      }
      
      return {
        id: item.id.toString(),
        src: getImageUrl(item.src.url),
        alt: item.alt,
        href: item.href,
        labels: labelsArray
      };
    })
    .filter(item => item !== null) as TransformedVideoData['items'];

  return {
    items
  };
}

export async function fetchAvailableKittenCardImage(): Promise<TransformedCardImageData> {
  const url = `${NEXT_API_BASE_URL}/api/avaible-kitten-page?populate[PetCards][populate][image][fields][0]=url&populate[PetCards][populate][albumImages][populate][src][fields][0]=url&populate[AdultsAvaible][populate]=*`;

  // Default fallback data
  const fallbackData: TransformedCardImageData = {
    heroImage: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=1800",
    heading: "AVAILABLE KITTEN",
    cardTitle: "AVAILABLE KITTENS",
    cardText: "Discover our adorable Persian kittens ready for their forever homes. Each kitten is lovingly raised with care, socialized, and comes from our champion bloodlines.",
    overlayColor: "rgba(0,0,0,0.15)",
    parallaxSpeed: 0.3,
    backgroundColor: "#f9f1f1",
  };
  
  try {
    const response = await fetch(url, {
      cache: 'no-store', // Always fetch fresh data
    });

    if (!response.ok) {
      console.warn(`⚠️ Available kitten page API returned status: ${response.status}`);
      console.warn('⚠️ Using fallback data');
      console.info('💡 To fix: Add avaible-kitten-page content type in Strapi');
      return fallbackData;
    }

    const data: AvailableKittenPageApiResponse = await response.json();

    // Transform API data
    const transformedData = transformAvailableKittenCardImage(data, fallbackData);

    return transformedData;
  } catch (error) {
    console.error('❌ Error fetching available kitten card image:', error);
    console.warn('⚠️ Using fallback data');
    return fallbackData;
  }
}

function transformAvailableKittenCardImage(
  apiData: AvailableKittenPageApiResponse,
  fallbackData: TransformedCardImageData
): TransformedCardImageData {
  // Check if cardImageSection exists
  if (!apiData.data.cardImageSection) {
    console.warn('⚠️ cardImageSection not found in API, using fallback data');
    return fallbackData;
  }
  
  const section = apiData.data.cardImageSection;
  
  // Check if heroImage exists
  if (!section.heroImage || !section.heroImage.url) {
    console.warn('⚠️ heroImage not populated, using fallback data');
    return fallbackData;
  }
  
  // Parse parallaxSpeed to number
  let parallaxSpeed = 0.3;
  try {
    parallaxSpeed = parseFloat(section.parallaxSpeed);
  } catch (error) {
    console.warn('⚠️ Error parsing parallaxSpeed, using default 0.3');
  }
  
  return {
    heroImage: getImageUrl(section.heroImage.url),
    heading: section.heading,
    cardTitle: section.cardTitle,
    cardText: section.cardText,
    overlayColor: section.overlayColor,
    parallaxSpeed: parallaxSpeed,
    backgroundColor: section.backgroundColor,
  };
}

export async function fetchAvailableKittenPetCards(): Promise<TransformedPetCardData[]> {
  const url = `${NEXT_API_BASE_URL}/api/avaible-kitten-page?populate[PetCards][populate][image][fields][0]=url&populate[PetCards][populate][albumImages][populate][src][fields][0]=url&populate[AdultsAvaible][populate]=*`;

  try {
    const response = await fetch(url, {
      cache: 'no-store', // Always fetch fresh data
    });

    if (!response.ok) {
      console.warn(`⚠️ Available kitten pet cards API returned status: ${response.status}`);
      console.warn('⚠️ Using empty array');
      console.info('💡 To fix: Add PetCards to your avaible-kitten-page content type in Strapi');
      return [];
    }

    const data: AvailableKittenPageApiResponse = await response.json();

    // Transform API data
    const transformedData = transformAvailableKittenPetCards(data);

    return transformedData;
  } catch (error) {
    console.error('❌ Error fetching available kitten pet cards:', error);
    console.warn('⚠️ Using empty array');
    return [];
  }
}

function transformAvailableKittenPetCards(apiData: AvailableKittenPageApiResponse): TransformedPetCardData[] {
  // Check if PetCards exists
  if (!apiData.data.PetCards || !Array.isArray(apiData.data.PetCards)) {
    console.warn('⚠️ PetCards not found in API or not an array');
    return [];
  }
  
  // Transform pet cards array
  const petCards = apiData.data.PetCards.map((pet, index) => {
    // Check if image exists
    if (!pet.image || !Array.isArray(pet.image) || pet.image.length === 0 || !pet.image[0].url) {
      console.warn(`⚠️ Pet ${index} image not populated, skipping`);
      return null;
    }
    
    // Transform album images
    const albumImages = pet.albumImages
      .filter(albumImg => albumImg.src && albumImg.src.url)
      .map(albumImg => ({
        src: getImageUrl(albumImg.src.url),
        alt: albumImg.alt
      }));
    
    return {
      id: pet.id.toString(),
      name: pet.name,
      age: pet.age,
      gender: pet.gender,
      reserved: pet.reserved,
      image: getImageUrl(pet.image[0].url),
      detailBg: pet.detailBg,
      dob: pet.dob,
      coatType: pet.coatType,
      faceType: pet.faceType,
      weight: pet.weight,
      coatColor: pet.coatColor,
      eyeColor: pet.eyeColor,
      shading: pet.shading,
      breed: pet.breed,
      price: pet.price,
      albumImages: albumImages
    };
  }).filter(pet => pet !== null) as TransformedPetCardData[];

  return petCards;
}

export async function fetchPetById(id: string): Promise<TransformedPetCardData | null> {
  const url = `${NEXT_API_BASE_URL}/api/avaible-kitten-page?populate[PetCards][populate][image][fields][0]=url&populate[PetCards][populate][albumImages][populate][src][fields][0]=url&populate[AdultsAvaible][populate]=*`;

  try {
    const response = await fetch(url, {
      cache: 'no-store', // Always fetch fresh data
    });

    if (!response.ok) {
      console.warn(`⚠️ Pet API returned status: ${response.status}`);
      return null;
    }

    const data: AvailableKittenPageApiResponse = await response.json();

    // Transform all pets and find the one with matching ID
    const allPets = transformAvailableKittenPetCards(data);
    const pet = allPets.find(p => p.id === id);
    
    if (!pet) {
      console.warn(`⚠️ Pet with ID ${id} not found in API data`);
      return null;
    }
    
    return pet;
  } catch (error) {
    console.error('❌ Error fetching pet by ID:', error);
    return null;
  }
}

export async function fetchAdultsAvaibleData(): Promise<TransformedAdultsAvaibleData> {
  const url = `${NEXT_API_BASE_URL}/api/avaible-kitten-page?populate[PetCards][populate][image][fields][0]=url&populate[PetCards][populate][albumImages][populate][src][fields][0]=url&populate[AdultsAvaible][populate]=*`;

  // Default fallback data
  const fallbackData: TransformedAdultsAvaibleData = {
    title: "RETIRING ADULTS",
    description: "The cats in this section are near and dear to our hearts. They are adults that have served a huge part in our cattery and occasionally some younger cats that we considered keeping to breed but for whatever reason, decided to place as beloved pets. Some may be discounted due to age. Nevertheless, these are our top kitties – the ones we consider most aesthetically pleasing and with great temperament.",
    buttonText: "SUBMIT A APPLICATION"
  };
  
  try {
    const response = await fetch(url, {
      cache: 'no-store', // Always fetch fresh data
    });

    if (!response.ok) {
      console.warn(`⚠️ Adults available API returned status: ${response.status}`);
      console.warn('⚠️ Using fallback data');
      return fallbackData;
    }

    const data: AvailableKittenPageApiResponse = await response.json();

    // Check if AdultsAvaible exists
    if (!data.data.AdultsAvaible) {
      console.warn('⚠️ AdultsAvaible not found in API, using fallback data');
      return fallbackData;
    }
    
    const transformedData: TransformedAdultsAvaibleData = {
      title: data.data.AdultsAvaible.title,
      description: data.data.AdultsAvaible.description,
      buttonText: data.data.AdultsAvaible.buttonText
    };
    
    return transformedData;
  } catch (error) {
    console.error('❌ Error fetching adults available data:', error);
    console.warn('⚠️ Using fallback data');
    return fallbackData;
  }
}

export async function fetchTermsPageData(): Promise<{ cardImage: TransformedTermsCardImageData; termsContent: TransformedTermsData }> {
  const url = `${NEXT_API_BASE_URL}/api/terms-page?populate[cardImageSection][populate][heroImage][fields][0]=url&populate[TermsSection][populate][sections][populate]=*`;

  // Default fallback data
  const fallbackCardImage: TransformedTermsCardImageData = {
    heroImage: "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&q=80&w=1800",
    heading: "TERMS",
    cardTitle: "TERMS & CONDITIONS",
    cardText: "Please read these terms and conditions carefully before using our services.",
    overlayColor: "rgba(0,0,0,0.15)",
    parallaxSpeed: 0.3,
    backgroundColor: "#f9f1f1",
  };
  
  const fallbackTermsContent: TransformedTermsData = {
    title: "Terms & Conditions",
    sections: [
      {
        heading: "Introduction",
        content: `Welcome to Ethereal Persians. These terms and conditions outline the rules and regulations for the use of our website and services. By accessing this website, we assume you accept these terms and conditions in full.`,
      },
      {
        heading: "Use License",
        content: `Permission is granted to temporarily download one copy of the materials on Ethereal Persians' website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
      
      - modify or copy the materials;
      - use the materials for any commercial purpose, or for any public display (commercial or non-commercial);
      - attempt to decompile or reverse engineer any software contained on Ethereal Persians' website;
      - remove any copyright or other proprietary notations from the materials; or
      - transfer the materials to another person or "mirror" the materials on any other server.`,
      },
      {
        heading: "Disclaimer",
        content: `The materials on Ethereal Persians' website are provided on an 'as is' basis. Ethereal Persians makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.

      Further, Ethereal Persians does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.`,
      },
      {
        heading: "Privacy Policy",
        content: `Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal information when you use our services. By using our website, you agree to the collection and use of information in accordance with this policy.`,
      },
      {
        heading: "Limitations",
        content: `In no event shall Ethereal Persians or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Ethereal Persians' website, even if Ethereal Persians or a Ethereal Persians authorized representative has been notified orally or in writing of the possibility of such damage.`,
      },
      {
        heading: "Revisions",
        content: `The materials appearing on Ethereal Persians' website could include technical, typographical, or photographic errors. Ethereal Persians does not warrant that any of the materials on its website are accurate, complete, or current. Ethereal Persians may make changes to the materials contained on its website at any time without notice.`,
      },
      {
        heading: "Contact Information",
        content: `If you have any questions about these Terms & Conditions, please contact us through our website's contact form or by email.`,
      },
    ],
  };
  
  try {
    const response = await fetch(url, {
      cache: 'no-store', // Always fetch fresh data
    });

    if (!response.ok) {
      console.warn(`⚠️ Terms page API returned status: ${response.status}`);
      console.warn('⚠️ Using fallback data');
      return { cardImage: fallbackCardImage, termsContent: fallbackTermsContent };
    }

    const data: TermsPageApiResponse = await response.json();

    // Transform cardImageSection
    let cardImage = fallbackCardImage;
    if (data.data.cardImageSection && data.data.cardImageSection.heroImage) {
      cardImage = {
        heroImage: getImageUrl(data.data.cardImageSection.heroImage.url),
        heading: data.data.cardImageSection.heading,
        cardTitle: data.data.cardImageSection.cardTitle,
        cardText: data.data.cardImageSection.cardText,
        overlayColor: data.data.cardImageSection.overlayColor,
        parallaxSpeed: data.data.cardImageSection.parallaxSpeed,
        backgroundColor: data.data.cardImageSection.backgroundColor,
      };
    } else {
      console.warn('⚠️ cardImageSection not found in API, using fallback card image');
    }
    
    // Transform termsContent
    let termsContent = fallbackTermsContent;
    if (data.data.TermsSection && data.data.TermsSection.sections) {
      termsContent = {
        title: data.data.TermsSection.title,
        sections: data.data.TermsSection.sections.map(section => ({
          heading: section.heading,
          content: section.content,
        })),
      };
    } else {
      console.warn('⚠️ TermsSection not found in API, using fallback terms content');
    }
    
    return { cardImage, termsContent };
  } catch (error) {
    console.error('❌ Error fetching terms page data:', error);
    console.warn('⚠️ Using fallback data');
    return { cardImage: fallbackCardImage, termsContent: fallbackTermsContent };
  }
}

export async function fetchFaqData(): Promise<TransformedFaqSection[]> {
  const url = `${NEXT_API_BASE_URL}/api/faq-page?populate[FaqSection][populate]=*`;

  // Default fallback data
  const fallbackData: TransformedFaqSection[] = [
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
  
  try {
    const response = await fetch(url, {
      cache: 'no-store', // Always fetch fresh data
    });

    if (!response.ok) {
      console.warn(`⚠️ FAQ API returned status: ${response.status}`);
      console.warn('⚠️ Using fallback data');
      return fallbackData;
    }

    const data: FaqPageApiResponse = await response.json();

    // Check if FaqSection exists
    if (!data.data.FaqSection || data.data.FaqSection.length === 0) {
      console.warn('⚠️ FaqSection not found in API, using fallback data');
      return fallbackData;
    }
    
    // Transform FAQ sections
    const transformedData: TransformedFaqSection[] = data.data.FaqSection.map(section => {
      // Merge all question objects from the questions array into one object
      const questionsObj: { [key: string]: string } = {};
      section.questions.forEach(item => {
        Object.assign(questionsObj, item.question);
      });
      
      return {
      title: section.title,
        questions: questionsObj,
      };
    });
    
    return transformedData;
  } catch (error) {
    console.error('❌ Error fetching FAQ data:', error);
    console.warn('⚠️ Using fallback data');
    return fallbackData;
  }
}

export async function fetchKingsPageData(): Promise<{ cardImage: TransformedCardImageData; kings: TransformedKingsCardData[] }> {
  const url = `${NEXT_API_BASE_URL}/api/kings-page?populate[cardImageSection][populate][heroImage][fields][0]=url&populate[KingsSection][populate][image][fields][0]=url`;

  // Default fallback data
  const fallbackCardImage: TransformedCardImageData = {
    heroImage: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=1800",
    heading: "KINGS",
    cardTitle: "OUR KINGS",
    cardText: "Meet our magnificent Persian kings - the regal fathers of our bloodline. These distinguished gentlemen showcase exceptional breeding, majestic presence, and the noble characteristics that define our royal lineage.",
    overlayColor: "rgba(0,0,0,0.15)",
    parallaxSpeed: 0.3,
    backgroundColor: "#f9f1f1",
  };
  
  const fallbackKings: TransformedKingsCardData[] = [
    {
      id: "2",
      name: "KING | TITAN",
      description: "Meet our magnificent Persian kings - the regal fathers of our bloodline. These distinguished gentlemen showcase exceptional breeding, majestic presence, and the noble characteristics that define our royal lineage. KING TITAN stands as a proud example of traditional Persian excellence with his impressive orange tabby coat and commanding presence.",
      imageSrc: "https://images.unsplash.com/photo-1548247416-ec66f4900b2e?auto=format&fit=crop&q=80&w=800",
      cardBackgroundColor: "#E0F2F7",
      buttonText: "MEET TITAN",
      imageOverlayText: "EP ETHEREAL Persians TITAN",
      imagePosition: "right",
      titleColor: "#7DD3FC",
      buttonBackgroundColor: "#E0F2F7",
      buttonTextColor: "#3a2b28",
      descriptionTextColor: "#5A5A5A",
    },
    {
      id: "1",
      name: "SKY",
      description: "Sky is an exquisite Russian import, a seal lynx point Himalayan with stunning deep blue eyes and an extreme face. His personality is that of a dog-like-cat - overly needy, affectionate, demanding, vocal, and simply a joy to live with. He brings endless entertainment and love to his family.",
      imageSrc: "https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?auto=format&fit=crop&q=80&w=800",
      cardBackgroundColor: "#D1ECF1",
      buttonText: "MEET SKY",
      imageOverlayText: "EP ETHEREAL Persians SKY",
      imagePosition: "left",
      titleColor: "#84adac",
      buttonBackgroundColor: "#D1ECF1",
      buttonTextColor: "#3a2b28",
      descriptionTextColor: "#5A5A5A",
    }
  ];
  
  try {
    const response = await fetch(url, {
      cache: 'no-store', // Always fetch fresh data
    });

    if (!response.ok) {
      console.warn(`⚠️ Kings page API returned status: ${response.status}`);
      console.warn('⚠️ Using fallback data');
      return { cardImage: fallbackCardImage, kings: fallbackKings };
    }

    const data: KingsPageApiResponse = await response.json();

    // Transform cardImageSection
    let cardImage = fallbackCardImage;
    if (data.data.cardImageSection && data.data.cardImageSection.heroImage) {
      cardImage = {
        heroImage: getImageUrl(data.data.cardImageSection.heroImage.url),
        heading: data.data.cardImageSection.heading,
        cardTitle: data.data.cardImageSection.cardTitle,
        cardText: data.data.cardImageSection.cardText,
        overlayColor: data.data.cardImageSection.overlayColor,
        parallaxSpeed: parseFloat(data.data.cardImageSection.parallaxSpeed),
        backgroundColor: data.data.cardImageSection.backgroundColor,
      };
    } else {
      console.warn('⚠️ cardImageSection not found in API, using fallback card image');
    }
    
    // Transform KingsSection
    let kings = fallbackKings;
    if (data.data.KingsSection && data.data.KingsSection.length > 0) {
      kings = data.data.KingsSection.map(king => {
        // Normalize imagePosition to lowercase
        const imagePosition = king.imagePosition.toLowerCase() as "left" | "right";
        
        // Use image from API if available, otherwise use a default
        // Handle both array format and null
        let imageSrc = "https://images.unsplash.com/photo-1548247416-ec66f4900b2e?auto=format&fit=crop&q=80&w=800";
        if (king.image && Array.isArray(king.image) && king.image.length > 0) {
          imageSrc = getImageUrl(king.image[0].url);
        }
        
        return {
          id: king.id.toString(),
          name: king.name,
          description: king.description,
          imageSrc: imageSrc,
          cardBackgroundColor: king.detailBg,
          buttonText: king.buttonText,
          imageOverlayText: `EP ETHEREAL Persians ${king.name.split('|')[0].trim()}`,
          imagePosition: imagePosition,
          titleColor: king.titleColor,
          buttonBackgroundColor: king.detailBg,
          buttonTextColor: "#3a2b28",
          descriptionTextColor: "#5A5A5A",
        };
      });
    } else {
      console.warn('⚠️ KingsSection not found in API, using fallback kings');
    }
    
    return { cardImage, kings };
  } catch (error) {
    console.error('❌ Error fetching kings page data:', error);
    console.warn('⚠️ Using fallback data');
    return { cardImage: fallbackCardImage, kings: fallbackKings };
  }
}

export async function fetchQueensPageData(): Promise<{ cardImage: TransformedCardImageData; queens: TransformedQueensCardData[] }> {
  const url = `${NEXT_API_BASE_URL}/api/queens-page?populate[cardImageSection][populate][heroImage][fields][0]=url&populate[QueensSection][populate][image][fields][0]=url`;

  // Default fallback data
  const fallbackCardImage: TransformedCardImageData = {
    heroImage: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=1800",
    heading: "QUEENS",
    cardTitle: "OUR QUEENS",
    cardText: "Meet our magnificent Persian queens - the regal mothers of our bloodline. These distinguished ladies showcase exceptional breeding, majestic presence, and the noble characteristics that define our royal lineage.",
    overlayColor: "rgba(0,0,0,0.15)",
    parallaxSpeed: 0.3,
    backgroundColor: "#f9f1f1",
  };
  
  const fallbackQueens: TransformedQueensCardData[] = [
    {
      id: "3",
      name: "QUEEN | CRYSTAL",
      description: "Meet our magnificent Persian queens - the elegant mothers of our bloodline. These distinguished ladies showcase exceptional breeding, graceful presence, and the noble characteristics that define our royal lineage.",
      imageSrc: "https://images.unsplash.com/photo-1548247416-ec66f4900b2e?auto=format&fit=crop&q=80&w=800",
      cardBackgroundColor: "#E0F2F7",
      buttonText: "MEET CRYSTAL",
      imageOverlayText: "EP ETHEREAL Persians CRYSTAL",
      imagePosition: "right",
      titleColor: "#7DD3FC",
      buttonBackgroundColor: "#E0F2F7",
      buttonTextColor: "#3a2b28",
      descriptionTextColor: "#5A5A5A",
    },
  ];
  
  try {
    const response = await fetch(url, {
      cache: 'no-store', // Always fetch fresh data
    });

    if (!response.ok) {
      console.warn(`⚠️ Queens page API returned status: ${response.status}`);
      console.warn('⚠️ Using fallback data');
      return { cardImage: fallbackCardImage, queens: fallbackQueens };
    }

    const data: QueensPageApiResponse = await response.json();

    // Transform cardImageSection
    let cardImage = fallbackCardImage;
    if (data.data.cardImageSection && data.data.cardImageSection.heroImage) {
      cardImage = {
        heroImage: getImageUrl(data.data.cardImageSection.heroImage.url),
        heading: data.data.cardImageSection.heading,
        cardTitle: data.data.cardImageSection.cardTitle,
        cardText: data.data.cardImageSection.cardText,
        overlayColor: data.data.cardImageSection.overlayColor,
        parallaxSpeed: parseFloat(data.data.cardImageSection.parallaxSpeed),
        backgroundColor: data.data.cardImageSection.backgroundColor,
      };
    } else {
      console.warn('⚠️ cardImageSection not found in API, using fallback card image');
    }
    
    // Transform QueensSection
    let queens = fallbackQueens;
    if (data.data.QueensSection && data.data.QueensSection.length > 0) {
      queens = data.data.QueensSection.map((queen, index) => {
        // Normalize imagePosition to lowercase, handle null by alternating left/right
        let imagePosition: "left" | "right" = "right";
        if (queen.imagePosition) {
          imagePosition = queen.imagePosition.toLowerCase() as "left" | "right";
        } else {
          // Alternate between right and left if imagePosition is null
          imagePosition = index % 2 === 0 ? "right" : "left";
        }
        
        // Use image from API if available, otherwise use a default
        // Handle both array format and null
        let imageSrc = "https://images.unsplash.com/photo-1548247416-ec66f4900b2e?auto=format&fit=crop&q=80&w=800";
        if (queen.image && Array.isArray(queen.image) && queen.image.length > 0) {
          imageSrc = getImageUrl(queen.image[0].url);
        }
        
        return {
          id: queen.id.toString(),
          name: queen.name,
          description: queen.description,
          imageSrc: imageSrc,
          cardBackgroundColor: queen.detailBg,
          buttonText: queen.buttonText,
          imageOverlayText: `EP ETHEREAL Persians ${queen.name.split('|')[0].trim()}`,
          imagePosition: imagePosition,
          titleColor: queen.titleColor,
          buttonBackgroundColor: queen.detailBg,
          buttonTextColor: "#3a2b28",
          descriptionTextColor: "#5A5A5A",
        };
      });
    } else {
      console.warn('⚠️ QueensSection not found in API, using fallback queens');
    }
    
    return { cardImage, queens };
  } catch (error) {
    console.error('❌ Error fetching queens page data:', error);
    console.warn('⚠️ Using fallback data');
    return { cardImage: fallbackCardImage, queens: fallbackQueens };
  }
}

export async function fetchBlogPageData(): Promise<{ cardImage: TransformedCardImageData; whyBlogData: TransformedWhyBlogData; blogs: TransformedBlogPost[] }> {
  const url = `${NEXT_API_BASE_URL}/api/blog-page?populate[cardImageSection][populate][heroImage][fields][0]=url&populate[BlogSection][populate][image][fields][0]=url&populate[whyBlogData][populate][imageTop][fields][0]=url&populate[whyBlogData][populate][aboutItems][populate]=*&populate[whyBlogData][populate][imageBottom][fields][0]=url`;

  // Default fallback data
  const fallbackCardImage: TransformedCardImageData = {
    heroImage: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&q=80&w=1800",
    heading: "BLOG",
    cardTitle: "WELCOME TO OUR BLOG",
    cardText: "Discover insights, tips, and stories from our cattery.",
    overlayColor: "rgba(0,0,0,0.10)",
    parallaxSpeed: 0.3,
    backgroundColor: "#f9f111",
  };
  
  const fallbackWhyBlogData: TransformedWhyBlogData = {
    imageTop: "https://images.unsplash.com/photo-1513366208864-87536b8bd7b4?auto=format&fit=crop&q=80&w=800",
    imageTopAlt: "Roxy with cat",
    aboutTitle: "About Roxy",
    aboutItems: [
      { text: "Mother, wife, and prior vet tech" },
      { text: "Cattery owner since 2015" },
      { text: "Practices holistic medicine" },
      { text: "Crazy cat lady!" }
    ],
    whyBlogTitle: "Why I Blog?",
    whyBlogText: "When I was a newbie breeder, I struggled to make the right decisions. I did not have a mentor and learned many lessons the hard way. I blog to help other breeders and pet parents overcome challenges without the need to make as many mistakes. Hopefully, this enables your kitty to live their best life.",
    whyBlogBg: "#d48888",
    imageBottom: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&q=80&w=1600",
    imageBottomAlt: "Three Persian cats",
    topBandColor: "#d8ebf0",
  };
  
  const fallbackBlogs: TransformedBlogPost[] = [];
  
  try {
    const response = await fetch(url, {
      cache: 'no-store', // Always fetch fresh data
    });

    if (!response.ok) {
      console.warn(`⚠️ Blog page API returned status: ${response.status}`);
      console.warn('⚠️ Using fallback data');
      return { cardImage: fallbackCardImage, whyBlogData: fallbackWhyBlogData, blogs: fallbackBlogs };
    }

    const data: BlogPageApiResponse = await response.json();

    // Transform cardImageSection
    let cardImage = fallbackCardImage;
    if (data.data.cardImageSection && data.data.cardImageSection.heroImage) {
      cardImage = {
        heroImage: getImageUrl(data.data.cardImageSection.heroImage.url),
        heading: data.data.cardImageSection.heading,
        cardTitle: data.data.cardImageSection.cardTitle,
        cardText: data.data.cardImageSection.cardText,
        overlayColor: data.data.cardImageSection.overlayColor,
        parallaxSpeed: parseFloat(data.data.cardImageSection.parallaxSpeed),
        backgroundColor: data.data.cardImageSection.backgroundColor,
      };
    } else {
      console.warn('⚠️ cardImageSection not found in API, using fallback card image');
    }
    
    // Transform whyBlogData
    let whyBlogData = fallbackWhyBlogData;
    if (data.data.whyBlogData) {
      whyBlogData = {
        imageTop: getImageUrl(data.data.whyBlogData.imageTop.url),
        imageTopAlt: data.data.whyBlogData.imageTopAlt,
        aboutTitle: data.data.whyBlogData.aboutTitle,
        aboutItems: data.data.whyBlogData.aboutItems.map(item => ({ text: item.text })),
        whyBlogTitle: data.data.whyBlogData.whyBlogTitle,
        whyBlogText: data.data.whyBlogData.whyBlogText,
        whyBlogBg: data.data.whyBlogData.whyBlogBg,
        imageBottom: getImageUrl(data.data.whyBlogData.imageBottom.url),
        imageBottomAlt: data.data.whyBlogData.imageBottomAlt,
        topBandColor: data.data.whyBlogData.topBandColor,
      };
    } else {
      console.warn('⚠️ whyBlogData not found in API, using fallback why blog data');
    }
    
    // Transform BlogSection
    let blogs = fallbackBlogs;
    if (data.data.BlogSection && data.data.BlogSection.length > 0) {
      blogs = data.data.BlogSection.map(blog => {
        // Handle null or missing image
        const imageUrl = blog.image && blog.image.url 
          ? getImageUrl(blog.image.url)
          : 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&q=80&w=800';
        
        // Parse categories - handle string format "GROOMING, UNCATEGORIZED"
        let categoriesArray: string[] = [];
        if (blog.categories) {
          if (typeof blog.categories === 'string') {
            categoriesArray = blog.categories
              .split(',')
              .map(cat => cat.trim().toUpperCase())
              .filter(cat => cat.length > 0);
          } else if (Array.isArray(blog.categories)) {
            categoriesArray = (blog.categories as unknown[]).map((cat: unknown) => String(cat).trim().toUpperCase());
          }
        }
        
        return {
          id: blog.id.toString(),
          categories: categoriesArray,
          title: blog.title,
          description: blog.description,
          author: blog.author,
          date: blog.date,
          features: blog.features ?? false, // Convert null to false
          fullContent: blog.fullContent,
          image: imageUrl,
        };
      });
    } else {
      console.warn('⚠️ BlogSection not found in API, using fallback blogs');
    }
    
    return { cardImage, whyBlogData, blogs };
  } catch (error) {
    console.error('❌ Error fetching blog page data:', error);
    console.warn('⚠️ Using fallback data');
    return { cardImage: fallbackCardImage, whyBlogData: fallbackWhyBlogData, blogs: fallbackBlogs };
  }
}

export interface TransformedReviewSection {
  title: string;
  reviews: TransformedTestimonialReview[];
}

export async function fetchTestimonialPageData(): Promise<{
  heroData: TransformedTestimonialHeroData;
  reviewSections: TransformedReviewSection[];
}> {
  try {
    const apiBaseUrl = getApiBaseUrl();
    const url = `${apiBaseUrl}/api/testimonial-page?populate[HeroSection][populate]=*&populate[Base][populate][Reviews][populate][avatar][fields][0]=url`;

    const response = await fetch(url, { cache: 'no-store' });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: TestimonialPageApiResponse = await response.json();

    // Transform Hero Section
    const heroData: TransformedTestimonialHeroData = {
      title: data.data.HeroSection.title || "TESTIMONIALS",
      mapUrl: data.data.HeroSection.mapUrl || "https://www.google.com/maps/d/embed?mid=1YOUR_MAP_ID",
      mapTitle: "Ethereal Persian Homes Map",
      heading: data.data.HeroSection.heading || "Our Customers Love Us... You Will Too!",
      description: data.data.HeroSection.description || "",
      closingText: data.data.HeroSection.closingText || "You don't have to take our word for it, read below what our EP families have to say!"
    };

    // Transform all Base sections to review sections
    const reviewSections: TransformedReviewSection[] = [];

    if (data.data.Base && data.data.Base.length > 0) {
      data.data.Base.forEach(baseSection => {
        const reviews: TransformedTestimonialReview[] = baseSection.Reviews.map(review => {
          const avatarUrl = review.avatar && review.avatar.url 
            ? getImageUrl(review.avatar.url)
            : undefined;

          return {
            id: review.id.toString(),
            name: review.name,
            timeAgo: review.timeAgo,
            rating: review.rating,
            text: review.text,
            avatar: avatarUrl
          };
        });

        reviewSections.push({
          title: baseSection.ReviewsTitle || "GOOGLE REVIEWS",
          reviews
        });
      });
    }

    return { heroData, reviewSections };
  } catch (error) {
    console.error('❌ Error fetching testimonial page data:', error);
    console.warn('⚠️ Using fallback data');
    
    // Fallback data
    const heroData: TransformedTestimonialHeroData = {
      title: "TESTIMONIALS",
      mapUrl: "https://www.google.com/maps/d/embed?mid=1YOUR_MAP_ID",
      mapTitle: "Ethereal Persian Homes Map",
      heading: "Our Customers Love Us... You Will Too!",
      description: "We're not just selling kittens, we're gaining new family members! Our hearts are filled with grateful meows for our kitten parents. They not only complete the life of our kittens, but they also become a part of our Ethereal family. We hope that if you're in the market for a new furry friend that you take a chance on us and are fortunate enough to experience the wonderful joy of an Ethereal Persian kitten.",
      closingText: "You don't have to take our word for it, read below what our EP families have to say!"
    };

    return { heroData, reviewSections: [] };
  }
}

export async function fetchGalleriesPageData(): Promise<{
  cardImage: TransformedCardImageData;
  galleries: TransformedGalleryItem[];
}> {
  try {
    const apiBaseUrl = getApiBaseUrl();
    const url = `${apiBaseUrl}/api/galleries-page?populate[cardImageSection][populate][heroImage][fields][0]=url&populate[GalleriesData][populate][src][fields][0]=url&populate[GalleriesData][populate][images][populate]=*`;

    const response = await fetch(url, { cache: 'no-store' });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: GalleriesPageApiResponse = await response.json();

    // Transform CardImage Section
    const cardImage: TransformedCardImageData = {
      heroImage: getImageUrl(data.data.cardImageSection.heroImage.url),
      heading: data.data.cardImageSection.heading || "GALLERIES",
      cardTitle: data.data.cardImageSection.cardTitle || "CHECK OUT OUR PHOTO ALBUMS",
      cardText: data.data.cardImageSection.cardText || "",
      overlayColor: data.data.cardImageSection.overlayColor || "rgba(0,0,0,0.15)",
      parallaxSpeed: parseFloat(data.data.cardImageSection.parallaxSpeed) || 0.3,
      backgroundColor: data.data.cardImageSection.backgroundColor || "#f9f1f1"
    };

    // Transform Galleries Data
    const galleries: TransformedGalleryItem[] = data.data.GalleriesData.map(gallery => {
      // Handle null or missing images
      const images = gallery.images.map(img => {
        const imageUrl = img.src && img.src.url 
          ? getImageUrl(img.src.url) 
          : 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&q=80&w=800';
        
        return {
          id: img.id.toString(),
          src: imageUrl,
          alt: img.alt || (img.src && img.src.alternativeText) || gallery.label
        };
      });

      // Handle null or missing cover image
      const coverImage = gallery.src && gallery.src.url
        ? getImageUrl(gallery.src.url)
        : 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&q=80&w=800';

      return {
        id: gallery.id.toString(),
        label: gallery.label,
        description: gallery.description,
        category: gallery.category,
        fullContent: gallery.fullContent,
        coverImage,
        images
      };
    });

    return { cardImage, galleries };
  } catch (error) {
    console.error('❌ Error fetching galleries page data:', error);
    console.warn('⚠️ Using fallback data');
    
    // Fallback data
    const cardImage: TransformedCardImageData = {
      heroImage: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&q=80&w=1800",
      heading: "GALLERIES",
      cardTitle: "CHECK OUT OUR PHOTO ALBUMS",
      cardText: "Browse through our collection of beautiful moments capturing the elegance, playfulness, and unique personalities of our Persian cats.",
      overlayColor: "rgba(0,0,0,0.15)",
      parallaxSpeed: 0.3,
      backgroundColor: "#f9f1f1"
    };

    return { cardImage, galleries: [] };
  }
}

export async function fetchAboutUsPageData(): Promise<{
  cardImage: TransformedCardImageData;
  aboutData: {
    image: string;
    imageAlt: string;
    title: string;
    paragraph1: string;
    highlightText: string;
    paragraph2: string;
  };
  paragData: {
    image: string;
    imageAlt: string;
    title: string;
    paragraphs: string[];
    listTitle: string;
    listItems: string[];
  };
  timelineEvents: Array<{
    year: string;
    title: string;
    desc: string;
    position: string;
  }>;
  cards: Array<{
    title: string;
    text: string;
    img: string;
    bg?: string;
    reverse: boolean;
  }>;
  faqData: {
    title: string;
    questions: Array<{
      question: string;
      answer: string;
    }>;
  };
  reasons: Array<{
    number: number;
    text: string;
  }>;
}> {
  try {
    const apiBaseUrl = getApiBaseUrl();
    const fetchOptions = await getFetchOptions();
    
    // Check if draft mode is enabled to add status parameter
    let url = `${apiBaseUrl}/api/about-us-page?populate[cardImageSection][populate][heroImage][fields][0]=url&populate[AboutSection][populate][image][fields][0]=url&populate[ParaqSection][populate][image][fields][0]=url&populate[ParaqSection][populate][listItems][populate]=*&populate[timeLine][populate]=*&populate[CardsSection][populate][img][fields][0]=url&populate[FaqSection][populate][questions][populate]=*&populate[reasonSection][populate]=*`;
    
    // Add status=draft if in draft mode
    const headers = fetchOptions.headers as Record<string, string> | undefined;
    if (headers?.['strapi-encode-source-maps'] === 'true') {
      url += '&status=draft';
    }

    const response = await fetchWithTimeout(url, fetchOptions);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ About Us API returned status: ${response.status}`);
      console.error(`⚠️ Error details: ${errorText.substring(0, 500)}`);
      throw new Error(`HTTP error! status: ${response.status}, response: ${errorText.substring(0, 200)}`);
    }

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      throw new Error(`Expected JSON but got ${contentType}. Response: ${text.substring(0, 200)}`);
    }

    const data: AboutUsPageApiResponse = await response.json();

    // Transform CardImage Section
    const cardImage: TransformedCardImageData = {
      heroImage: getImageUrl(data.data.cardImageSection.heroImage.url),
      heading: data.data.cardImageSection.heading || "ABOUT US",
      cardTitle: data.data.cardImageSection.cardTitle || "OUR STORY",
      cardText: data.data.cardImageSection.cardText || "",
      overlayColor: data.data.cardImageSection.overlayColor || "rgba(0,0,0,0.10)",
      parallaxSpeed: parseFloat(data.data.cardImageSection.parallaxSpeed) || 0.3,
      backgroundColor: data.data.cardImageSection.backgroundColor || "#f9f1f1"
    };

    // Transform About Section
    const aboutImageUrl = data.data.AboutSection.image?.url
      ? getImageUrl(data.data.AboutSection.image.url)
      : 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&q=80&w=500';

    const aboutData = {
      image: aboutImageUrl,
      imageAlt: data.data.AboutSection.imageAlt || "Roxy and Jason with Persian cat",
      title: data.data.AboutSection.title || "About Us",
      paragraph1: data.data.AboutSection.paragraph1,
      highlightText: data.data.AboutSection.highlightText,
      paragraph2: data.data.AboutSection.paragraph2
    };

    // Transform Paraq Section
    // Parse paragraphs from the string format (comma-separated)
    const paragraphsArray = data.data.ParaqSection.paragraphs
      .split('",')
      .map(p => p.trim().replace(/^"|"$/g, '').replace(/\\"/g, '"'));

    // Extract list items from the object
    const listItemsData = data.data.ParaqSection.listItems[0];
    const listItems = [
      listItemsData.school,
      listItemsData.job,
      listItemsData.job2,
      listItemsData.job3
    ];

    const paragData = {
      image: getImageUrl(data.data.ParaqSection.image.url),
      imageAlt: data.data.ParaqSection.imageAlt,
      title: data.data.ParaqSection.title,
      paragraphs: paragraphsArray,
      listTitle: data.data.ParaqSection.listTitle,
      listItems
    };

    // Transform Timeline Section
    const timelineEvents = data.data.timeLine?.map(event => ({
      year: event.year,
      title: event.title,
      desc: event.desc,
      position: event.position.toLowerCase()
    })) || [];

    // Transform Cards Section
    const cards = data.data.CardsSection?.map((card, index) => ({
      title: card.title,
      text: card.text,
      img: getImageUrl(card.img.url),
      bg: index === 1 ? "#fff" : undefined,
      reverse: card.reserve
    })) || [];

    // Transform FAQ Section
    const faqData = {
      title: data.data.FaqSection?.[0]?.title || "FAQ",
      questions: data.data.FaqSection?.[0]?.questions?.flatMap(q => {
        // Check if q.question exists and is not null/undefined
        if (!q.question || typeof q.question !== 'object') {
          return [];
        }
        // Convert the question object to array of {question, answer} pairs
        return Object.entries(q.question).map(([question, answer]) => ({
          question,
          answer
        }));
      }) || []
    };

    // Transform Reason Section
    const reasons = data.data.reasonSection?.map(reason => ({
      number: reason.number,
      text: reason.text
    })) || [];

    return { cardImage, aboutData, paragData, timelineEvents, cards, faqData, reasons };
  } catch (error) {
    console.error('❌ Error fetching about us page data:', error);
    console.warn('⚠️ Using fallback data');
    
    // Fallback data
    const cardImage: TransformedCardImageData = {
      heroImage: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&q=80&w=1800",
      heading: "ABOUT US",
      cardTitle: "OUR STORY",
      cardText: "Hey Friend! I'm glad you're here. My name is Roxy and my hubby is Jason.",
      overlayColor: "rgba(0,0,0,0.10)",
      parallaxSpeed: 0.3,
      backgroundColor: "#f9f1f1"
    };

    const aboutData = {
      image: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&q=80&w=500",
      imageAlt: "Roxy and Jason with Persian cat",
      title: "About Us",
      paragraph1: "",
      highlightText: "",
      paragraph2: ""
    };

    const paragData = {
      image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&q=80&w=500",
      imageAlt: "Roxy and Cat",
      title: "Roxy: The Crazy Cat Lady",
      paragraphs: [],
      listTitle: "",
      listItems: []
    };

    const timelineEvents: Array<{
      year: string;
      title: string;
      desc: string;
      position: string;
    }> = [];
    const cards: Array<{
      title: string;
      text: string;
      img: string;
      bg?: string;
      reverse: boolean;
    }> = [];
    const faqData = {
      title: "FAQ",
      questions: [] as Array<{
        question: string;
        answer: string;
      }>
    };
    const reasons: Array<{
      number: number;
      text: string;
    }> = [];

    return { cardImage, aboutData, paragData, timelineEvents, cards, faqData, reasons };
  }
}

export async function fetchHistoryPageData(): Promise<{
  cardImage: TransformedCardImageData;
  textImageData: {
    leftImage: {
      src: string;
      alt: string;
      title: string;
      caption: string;
    };
    rightImage: {
      src: string;
      alt: string;
      title: string;
      caption: string;
    };
    paragraphs: string[];
  };
}> {
  try {
    const apiBaseUrl = getApiBaseUrl();
    const url = `${apiBaseUrl}/api/history-page?populate[cardImageSection][populate][heroImage][fields][0]=url&populate[textImageData][populate][leftImage][populate][src][fields][0]=url&populate[textImageData][populate][rightImage][populate][src][fields][0]=url`;

    const response = await fetch(url, { cache: 'no-store' });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: HistoryPageApiResponse = await response.json();

    // Transform CardImage Section
    const cardImage: TransformedCardImageData = {
      heroImage: getImageUrl(data.data.cardImageSection.heroImage.url),
      heading: data.data.cardImageSection.heading || "HISTORY",
      cardTitle: data.data.cardImageSection.cardTitle || "OUR HISTORY",
      cardText: data.data.cardImageSection.cardText || "",
      overlayColor: data.data.cardImageSection.overlayColor || "rgba(0,0,0,0.15)",
      parallaxSpeed: parseFloat(data.data.cardImageSection.parallaxSpeed) || 0.3,
      backgroundColor: data.data.cardImageSection.backgroundColor || "#f9f1f1"
    };

    // Transform TextImage Section
    // Parse paragraphs from the string format (comma-separated with quotes)
    const paragraphsArray = data.data.textImageData.paragraphs
      .split('",')
      .map(p => p.trim().replace(/^"|"$/g, '').replace(/\\"/g, '"'));

    const textImageData = {
      leftImage: {
        src: getImageUrl(data.data.textImageData.leftImage.src.url),
        alt: data.data.textImageData.leftImage.alt,
        title: data.data.textImageData.leftImage.title,
        caption: data.data.textImageData.leftImage.caption
      },
      rightImage: {
        src: getImageUrl(data.data.textImageData.rightImage.src.url),
        alt: data.data.textImageData.rightImage.alt,
        title: data.data.textImageData.rightImage.title,
        caption: data.data.textImageData.rightImage.caption
      },
      paragraphs: paragraphsArray
    };

    return { cardImage, textImageData };
  } catch (error) {
    console.error('❌ Error fetching history page data:', error);
    console.warn('⚠️ Using fallback data');
    
    // Fallback data
    const cardImage: TransformedCardImageData = {
      heroImage: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&q=80&w=1800",
      heading: "HISTORY",
      cardTitle: "OUR HISTORY",
      cardText: "Our history is a story of love, dedication, and the pursuit of perfection.",
      overlayColor: "rgba(0,0,0,0.15)",
      parallaxSpeed: 0.3,
      backgroundColor: "#f9f1f1"
    };

    const textImageData = {
      leftImage: {
        src: "https://images.unsplash.com/photo-1513366208864-87536b8bd7b4?w=800&h=600&fit=crop",
        alt: "Persian cat 1903",
        title: "Persian cat 1903",
        caption: "THE ARISTOMED MOGGAR"
      },
      rightImage: {
        src: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&h=600&fit=crop",
        alt: "Persian cat 2023",
        title: "Persian cat 2023",
        caption: "Tiponi Pluto of De' Ethereal"
      },
      paragraphs: []
    };

    return { cardImage, textImageData };
  }
}

export async function fetchHealthPageData(): Promise<{
  cardImage: TransformedCardImageData;
  textImageData: {
    leftImage: {
      src: string;
      alt: string;
      title: string;
      caption: string;
    };
    rightImage: {
      src: string;
      alt: string;
      title: string;
      caption: string;
    };
    paragraphs: string[];
  };
}> {
  try {
    const apiBaseUrl = getApiBaseUrl();
    const url = `${apiBaseUrl}/api/health-page?populate[cardImageSection][populate][heroImage][fields][0]=url&populate[textImageData][populate][leftImage][populate][src][fields][0]=url&populate[textImageData][populate][rightImage][populate][src][fields][0]=url`;

    const response = await fetch(url, { cache: 'no-store' });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: HealthPageApiResponse = await response.json();

    // Transform CardImage Section
    const cardImage: TransformedCardImageData = {
      heroImage: getImageUrl(data.data.cardImageSection.heroImage.url),
      heading: data.data.cardImageSection.heading || "HEALTH",
      cardTitle: data.data.cardImageSection.cardTitle || "BREEDING FOR HEALTH",
      cardText: data.data.cardImageSection.cardText || "",
      overlayColor: data.data.cardImageSection.overlayColor || "rgba(0,0,0,0.2)",
      parallaxSpeed: parseFloat(data.data.cardImageSection.parallaxSpeed) || 0.25,
      backgroundColor: data.data.cardImageSection.backgroundColor || "#EAF7E7"
    };

    // Transform TextImage Section
    // Parse paragraphs from the string format (comma-separated with quotes)
    const paragraphsArray = data.data.textImageData.paragraphs
      .split('",')
      .map(p => p.trim().replace(/^"|"$/g, '').replace(/\\"/g, '"'));

    const textImageData = {
      leftImage: {
        src: getImageUrl(data.data.textImageData.leftImage.src.url),
        alt: data.data.textImageData.leftImage.alt,
        title: data.data.textImageData.leftImage.title,
        caption: data.data.textImageData.leftImage.caption
      },
      rightImage: {
        src: getImageUrl(data.data.textImageData.rightImage.src.url),
        alt: data.data.textImageData.rightImage.alt,
        title: data.data.textImageData.rightImage.title,
        caption: data.data.textImageData.rightImage.caption
      },
      paragraphs: paragraphsArray
    };

    return { cardImage, textImageData };
  } catch (error) {
    console.error('❌ Error fetching health page data:', error);
    console.warn('⚠️ Using fallback data');
    
    // Fallback data
    const cardImage: TransformedCardImageData = {
      heroImage: "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&q=80&w=1800",
      heading: "HEALTH",
      cardTitle: "BREEDING FOR HEALTH",
      cardText: "Health is our top priority. We follow strict, veterinarian-advised protocols to safeguard the well-being of our kings, queens, and kittens.",
      overlayColor: "rgba(0,0,0,0.2)",
      parallaxSpeed: 0.25,
      backgroundColor: "#EAF7E7"
    };

    const textImageData = {
      leftImage: {
        src: "https://images.unsplash.com/photo-1555680209-51b6ecfa0db9?w=900&h=700&fit=crop",
        alt: "Vet checking a cat",
        title: "Routine Veterinary Care",
        caption: "Regular wellness exams and preventative screening"
      },
      rightImage: {
        src: "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?w=900&h=700&fit=crop",
        alt: "Clean cattery environment",
        title: "Clean, Stress‑Reduced Housing",
        caption: "Sanitation protocols and calm socialization"
      },
      paragraphs: []
    };

    return { cardImage, textImageData };
  }
}

export async function fetchRecipePageData(): Promise<{
  cardImage: TransformedCardImageData;
  recipeData: {
    title: string;
    subtitle: string;
    recipeText: string;
    bg: string;
    ingredients: Array<{
      name: string;
      amount?: string;
      note?: string;
    }>;
    tips: string[];
  };
}> {
  try {
    const apiBaseUrl = getApiBaseUrl();
    const url = `${apiBaseUrl}/api/recipe-page?populate[cardImageSection][populate][heroImage][fields][0]=url&populate[ingredients][populate]=*&populate[tips][populate]=*`;

    const response = await fetch(url, { cache: 'no-store' });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: RecipePageApiResponse = await response.json();

    // Transform CardImage Section
    const cardImage: TransformedCardImageData = {
      heroImage: getImageUrl(data.data.cardImageSection.heroImage.url),
      heading: data.data.cardImageSection.heading || "RECIPE",
      cardTitle: data.data.cardImageSection.cardTitle || "NUTRITION & RECIPE",
      cardText: data.data.cardImageSection.cardText || "",
      overlayColor: data.data.cardImageSection.overlayColor || "rgba(0,0,0,0.25)",
      parallaxSpeed: parseFloat(data.data.cardImageSection.parallaxSpeed) || 0.25,
      backgroundColor: data.data.cardImageSection.backgroundColor || "#FFF8EE"
    };

    // Transform Recipe Data
    // Note: API returns ingredients as a single object, but component expects array
    const ingredientsArray = data.data.ingredients ? [
      {
        name: data.data.ingredients.name,
        amount: data.data.ingredients.amount,
        note: data.data.ingredients.note
      }
    ] : [];

    const tipsArray = data.data.tips?.map(tip => tip.tips) || [];

    const recipeData = {
      title: data.data.title || "Starter Kitten Recipe",
      subtitle: data.data.subtitle || "Balanced, gentle and easy to transition",
      recipeText: data.data.recipeText || "",
      bg: data.data.bg || "#FFF8EE",
      ingredients: ingredientsArray,
      tips: tipsArray
    };

    return { cardImage, recipeData };
  } catch (error) {
    console.error('❌ Error fetching recipe page data:', error);
    console.warn('⚠️ Using fallback data');
    
    // Fallback data
    const cardImage: TransformedCardImageData = {
      heroImage: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1800",
      heading: "RECIPE",
      cardTitle: "NUTRITION & RECIPE",
      cardText: "Our kittens thrive on balanced, meat‑forward nutrition.",
      overlayColor: "rgba(0,0,0,0.25)",
      parallaxSpeed: 0.25,
      backgroundColor: "#FFF8EE"
    };

    const recipeData = {
      title: "Starter Kitten Recipe",
      subtitle: "Balanced, gentle and easy to transition",
      recipeText: "Warm wet food to room temperature. Finely mince the cooked meat so there are no large pieces.",
      bg: "#FFF8EE",
      ingredients: [
        { name: "High‑quality wet food (poultry or rabbit)", amount: "70%", note: "primary moisture & protein" }
      ],
      tips: [
        "Transition gradually over 5–7 days to avoid tummy upset.",
        "Provide fresh water at all times; kittens need moisture‑rich diets."
      ]
    };

    return { cardImage, recipeData };
  }
}

export async function fetchDietPageData(): Promise<{
  cardImage: TransformedCardImageData;
  dietData: {
    title: string;
    subtitle: string;
    bg: string;
    coverImage?: string;
    highlights: Array<{
      title: string;
      description: string;
    }>;
    feedingSchedule: Array<{
      label: string;
      detail: string;
    }>;
    dos: string[];
    donts: string[];
  };
}> {
  try {
    const apiBaseUrl = getApiBaseUrl();
    const url = `${apiBaseUrl}/api/diet-page?populate[cardImageSection][populate][heroImage][fields][0]=url&populate[coverImage][fields][0]=url&populate[highlights][populate]=*&populate[feedingSchedule][populate]=*&populate[do][populate]=*&populate[dont][populate]=*`;

    const response = await fetch(url, { cache: 'no-store' });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: DietPageApiResponse = await response.json();

    // Transform CardImage Section
    const cardImage: TransformedCardImageData = {
      heroImage: getImageUrl(data.data.cardImageSection.heroImage.url),
      heading: data.data.cardImageSection.heading || "DIET",
      cardTitle: data.data.cardImageSection.cardTitle || "DIET GUIDELINES",
      cardText: data.data.cardImageSection.cardText || "",
      overlayColor: data.data.cardImageSection.overlayColor || "rgba(0,0,0,0.2)",
      parallaxSpeed: parseFloat(data.data.cardImageSection.parallaxSpeed) || 0.25,
      backgroundColor: data.data.cardImageSection.backgroundColor || "#F4FCFD"
    };

    // Transform Diet Data
    const coverImage = data.data.coverImage?.url 
      ? getImageUrl(data.data.coverImage.url) 
      : "https://images.unsplash.com/photo-1604908554039-913b1b90a44b?auto=format&fit=crop&q=80&w=1600";

    const highlights = data.data.highlights?.map(item => ({
      title: item.title,
      description: item.description
    })) || [];

    // Transform feeding schedule - API returns title/description, component expects label/detail
    const feedingSchedule = data.data.feedingSchedule?.map(item => ({
      label: item.title,
      detail: item.description
    })) || [];

    const dos = data.data.do?.map(item => item.tips) || [];
    const donts = data.data.dont?.map(item => item.tips) || [];

    const dietData = {
      title: data.data.title || "Everyday Diet Guidelines",
      subtitle: data.data.subtitle || "Moisture‑rich, meat‑forward meals for happy Persians",
      bg: data.data.bg || "#F4FCFD",
      coverImage,
      highlights,
      feedingSchedule,
      dos,
      donts
    };

    return { cardImage, dietData };
  } catch (error) {
    console.error('❌ Error fetching diet page data:', error);
    console.warn('⚠️ Using fallback data');
    
    // Fallback data
    const cardImage: TransformedCardImageData = {
      heroImage: "https://images.unsplash.com/photo-1604908554039-913b1b90a44b?auto=format&fit=crop&q=80&w=1800",
      heading: "DIET",
      cardTitle: "DIET GUIDELINES",
      cardText: "A gentle, moisture‑rich diet keeps Persians thriving.",
      overlayColor: "rgba(0,0,0,0.2)",
      parallaxSpeed: 0.25,
      backgroundColor: "#F4FCFD"
    };

    const dietData = {
      title: "Everyday Diet Guidelines",
      subtitle: "Moisture‑rich, meat‑forward meals for happy Persians",
      bg: "#F4FCFD",
      coverImage: "https://images.unsplash.com/photo-1604908554039-913b1b90a44b?auto=format&fit=crop&q=80&w=1600",
      highlights: [
        { title: "Hydration First", description: "Wet food or added water/goat milk supports urinary health." },
        { title: "Meat‑Forward", description: "Protein sources promote muscle growth and vitality." }
      ],
      feedingSchedule: [
        { label: "Kittens (8–16 wks)", detail: "3–4 small wet meals/day; free‑access water" },
        { label: "Adults", detail: "2–3 wet meals/day; optional measured dry as topper" }
      ],
      dos: [
        "Transition new foods slowly over 5–7 days",
        "Keep bowls spotless; replace water daily"
      ],
      donts: [
        "Don't free‑feed rich dry foods to young kittens",
        "Avoid sudden recipe changes"
      ]
    };

    return { cardImage, dietData };
  }
}

export async function fetchVaccinePageData(): Promise<{
  cardImage: TransformedCardImageData;
  vaccineData: {
    sections: Array<{
      title: string;
      paragraphs: string[];
    }>;
    bg: string;
  };
}> {
  try {
    const apiBaseUrl = getApiBaseUrl();
    const url = `${apiBaseUrl}/api/vaccine-page?populate[cardImageSection][populate][heroImage][fields][0]=url&populate[vaccaniesSection][populate]=*`;

    const response = await fetch(url, { cache: 'no-store' });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: VaccinePageApiResponse = await response.json();

    // Transform CardImage Section
    const cardImage: TransformedCardImageData = {
      heroImage: getImageUrl(data.data.cardImageSection.heroImage.url),
      heading: data.data.cardImageSection.heading || "VACCINES",
      cardTitle: data.data.cardImageSection.cardTitle || "CORE & OPTIONAL VACCINES",
      cardText: data.data.cardImageSection.cardText || "",
      overlayColor: data.data.cardImageSection.overlayColor || "rgba(0,0,0,0.25)",
      parallaxSpeed: parseFloat(data.data.cardImageSection.parallaxSpeed) || 0.2,
      backgroundColor: data.data.cardImageSection.backgroundColor || "#EEF5FF"
    };

    // Transform Vaccine Sections
    // API returns paragraphs as comma-separated string, component expects array
    const sections = data.data.vaccaniesSection?.map(section => ({
      title: section.title,
      paragraphs: section.paragraphs
        .split('",')
        .map(p => p.trim().replace(/^"|"$/g, '').replace(/\\"/g, '"'))
    })) || [];

    const vaccineData = {
      sections,
      bg: data.data.bg || "#ffffff"
    };

    return { cardImage, vaccineData };
  } catch (error) {
    console.error('❌ Error fetching vaccine page data:', error);
    console.warn('⚠️ Using fallback data');
    
    // Fallback data
    const cardImage: TransformedCardImageData = {
      heroImage: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1800",
      heading: "VACCINES",
      cardTitle: "CORE & OPTIONAL VACCINES",
      cardText: "Our kittens follow a veterinarian‑guided protocol.",
      overlayColor: "rgba(0,0,0,0.25)",
      parallaxSpeed: 0.2,
      backgroundColor: "#EEF5FF"
    };

    const vaccineData = {
      sections: [
        {
          title: "OUR PROTOCOL & RECOMMENDATION",
          paragraphs: [
            "Vaccinations can be controversial. Some veterinarians begin a kitten series at 8–16 weeks with yearly boosters, while others prefer a measured approach once immunity is established.",
            "At our cattery we follow a veterinarian‑guided plan. We recommend the core FVRCP series with boosters, and rabies only where required by law."
          ]
        }
      ],
      bg: "#ffffff"
    };

    return { cardImage, vaccineData };
  }
}

export async function fetchSpayingAndNeuteringPageData(): Promise<{
  cardImage: TransformedCardImageData;
  paragrafhData: {
    sections: Array<{
      title: string;
      paragraphs: string[];
    }>;
    bg: string;
  };
}> {
  try {
    const apiBaseUrl = getApiBaseUrl();
    const url = `${apiBaseUrl}/api/spayingand-neutering?populate[cardImageSection][populate][heroImage][fields][0]=url&populate[paragrafhData][populate]=*`;

    const response = await fetch(url, { cache: 'no-store' });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: SpayingAndNeuteringPageApiResponse = await response.json();

    // Transform CardImage Section
    const cardImage: TransformedCardImageData = {
      heroImage: getImageUrl(data.data.cardImageSection.heroImage.url),
      heading: data.data.cardImageSection.heading || "SPAYING AND NEUTERING",
      cardTitle: data.data.cardImageSection.cardTitle || "RESPONSIBLE SURGERY PROTOCOL",
      cardText: data.data.cardImageSection.cardText || "",
      overlayColor: data.data.cardImageSection.overlayColor || "rgba(0,0,0,0.25)",
      parallaxSpeed: parseFloat(data.data.cardImageSection.parallaxSpeed) || 0.25,
      backgroundColor: data.data.cardImageSection.backgroundColor || "#F9F1F1"
    };

    // Transform Paragraph Sections
    // API returns paragraphs as comma-separated string, component expects array
    const sections = data.data.paragrafhData?.map(section => ({
      title: section.title,
      paragraphs: section.paragraphs
        .split('",')
        .map(p => p.trim().replace(/^"|"$/g, '').replace(/\\"/g, '"'))
    })) || [];

    const paragrafhData = {
      sections,
      bg: data.data.bg || "#ffffff"
    };

    return { cardImage, paragrafhData };
  } catch (error) {
    console.error('❌ Error fetching spaying and neutering page data:', error);
    console.warn('⚠️ Using fallback data');
    
    // Fallback data
    const cardImage: TransformedCardImageData = {
      heroImage: "https://images.unsplash.com/photo-1555680209-51b6ecfa0db9?auto=format&fit=crop&q=80&w=1800",
      heading: "SPAYING AND NEUTERING",
      cardTitle: "RESPONSIBLE SURGERY PROTOCOL",
      cardText: "We believe in responsible pet ownership and veterinarian-guided care.",
      overlayColor: "rgba(0,0,0,0.25)",
      parallaxSpeed: 0.25,
      backgroundColor: "#F9F1F1"
    };

    const paragrafhData = {
      sections: [
        {
          title: "THE PROS OF SPAYING & NEUTERING",
          paragraphs: [
            "Spaying and neutering before sexual maturity brings notable health and behavior benefits. Females are protected from pyometra and drastically reduced risk of certain cancers; males avoid testicular cancer."
          ]
        }
      ],
      bg: "#ffffff"
    };

    return { cardImage, paragrafhData };
  }
}

export async function fetchProductsRecommendPageData(): Promise<{
  cardImage: TransformedCardImageData;
  productsData: {
    sections: Array<{
      heading: string;
      categories: Array<{
        title: string;
        products: Array<{
          imageSrc: string;
          imageAlt: string;
          title: string;
          bullets?: string[];
          cta?: {
            label: string;
            href: string;
          };
        }>;
      }>;
    }>;
    cardsPerRow: 1 | 2 | 3;
    cardBg: string;
    accentDividerColor: string;
  };
}> {
  try {
    const apiBaseUrl = getApiBaseUrl();
    const url = `${apiBaseUrl}/api/products-recommed?populate[cardImageSection][populate][heroImage][fields][0]=url&populate[recommendedProductsData][populate][categories][populate][products][populate][imageSrc][fields][0]=url&populate[recommendedProductsData][populate][categories][populate][products][populate][bullets][populate]=*`;

    const response = await fetch(url, { cache: 'no-store' });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ProductsRecommendPageApiResponse = await response.json();

    // Transform CardImage Section
    const cardImage: TransformedCardImageData = {
      heroImage: getImageUrl(data.data.cardImageSection.heroImage.url),
      heading: data.data.cardImageSection.heading || "RECOMMENDED PRODUCTS",
      cardTitle: data.data.cardImageSection.cardTitle || "ESSENTIAL PRODUCTS FOR YOUR KITTEN",
      cardText: data.data.cardImageSection.cardText || "",
      overlayColor: data.data.cardImageSection.overlayColor || "rgba(0,0,0,0.25)",
      parallaxSpeed: parseFloat(data.data.cardImageSection.parallaxSpeed) || 0.25,
      backgroundColor: data.data.cardImageSection.backgroundColor || "#FFF8EE"
    };

    // Transform Products Data
    // API returns single recommendedProductsData, component expects sections array
    const placeholderProductImage = "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=900&h=700";

    const section = {
      heading: data.data.recommendedProductsData.heading,
      categories: data.data.recommendedProductsData.categories.map(category => ({
        title: category.title,
        products: category.products.map(product => ({
          imageSrc: product.imageSrc?.url ? getImageUrl(product.imageSrc.url) : placeholderProductImage,
          imageAlt: product.imageAlt,
          title: product.title,
          bullets: product.bullets?.map(bullet => bullet.text).filter(Boolean) || [],
          cta: { label: "SHOP NOW", href: "#" } // CTA'yı default olarak ekliyorum
        }))
      }))
    };

    const productsData = {
      sections: [section], // Single section'ı array içinde gönderiyoruz
      cardsPerRow: (data.data.cardsPerRow as 1 | 2 | 3) || 2,
      cardBg: data.data.cardBg || "#ffffff",
      accentDividerColor: data.data.accentDividerColor || "#E5E7EB"
    };

    return { cardImage, productsData };
  } catch (error) {
    console.error('❌ Error fetching products recommend page data:', error);
    console.warn('⚠️ Using fallback data');
    
    // Fallback data
    const cardImage: TransformedCardImageData = {
      heroImage: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&q=80&w=1800",
      heading: "RECOMMENDED PRODUCTS",
      cardTitle: "ESSENTIAL PRODUCTS FOR YOUR KITTEN",
      cardText: "We've curated a selection of high-quality products.",
      overlayColor: "rgba(0,0,0,0.25)",
      parallaxSpeed: 0.25,
      backgroundColor: "#FFF8EE"
    };

    const productsData = {
      sections: [
        {
          heading: "HYDRATION",
          categories: [
            {
              title: "Drinking Fountains",
              products: [
                {
                  imageSrc: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=900&h=700&fit=crop",
                  imageAlt: "Ceramic drinking fountain",
                  title: "Drinkwell Seascape Ceramic",
                  bullets: ["Dishwasher‑safe glazed ceramic", "Dual waterfall with replaceable filters"],
                  cta: { label: "SHOP NOW", href: "#" }
                }
              ]
            }
          ]
        }
      ],
      cardsPerRow: 2 as 1 | 2 | 3,
      cardBg: "#ffffff",
      accentDividerColor: "#E5E7EB"
    };

    return { cardImage, productsData };
  }
}

export async function fetchHeroesData(): Promise<{
  siteTitle: string;
  phoneNumber: string;
}> {
  try {
    const apiBaseUrl = getApiBaseUrl();
    const url = `${apiBaseUrl}/api/heroes?populate=*`;

    const response = await fetchWithTimeout(url, { cache: 'no-store' });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, response: ${errorText.substring(0, 200)}`);
    }

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      throw new Error(`Expected JSON but got ${contentType}. Response: ${text.substring(0, 200)}`);
    }

    const data: HeroesApiResponse = await response.json();

    // Get the first hero item (usually there's only one)
    const hero = data.data?.[0];

    const result = {
      siteTitle: hero?.title || "Ethereal Persians",
      phoneNumber: hero?.phone || "(941) 822-4016"
    };

    return result;
  } catch (error) {
    console.error('❌ Error fetching heroes data:', error);
    console.warn('⚠️ Using fallback data');
    
    // Fallback data
    return {
      siteTitle: "Ethereal Persians",
      phoneNumber: "(941) 822-4016"
    };
  }
}
