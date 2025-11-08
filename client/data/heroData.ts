export interface HeroData {
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
    image1: {
      src: string;
      alt: string;
    };
    image2: {
      src: string;
      alt: string;
    };
    image3: {
      src: string;
      alt: string;
    };
  };
  aboutSection: {
    greeting: string;
    introduction: string;
    listItems: string[];
    conclusion: string;
    buttonText: string;
  };
}

export const heroData: HeroData[] = [
  {
    heroImage: {
      src: "https://images.unsplash.com/photo-1513366208864-87536b8bd7b4?w=1200&h=900&fit=crop",
      alt: "Woman with Persian Cat"
    },
    logo: {
      src: "/images/logo.png",
      alt: "Ethereal Persians Cattery Logo"
    },
    welcomeText: "Welcome to EPC",
    title: "ETHEREAL PERSIANS CATTERY",
    motto: "The only thing we love more than our kittens is seeing the joy they bring to your family.",
    description: "Our goal is to use our knowledge and experience with the Persian breed to pawsitively impact the life of your family. We hope that through our free online education, photos, videos, and kittens you find value and happiness in our profession.",
    collageImages: {
      image1: {
        src: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&h=1200&fit=crop",
        alt: "Woman with two Persian cats"
      },
      image2: {
        src: "https://images.unsplash.com/photo-1513366208864-87536b8bd7b4?w=800&h=1200&fit=crop",
        alt: "Person holding golden Persian cat"
      },
      image3: {
        src: "https://images.unsplash.com/photo-1513366208864-87536b8bd7b4?w=800&h=1200&fit=crop",
        alt: "Man holding tiny kitten"
      }
    },
    aboutSection: {
      greeting: "HEY FRIEND!",
      introduction: "My name is Roxy and I'm glad you've found my online home. If you are new here, here are 3 things you need to know:",
      listItems: [
        "Our cats are more than beautiful, they are extremely social and health is our #1 priority.",
        "We ship in-cabin to all international airports within the U.S.A., and over half of our kittens live outside our home state of FL.",
        "We keep in touch with the families who own our kitties, and we deeply appreciate the role they play in our lives."
      ],
      conclusion: "For us, raising Persian cats is more than a job, it is a lifestyle. The changes we have made to our lives to provide you with a happy, healthy Persian have been transformative. I am no longer the \"dog mom\" I used to be. I am now a Persian cat connoisseur. If you join us on the fluffy side, they may steal your heart as well.",
      buttonText: "MORE ABOUT US"
    }
  }
];

