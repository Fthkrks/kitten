import type { Schema, Struct } from '@strapi/strapi';

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

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'basic.adults-list': BasicAdultsList;
      'basic.card-context': BasicCardContext;
      'basic.description-galleri-home': BasicDescriptionGalleriHome;
      'basic.features': BasicFeatures;
      'basic.features-special': BasicFeaturesSpecial;
      'basic.image': BasicImage;
      'basic.image-single': BasicImageSingle;
      'basic.kitten-list': BasicKittenList;
      'basic.social-links': BasicSocialLinks;
      'basic.testimonials-data': BasicTestimonialsData;
      'default.adults': DefaultAdults;
      'default.comment': DefaultComment;
      'default.galleries-home': DefaultGalleriesHome;
      'default.hero': DefaultHero;
      'default.kitten': DefaultKitten;
      'default.popular': DefaultPopular;
      'default.special': DefaultSpecial;
      'default.testiomonial-home': DefaultTestiomonialHome;
    }
  }
}
