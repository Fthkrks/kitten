import Image from "next/image";

const ABOUT_IMG = "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&q=80&w=500";

export default function About() {
  return (
    <section className="w-full flex flex-col md:flex-row items-center justify-center py-8 md:py-14 px-4 mt-10">
      {/* Fotoğraf sol */}
      <div className="w-full md:w-[320px] flex-shrink-0 flex items-center justify-center mb-6 md:mb-0">
        <div className="h-[270px] w-[200px] md:w-[246px] md:h-[320px] rounded-md overflow-hidden shadow-xl">
          <Image
            src={ABOUT_IMG}
            alt="Roxy and Jason with Persian cat"
            width={246}
            height={320}
            className="w-full h-full object-cover rounded-md"
            priority
          />
        </div>
      </div>

      {/* Metin sağ */}
      <div className="flex-1 max-w-3xl md:pl-12">
        <h2 className="text-2xl md:text-3xl font-lora text-[#444] mb-3 font-medium">About Us</h2>
        <p className="mb-3 text-base md:text-lg leading-relaxed text-[#5d5d5d]">
          Our family is comprised of my hubby – Jason, our son – Julian, our german shepherd – Mishka, and plenty of beloved kitties. Our home is not large but it is very homey. In 2010, Jason and I began a romantic relationship. In 2012, we purchased our first home. In 2015, we began breeding persian cats.<br /><br />
          <span className="font-semibold text-[#47383e]">Breeding is more than a job and more than a career – it is a lifestyle.</span>
        </p>
        <p className="text-base md:text-lg leading-relaxed text-[#5d5d5d]">
          Ethereal Persians Cattery operates in Sarasota, FL within our home. It is not a 9-5 job; it is an all day, every day choice. We choose to breed persian cats because their presence is profoundly therapeutic to our souls and the impact we have on families through our kittens is pawsitively life-altering. Here, cats grace us with their therapeutic presence and we return the favor by making sure they remain safe, happy, and healthy.
        </p>
      </div>
    </section>
  );
}
