// Simplified Strapi Image (only url field)
interface StrapiImage {
  id: number;
  documentId: string;
  url: string;
}

// About Section
interface AboutSection {
  id: number;
  greeting: string;
  introduction: string;
  listItems: string; // This comes as a string with \n separators from API
  conclusion: string;
  buttonText: string;
}

// Hero Content
interface HeroContent {
  id: number;
  welcomeText: string;
  title: string;
  motto: string;
  description: string;
  heroImage: StrapiImage;
  logo: StrapiImage;
  collageImage1: StrapiImage;
  collageImage2: StrapiImage;
  collageImage3: StrapiImage;
  aboutSection: AboutSection;
}

// Main API Response
export interface HomepageApiResponse {
  data: {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    heroContent: HeroContent;
  };
  meta: {};
}

// Transformed data for Hero component (matches existing HeroProps)
export interface TransformedHeroData {
  heroImage: {
    src: string;
    alt: string;
  };
  logo: {
    src: string;
    alt: string;
  };
  welcomeText: string;
  title: string;
  motto: string;
  description: string;
  collageImages: {
    image1: { src: string; alt: string };
    image2: { src: string; alt: string };
    image3: { src: string; alt: string };
  };
  aboutSection: {
    greeting: string;
    introduction: string;
    listItems: string[];
    conclusion: string;
    buttonText: string;
  };
}
