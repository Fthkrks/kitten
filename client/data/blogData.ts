export interface BlogPost {
  id: string;
  image: string;
  categories: string[];
  title: string;
  description: string;
  fullContent?: string;
  author?: string;
  date?: string;
  featured?: boolean;
}

export const defaultPosts: BlogPost[] = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&q=80&w=800",
    categories: ["GROOMING", "UNCATEGORIZED"],
    title: "A Breeders Guide For Reducing Tearing in a Cattery",
    description: "A Breeders Guide For Reducing Tearing in a Cattery A Guideline for Feline Breeders Are you tired of tearing problems in your cattery? Learn proven techniques to minimize tearing in Persian cats through proper care, diet, and environmental management.",
    author: "Roxy Geers",
    date: "March 15, 2024",
    featured: true,
    fullContent: `<p>Tearing is one of the most common concerns among Persian cat breeders. If you're experiencing excessive tearing in your cattery, this comprehensive guide will help you understand the causes and implement effective solutions.</p>
    
    <h2>Understanding the Causes</h2>
    <p>Several factors can contribute to excessive tearing in Persian cats:</p>
    <ul>
      <li><strong>Facial Structure:</strong> The flat-faced (brachycephalic) structure of Persians can cause tear ducts to be compressed, leading to overflow.</li>
      <li><strong>Environmental Factors:</strong> Allergens, dust, and irritants can trigger excessive tear production.</li>
      <li><strong>Health Issues:</strong> Eye infections, blocked tear ducts, or underlying health conditions can cause persistent tearing.</li>
      <li><strong>Diet:</strong> Poor nutrition can affect overall eye health.</li>
    </ul>

    <h2>Practical Solutions</h2>
    <p>Here are proven strategies we've implemented at Ethereal Persians:</p>
    <ol>
      <li><strong>Regular Grooming:</strong> Clean around the eyes daily with a soft, damp cloth to prevent tear staining.</li>
      <li><strong>Air Quality:</strong> Use air purifiers and maintain low humidity levels to reduce allergens.</li>
      <li><strong>Nutrition:</strong> Feed high-quality, species-appropriate diets rich in essential nutrients.</li>
      <li><strong>Veterinary Care:</strong> Regular check-ups to catch and address eye issues early.</li>
      <li><strong>Breeding Selection:</strong> Choose breeding pairs with healthy eye structures and minimal tearing history.</li>
    </ol>

    <h2>Our Experience</h2>
    <p>Through years of breeding, we've learned that consistent care, proper nutrition, and selective breeding can significantly reduce tearing issues. Remember, some tearing is normal, but excessive tearing requires attention and management.</p>

    <p>If you're struggling with tearing in your cattery, don't lose hope. With the right approach and dedication, you can minimize this challenge and focus on producing healthy, happy Persian cats.</p>`,
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1513366208864-87536b8bd7b4?auto=format&fit=crop&q=80&w=800",
    categories: ["MISCELLANEOUS"],
    title: "What Makes Golden Cats Unique?",
    description: "Unleashing the Beauty of the Golden Persian Are you a cat lover who adores the regal charm of Persian cats? Discover what makes golden Persians truly special and unique among feline breeds.",
    author: "Jason Geers",
    date: "February 28, 2024",
    featured: true,
    fullContent: `<p>Golden Persians hold a special place in the hearts of cat enthusiasts worldwide. Their stunning appearance and gentle demeanor make them one of the most sought-after color variations in the Persian breed.</p>

    <h2>The Allure of Golden Persians</h2>
    <p>What sets golden Persians apart from other color variations? Let's explore the unique characteristics that make these felines so extraordinary:</p>
    <ul>
      <li><strong>Rare Coloration:</strong> The golden hue is one of the rarest and most desirable colors in Persian cats, making them highly prized among breeders and pet owners.</li>
      <li><strong>Distinctive Markings:</strong> Golden Persians often feature beautiful tabby patterns that enhance their regal appearance.</li>
      <li><strong>Genetic Rarity:</strong> Producing quality golden Persians requires careful breeding programs and genetic knowledge.</li>
      <li><strong>Eye Color:</strong> Many golden Persians have striking green or hazel eyes that complement their coat beautifully.</li>
    </ul>

    <h2>Breeding Golden Persians</h2>
    <p>Breeding for golden coloration is both an art and a science. At Ethereal Persians, we've dedicated years to understanding the genetics behind this beautiful color variation.</p>

    <h2>Why They Capture Our Hearts</h2>
    <p>Beyond their physical beauty, golden Persians are known for their sweet, affectionate nature. They form deep bonds with their families and bring warmth and joy to every home they enter.</p>`,
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&q=80&w=800",
    categories: ["FEATURED", "NUTRITION"],
    title: "FOOD ENERGETICS FOR FELINES",
    description: "The study of how food affects the body is known as food energetics. Knowing some basic energetic concepts can help you make better nutritional choices for your Persian cats and improve their overall health.",
    author: "Roxy Geers",
    date: "January 10, 2024",
    featured: true,
    fullContent: `<p>Food energetics is the study of how different foods affect the body's energy and overall health. This concept, drawn from traditional medicine systems, can be incredibly valuable when planning your cat's diet.</p>

    <h2>Understanding Food Energetics</h2>
    <p>Foods are categorized based on their energetic properties:</p>
    <ul>
      <li><strong>Cooling Foods:</strong> Help reduce inflammation and heat in the body. Examples include certain fish, vegetables, and raw foods.</li>
      <li><strong>Warming Foods:</strong> Provide energy and warmth, ideal for cats that need more vitality. Examples include some meats and cooked foods.</li>
      <li><strong>Neutral Foods:</strong> Balance both qualities and are generally safe for all cats.</li>
    </ul>

    <h2>Applying Energetics to Your Cat's Diet</h2>
    <p>At Ethereal Persians, we consider the energetic properties of foods when planning meals. This holistic approach helps us address individual health needs and maintain optimal wellness in our cats.</p>

    <h2>Real-World Application</h2>
    <p>By understanding food energetics, we can create balanced diets that support our cats' health naturally. This knowledge has transformed how we approach nutrition in our cattery.</p>`,
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?auto=format&fit=crop&q=80&w=800",
    categories: ["NUTRITION"],
    title: "Raw Feeding Cats",
    description: "Diet is the foundation of health. At EPC we feed a species appropriate, human grade and minimally processed raw diet. Learn why raw feeding can transform your cat's health and vitality.",
    author: "Roxy Geers",
    date: "December 5, 2023",
    fullContent: `<p>Raw feeding has revolutionized how we approach feline nutrition at Ethereal Persians. After years of research and practical application, we've seen remarkable improvements in our cats' health, vitality, and overall well-being.</p>

    <h2>Why Raw Feeding?</h2>
    <p>Cats are obligate carnivores, designed by nature to consume whole prey. Commercial processed foods, while convenient, often fall short of meeting our cats' true nutritional needs.</p>

    <h2>The Benefits We've Observed</h2>
    <ul>
      <li>Improved digestive health and reduced gastrointestinal issues</li>
      <li>Better dental health with natural chewing action</li>
      <li>Enhanced coat quality and reduced shedding</li>
      <li>Increased energy levels and overall vitality</li>
      <li>Better weight management and lean muscle development</li>
    </ul>

    <h2>Getting Started</h2>
    <p>Transitioning to raw feeding requires careful planning and education. We recommend starting with high-quality, human-grade raw foods and gradually introducing variety to ensure balanced nutrition.</p>

    <h2>Our Raw Feeding Protocol</h2>
    <p>At EPC, we feed a carefully balanced raw diet that includes muscle meat, organ meats, bone, and appropriate supplements. This approach has transformed the health of our cattery.</p>`,
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&q=80&w=800",
    categories: ["NUTRITION"],
    title: "Feline Raw Feeding Philosophy",
    description: "Food can be used as medicine or poison; it can hurt or heal. Understanding the effect of nutrition on your cat's well-being is essential for responsible breeding and ownership.",
    author: "Roxy Geers",
    date: "November 20, 2023",
    fullContent: `<p>Our philosophy at Ethereal Persians centers on the fundamental truth that nutrition is the foundation of health. Every meal we provide is an opportunity to nourish, heal, and support our cats' optimal well-being.</p>

    <h2>Food as Medicine</h2>
    <p>We believe that properly prepared, species-appropriate nutrition can serve as preventive medicine. By feeding high-quality raw foods, we support our cats' natural healing abilities and immune systems.</p>

    <h2>The Holistic Approach</h2>
    <p>Our feeding philosophy extends beyond just providing nutrients. We consider:</p>
    <ul>
      <li>The energetic properties of foods</li>
      <li>Individual cat needs and health status</li>
      <li>Seasonal variations and environmental factors</li>
      <li>The importance of variety and rotation</li>
    </ul>

    <h2>Commitment to Quality</h2>
    <p>We source only human-grade ingredients, ensuring our cats receive the highest quality nutrition possible. This commitment has been central to our success in producing healthy, vibrant Persians.</p>`,
  },
  {
    id: "6",
    image: "https://images.unsplash.com/photo-1566847438217-76e82d383f84?auto=format&fit=crop&q=80&w=800",
    categories: ["REARING"],
    title: "Breeding for Disposition",
    description: "Just as breeders select for beauty and good health, we also have the power to breed for disposition. This guide explores how to cultivate gentle, social temperaments in your Persian cats.",
    author: "Jason Geers",
    date: "October 15, 2023",
    fullContent: `<p>While physical traits often take center stage in breeding discussions, disposition—the natural temperament and personality of our cats—is equally important and absolutely breedable.</p>

    <h2>Why Disposition Matters</h2>
    <p>A beautiful cat with a difficult temperament can be a challenge for owners. Conversely, a cat with an excellent disposition becomes a beloved family member and enhances the reputation of your breeding program.</p>

    <h2>Selecting for Temperament</h2>
    <p>When choosing breeding pairs, we evaluate:</p>
    <ul>
      <li>Social confidence and friendliness</li>
      <li>Adaptability to new environments</li>
      <li>Gentleness with children and other pets</li>
      <li>Overall calmness and stress tolerance</li>
    </ul>

    <h2>Early Socialization</h2>
    <p>Genetics provide the foundation, but early socialization is crucial. We handle our kittens daily from birth, expose them to various experiences, and ensure positive interactions with people.</p>

    <h2>Results of Our Approach</h2>
    <p>By prioritizing disposition in our breeding program, we consistently produce Persians known for their sweet, gentle, and social natures—cats that bring joy to their families for years to come.</p>`,
  },
  {
    id: "7",
    image: "https://images.unsplash.com/photo-1488740304459-45c4277e7daf?auto=format&fit=crop&q=80&w=800",
    categories: ["GROOMING"],
    title: "How to Groom Persian Cats",
    description: "Groom Like A Pro Did you know that oils in a Persians coat is what causes them to mat? Discover professional grooming techniques to keep your Persian's luxurious coat healthy and tangle-free.",
    author: "Roxy Geers",
    date: "September 8, 2023",
    fullContent: `<p>Grooming a Persian cat is both an art and a daily necessity. Their luxurious long coats require consistent, skilled care to maintain health and prevent matting.</p>

    <h2>The Science Behind Matting</h2>
    <p>Persian coats produce natural oils that, when combined with dead hair and environmental debris, can form mats. Understanding this process helps us prevent problems before they start.</p>

    <h2>Essential Grooming Tools</h2>
    <ul>
      <li><strong>Wide-tooth comb:</strong> For detangling and removing loose hair</li>
      <li><strong>Fine-tooth comb:</strong> For finishing and smoothing</li>
      <li><strong>Slicker brush:</strong> For removing undercoat during shedding seasons</li>
      <li><strong>Grooming scissors:</strong> For carefully trimming mats when necessary</li>
    </ul>

    <h2>Daily Grooming Routine</h2>
    <ol>
      <li>Start with a wide-tooth comb, working from head to tail</li>
      <li>Pay special attention to areas prone to matting: underarms, behind ears, and the base of the tail</li>
      <li>Use a fine-tooth comb to smooth the coat</li>
      <li>Finish with gentle brushing to distribute natural oils</li>
    </ol>

    <h2>Professional Tips</h2>
    <p>Regular grooming isn't just about appearance—it's about health. Daily sessions allow you to:</p>
    <ul>
      <li>Check for skin issues or parasites</li>
      <li>Monitor overall health and weight</li>
      <li>Bond with your cat</li>
      <li>Prevent painful matting that can lead to skin problems</li>
    </ul>

    <h2>Bathing Your Persian</h2>
    <p>While Persians don't need frequent baths, occasional bathing helps maintain coat health. Use quality cat-specific shampoos and ensure thorough drying to prevent skin issues.</p>`,
  },
  {
    id: "8",
    image: "https://images.unsplash.com/photo-1516750105099-4b8a83e217ee?auto=format&fit=crop&q=80&w=800",
    categories: ["FEATURED", "REARING"],
    title: "Breeding For Health",
    description: "Breeding for health is our #1 priority. Without health, all else falls apart. When done correctly, breeding produces healthy, vibrant cats that bring joy to families for years to come.",
    author: "Roxy Geers",
    date: "August 22, 2023",
    featured: true,
    fullContent: `<p>Health is the cornerstone of everything we do at Ethereal Persians. While beauty and temperament are important, they mean nothing without robust health.</p>

    <h2>Our Health-First Philosophy</h2>
    <p>Every breeding decision we make prioritizes health above all else. This means:</p>
    <ul>
      <li>Thorough health testing before breeding</li>
      <li>Selecting for genetic diversity and vitality</li>
      <li>Addressing health issues proactively, not reactively</li>
      <li>Continuous learning about Persian health and genetics</li>
    </ul>

    <h2>Health Testing Protocols</h2>
    <p>We conduct comprehensive health screenings including:</p>
    <ul>
      <li>Genetic testing for known Persian health concerns</li>
      <li>Regular veterinary examinations</li>
      <li>Monitoring for breed-specific conditions</li>
      <li>Evaluating overall vitality and longevity in breeding lines</li>
    </ul>

    <h2>Preventive Care</h2>
    <p>Prevention is always better than treatment. Our approach includes:</p>
    <ul>
      <li>Optimal nutrition from birth</li>
      <li>Proper environmental management</li>
      <li>Regular health monitoring</li>
      <li>Early intervention when issues arise</li>
    </ul>

    <h2>The Results</h2>
    <p>By making health our #1 priority, we produce Persians that not only look beautiful but live long, healthy, vibrant lives. This commitment ensures that every kitten we place has the best possible foundation for a lifetime of wellness.</p>

    <h2>Our Promise</h2>
    <p>When you welcome an Ethereal Persians cat into your home, you're getting a cat bred with health as the foundation. This isn't just our priority—it's our promise to you and to every cat we produce.</p>`,
  },
];

