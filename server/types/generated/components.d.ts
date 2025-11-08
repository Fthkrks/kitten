import type { Schema, Struct } from '@strapi/strapi';

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

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'basic.card-context': BasicCardContext;
      'default.hero': DefaultHero;
    }
  }
}
