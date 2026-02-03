import Link from "next/link";

export default function Look() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-20 items-center">
          {/* Left: Heading and description */}
          <div>
            <h2 className="font-lora text-[#5A5A5A] text-3xl md:text-[40px] leading-tight">
              LOOKING FOR
              <br />
              A
              <br />
              PARTICULAR
              <br />
              COLOR?
            </h2>
            <p className="mt-6 text-md leading-7 text-[#5A5A5A]/80 max-w-sm">
              We specialize in golden, silver, and blue golden Persian cats. If you are searching for a different color, we offer kittens from what we call our rainbow collection – kittens with solid colors such as blue, red, and cream, as well as bi-colors, tabbies, and many other color combinations. We offer color variety to help you diversify your collection because we find beauty in many colors. We also believe that each kitten is valued not just by their color, but by combining all their features.
            </p>
          </div>

          {/* Right: Two lists */}
          <div className="md:col-span-2">
            <div className="grid sm:grid-cols-2 gap-10">
              {/* Rare Colors */}
              <div className="">
                <div className="flex items-center gap-4">
                  <span className="h-px w-10 bg-gray-300" />
                  <h3 className="font-lora text-[#8EA58E] text-lg">Rare Colors</h3>
                </div>
                <ul className="mt-4 space-y-2 text-[#5A5A5A]/80 text-sm">
                  <li>Silver</li>
                  <li>Golden</li>
                  <li>Blue Golden</li>
                  <li>Blue Silver</li>
                </ul>
              </div>

              {/* Traditional Colors */}
              <div>
                <div className="flex items-center gap-4">
                  <span className="h-px w-10 bg-gray-300" />
                  <h3 className="font-lora text-[#8EA58E] text-lg">Traditional Colors</h3>
                </div>
                <ul className="mt-4 space-y-2 text-[#5A5A5A]/80 text-sm">
                  <li>Red</li>
                  <li>Cream</li>
                  <li>Blue</li>
                  <li>Tabby</li>
                  <li>Bi-Color</li>
                  <li>Any Mix of the Above +</li>
                </ul>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8">
              <Link href="/avaible-kittens">
                <button className="rounded-md  bg-[#E2F4E2] px-10 py-3.5 font-lora text-md cursor-pointer tracking-wide font-medium text-[#5A5A5A] shadow-xl hover:bg-[#D0E8D0] transition-colors font-lora">
                  VIEW AVAILABLE KITTENS
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
