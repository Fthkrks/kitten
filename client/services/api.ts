import { HomepageApiResponse, TransformedHeroData, TransformedKittenData, TransformedAdultsData, TransformedCommentsData, TransformedSpecialData, TransformedGaleriesData, TransformedTestimonialData, MediaLinksApiResponse, TransformedMediaData, MarketingLinksApiResponse, TransformedVideoData, AvailableKittenPageApiResponse, TransformedCardImageData, TransformedPetCardData, TransformedAdultsAvaibleData, TermsPageApiResponse, TransformedTermsCardImageData, TransformedTermsData, FaqPageApiResponse, TransformedFaqSection, KingsPageApiResponse, TransformedKingsCardData, QueensPageApiResponse, TransformedQueensCardData, BlogPageApiResponse, TransformedWhyBlogData, TransformedBlogPost } from '@/types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:1337';

export async function fetchHeroData(): Promise<TransformedHeroData> {
  const url = `${API_BASE_URL}/api/homepage?populate[heroContent][populate][heroImage][fields][0]=url&populate[heroContent][populate][logo][fields][0]=url&populate[heroContent][populate][collageImage1][fields][0]=url&populate[heroContent][populate][collageImage2][fields][0]=url&populate[heroContent][populate][collageImage3][fields][0]=url&populate[heroContent][populate][aboutSection][populate]=*`;
  
  console.log('🔍 Fetching hero data from:', url);
  
  try {
    const response = await fetch(url, {
      cache: 'no-store', // Always fetch fresh data
    });

    console.log('📡 Response status:', response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: HomepageApiResponse = await response.json();
    console.log('📦 Raw API data:', JSON.stringify(data, null, 2));
    
    // Transform API data to match Hero component props
    const transformedData = transformHeroData(data);
    console.log('🔄 Transformed data:', JSON.stringify(transformedData, null, 2));
    
    return transformedData;
  } catch (error) {
    console.error('❌ Error fetching hero data:', error);
    throw error;
  }
}

function transformHeroData(apiData: HomepageApiResponse): TransformedHeroData {
  const heroContent = apiData.data.heroContent;
  
  if (!heroContent) {
    throw new Error('heroContent not found in API response');
  }
  
  // Helper function to get full image URL
  const getImageUrl = (url: string) => {
    return url.startsWith('http') ? url : `${API_BASE_URL}${url}`;
  };

  // Transform listItems from string with \n separators to array
  const listItems = heroContent.aboutSection.listItems
    .split('\n')
    .map(item => item.trim())
    .filter(item => item.length > 0);

  return {
    heroImage: {
      src: getImageUrl(heroContent.heroImage.url),
      alt: "Hero Image" // Default alt text since API doesn't provide it
    },
    logo: {
      src: getImageUrl(heroContent.logo.url),
      alt: "Logo" // Default alt text since API doesn't provide it
    },
    welcomeText: heroContent.welcomeText,
    title: heroContent.title,
    motto: heroContent.motto,
    description: heroContent.description,
    collageImages: {
      image1: {
        src: getImageUrl(heroContent.collageImage1.url),
        alt: "Collage Image 1" // Default alt text since API doesn't provide it
      },
      image2: {
        src: getImageUrl(heroContent.collageImage2.url),
        alt: "Collage Image 2" // Default alt text since API doesn't provide it
      },
      image3: {
        src: getImageUrl(heroContent.collageImage3.url),
        alt: "Collage Image 3" // Default alt text since API doesn't provide it
      }
    },
    aboutSection: {
      greeting: heroContent.aboutSection.greeting,
      introduction: heroContent.aboutSection.introduction,
      listItems: listItems,
      conclusion: heroContent.aboutSection.conclusion.trim(),
      buttonText: heroContent.aboutSection.buttonText.trim()
    }
  };
}

// Helper function to get full image URL
const getImageUrl = (url: string | undefined | null): string => {
  if (!url) {
    return 'https://images.unsplash.com/photo-1548247416-ec66f4900b2e?auto=format&fit=crop&q=80&w=800';
  }
  return url.startsWith('http') ? url : `${API_BASE_URL}${url}`;
};

export async function fetchKittenData(): Promise<TransformedKittenData> {
  const url = `${API_BASE_URL}/api/homepage?populate[KittenSection][populate][Kittens][populate][image][populate]=*`;
  
  console.log('🔍 Fetching kitten data from:', url);
  
  try {
    const response = await fetch(url, {
      cache: 'no-store', // Always fetch fresh data
    });

    console.log('📡 Response status:', response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: HomepageApiResponse = await response.json();
    console.log('📦 Raw Kitten API data:', JSON.stringify(data, null, 2));
    
    // Transform API data to match Kitten component props
    const transformedData = transformKittenData(data);
    console.log('🔄 Transformed kitten data:', JSON.stringify(transformedData, null, 2));
    
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
  const url = `${API_BASE_URL}/api/homepage?populate[AdultsSection][populate][cats][populate][image][populate]=src`;
  
  console.log('🔍 Fetching adults data from:', url);
  
  try {
    const response = await fetch(url, {
      cache: 'no-store', // Always fetch fresh data
    });

    console.log('📡 Response status:', response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: HomepageApiResponse = await response.json();
    console.log('📦 Raw Adults API data:', JSON.stringify(data, null, 2));
    
    // Transform API data to match Adults component props
    const transformedData = transformAdultsData(data);
    console.log('🔄 Transformed adults data:', JSON.stringify(transformedData, null, 2));
    
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
  const url = `${API_BASE_URL}/api/homepage?populate[CommentSection][populate][features][populate][image][populate]=src`;
  
  console.log('🔍 Fetching comments data from:', url);
  
  try {
    const response = await fetch(url, {
      cache: 'no-store', // Always fetch fresh data
    });

    console.log('📡 Response status:', response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: HomepageApiResponse = await response.json();
    console.log('📦 Raw Comments API data:', JSON.stringify(data, null, 2));
    
    // Transform API data to match Comments component props
    const transformedData = transformCommentsData(data);
    console.log('🔄 Transformed comments data:', JSON.stringify(transformedData, null, 2));
    
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
  const url = `${API_BASE_URL}/api/homepage?populate[SpecialSection][populate][features][populate][image][populate]=src`;
  
  console.log('🔍 Fetching special data from:', url);
  
  try {
    const response = await fetch(url, {
      cache: 'no-store', // Always fetch fresh data
    });

    console.log('📡 Response status:', response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: HomepageApiResponse = await response.json();
    console.log('📦 Raw Special API data:', JSON.stringify(data, null, 2));
    
    // Transform API data to match Special component props
    const transformedData = transformSpecialData(data);
    console.log('🔄 Transformed special data:', JSON.stringify(transformedData, null, 2));
    
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
  const url = `${API_BASE_URL}/api/homepage?populate[GaleriesSection][populate][images][populate]=src`;
  
  console.log('🔍 Fetching galeries data from:', url);
  
  try {
    const response = await fetch(url, {
      cache: 'no-store', // Always fetch fresh data
    });

    console.log('📡 Response status:', response.status);

    if (!response.ok) {
      console.warn(`⚠️ GaleriesSection API returned status: ${response.status}`);
      console.warn('⚠️ Using fallback data from galeriesData.ts');
      console.info('💡 To fix: Add GaleriesSection to your homepage content type in Strapi');
      const { galeriesData } = require('@/data/galeriesData');
      return galeriesData;
    }

    const data: HomepageApiResponse = await response.json();
    console.log('📦 Raw Galeries API data:', JSON.stringify(data, null, 2));
    
    // Transform API data to match Galeries component props
    const transformedData = transformGaleriesData(data);
    console.log('🔄 Transformed galeries data:', JSON.stringify(transformedData, null, 2));
    
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
  const url = `${API_BASE_URL}/api/homepage?populate[TestiomonialSection][populate][testimonials][populate][image][fields][0]=url&populate[TestiomonialSection][populate][testimonials][populate][avatarImage][populate][src][fields][0]=url`;
  
  console.log('🔍 Fetching testimonial data from:', url);
  
  try {
    const response = await fetch(url, {
      cache: 'no-store', // Always fetch fresh data
    });

    console.log('📡 Response status:', response.status);

    if (!response.ok) {
      console.warn(`⚠️ TestiomonialSection API returned status: ${response.status}`);
      console.warn('⚠️ Using fallback data from testimonialData.ts');
      console.info('💡 To fix: Add TestiomonialSection to your homepage content type in Strapi');
      const { testimonialData } = require('@/data/testimonialData');
      return testimonialData;
    }

    const data: HomepageApiResponse = await response.json();
    console.log('📦 Raw Testimonial API data:', JSON.stringify(data, null, 2));
    
    // Transform API data to match Testimonial component props
    const transformedData = transformTestimonialData(data);
    console.log('🔄 Transformed testimonial data:', JSON.stringify(transformedData, null, 2));
    
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
  const url = `${API_BASE_URL}/api/media-links?populate[SocialLinks][populate]=icon`;
  
  console.log('🔍 Fetching media data from:', url);
  
  try {
    const response = await fetch(url, {
      cache: 'no-store', // Always fetch fresh data
    });

    console.log('📡 Response status:', response.status);

    if (!response.ok) {
      console.warn(`⚠️ Media links API returned status: ${response.status}`);
      console.warn('⚠️ Using fallback data from mediaData.ts');
      console.info('💡 To fix: Add media-links content type in Strapi');
      const { mediaData } = require('@/data/mediaData');
      return mediaData;
    }

    const data: MediaLinksApiResponse = await response.json();
    console.log('📦 Raw Media API data:', JSON.stringify(data, null, 2));
    
    // Transform API data to match Media component props
    const transformedData = transformMediaData(data);
    console.log('🔄 Transformed media data:', JSON.stringify(transformedData, null, 2));
    
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
  const url = `${API_BASE_URL}/api/marketing-links?populate[items][populate]=src`;
  
  console.log('🔍 Fetching video data from:', url);
  
  try {
    const response = await fetch(url, {
      cache: 'no-store', // Always fetch fresh data
    });

    console.log('📡 Response status:', response.status);

    if (!response.ok) {
      console.warn(`⚠️ Marketing links API returned status: ${response.status}`);
      console.warn('⚠️ Using fallback data from videoData.ts');
      console.info('💡 To fix: Add marketing-links content type in Strapi');
      const { videoData } = require('@/data/videoData');
      return videoData;
    }

    const data: MarketingLinksApiResponse = await response.json();
    console.log('📦 Raw Video API data:', JSON.stringify(data, null, 2));
    
    // Transform API data to match Video component props
    const transformedData = transformVideoData(data);
    console.log('🔄 Transformed video data:', JSON.stringify(transformedData, null, 2));
    
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
  const url = `${API_BASE_URL}/api/avaible-kitten-page?populate[PetCards][populate][image][fields][0]=url&populate[PetCards][populate][albumImages][populate][src][fields][0]=url&populate[AdultsAvaible][populate]=*`;
  
  console.log('🔍 Fetching available kitten card image from:', url);
  
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

    console.log('📡 Response status:', response.status);

    if (!response.ok) {
      console.warn(`⚠️ Available kitten page API returned status: ${response.status}`);
      console.warn('⚠️ Using fallback data');
      console.info('💡 To fix: Add avaible-kitten-page content type in Strapi');
      return fallbackData;
    }

    const data: AvailableKittenPageApiResponse = await response.json();
    console.log('📦 Raw Available Kitten Card Image API data:', JSON.stringify(data, null, 2));
    
    // Transform API data
    const transformedData = transformAvailableKittenCardImage(data, fallbackData);
    console.log('🔄 Transformed card image data:', JSON.stringify(transformedData, null, 2));
    
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
  const url = `${API_BASE_URL}/api/avaible-kitten-page?populate[PetCards][populate][image][fields][0]=url&populate[PetCards][populate][albumImages][populate][src][fields][0]=url&populate[AdultsAvaible][populate]=*`;
  
  console.log('🔍 Fetching available kitten pet cards from:', url);
  
  try {
    const response = await fetch(url, {
      cache: 'no-store', // Always fetch fresh data
    });

    console.log('📡 Response status:', response.status);

    if (!response.ok) {
      console.warn(`⚠️ Available kitten pet cards API returned status: ${response.status}`);
      console.warn('⚠️ Using empty array');
      console.info('💡 To fix: Add PetCards to your avaible-kitten-page content type in Strapi');
      return [];
    }

    const data: AvailableKittenPageApiResponse = await response.json();
    console.log('📦 Raw Pet Cards API data:', JSON.stringify(data, null, 2));
    
    // Transform API data
    const transformedData = transformAvailableKittenPetCards(data);
    console.log('🔄 Transformed pet cards data:', JSON.stringify(transformedData, null, 2));
    
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
  const url = `${API_BASE_URL}/api/avaible-kitten-page?populate[PetCards][populate][image][fields][0]=url&populate[PetCards][populate][albumImages][populate][src][fields][0]=url&populate[AdultsAvaible][populate]=*`;
  
  console.log(`🔍 Fetching pet with ID ${id} from:`, url);
  
  try {
    const response = await fetch(url, {
      cache: 'no-store', // Always fetch fresh data
    });

    console.log('📡 Response status:', response.status);

    if (!response.ok) {
      console.warn(`⚠️ Pet API returned status: ${response.status}`);
      return null;
    }

    const data: AvailableKittenPageApiResponse = await response.json();
    console.log('📦 Raw Pet API data:', JSON.stringify(data, null, 2));
    
    // Transform all pets and find the one with matching ID
    const allPets = transformAvailableKittenPetCards(data);
    const pet = allPets.find(p => p.id === id);
    
    if (!pet) {
      console.warn(`⚠️ Pet with ID ${id} not found in API data`);
      return null;
    }
    
    console.log('🔄 Found pet:', JSON.stringify(pet, null, 2));
    return pet;
  } catch (error) {
    console.error('❌ Error fetching pet by ID:', error);
    return null;
  }
}

export async function fetchAdultsAvaibleData(): Promise<TransformedAdultsAvaibleData> {
  const url = `${API_BASE_URL}/api/avaible-kitten-page?populate[PetCards][populate][image][fields][0]=url&populate[PetCards][populate][albumImages][populate][src][fields][0]=url&populate[AdultsAvaible][populate]=*`;
  
  console.log('🔍 Fetching adults available data from:', url);
  
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

    console.log('📡 Response status:', response.status);

    if (!response.ok) {
      console.warn(`⚠️ Adults available API returned status: ${response.status}`);
      console.warn('⚠️ Using fallback data');
      return fallbackData;
    }

    const data: AvailableKittenPageApiResponse = await response.json();
    console.log('📦 Raw Adults Available API data:', JSON.stringify(data, null, 2));
    
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
    
    console.log('🔄 Transformed adults available data:', JSON.stringify(transformedData, null, 2));
    return transformedData;
  } catch (error) {
    console.error('❌ Error fetching adults available data:', error);
    console.warn('⚠️ Using fallback data');
    return fallbackData;
  }
}

export async function fetchTermsPageData(): Promise<{ cardImage: TransformedTermsCardImageData; termsContent: TransformedTermsData }> {
  const url = `${API_BASE_URL}/api/terms-page?populate[cardImageSection][populate][heroImage][fields][0]=url&populate[TermsSection][populate][sections][populate]=*`;
  
  console.log('🔍 Fetching terms page data from:', url);
  
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

    console.log('📡 Response status:', response.status);

    if (!response.ok) {
      console.warn(`⚠️ Terms page API returned status: ${response.status}`);
      console.warn('⚠️ Using fallback data');
      return { cardImage: fallbackCardImage, termsContent: fallbackTermsContent };
    }

    const data: TermsPageApiResponse = await response.json();
    console.log('📦 Raw Terms Page API data:', JSON.stringify(data, null, 2));
    
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
    
    console.log('🔄 Transformed terms page data:', JSON.stringify({ cardImage, termsContent }, null, 2));
    return { cardImage, termsContent };
  } catch (error) {
    console.error('❌ Error fetching terms page data:', error);
    console.warn('⚠️ Using fallback data');
    return { cardImage: fallbackCardImage, termsContent: fallbackTermsContent };
  }
}

export async function fetchFaqData(): Promise<TransformedFaqSection[]> {
  const url = `${API_BASE_URL}/api/faq-page?populate[FaqSection][populate]=*`;
  
  console.log('🔍 Fetching FAQ data from:', url);
  
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

    console.log('📡 Response status:', response.status);

    if (!response.ok) {
      console.warn(`⚠️ FAQ API returned status: ${response.status}`);
      console.warn('⚠️ Using fallback data');
      return fallbackData;
    }

    const data: FaqPageApiResponse = await response.json();
    console.log('📦 Raw FAQ API data:', JSON.stringify(data, null, 2));
    
    // Check if FaqSection exists
    if (!data.data.FaqSection || data.data.FaqSection.length === 0) {
      console.warn('⚠️ FaqSection not found in API, using fallback data');
      return fallbackData;
    }
    
    // Transform FAQ sections
    const transformedData: TransformedFaqSection[] = data.data.FaqSection.map(section => ({
      title: section.title,
      questions: section.questions.question,
    }));
    
    console.log('🔄 Transformed FAQ data:', JSON.stringify(transformedData, null, 2));
    return transformedData;
  } catch (error) {
    console.error('❌ Error fetching FAQ data:', error);
    console.warn('⚠️ Using fallback data');
    return fallbackData;
  }
}

export async function fetchKingsPageData(): Promise<{ cardImage: TransformedCardImageData; kings: TransformedKingsCardData[] }> {
  const url = `${API_BASE_URL}/api/kings-page?populate[cardImageSection][populate][heroImage][fields][0]=url&populate[KingsSection][populate][image][fields][0]=url`;
  
  console.log('🔍 Fetching kings page data from:', url);
  
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

    console.log('📡 Response status:', response.status);

    if (!response.ok) {
      console.warn(`⚠️ Kings page API returned status: ${response.status}`);
      console.warn('⚠️ Using fallback data');
      return { cardImage: fallbackCardImage, kings: fallbackKings };
    }

    const data: KingsPageApiResponse = await response.json();
    console.log('📦 Raw Kings Page API data:', JSON.stringify(data, null, 2));
    
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
    
    console.log('🔄 Transformed kings page data:', JSON.stringify({ cardImage, kings }, null, 2));
    return { cardImage, kings };
  } catch (error) {
    console.error('❌ Error fetching kings page data:', error);
    console.warn('⚠️ Using fallback data');
    return { cardImage: fallbackCardImage, kings: fallbackKings };
  }
}

export async function fetchQueensPageData(): Promise<{ cardImage: TransformedCardImageData; queens: TransformedQueensCardData[] }> {
  const url = `${API_BASE_URL}/api/queens-page?populate[cardImageSection][populate][heroImage][fields][0]=url&populate[QueensSection][populate][image][fields][0]=url`;
  
  console.log('🔍 Fetching queens page data from:', url);
  
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

    console.log('📡 Response status:', response.status);

    if (!response.ok) {
      console.warn(`⚠️ Queens page API returned status: ${response.status}`);
      console.warn('⚠️ Using fallback data');
      return { cardImage: fallbackCardImage, queens: fallbackQueens };
    }

    const data: QueensPageApiResponse = await response.json();
    console.log('📦 Raw Queens Page API data:', JSON.stringify(data, null, 2));
    
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
    
    console.log('🔄 Transformed queens page data:', JSON.stringify({ cardImage, queens }, null, 2));
    return { cardImage, queens };
  } catch (error) {
    console.error('❌ Error fetching queens page data:', error);
    console.warn('⚠️ Using fallback data');
    return { cardImage: fallbackCardImage, queens: fallbackQueens };
  }
}

export async function fetchBlogPageData(): Promise<{ cardImage: TransformedCardImageData; whyBlogData: TransformedWhyBlogData; blogs: TransformedBlogPost[] }> {
  const url = `${API_BASE_URL}/api/blog-page?populate[cardImageSection][populate][heroImage][fields][0]=url&populate[BlogSection][populate][image][fields][0]=url&populate[whyBlogData][populate][imageTop][fields][0]=url&populate[whyBlogData][populate][aboutItems][populate]=*&populate[whyBlogData][populate][imageBottom][fields][0]=url`;
  
  console.log('🔍 Fetching blog page data from:', url);
  
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

    console.log('📡 Response status:', response.status);

    if (!response.ok) {
      console.warn(`⚠️ Blog page API returned status: ${response.status}`);
      console.warn('⚠️ Using fallback data');
      return { cardImage: fallbackCardImage, whyBlogData: fallbackWhyBlogData, blogs: fallbackBlogs };
    }

    const data: BlogPageApiResponse = await response.json();
    console.log('📦 Raw Blog Page API data:', JSON.stringify(data, null, 2));
    
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
            categoriesArray = blog.categories.map(cat => String(cat).trim().toUpperCase());
          }
        }
        
        console.log(`🏷️ Blog ${blog.id} categories:`, blog.categories, '→', categoriesArray);
        
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
    
    console.log('🔄 Transformed blog page data:', JSON.stringify({ cardImage, whyBlogData, blogs }, null, 2));
    return { cardImage, whyBlogData, blogs };
  } catch (error) {
    console.error('❌ Error fetching blog page data:', error);
    console.warn('⚠️ Using fallback data');
    return { cardImage: fallbackCardImage, whyBlogData: fallbackWhyBlogData, blogs: fallbackBlogs };
  }
}
