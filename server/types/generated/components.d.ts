import type { Schema, Struct } from '@strapi/strapi';

export interface BasicAboutData extends Struct.ComponentSchema {
  collectionName: 'components_basic_about_data';
  info: {
    displayName: 'AboutData';
  };
  attributes: {
    highlightText: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Breeding is more than a job and more than a career \u2013 it is a lifestyle.'>;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    imageAlt: Schema.Attribute.String;
    paragraph1: Schema.Attribute.RichText &
      Schema.Attribute.DefaultTo<'Our family is comprised of my hubby \u2013 Jason, our son \u2013 Julian, our german shepherd \u2013 Mishka, and plenty of beloved kitties. Our home is not large but it is very homey. In 2010, Jason and I began a romantic relationship. In 2012, we purchased our first home. In 2015, we began breeding persian cats.'>;
    paragraph2: Schema.Attribute.RichText &
      Schema.Attribute.DefaultTo<'Ethereal Persians Cattery operates in Sarasota, FL within our home. It is not a 9-5 job; it is an all day, every day choice. We choose to breed persian cats because their presence is profoundly therapeutic to our souls and the impact we have on families through our kittens is pawsitively life-altering. Here, cats grace us with their therapeutic presence and we return the favor by making sure they remain safe, happy, and healthy.'>;
    title: Schema.Attribute.String;
  };
}

export interface BasicAboutItemsBlog extends Struct.ComponentSchema {
  collectionName: 'components_basic_about_items_blogs';
  info: {
    displayName: 'aboutItemsBlog';
  };
  attributes: {
    text: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Mother, wife, and prior vet tech'>;
  };
}

export interface BasicAdultsList extends Struct.ComponentSchema {
  collectionName: 'components_basic_adults_lists';
  info: {
    displayName: 'AdultsList';
  };
  attributes: {
    buttonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'MEET THE KINGS '>;
    image: Schema.Attribute.Component<'basic.image', false>;
    title: Schema.Attribute.String & Schema.Attribute.DefaultTo<'The Dads'>;
  };
}

export interface BasicCardContext extends Struct.ComponentSchema {
  collectionName: 'components_basic_card_contexts';
  info: {
    description: 'Hero bile\u015Feni i\u00E7indeki hakk\u0131m\u0131zda b\u00F6l\u00FCm\u00FC i\u00E7in verileri saklar.';
    displayName: 'Card Context';
  };
  attributes: {
    buttonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Learn More'>;
    conclusion: Schema.Attribute.RichText &
      Schema.Attribute.DefaultTo<'Feel free to explore our work and get in touch with us.'>;
    greeting: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Hello there!'>;
    introduction: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'We are a team dedicated to creating amazing experiences.'>;
    listItems: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'- Innovation- Quality- Customer Satisfaction'>;
  };
}

export interface BasicCardImage extends Struct.ComponentSchema {
  collectionName: 'components_basic_card_images';
  info: {
    displayName: 'CardImage';
  };
  attributes: {
    backgroundColor: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'#f9f1f1'>;
    cardText: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Discover our adorable Persian kittens ready for their forever homes. Each kitten is lovingly raised with care, socialized, and comes from our champion bloodlines.'>;
    cardTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'AVAILABLE KITTENS'>;
    heading: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'AVAILABLE KITTEN'>;
    heroImage: Schema.Attribute.Media<'images'>;
    overlayColor: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'rgba(0,0,0,0.15)'>;
    parallaxSpeed: Schema.Attribute.String & Schema.Attribute.DefaultTo<'0.3'>;
  };
}

export interface BasicCardsAbout extends Struct.ComponentSchema {
  collectionName: 'components_basic_cards_abouts';
  info: {
    displayName: 'CardsAbout';
  };
  attributes: {
    img: Schema.Attribute.Media<'images'>;
    reserve: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    text: Schema.Attribute.RichText &
      Schema.Attribute.DefaultTo<'This section is dedicated to my best friend, my confidant, my partner \u2013 Jason Geers. His support has been invaluable in my life and in the growth of Ethereal Persians.   Back in 2015 I imagined I could run Ethereal Persians all by myself. That was naive. There were moments of exhaustion, depression and financial crisis that I could not overcome on my own. Jason helped me overcome incredible challenges and over time it became apparent that running a cattery was a 2 person job (or more; at least for us). In 2022, our cattery became financially sustainable (not lucrative). In response, Jason gave up his career (and income) as a mailman to help grow our dream cattery.  You may recognize his hand in our cat photos or his voice in the background of our videos. What is not as obvious is his role behind the scene. He medicates, feeds and takes care of all physical and many online kitty chores when I am sick, overwhelmed or unable to for any reason. He also specializes in things I don\u2019t, like website management. Jasons encourages me like no ne else can.  He is the glue that keeps me together and the kerosene to my fire!   '>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'A Tribute To Jason: The Kerosene To My Fire'>;
  };
}

export interface BasicCategoriesProducts extends Struct.ComponentSchema {
  collectionName: 'components_basic_categories_products';
  info: {
    displayName: 'categoriesProducts';
  };
  attributes: {
    products: Schema.Attribute.Component<'basic.products', true>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Drinking Fountains'>;
  };
}

export interface BasicDescriptionGalleriHome extends Struct.ComponentSchema {
  collectionName: 'components_basic_description_galleri_homes';
  info: {
    displayName: 'descriptionGalleriHome';
  };
  attributes: {
    browsingText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Just browsing?'>;
    buttonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'VIEW GALLERIES'>;
    eyeCandyText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'We hope our kittens serve as eye candy to make you smile and laugh!'>;
    mainText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'View kittens by color, location, groups and more. Familiarize yourself with the variations so you can help us narrow down your preferences.'>;
  };
}

export interface BasicFaqComponent extends Struct.ComponentSchema {
  collectionName: 'components_basic_faq_components';
  info: {
    displayName: 'faqComponent';
  };
  attributes: {
    questions: Schema.Attribute.Component<'basic.question-faq', true>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'General Questions'>;
  };
}

export interface BasicFeatures extends Struct.ComponentSchema {
  collectionName: 'components_basic_features';
  info: {
    displayName: 'features';
  };
  attributes: {
    image: Schema.Attribute.Component<'basic.image-single', false>;
    title: Schema.Attribute.String & Schema.Attribute.DefaultTo<'fea1'>;
  };
}

export interface BasicFeaturesSpecial extends Struct.ComponentSchema {
  collectionName: 'components_basic_features_specials';
  info: {
    displayName: 'featuresSpecial';
  };
  attributes: {
    buttonText: Schema.Attribute.String & Schema.Attribute.DefaultTo<'HEALTH'>;
    description: Schema.Attribute.RichText &
      Schema.Attribute.DefaultTo<'Health is our top priority. Without good health, heartbreak inevitably ensues. For this reason, we follow strict protocols to ensure the health of our kittens and the happiness of your family.'>;
    image: Schema.Attribute.Component<'basic.image-single', false>;
    imagePosition: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'right'>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'BREEDING FOR HEALTH'>;
  };
}

export interface BasicHighlights extends Struct.ComponentSchema {
  collectionName: 'components_basic_highlights';
  info: {
    displayName: 'highlights';
  };
  attributes: {
    description: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Wet food or added water/goat milk supports urinary health.'>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Hydration First'>;
  };
}

export interface BasicImage extends Struct.ComponentSchema {
  collectionName: 'components_basic_images';
  info: {
    displayName: 'Image';
  };
  attributes: {
    alt: Schema.Attribute.String & Schema.Attribute.DefaultTo<'The Dads'>;
    src: Schema.Attribute.Media<'images'>;
  };
}

export interface BasicImageSingle extends Struct.ComponentSchema {
  collectionName: 'components_basic_image_singles';
  info: {
    displayName: 'imageSingle';
  };
  attributes: {
    alt: Schema.Attribute.String;
    src: Schema.Attribute.Media<'images'>;
  };
}

export interface BasicImagesnotAlt extends Struct.ComponentSchema {
  collectionName: 'components_basic_imagesnot_alts';
  info: {
    displayName: 'ImagesnotAlt';
  };
  attributes: {};
}

export interface BasicIngredients extends Struct.ComponentSchema {
  collectionName: 'components_basic_ingredients';
  info: {
    displayName: 'Ingredients';
  };
  attributes: {
    amount: Schema.Attribute.String & Schema.Attribute.DefaultTo<'70%'>;
    name: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'High\u2011quality wet food (poultry or rabbit)'>;
    note: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'primary moisture & protein'>;
  };
}

export interface BasicKittenList extends Struct.ComponentSchema {
  collectionName: 'components_basic_kitten_lists';
  info: {
    displayName: 'KittenList';
  };
  attributes: {
    image: Schema.Attribute.Component<'basic.image', true>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Breeding Happy, Healthy<br />Purebred Persians'>;
  };
}

export interface BasicLeftImage extends Struct.ComponentSchema {
  collectionName: 'components_basic_left_images';
  info: {
    displayName: 'leftImage';
  };
  attributes: {
    alt: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Persian cat 1903'>;
    caption: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'THE ARISTOMED MOGGAR'>;
    src: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Persian cat 1903'>;
  };
}

export interface BasicMarketingLinksdata extends Struct.ComponentSchema {
  collectionName: 'components_basic_marketing_linksdata';
  info: {
    displayName: 'MarketingLinksdata';
  };
  attributes: {
    alt: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Xena Ming Girl'>;
    href: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#'>;
    label: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Xena, Ming, Girl, Boy1'>;
    src: Schema.Attribute.Media<'images'>;
  };
}

export interface BasicParagData extends Struct.ComponentSchema {
  collectionName: 'components_basic_parag_data';
  info: {
    displayName: 'paragData';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    imageAlt: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Roxy and Cat'>;
    listItems: Schema.Attribute.Component<'basic.text-comp', true>;
    listTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Before becoming a full-time cat breeder Roxy was a:'>;
    paragraphs: Schema.Attribute.RichText &
      Schema.Attribute.DefaultTo<'A lot of \\"About Me\\" pages share how they wanted to be a ______ since they were young. That\'s not my story. I imagined I\'d be a surgeon for large predatory cats in the Africa, not a midwife to tiny fluffy felines in my own home.",       "My story starts in 2015. I had completed my bachelors in biology and planned to pursue a doctorate in veterinary medicine. I visited the Veterinary College at the University of Florida where my first dream shattered. I was quoted 42k a year to attend. I could not afford tuition, let alone moving expenses. So instead I focused on serving the animals closest to me \u2013 dogs and cats. I offered dog sitting services, becoming a pet photographer and eventually a vet tech at a local veterinary hospital. Most importantly, I focused on my deep fascination with breeding and the intricacies it entailed.",       "One of the first things I did after collage was purchase a persian cat for breeding. In December of 2015 I purchased my first persian cat for breeding \u2013 Milo \u2013 a white stud with copper eyes. In 2016 I purchased my first persian female for breeding \u2013 Shaila \u2013 a blue smoke with copper eyes. It didn\'t take long for me to purchase several more breeders; 3 in 2017. By 2018, I had several litters on the ground and had overcome many milestones and officially felt like a crazy cat lady.",       "Looking back at it now, becoming a breeder was a quick choice. The startup cost was attainable, I had the space required and I felt empowered with knowledge. I gathered skills and income as a photographer and dog sitter to purchase my first persians and to grow my cattery. Also, my hubby helped tremendously by keeping us financially afloat while I pursued new passions. Shortly after producing my first litters, I became a veterinary technician to advance my understanding of veterinary medicine; encouraged by heartbreaking medical crises with young kittens.",       "At my busiest point, I was a breeder, a vet tech, a professional photographer and a dogsitter. Juggling all of that and doing it all well was practically impossible. In 2017, I quit dog sitting. In 2019, I quit offering professional photography services. In 2021, I quit my job as a veterinary technician. I have since devoted my entire life to breeding cats. In 2022, my hubby quit his job as a mail man to best support our growing cattery.",       "Today, I am a midwife, nutritionist, groomer, photographer, videographer, animal trainer and CEO of Ethereal Persians; in addition to my personal roles as a devoted mother, wife, daughter and friend to those closest to me. My beloved partner, Jason, is an equal partner with complimentary roles. Over time, we have added team members such as pet nannies, groomers, nutritionists, website designers, and maids to keep up with our workload and to offer the best experience to our beloved owners.",       "Breeding has become a way of life for us. Our priority is first and foremost making sure that each kitten is happy, healthy and that the owners that entrust us do so confidently and are matched appropriately. We are unapologetic in our choice to breed and our goal has always been to lead by example. We cut no corners and we hope you see that, embrace it and support us.",       "If you are here in support, thank you. I hope you find useful content on my site or your next kitten in our hands.'>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Roxy: The Crazy Cat Lady'>;
  };
}

export interface BasicPetsData extends Struct.ComponentSchema {
  collectionName: 'components_basic_pets_data';
  info: {
    displayName: 'PetsData';
  };
  attributes: {
    age: Schema.Attribute.String & Schema.Attribute.DefaultTo<'5'>;
    albumImages: Schema.Attribute.Component<'basic.image', true>;
    breed: Schema.Attribute.String & Schema.Attribute.DefaultTo<'breed'>;
    buttonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'MEET TITAN'>;
    coatColor: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Seal Lynx Point Himalayan'>;
    coatType: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Extreme & Mostly Cotton'>;
    description: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Meet our magnificent Persian kings - the regal fathers of our bloodline. These distinguished gentlemen showcase exceptional breeding, majestic presence, and the noble characteristics that define our royal lineage. KING TITAN stands as a proud example of traditional Persian excellence with his impressive orange tabby coat and commanding presence.'>;
    detailBg: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#E0F2F7'>;
    dob: Schema.Attribute.String & Schema.Attribute.DefaultTo<'June 30, 2024'>;
    eyeColor: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Deep Blue'>;
    faceType: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Extreme'>;
    gender: Schema.Attribute.String & Schema.Attribute.DefaultTo<'female'>;
    image: Schema.Attribute.Media<'images', true>;
    imagePosition: Schema.Attribute.Enumeration<['RIGHT', 'LEFT']>;
    name: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'QUEEN | CRYSTAL'>;
    price: Schema.Attribute.String & Schema.Attribute.DefaultTo<'$4000'>;
    reserved: Schema.Attribute.Boolean;
    shading: Schema.Attribute.String & Schema.Attribute.DefaultTo<'None'>;
    titleColor: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#84adac'>;
    weight: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Currently 5 lbs'>;
  };
}

export interface BasicProducts extends Struct.ComponentSchema {
  collectionName: 'components_basic_products';
  info: {
    displayName: 'products';
  };
  attributes: {
    bullets: Schema.Attribute.Component<'basic.repeat-text', true>;
    imageAlt: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Ceramic drinking fountain'>;
    imageSrc: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Drinkwell Seascape Ceramic'>;
  };
}

export interface BasicQuestionFaq extends Struct.ComponentSchema {
  collectionName: 'components_basic_question_faqs';
  info: {
    displayName: 'QuestionFaq';
  };
  attributes: {
    question: Schema.Attribute.JSON;
  };
}

export interface BasicRecommedProducts extends Struct.ComponentSchema {
  collectionName: 'components_basic_recommed_products';
  info: {
    displayName: 'recommedProducts';
  };
  attributes: {
    categories: Schema.Attribute.Component<'basic.categories-products', true>;
    heading: Schema.Attribute.String & Schema.Attribute.DefaultTo<'HYDRATION'>;
  };
}

export interface BasicRepeatText extends Struct.ComponentSchema {
  collectionName: 'components_basic_repeat_texts';
  info: {
    displayName: 'repeatText';
  };
  attributes: {
    text: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Dishwasher\u2011safe glazed ceramic'>;
  };
}

export interface BasicReviewsComponent extends Struct.ComponentSchema {
  collectionName: 'components_basic_reviews_components';
  info: {
    displayName: 'ReviewsComponent';
  };
  attributes: {
    Reviews: Schema.Attribute.Component<'basic.terminoal-rewiew', true>;
    ReviewsTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'GOOGLE REVIEWS'>;
  };
}

export interface BasicSocialLinks extends Struct.ComponentSchema {
  collectionName: 'components_basic_social_links';
  info: {
    displayName: 'SocialLinks';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#'>;
    icon: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Facebook'>;
  };
}

export interface BasicTerminoalRewiew extends Struct.ComponentSchema {
  collectionName: 'components_basic_terminoal_rewiews';
  info: {
    displayName: 'TerminoalRewiew';
  };
  attributes: {
    avatar: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Ashley Scarpa'>;
    rating: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<5>;
    text: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<"Roxy is such an AMAZING breeder!! I can't tell you how much I love my sweet little one, Violet. She has the best personality, beautiful features, and is the perfect...">;
    timeAgo: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'8 months ago'>;
  };
}

export interface BasicTermsSection extends Struct.ComponentSchema {
  collectionName: 'components_basic_terms_sections';
  info: {
    displayName: 'TermsSection';
  };
  attributes: {
    content: Schema.Attribute.RichText &
      Schema.Attribute.DefaultTo<'Welcome to Ethereal Persians. These terms and conditions outline the rules and regulations for the use of our website and services. By accessing this website, we assume you accept these terms and conditions in full.'>;
    heading: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Introduction'>;
  };
}

export interface BasicTestimonialsData extends Struct.ComponentSchema {
  collectionName: 'components_basic_testimonials_data';
  info: {
    displayName: 'testimonialsData';
  };
  attributes: {
    author: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Catherine F.'>;
    avatarImage: Schema.Attribute.Component<'basic.image-single', false>;
    body: Schema.Attribute.RichText &
      Schema.Attribute.DefaultTo<"I ADORE my ethereal kittens. I am sooo blessed to have them in my life! I got Moshi first and a year later, I got Bambi. I just couldn't keep away. I know I can rely on you to answer all my questions and produce exceptional Persians. They are the sweetest cats and are so beautiful with the most loving personalities. I will always recommend you to my friends looking for a kitten!">;
    cats: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Moshi and Bambi'>;
    image: Schema.Attribute.Media<'images'>;
    location: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Miami, FL'>;
    titleLines: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Thank you, thank you, thank you,", "you!'>;
  };
}

export interface BasicTestimonialsHero extends Struct.ComponentSchema {
  collectionName: 'components_basic_testimonials_heroes';
  info: {
    displayName: 'TestimonialsHero';
  };
  attributes: {
    closingText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<"You don't have to take our word for it, read below what our EP families have to say!">;
    description: Schema.Attribute.RichText &
      Schema.Attribute.DefaultTo<"We're not just selling kittens, we're gaining new family members! Our hearts are filled with grateful meows for our kitten parents. They not only complete the life of our kittens, but they also become a part of our Ethereal family. We hope that if you're in the market for a new furry friend that you take a chance on us and are fortunate enough to experience the wonderful joy of an Ethereal Persian kitten.">;
    heading: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Our Customers Love Us... You Will Too!'>;
    mapUrl: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'https://www.google.com/maps/d/embed?mid=1YOUR_MAP_ID'>;
    title: Schema.Attribute.String & Schema.Attribute.DefaultTo<'TESTIMONIALS'>;
  };
}

export interface BasicTextComp extends Struct.ComponentSchema {
  collectionName: 'components_basic_text_comps';
  info: {
    displayName: 'TextComp';
  };
  attributes: {
    job: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Veterinary Technician'>;
    job2: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Dog Sitter'>;
    job3: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Photographer; families, weddings and pets'>;
    school: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Student at the University of South Florida'>;
  };
}

export interface BasicTextComponent extends Struct.ComponentSchema {
  collectionName: 'components_basic_text_components';
  info: {
    displayName: 'TextComponent';
  };
  attributes: {
    buttonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'SUBMIT A APPLICATION'>;
    description: Schema.Attribute.RichText &
      Schema.Attribute.DefaultTo<'The cats in this section are near and dear to our hearts. They are adults that have served a huge part in our cattery and occasionally some younger cats that we considered keeping to breed but for whatever reason, decided to place as beloved pets. Some may be discounted due to age. Nevertheless, these are our top kitties \u2013 the ones we consider most aesthetically pleasing and with great temperament.'>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'RETIRING ADULTS'>;
  };
}

export interface BasicTextImageData extends Struct.ComponentSchema {
  collectionName: 'components_basic_text_image_data';
  info: {
    displayName: 'TextImageData';
  };
  attributes: {
    leftImage: Schema.Attribute.Component<'basic.left-image', false>;
    rightImage: Schema.Attribute.Component<'basic.left-image', false>;
  };
}

export interface BasicTimelineSection extends Struct.ComponentSchema {
  collectionName: 'components_basic_timeline_sections';
  info: {
    displayName: 'timelineSection';
  };
  attributes: {
    desc: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'e were coworkers at Ace Hardware'>;
    position: Schema.Attribute.Enumeration<['LEFT', 'RIGHT']> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Jason and I Met'>;
    year: Schema.Attribute.String & Schema.Attribute.DefaultTo<'2010'>;
  };
}

export interface BasicTips extends Struct.ComponentSchema {
  collectionName: 'components_basic_tips';
  info: {
    displayName: 'Tips';
  };
  attributes: {
    tips: Schema.Attribute.String;
  };
}

export interface BasicVaccanies extends Struct.ComponentSchema {
  collectionName: 'components_basic_vaccanies';
  info: {
    displayName: 'Vaccanies';
  };
  attributes: {
    paragraphs: Schema.Attribute.RichText &
      Schema.Attribute.DefaultTo<'        "Vaccinations can be controversial. Some veterinarians begin a kitten series at 8\u201316 weeks with yearly boosters, while others prefer a measured approach once immunity is established.",         "At our cattery we follow a veterinarian\u2011guided plan. We recommend the core FVRCP series with boosters, and rabies only where required by law. Decisions about FeLV and other non\u2011core vaccines are made individually based on lifestyle risk.",         "Vaccines should be administered individually whenever possible to reduce the risk of vaccine reactions and to help identify sensitivity if one occurs."'>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'OUR PROTOCOL & RECOMMENDATION'>;
  };
}

export interface BasicWhySelection extends Struct.ComponentSchema {
  collectionName: 'components_basic_why_selections';
  info: {
    displayName: 'WhySelection';
  };
  attributes: {
    number: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<1>;
    text: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'The impact our sweet kittens have on our happiness and that of their new parents'>;
  };
}

export interface DefaultAdults extends Struct.ComponentSchema {
  collectionName: 'components_default_adults';
  info: {
    displayName: 'Adults';
  };
  attributes: {
    cats: Schema.Attribute.Component<'basic.adults-list', true>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'MEET THE KINGS AND QUEENS'>;
  };
}

export interface DefaultBlog extends Struct.ComponentSchema {
  collectionName: 'components_default_blogs';
  info: {
    displayName: 'Blog';
  };
  attributes: {
    author: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Roxy Geers'>;
    categories: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'GROOMING, UNCATEGORIZED'>;
    date: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'March 15, 2024'>;
    description: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'A Breeders Guide For Reducing Tearing in a Cattery A Guideline for Feline Breeders Are you tired of tearing problems in your cattery? Learn proven techniques to minimize tearing in Persian cats through proper care, diet, and environmental management.'>;
    features: Schema.Attribute.Boolean;
    fullContent: Schema.Attribute.RichText &
      Schema.Attribute.DefaultTo<"<p>Tearing is one of the most common concerns among Persian cat breeders. If you're experiencing excessive tearing in your cattery, this comprehensive guide will help you understand the causes and implement effective solutions.</p>          <h2>Understanding the Causes</h2>     <p>Several factors can contribute to excessive tearing in Persian cats:</p>     <ul>       <li><strong>Facial Structure:</strong> The flat-faced (brachycephalic) structure of Persians can cause tear ducts to be compressed, leading to overflow.</li>       <li><strong>Environmental Factors:</strong> Allergens, dust, and irritants can trigger excessive tear production.</li>       <li><strong>Health Issues:</strong> Eye infections, blocked tear ducts, or underlying health conditions can cause persistent tearing.</li>       <li><strong>Diet:</strong> Poor nutrition can affect overall eye health.</li>     </ul>      <h2>Practical Solutions</h2>     <p>Here are proven strategies we've implemented at Ethereal Persians:</p>     <ol>       <li><strong>Regular Grooming:</strong> Clean around the eyes daily with a soft, damp cloth to prevent tear staining.</li>       <li><strong>Air Quality:</strong> Use air purifiers and maintain low humidity levels to reduce allergens.</li>       <li><strong>Nutrition:</strong> Feed high-quality, species-appropriate diets rich in essential nutrients.</li>       <li><strong>Veterinary Care:</strong> Regular check-ups to catch and address eye issues early.</li>       <li><strong>Breeding Selection:</strong> Choose breeding pairs with healthy eye structures and minimal tearing history.</li>     </ol>      <h2>Our Experience</h2>     <p>Through years of breeding, we've learned that consistent care, proper nutrition, and selective breeding can significantly reduce tearing issues. Remember, some tearing is normal, but excessive tearing requires attention and management.</p>      <p>If you're struggling with tearing in your cattery, don't lose hope. With the right approach and dedication, you can minimize this challenge and focus on producing healthy, happy Persian cats.</p>">;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'A Breeders Guide For Reducing Tearing in a Cattery'>;
  };
}

export interface DefaultComment extends Struct.ComponentSchema {
  collectionName: 'components_default_comments';
  info: {
    displayName: 'Comment';
  };
  attributes: {
    description: Schema.Attribute.RichText &
      Schema.Attribute.DefaultTo<"We understand that purchasing a kitten is a huge commitment. That's why we want you to feel confident when selecting a kitten from us. We offer a health guarantee for your peace of mind and continued support after pickup. We pledge to be transparent in our actions and advice so that you can make the right decision for your family. Establishing a great breeder-owner relationship is at the heart of our business. We will do everything in our power to make your experience Ethereal.">;
    features: Schema.Attribute.Component<'basic.features', true>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'OUR COMMITMENT TO YOU'>;
  };
}

export interface DefaultGalleriesHome extends Struct.ComponentSchema {
  collectionName: 'components_default_galleries_homes';
  info: {
    displayName: 'GalleriesHome';
  };
  attributes: {
    buttonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'VIEW GALLERIES'>;
    description: Schema.Attribute.Component<
      'basic.description-galleri-home',
      false
    >;
    image: Schema.Attribute.Component<'basic.image', true>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'CHECK OUT OUR PHOTO ALBUMS'>;
  };
}

export interface DefaultGalleryDatum extends Struct.ComponentSchema {
  collectionName: 'components_default_gallery_data';
  info: {
    displayName: 'Gallery Datum';
  };
  attributes: {
    category: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Featured'>;
    description: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Capturing the most adorable moments of our Persian kittens in their cutest poses.'>;
    fullContent: Schema.Attribute.RichText &
      Schema.Attribute.DefaultTo<'<p>Welcome to our "Too Cute" gallery! This collection features our most precious moments with Persian kittens showcasing their undeniable charm and adorable personalities.</p>          <h2>About This Gallery</h2>     <p>Every photo in this gallery captures a moment of pure joy, innocence, and cuteness. From playful yawns to curious gazes, these images represent the heart and soul of what makes Persian kittens so special.</p>          <h2>What You\'ll See</h2>     <ul>       <li>Playful kitten antics</li>       <li>Adorable sleepy moments</li>       <li>Curious explorations</li>       <li>Heart-melting expressions</li>     </ul>'>;
    images: Schema.Attribute.Component<'basic.image', true>;
    label: Schema.Attribute.String & Schema.Attribute.DefaultTo<'TOO CUTE'>;
    src: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface DefaultHero extends Struct.ComponentSchema {
  collectionName: 'components_basic_heroes';
  info: {
    description: 'Ana sayfan\u0131z\u0131n kahraman b\u00F6l\u00FCm\u00FC i\u00E7in verileri saklar.';
    displayName: 'Hero';
  };
  attributes: {
    aboutSection: Schema.Attribute.Component<'basic.card-context', false>;
    collageImage1: Schema.Attribute.Media<'images'>;
    collageImage2: Schema.Attribute.Media<'images'>;
    collageImage3: Schema.Attribute.Media<'images'>;
    description: Schema.Attribute.RichText &
      Schema.Attribute.DefaultTo<'This is a great description for your hero section.'>;
    heroImage: Schema.Attribute.Media<'images'>;
    logo: Schema.Attribute.Media<'images'>;
    motto: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Unleash Your Imagination'>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'A Great Title'>;
    welcomeText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Welcome!'>;
  };
}

export interface DefaultKitten extends Struct.ComponentSchema {
  collectionName: 'components_default_kittens';
  info: {
    displayName: 'Kitten';
  };
  attributes: {
    buttonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'I WANT A KITTEN'>;
    Kittens: Schema.Attribute.Component<'basic.kitten-list', false>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'MEET THE KITTENS'>;
  };
}

export interface DefaultPopular extends Struct.ComponentSchema {
  collectionName: 'components_default_populars';
  info: {
    displayName: 'Popular';
  };
  attributes: {
    item: Schema.Attribute.Component<'basic.image', true>;
    title: Schema.Attribute.String;
  };
}

export interface DefaultQuestions extends Struct.ComponentSchema {
  collectionName: 'components_default_questions';
  info: {
    displayName: 'Questions';
  };
  attributes: {
    IsElective: Schema.Attribute.Boolean;
    Options: Schema.Attribute.JSON;
    Question: Schema.Attribute.String;
  };
}

export interface DefaultSpecial extends Struct.ComponentSchema {
  collectionName: 'components_default_specials';
  info: {
    displayName: 'Special';
  };
  attributes: {
    features: Schema.Attribute.Component<'basic.features-special', true>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'WHAT MAKES US SPECIAL'>;
  };
}

export interface DefaultTerms extends Struct.ComponentSchema {
  collectionName: 'components_default_terms';
  info: {
    displayName: 'Terms';
  };
  attributes: {
    sections: Schema.Attribute.Component<'basic.terms-section', true>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Terms & Conditions'>;
  };
}

export interface DefaultTestiomonialHome extends Struct.ComponentSchema {
  collectionName: 'components_default_testiomonial_homes';
  info: {
    displayName: 'testiomonialHome';
  };
  attributes: {
    subtitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'READ REVIEWS FROM OUR'>;
    testimonials: Schema.Attribute.Component<'basic.testimonials-data', true>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'PAWSOME PERSIAN PARENTS'>;
  };
}

export interface DefaultWhyBlogData extends Struct.ComponentSchema {
  collectionName: 'components_default_why_blog_data';
  info: {
    displayName: 'whyBlogData';
  };
  attributes: {
    aboutItems: Schema.Attribute.Component<'basic.about-items-blog', true>;
    aboutTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'About Roxy'>;
    imageBottom: Schema.Attribute.Media<'images'>;
    imageBottomAlt: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Three Persian cats'>;
    imageTop: Schema.Attribute.Media<'images'>;
    imageTopAlt: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Roxy with cat'>;
    topBandColor: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'#d8ebf0'>;
    whyBlogBg: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#d48888'>;
    whyBlogText: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'When I was a newbie breeder, I struggled to make the right decisions. I did not have a mentor and learned many lessons the hard way. I blog to help other breeders and pet parents overcome challenges without the need to make as many mistakes. Hopefully, this enables your kitty to live their best life.'>;
    whyBlogTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Why I Blog?'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'basic.about-data': BasicAboutData;
      'basic.about-items-blog': BasicAboutItemsBlog;
      'basic.adults-list': BasicAdultsList;
      'basic.card-context': BasicCardContext;
      'basic.card-image': BasicCardImage;
      'basic.cards-about': BasicCardsAbout;
      'basic.categories-products': BasicCategoriesProducts;
      'basic.description-galleri-home': BasicDescriptionGalleriHome;
      'basic.faq-component': BasicFaqComponent;
      'basic.features': BasicFeatures;
      'basic.features-special': BasicFeaturesSpecial;
      'basic.highlights': BasicHighlights;
      'basic.image': BasicImage;
      'basic.image-single': BasicImageSingle;
      'basic.imagesnot-alt': BasicImagesnotAlt;
      'basic.ingredients': BasicIngredients;
      'basic.kitten-list': BasicKittenList;
      'basic.left-image': BasicLeftImage;
      'basic.marketing-linksdata': BasicMarketingLinksdata;
      'basic.parag-data': BasicParagData;
      'basic.pets-data': BasicPetsData;
      'basic.products': BasicProducts;
      'basic.question-faq': BasicQuestionFaq;
      'basic.recommed-products': BasicRecommedProducts;
      'basic.repeat-text': BasicRepeatText;
      'basic.reviews-component': BasicReviewsComponent;
      'basic.social-links': BasicSocialLinks;
      'basic.terminoal-rewiew': BasicTerminoalRewiew;
      'basic.terms-section': BasicTermsSection;
      'basic.testimonials-data': BasicTestimonialsData;
      'basic.testimonials-hero': BasicTestimonialsHero;
      'basic.text-comp': BasicTextComp;
      'basic.text-component': BasicTextComponent;
      'basic.text-image-data': BasicTextImageData;
      'basic.timeline-section': BasicTimelineSection;
      'basic.tips': BasicTips;
      'basic.vaccanies': BasicVaccanies;
      'basic.why-selection': BasicWhySelection;
      'default.adults': DefaultAdults;
      'default.blog': DefaultBlog;
      'default.comment': DefaultComment;
      'default.galleries-home': DefaultGalleriesHome;
      'default.gallery-datum': DefaultGalleryDatum;
      'default.hero': DefaultHero;
      'default.kitten': DefaultKitten;
      'default.popular': DefaultPopular;
      'default.questions': DefaultQuestions;
      'default.special': DefaultSpecial;
      'default.terms': DefaultTerms;
      'default.testiomonial-home': DefaultTestiomonialHome;
      'default.why-blog-data': DefaultWhyBlogData;
    }
  }
}
