import { HomepageApiResponse, TransformedHeroData, TransformedKittenData, TransformedAdultsData, TransformedCommentsData, TransformedSpecialData, TransformedGaleriesData, TransformedTestimonialData, MediaLinksApiResponse, TransformedMediaData, MarketingLinksApiResponse, TransformedVideoData, AvailableKittenPageApiResponse, TransformedCardImageData, TransformedPetCardData, TransformedAdultsAvaibleData } from '@/types/api';

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
const getImageUrl = (url: string) => {
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
  const url = `${API_BASE_URL}/api/avaible-kitten-page?populate[cardImageSection][populate]=heroImage`;
  
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
  const url = `${API_BASE_URL}/api/avaible-kitten-page?populate[PetCards][populate][image][fields][0]=url&populate[PetCards][populate][albumImages][populate][src][fields][0]=url`;
  
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
      albumImages: albumImages
    };
  }).filter(pet => pet !== null) as TransformedPetCardData[];

  return petCards;
}

export async function fetchPetById(id: string): Promise<TransformedPetCardData | null> {
  const url = `${API_BASE_URL}/api/avaible-kitten-page?populate[PetCards][populate][image][fields][0]=url&populate[PetCards][populate][albumImages][populate][src][fields][0]=url`;
  
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
  const url = `${API_BASE_URL}/api/avaible-kitten-page?populate[AdultsAvaible][populate]=*`;
  
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
