import { HomepageApiResponse, TransformedHeroData } from '@/types/api';

const API_BASE_URL = 'http://127.0.0.1:1337';

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
  const { heroContent } = apiData.data;
  
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
