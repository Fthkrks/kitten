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

// Transformed data for Popular component
export interface TransformedPopularData {
  title: string;
  items: {
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
  price?: string;
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

// Terms Page API Response
interface TermsSection {
  id: number;
  heading: string;
  content: string;
}

interface TermsContent {
  id: number;
  title: string;
  sections: TermsSection[];
}

interface TermsCardImageSection {
  id: number;
  heroImage: {
    id: number;
    documentId: string;
    url: string;
  };
  heading: string;
  cardTitle: string;
  cardText: string;
  overlayColor: string;
  parallaxSpeed: number;
  backgroundColor: string;
}

export interface TermsPageApiResponse {
  data: {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    cardImageSection?: TermsCardImageSection;
    TermsSection?: TermsContent;
  };
  meta: {};
}

// Transformed data for Terms page
export interface TransformedTermsCardImageData {
  heroImage: string;
  heading: string;
  cardTitle: string;
  cardText: string;
  overlayColor: string;
  parallaxSpeed: number;
  backgroundColor: string;
}

export interface TransformedTermsData {
  title: string;
  sections: Array<{
    heading: string;
    content: string;
  }>;
}

// FAQ Page API Response
interface FaqQuestionsItem {
  id: number;
  question: {
    [key: string]: string; // Question as key, Answer as value
  };
}

interface FaqSectionItem {
  id: number;
  title: string;
  questions: FaqQuestionsItem[];
}

export interface FaqPageApiResponse {
  data: {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    FaqSection?: FaqSectionItem[];
  };
  meta: {};
}

// Transformed data for FAQ page
export interface TransformedFaqSection {
  title: string;
  questions: {
    [key: string]: string;
  };
}

// Kings Page API Response
interface KingSectionItem {
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
  price?: string;
  description: string;
  buttonText: string;
  titleColor: string;
  imagePosition: string;
  image: Array<{
    id: number;
    documentId: string;
    url: string;
  }> | null;
}

interface KingsCardImageSection {
  id: number;
  heading: string;
  cardTitle: string;
  cardText: string;
  overlayColor: string;
  parallaxSpeed: string;
  backgroundColor: string;
  heroImage: {
    id: number;
    documentId: string;
    url: string;
  };
}

export interface KingsPageApiResponse {
  data: {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    cardImageSection?: KingsCardImageSection;
    KingsSection?: KingSectionItem[];
  };
  meta: {};
}

// Transformed data for Kings page
export interface TransformedKingsCardData {
  id: string;
  name: string;
  description: string;
  imageSrc: string;
  cardBackgroundColor: string;
  buttonText: string;
  imageOverlayText: string;
  imagePosition: "left" | "right";
  titleColor: string;
  buttonBackgroundColor: string;
  buttonTextColor: string;
  descriptionTextColor: string;
}

// Queens Page API Response (same structure as Kings)
interface QueenSectionItem {
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
  price?: string;
  description: string;
  buttonText: string;
  titleColor: string;
  imagePosition: string | null;
  image: Array<{
    id: number;
    documentId: string;
    url: string;
  }> | null;
}

interface QueensCardImageSection {
  id: number;
  heading: string;
  cardTitle: string;
  cardText: string;
  overlayColor: string;
  parallaxSpeed: string;
  backgroundColor: string;
  heroImage: {
    id: number;
    documentId: string;
    url: string;
  };
}

export interface QueensPageApiResponse {
  data: {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    cardImageSection?: QueensCardImageSection;
    QueensSection?: QueenSectionItem[];
  };
  meta: {};
}

// Transformed data for Queens page (same as Kings)
export interface TransformedQueensCardData {
  id: string;
  name: string;
  description: string;
  imageSrc: string;
  cardBackgroundColor: string;
  buttonText: string;
  imageOverlayText: string;
  imagePosition: "left" | "right";
  titleColor: string;
  buttonBackgroundColor: string;
  buttonTextColor: string;
  descriptionTextColor: string;
}

// Blog Page API Response
interface BlogAboutItem {
  id: number;
  text: string;
}

interface WhyBlogDataSection {
  id: number;
  imageTopAlt: string;
  aboutTitle: string;
  whyBlogTitle: string;
  whyBlogText: string;
  whyBlogBg: string;
  imageBottomAlt: string;
  topBandColor: string;
  imageTop: {
    id: number;
    documentId: string;
    url: string;
  };
  aboutItems: BlogAboutItem[];
  imageBottom: {
    id: number;
    documentId: string;
    url: string;
  };
}

interface BlogSectionItem {
  id: number;
  categories: string;
  title: string;
  description: string;
  author: string;
  date: string;
  features: boolean | null;
  fullContent: string;
  image: {
    id: number;
    documentId: string;
    url: string;
  } | null;
}

interface BlogCardImageSection {
  id: number;
  heading: string;
  cardTitle: string;
  cardText: string;
  overlayColor: string;
  parallaxSpeed: string;
  backgroundColor: string;
  heroImage: {
    id: number;
    documentId: string;
    url: string;
  };
}

export interface BlogPageApiResponse {
  data: {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    cardImageSection?: BlogCardImageSection;
    BlogSection?: BlogSectionItem[];
    whyBlogData?: WhyBlogDataSection;
  };
  meta: {};
}

// Transformed data for Blog page
export interface TransformedWhyBlogData {
  imageTop: string;
  imageTopAlt: string;
  aboutTitle: string;
  aboutItems: Array<{ text: string }>;
  whyBlogTitle: string;
  whyBlogText: string;
  whyBlogBg: string;
  imageBottom: string;
  imageBottomAlt: string;
  topBandColor: string;
}

export interface TransformedBlogPost {
  id: string;
  categories: string[];
  title: string;
  description: string;
  author: string;
  date: string;
  features: boolean;
  fullContent: string;
  image: string;
}

// Testimonial Page API Types
interface TestimonialHeroSection {
  id: number;
  title: string;
  heading: string;
  description: string;
  closingText: string;
  mapUrl: string;
}

interface TestimonialReviewAvatar {
  id: number;
  documentId: string;
  url: string;
}

interface TestimonialReviewItem {
  id: number;
  name: string;
  timeAgo: string;
  rating: number;
  text: string;
  avatar: TestimonialReviewAvatar | null;
}

interface TestimonialBaseSection {
  id: number;
  ReviewsTitle: string;
  Reviews: TestimonialReviewItem[];
}

export interface TestimonialPageApiResponse {
  data: {
    id: number;
    documentId: string;
    HeroSection: TestimonialHeroSection;
    Base: TestimonialBaseSection[];
  };
}

export interface TransformedTestimonialHeroData {
  title: string;
  mapUrl: string;
  mapTitle: string;
  heading: string;
  description: string;
  closingText: string;
}

export interface TransformedTestimonialReview {
  id: string;
  name: string;
  timeAgo: string;
  rating: number;
  text: string;
  avatar?: string;
}

// Galleries Page API Types
interface GalleryImageItem {
  id: number;
  alt: string;
  src: {
    id: number;
    documentId: string;
    url: string;
    alternativeText?: string;
  };
}

interface GalleryDataItem {
  id: number;
  label: string;
  description: string;
  category: string;
  fullContent: string;
  src: {
    id: number;
    documentId: string;
    url: string;
  } | null;
  images: GalleryImageItem[];
}

interface GalleriesCardImageSection {
  id: number;
  heading: string;
  cardTitle: string;
  cardText: string;
  overlayColor: string;
  parallaxSpeed: string;
  backgroundColor: string;
  heroImage: {
    id: number;
    documentId: string;
    url: string;
  };
}

export interface GalleriesPageApiResponse {
  data: {
    id: number;
    documentId: string;
    cardImageSection: GalleriesCardImageSection;
    GalleriesData: GalleryDataItem[];
  };
}

export interface TransformedGalleryItem {
  id: string;
  label: string;
  description: string;
  category: string;
  fullContent: string;
  coverImage: string;
  images: Array<{
    id: string;
    src: string;
    alt: string;
  }>;
}

// About Us Page API Types
interface AboutUsCardImageSection {
  id: number;
  heading: string;
  cardTitle: string;
  cardText: string;
  overlayColor: string;
  parallaxSpeed: string;
  backgroundColor: string;
  heroImage: {
    id: number;
    documentId: string;
    url: string;
  };
}

interface AboutSection {
  id: number;
  imageAlt: string | null;
  title: string | null;
  paragraph1: string;
  highlightText: string;
  paragraph2: string;
  image: {
    id: number;
    documentId: string;
    url?: string;
  };
}

interface ParaqListItem {
  id: number;
  school: string;
  job: string;
  job2: string;
  job3: string;
}

interface ParaqSection {
  id: number;
  imageAlt: string;
  title: string;
  paragraphs: string;
  listTitle: string;
  image: {
    id: number;
    documentId: string;
    url: string;
  };
  listItems: ParaqListItem[];
}

interface TimeLineEventItem {
  id: number;
  year: string;
  title: string;
  desc: string;
  position: string;
}

interface CardsSectionItem {
  id: number;
  title: string;
  text: string;
  reserve: boolean;
  img: {
    id: number;
    documentId: string;
    url: string;
  };
}

interface FaqQuestionItem {
  id: number;
  question: Record<string, string>;
}

interface FaqSectionItem {
  id: number;
  title: string;
  questions: FaqQuestionItem[];
}

interface ReasonItem {
  id: number;
  number: number;
  text: string;
}

export interface AboutUsPageApiResponse {
  data: {
    id: number;
    documentId: string;
    cardImageSection: AboutUsCardImageSection;
    AboutSection: AboutSection;
    ParaqSection: ParaqSection;
    timeLine?: TimeLineEventItem[];
    CardsSection?: CardsSectionItem[];
    FaqSection?: FaqSectionItem[];
    reasonSection?: ReasonItem[];
  };
}

// History Page API Types
interface HistoryImageItem {
  id: number;
  alt: string;
  title: string;
  caption: string;
  src: {
    id: number;
    documentId: string;
    url: string;
  };
}

interface HistoryTextImageData {
  id: number;
  paragraphs: string;
  leftImage: HistoryImageItem;
  rightImage: HistoryImageItem;
}

export interface HistoryPageApiResponse {
  data: {
    id: number;
    documentId: string;
    cardImageSection: AboutUsCardImageSection;
    textImageData: HistoryTextImageData;
  };
}

// Health Page API Types (same structure as History Page)
export interface HealthPageApiResponse {
  data: {
    id: number;
    documentId: string;
    cardImageSection: AboutUsCardImageSection;
    textImageData: HistoryTextImageData;
  };
}

// Recipe Page API Types
interface RecipeIngredientItem {
  id: number;
  name: string;
  amount: string;
  note: string;
}

interface RecipeTipItem {
  id: number;
  tips: string;
}

export interface RecipePageApiResponse {
  data: {
    id: number;
    documentId: string;
    title: string;
    subtitle: string;
    recipeText: string;
    bg: string;
    cardImageSection: AboutUsCardImageSection;
    ingredients: RecipeIngredientItem;
    tips: RecipeTipItem[];
  };
}

// Diet Page API Types
interface DietHighlightItem {
  id: number;
  title: string;
  description: string;
}

interface DietFeedingScheduleItem {
  id: number;
  title: string;
  description: string;
}

interface DietTipItem {
  id: number;
  tips: string;
}

export interface DietPageApiResponse {
  data: {
    id: number;
    documentId: string;
    title: string;
    subtitle: string;
    bg: string;
    cardImageSection: AboutUsCardImageSection;
    coverImage?: {
      id: number;
      documentId: string;
      url: string;
    };
    highlights: DietHighlightItem[];
    feedingSchedule: DietFeedingScheduleItem[];
    do: DietTipItem[];
    dont: DietTipItem[];
  };
}

// Vaccine Page API Types
interface VaccineSectionItem {
  id: number;
  title: string;
  paragraphs: string;
}

export interface VaccinePageApiResponse {
  data: {
    id: number;
    documentId: string;
    bg: string;
    cardImageSection: AboutUsCardImageSection;
    vaccaniesSection: VaccineSectionItem[];
  };
}

// Spaying and Neutering Page API Types
interface SpayingParagraphItem {
  id: number;
  title: string;
  paragraphs: string;
}

export interface SpayingAndNeuteringPageApiResponse {
  data: {
    id: number;
    documentId: string;
    bg: string;
    cardImageSection: AboutUsCardImageSection;
    paragrafhData: SpayingParagraphItem[];
  };
}

// Products Recommend Page API Types
interface ProductBulletItem {
  id: number;
  text: string;
}

interface ProductItem {
  id: number;
  imageAlt: string;
  title: string;
  imageSrc?: {
    id: number;
    documentId: string;
    url: string;
  };
  bullets?: ProductBulletItem[];
}

interface ProductCategoryItem {
  id: number;
  title: string;
  products: ProductItem[];
}

interface RecommendedProductsDataItem {
  id: number;
  heading: string;
  categories: ProductCategoryItem[];
}

export interface ProductsRecommendPageApiResponse {
  data: {
    id: number;
    documentId: string;
    cardsPerRow: number;
    cardBg: string;
    accentDividerColor: string;
    cardImageSection: AboutUsCardImageSection;
    recommendedProductsData: RecommendedProductsDataItem;
  };
}

// Heroes API Types (for Header)
interface HeroItem {
  id: number;
  documentId: string;
  title: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface HeroesApiResponse {
  data: HeroItem[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
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
  price?: string;
  albumImages: Array<{
    src: string;
    alt: string;
  }>;
}
