export interface GalleryItem {
  id: string;
  label: string;
  src: string;
  alt: string;
  gridArea?: string;
  aspectRatio?: string;
  description?: string;
  fullContent?: string;
  images?: string[];
  category?: string;
}

export const galleryData: GalleryItem[] = [
  {
    id: "too-cute",
    label: "TOO CUTE",
    src: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&q=80&w=600",
    alt: "White Persian kitten yawning",
    description: "Capturing the most adorable moments of our Persian kittens in their cutest poses.",
    category: "Featured",
    fullContent: `<p>Welcome to our "Too Cute" gallery! This collection features our most precious moments with Persian kittens showcasing their undeniable charm and adorable personalities.</p>
    
    <h2>About This Gallery</h2>
    <p>Every photo in this gallery captures a moment of pure joy, innocence, and cuteness. From playful yawns to curious gazes, these images represent the heart and soul of what makes Persian kittens so special.</p>
    
    <h2>What You'll See</h2>
    <ul>
      <li>Playful kitten antics</li>
      <li>Adorable sleepy moments</li>
      <li>Curious explorations</li>
      <li>Heart-melting expressions</li>
    </ul>
    
    <p>Each kitten has their own unique personality that shines through in these photographs. We hope these images bring as much joy to you as these kittens bring to us every day.</p>`,
    images: [
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1511044568932-338cba0ad803?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    id: "goldens",
    label: "GOLDENS",
    src: "https://images.unsplash.com/photo-1511044568932-338cba0ad803?auto=format&fit=crop&q=80&w=600",
    alt: "Golden Persian kittens",
    description: "Discover the beauty of our golden Persian cats with their stunning warm-toned coats.",
    category: "Colors",
    fullContent: `<p>Our Golden Persian collection showcases one of the most sought-after color variations in the breed. These cats feature beautiful warm-toned coats that range from deep golden to lighter cream shades.</p>
    
    <h2>Golden Persian Characteristics</h2>
    <ul>
      <li>Rich, warm coat colors</li>
      <li>Stunning tabby patterns</li>
      <li>Beautiful eye colors ranging from green to hazel</li>
      <li>Regal and elegant appearance</li>
    </ul>
    
    <h2>Breeding Golden Persians</h2>
    <p>Producing quality golden Persians requires careful breeding programs and extensive genetic knowledge. At Ethereal Persians, we've dedicated years to perfecting this beautiful color variation.</p>`,
    images: [
      "https://images.unsplash.com/photo-1511044568932-338cba0ad803?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    id: "silvers",
    label: "SILVERS",
    src: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&q=80&w=600",
    alt: "Silver Persian kittens",
    description: "Elegant silver Persian cats with their stunning light-colored coats and regal presence.",
    category: "Colors",
    fullContent: `<p>Silver Persians are known for their elegant, light-colored coats that range from pure white to silver-gray tones. These cats have a regal appearance that captivates cat lovers worldwide.</p>
    
    <h2>Silver Persian Features</h2>
    <ul>
      <li>Light, elegant coat colors</li>
      <li>Stunning contrast with their eyes</li>
      <li>Sophisticated and regal appearance</li>
      <li>Beautiful in both natural and studio lighting</li>
    </ul>`,
    images: [
      "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    id: "blue-goldens",
    label: "BLUE GOLDENS",
    src: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=600",
    alt: "Blue golden Persian kittens",
    description: "Unique blue-golden Persian cats combining the best of both color variations.",
    category: "Colors",
    fullContent: `<p>Blue Golden Persians represent a unique combination of color genetics, featuring beautiful blue-gray tones mixed with golden highlights. These cats are truly one-of-a-kind.</p>`,
    images: [
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    id: "tabbies",
    label: "TABBIES",
    src: "https://images.unsplash.com/photo-1548247416-ec66f4900b2e?auto=format&fit=crop&q=80&w=600",
    alt: "Tabby Persian cats",
    description: "Beautiful tabby-patterned Persian cats with striking markings and patterns.",
    category: "Patterns",
    fullContent: `<p>Tabby Persians feature distinctive striped and spotted patterns that create stunning visual appeal. These patterns can vary greatly, making each cat unique.</p>
    
    <h2>Tabby Pattern Types</h2>
    <ul>
      <li>Classic tabby patterns</li>
      <li>Mackerel stripes</li>
      <li>Spotted patterns</li>
      <li>Unique variations</li>
    </ul>`,
    images: [
      "https://images.unsplash.com/photo-1548247416-ec66f4900b2e?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    id: "face-types",
    label: "FACE TYPES",
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1200",
    alt: "Persian cat face types",
    description: "Exploring the different face structures and expressions of Persian cats.",
    category: "Features",
    fullContent: `<p>Persian cats come in various face types, from the traditional flat-faced (brachycephalic) structure to more moderate face shapes. This gallery showcases the diversity within the breed.</p>`,
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    id: "meowing",
    label: "MEOWING",
    src: "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&q=80&w=600",
    alt: "Meowing kitten",
    description: "Capturing our kittens' vocal expressions and adorable meows.",
    category: "Behavior",
    fullContent: `<p>Every meow tells a story! This gallery captures our Persian kittens in their most vocal moments, expressing their needs, greetings, and sometimes just their thoughts.</p>`,
    images: [
      "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    id: "garden",
    label: "GARDEN",
    src: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&q=80&w=600",
    alt: "Kitten in garden",
    description: "Our cats enjoying nature and outdoor adventures in beautiful garden settings.",
    category: "Location",
    fullContent: `<p>Watch our Persian cats explore and enjoy natural garden settings. These photos capture their curiosity and appreciation for nature's beauty.</p>`,
    images: [
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    id: "newborns",
    label: "NEWBORNS",
    src: "https://images.unsplash.com/photo-1592194996301-7b5d277e1afd?auto=format&fit=crop&q=80&w=600",
    alt: "Newborn kittens",
    description: "Tiny newborn kittens in their first days of life, pure and precious.",
    category: "Age",
    fullContent: `<p>There's nothing quite as precious as newborn Persian kittens. This gallery captures those first magical days of life when everything is new and wonderful.</p>`,
    images: [
      "https://images.unsplash.com/photo-1592194996301-7b5d277e1afd?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    id: "indoors",
    label: "INDOORS",
    src: "https://images.unsplash.com/photo-1513245543132-31f507417b26?auto=format&fit=crop&q=80&w=600",
    alt: "Indoor Persian cat",
    description: "Cozy indoor moments of our Persian cats in their comfortable home environment.",
    category: "Location",
    fullContent: `<p>Our Persian cats love their indoor spaces! This gallery shows them in their element, comfortable and content in their home environment.</p>`,
    images: [
      "https://images.unsplash.com/photo-1513245543132-31f507417b26?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    id: "back-to-school",
    label: "BACK TO SCHOOL",
    src: "https://images.unsplash.com/photo-1545529468-42764ef8c85f?auto=format&fit=crop&q=80&w=600",
    alt: "Cat back to school",
    description: "Fun back-to-school themed photos with our adorable Persian kittens.",
    category: "Themed",
    fullContent: `<p>School's in session! These themed photos feature our kittens in educational settings, proving that learning can be both cute and fun.</p>`,
    images: [
      "https://images.unsplash.com/photo-1545529468-42764ef8c85f?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    id: "groups",
    label: "GROUPS",
    src: "https://images.unsplash.com/photo-1568572933382-74d440642117?auto=format&fit=crop&q=80&w=800",
    alt: "Group of kittens",
    description: "Beautiful group photos showing multiple kittens together, showcasing their social nature.",
    category: "Featured",
    fullContent: `<p>Persian kittens love being together! This gallery features group photos that showcase their social nature and the bonds they form with each other.</p>`,
    images: [
      "https://images.unsplash.com/photo-1568572933382-74d440642117?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    id: "valentine",
    label: "VALENTINE",
    src: "https://images.unsplash.com/photo-1519682337058-a94e519356bc?auto=format&fit=crop&q=80&w=600",
    alt: "Valentine themed kitten",
    description: "Love-themed photos perfect for Valentine's Day celebrations.",
    category: "Holiday",
    fullContent: `<p>Show your love with these Valentine-themed photos of our Persian kittens. Perfect for expressing affection and celebrating love!</p>`,
    images: [
      "https://images.unsplash.com/photo-1519682337058-a94e519356bc?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    id: "catio",
    label: "CATIO",
    src: "https://images.unsplash.com/photo-1551717743-49959800b1f6?auto=format&fit=crop&q=80&w=600",
    alt: "Cat in catio",
    description: "Our cats enjoying their safe outdoor space in our custom-built catio.",
    category: "Location",
    fullContent: `<p>A catio is a secure outdoor enclosure that allows cats to experience the outdoors safely. Our Persian cats love spending time in their custom catio!</p>`,
    images: [
      "https://images.unsplash.com/photo-1551717743-49959800b1f6?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    id: "easter",
    label: "EASTER",
    src: "https://images.unsplash.com/photo-1522770179533-24471fcdba45?auto=format&fit=crop&q=80&w=600",
    alt: "Easter themed kitten",
    description: "Easter-themed photos with colorful eggs and spring decorations.",
    category: "Holiday",
    fullContent: `<p>Hop into spring with these adorable Easter-themed photos featuring our Persian kittens and colorful decorations!</p>`,
    images: [
      "https://images.unsplash.com/photo-1522770179533-24471fcdba45?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    id: "halloween",
    label: "HALLOWEEN",
    src: "https://images.unsplash.com/photo-1578922746465-3a80a228f223?auto=format&fit=crop&q=80&w=600",
    alt: "Halloween themed kitten",
    description: "Spooky and cute Halloween-themed photos with pumpkins and autumn decorations.",
    category: "Holiday",
    fullContent: `<p>Boo! These Halloween photos feature our Persian kittens in festive autumn settings with pumpkins and spooky decorations.</p>`,
    images: [
      "https://images.unsplash.com/photo-1578922746465-3a80a228f223?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    id: "christmas",
    label: "CHRISTMAS",
    src: "https://images.unsplash.com/photo-1672355422293-a912bc3a1d90?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1738",
    alt: "Christmas themed kittens",
    description: "Festive Christmas photos with holiday decorations and winter wonderland themes.",
    category: "Holiday",
    fullContent: `<p>Deck the halls with our Christmas gallery! These festive photos capture the holiday spirit with our Persian kittens and beautiful seasonal decorations.</p>`,
    images: [
      "https://images.unsplash.com/photo-1672355422293-a912bc3a1d90?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1738",
    ],
  },

];

