import Image from "next/image";

const PHOTO_URL = "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&q=80&w=500";

export default function Parag() {
  return (
    <section className="w-full bg-[#fbf7f3] py-8 px-2 flex flex-col items-center">
      <div className="w-full max-w-[1500px] flex flex-col md:flex-row items-start justify-start md:justify-center gap-12 md:gap-16">
        {/* Sağ üstte görsel */}
        <div className="order-1 md:order-2 flex-shrink-0 w-full md:w-[340px] flex justify-center md:justify-end mb-6 md:mb-0">
          <div className="relative w-[320px] h-[220px] md:w-[320px] md:h-[210px] rounded-lg overflow-hidden">
            <Image
              src={PHOTO_URL}
              alt="Roxy and Cat"
              fill
              className="object-cover w-full h-full rounded-lg"
              priority
            />
          </div>
        </div>
        {/* Yazılar yalnızca geniş ve net; kutusuz */}
        <div className="order-2 md:order-1 flex-1 max-w-3xl">
          <h1 className="font-serif text-[#49332b] text-3xl md:text-4xl mb-7 text-center md:text-left font-normal">
            Roxy: The Crazy Cat Lady
          </h1>
          <div className="space-y-4 text-[#38312d] text-sm  text-left leading-relaxed">
            <p>
              A lot of “About Me” pages share how they wanted to be a ______ since they were young. That’s not my story. I imagined I’d be a surgeon for large predatory cats in the Africa, not a midwife to tiny fluffy felines in my own home.
            </p>
            <p>
              My story starts in 2015. I had completed my bachelors in biology and planned to pursue a doctorate in veterinary medicine. I visited the Veterinary College at the University of Florida where my first dream shattered. I was quoted 42k a year to attend. I could not afford tuition, let alone moving expenses. So instead I focused on serving the animals closest to me – dogs and cats. I offered dog sitting services, becoming a pet photographer and eventually a vet tech at a local veterinary hospital. Most importantly, I focused on my deep fascination with breeding and the intricacies it entailed.
            </p>
            <p>
              One of the first things I did after collage was purchase a persian cat for breeding. In December of 2015 I purchased my first persian cat for breeding – Milo – a white stud with copper eyes. In 2016 I purchased my first persian female for breeding – Shaila – a blue smoke with copper eyes. It didn’t take long for me to purchase several more breeders; 3 in 2017. By 2018, I had several litters on the ground and had overcome many milestones and officially felt like a crazy cat lady.
            </p>
            <div className="font-bold mt-5 mb-2">Before becoming a full-time cat breeder Roxy was a:</div>
            <ul className="ml-8 mb-2 list-disc text-[#6a6258] text-sm">
              <li><span className="italic">Student at the University of South Florida</span></li>
              <li>Veterinary Technician</li>
              <li>Dog Sitter</li>
              <li>Photographer; families, weddings and pets</li>
            </ul>
            <p>
              Looking back at it now, becoming a breeder was a quick choice. The startup cost was attainable, I had the space required and I felt empowered with knowledge. I gathered skills and income as a photographer and dog sitter to purchase my first persians and to grow my cattery. Also, my hubby helped tremendously by keeping us financially afloat while I pursued new passions. Shortly after producing my first litters, I became a veterinary technician to advance my understanding of veterinary medicine; encouraged by heartbreaking medical crises with young kittens.
            </p>
            <p>
              At my busiest point, I was a breeder, a vet tech, a professional photographer and a dogsitter. Juggling all of that and doing it all well was practically impossible. In 2017, I quit dog sitting. In 2019, I quit offering professional photography services. In 2021, I quit my job as a veterinary technician. I have since devoted my entire life to breeding cats. In 2022, my hubby quit his job as a mail man to best support our growing cattery.
            </p>
            <p>
              Today, I am a midwife, nutritionist, groomer, photographer, videographer, animal trainer and CEO of Ethereal Persians; in addition to my personal roles as a devoted mother, wife, daughter and friend to those closest to me. My beloved partner, Jason, is an equal partner with complimentary roles. Over time, we have added team members such as pet nannies, groomers, nutritionists, website designers, and maids to keep up with our workload and to offer the best experience to our beloved owners.
            </p>
            <p>
              Breeding has become a way of life for us. Our priority is first and foremost making sure that each kitten is happy, healthy and that the owners that entrust us do so confidently and are matched appropriately. We are unapologetic in our choice to breed and our goal has always been to lead by example. We cut no corners and we hope you see that, embrace it and support us.
            </p>
            <p>
              If you are here in support, thank you. I hope you find useful content on my site or your next kitten in our hands.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
