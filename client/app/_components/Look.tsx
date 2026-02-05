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
              At Astrid Moon Cattery, we specialize in carefully selected colors including Golden, Blue Golden, Black Golden Shaded, Black Golden Shell, and Bi-Color kittens. These beautiful varieties are the foundation of our breeding program and reflect the type and quality we aim to produce.
            </p>
            <p className="mt-4 text-md leading-7 text-[#5A5A5A]/80 max-w-sm">
              From rich golden tones to light shell patterns and striking bi-color combinations, each kitten is evaluated not only for color, but also for health, temperament, structure, and overall balance.
            </p>
            <p className="mt-4 text-md leading-7 text-[#5A5A5A]/80 max-w-sm">
              We believe that true beauty is a combination of color, character, and quality — and every kitten is special in its own way.
            </p>
          </div>

          {/* Right: Two lists */}
          <div className="md:col-span-2">
            <div className="grid sm:grid-cols-2 gap-10">
              {/* Traditional Colors */}
              <div>
                <div className="flex items-center gap-4">
                  <span className="h-px w-10 bg-gray-300" />
                  <h3 className="font-lora text-[#8EA58E] text-lg">Traditional colors</h3>
                </div>
                <ul className="mt-4 space-y-2 text-[#5A5A5A]/80 text-sm">
                  <li>Golden</li>
                  <li>Blue golden</li>
                  <li>Black golden shaded</li>
                  <li>Black golden shell (Chinchilla Golden)</li>
                  <li>Bicolors</li>
                  <li>Odd-Eye</li>
                </ul>
              </div>

              {/* Coat Color Codes */}
              <div className="">
                <div className="flex items-center gap-4">
                  <span className="h-px w-10 bg-gray-300" />
                  <h3 className="font-lora text-[#8EA58E] text-lg">Coat Color Codes</h3>
                </div>
                <ul className="mt-4 space-y-2 text-[#5A5A5A]/80 text-sm">
                  <li>Ny11</li>
                  <li>Ny12</li>
                  <li>Cy11</li>
                  <li>Cy12</li>
                  <li>By11</li>
                  <li>By12</li>
                  <li>Ay11</li>
                  <li>Ay12</li>
                  <li>Ny25</li>
                  <li>By25</li>
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
