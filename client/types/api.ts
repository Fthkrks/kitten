// Simplified Strapi Image (only url field)
interface StrapiImage {
  id: number;
  documentId: string;
  url: string;
}

// Full Strapi Image (with all fields)
interface StrapiImageFull {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: {
    thumbnail?: {
      url: string;
    };
    small?: {
      url: string;
    };
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
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

// Kitten Section (for Homepage API)
interface KittenImageData {
  id: number;
  alt: string;
  src: StrapiImageFull;
}

interface KittensDataHomepage {
  id: number;
  title: string | null;
  image: KittenImageData;
}

interface KittenSectionHomepage {
  id: number;
  title: string;
  buttonText: string;
  Kittens: KittensDataHomepage;
}

// Adults Section (for Homepage API)
interface AdultCatItemHomepage {
  id: number;
  title: string;
  buttonText: string;
  image: {
    id: number;
    alt: string;
    src: StrapiImageFull;
  };
}

interface AdultsSectionHomepage {
  id: number;
  title: string;
  cats: AdultCatItemHomepage[];
}

// Comment Section (for Homepage API)
interface CommentFeatureItemHomepage {
  id: number;
  title: string;
  image: {
    id: number;
    alt: string;
    src: StrapiImageFull;
  };
}

interface CommentSectionHomepage {
  id: number;
  title: string;
  description: string;
  features: CommentFeatureItemHomepage[];
}

// Special Section (for Homepage API)
interface SpecialFeatureItemHomepage {
  id: number;
  number: string;
  title: string;
  description: string;
  buttonText: string;
  imagePosition: "left" | "right";
  image: {
    id: number;
    alt: string;
    src: StrapiImageFull;
  };
}

interface SpecialSectionHomepage {
  id: number;
  title: string;
  features: SpecialFeatureItemHomepage[];
}

// Galeries Section (for Homepage API)
interface GaleriesImageHomepage {
  id: number;
  alt: string;
  src: StrapiImageFull;
}

interface GaleriesSectionHomepage {
  id: number;
  title: string;
  mainText: string;
  browsingText: string;
  eyeCandyText: string;
  buttonText: string;
  images: GaleriesImageHomepage[];
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
    heroContent?: HeroContent;
    KittenSection?: KittenSectionHomepage;
    AdultsSection?: AdultsSectionHomepage;
    CommentSection?: CommentSectionHomepage;
    SpecialSection?: SpecialSectionHomepage;
    GaleriesSection?: GaleriesSectionHomepage;
    TestiomonialSection?: TestimonialSectionHomepage;
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

// Transformed data for Kitten component
export interface TransformedKittenData {
  title: string;
  kittens: {
    id: string;
    name: string;
    mobileTitle?: string;
    image: {
      src: string;
      alt: string;
    };
  }[];
  buttonText: string;
}

// Transformed data for Adults component
export interface TransformedAdultsData {
  title: string;
  cats: {
    id: string;
    title: string;
    image: {
      src: string;
      alt: string;
    };
    buttonText: string;
  }[];
}

// Transformed data for Comments component
export interface TransformedCommentsData {
  title: string;
  description: string;
  features: {
    id: string;
    title: string;
    icon: {
      src: string;
      alt: string;
    };
  }[];
}

// Transformed data for Special component
export interface TransformedSpecialData {
  title: string;
  features: {
    id: string;
    number: string;
    title: string;
    description: string;
    buttonText: string;
    image: {
      src: string;
      alt: string;
    };
    imagePosition: "left" | "right";
  }[];
}

// Transformed data for Galeries component
export interface TransformedGaleriesData {
  title: string;
  description: {
    mainText: string;
    browsingText: string;
    eyeCandyText: string;
  };
  buttonText: string;
  images: {
    id: string;
    src: string;
    alt: string;
  }[];
}

// Testimonial Section (for Homepage API)
interface TestimonialItemHomepage {
  id: number;
  titleLines: string;
  body: string;
  author: string;
  location: string;
  cats: string;
  image: {
    id: number;
    documentId: string;
    url: string;
  };
  avatarImage: {
    id: number;
    alt: string;
    src: {
      id: number;
      documentId: string;
      url: string;
    };
  };
}

interface TestimonialSectionHomepage {
  id: number;
  subtitle: string;
  title: string;
  testimonials: TestimonialItemHomepage[];
}

// Transformed data for Testimonial component
export interface TransformedTestimonialData {
  subtitle: string;
  title: string;
  testimonials: {
    id: string;
    titleLines: string[];
    body: string;
    author: string;
    location: string;
    cats: string;
    image: string;
    avatarImage: {
      src: string;
      alt: string;
    };
  }[];
}

// Media Links API Response
interface MediaSocialLink {
  id: number;
  name: string;
  href: string;
  icon: StrapiImageFull;
}

interface MediaLinkItem {
  id: number;
  documentId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  SocialLinks: MediaSocialLink[];
}

export interface MediaLinksApiResponse {
  data: MediaLinkItem[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Transformed data for Media component
export interface TransformedMediaData {
  title: string;
  socialLinks: {
    id: string;
    name: string;
    href: string;
    icon: string;
  }[];
}

// Marketing Links (Video Gallery) API Response
interface MarketingLinkItem {
  id: number;
  alt: string;
  label: string;
  href: string;
  src: StrapiImageFull | null;
}

interface MarketingLinkData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  items: MarketingLinkItem[];
}

export interface MarketingLinksApiResponse {
  data: MarketingLinkData[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Transformed data for Video Gallery component
export interface TransformedVideoData {
  items: {
    id: string;
    src: string;
    alt: string;
    href: string;
    labels?: string[];
  }[];
}

// Available Kitten Page API Response
interface CardImageSection {
  id: number;
  heading: string;
  cardTitle: string;
  cardText: string;
  overlayColor: string;
  parallaxSpeed: string;
  backgroundColor: string;
  heroImage: StrapiImageFull;
}

interface PetCardAlbumImage {
  id: number;
  alt: string;
  src: {
    id: number;
    documentId: string;
    url: string;
  };
}

interface PetCardItem {
  id: number;
  name: string;
  age: string;
  gender: string;
  reserved: boolean | null;
  detailBg: string;
  dob: string;
  coatType: string;
  faceType: string;
  weight: string;
  coatColor: string;
  eyeColor: string;
  shading: string;
  breed: string;
  image: Array<{
    id: number;
    documentId: string;
    url: string;
  }>;
  albumImages: PetCardAlbumImage[];
}

interface AdultsAvaibleSection {
  id: number;
  title: string;
  description: string;
  buttonText: string;
}

export interface AvailableKittenPageApiResponse {
  data: {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    cardImageSection?: CardImageSection;
    PetCards?: PetCardItem[];
    AdultsAvaible?: AdultsAvaibleSection;
  };
  meta: {};
}

// Transformed data for AdultsAvaible component
export interface TransformedAdultsAvaibleData {
  title: string;
  description: string;
  buttonText: string;
}

// Transformed data for CardImage component
export interface TransformedCardImageData {
  heroImage: string;
  heading: string;
  cardTitle: string;
  cardText: string;
  overlayColor: string;
  parallaxSpeed: number;
  backgroundColor: string;
}

// Transformed data for PetCards component
export interface TransformedPetCardData {
  id: string;
  name: string;
  age: string;
  gender: string;
  reserved: boolean;
  image: string;
  detailBg: string;
  dob: string;
  coatType: string;
  faceType: string;
  weight: string;
  coatColor: string;
  eyeColor: string;
  shading: string;
  breed: string;
  albumImages: Array<{
    src: string;
    alt: string;
  }>;
}
