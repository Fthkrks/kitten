interface WhyProps {
  reasons: Array<{
    number: number;
    text: string;
  }>;
}

export default function Why({ reasons }: WhyProps) {
  return (
    <section className="w-full pt-10 pb-10 flex flex-col items-center bg-white">
      <h2 className="font-serif text-3xl md:text-4xl text-center text-[#3a2b28] font-normal">Why We Breed</h2>
      <div className="border-t border-gray-200 w-72 mx-auto my-3" />
      <div className="text-center text-[#83796d] text-sm mb-7 mt-2">
        We're often asked what motivated us to continue breeding. Here are our top 4 reasons:
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-20 gap-y-10 w-full max-w-3xl mx-auto mt-2 mb-6">
        {reasons.map((item) => (
          <div key={item.number} className="flex flex-col items-center">
            <div className="w-20 h-20 flex items-center justify-center mb-3">
              <span
                className="block w-full h-full flex items-center justify-center"
                style={{ transform: 'rotate(45deg)' }}
              >
                <span
                  className="w-20 h-20 bg-gradient-to-br from-[#afc4cc] to-[#8eb3bf] text-white text-2xl font-bold font-sans flex items-center justify-center"
                  style={{ borderRadius: '12%', boxShadow: '0 2px 10px 0 #c7d6df11' }}
                >
                  <span style={{ transform: 'rotate(-45deg)' }} className="block">
                    {item.number}
                  </span>
                </span>
              </span>
            </div>
            <div className="text-[#666d6f] text-base text-center font-medium" style={{ maxWidth: 275 }}>
              {item.text}
            </div>
          </div>
        ))}
      </div>
      <div className="text-center text-[#a5a2a2] italic mb-1 mt-2 text-sm" style={{maxWidth:700}}>
        Our story may have started with me but it grew to include you and many others. If we have pawsitively touched your life please leave us a review to let us and other know.
      </div>
    </section>
  );
}
