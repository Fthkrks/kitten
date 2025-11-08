import React from 'react'
import CardImage from '../_components/CardImage'
import RecommendedProducts from './_components/RecommendedProducts'

function page() {
    const cardImage = {
        heroImage: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&q=80&w=1800",
        heading: "RECOMMENDED PRODUCTS",
        cardTitle: "ESSENTIAL PRODUCTS FOR YOUR KITTEN",
        cardText: "We've curated a selection of high-quality products that we trust and use ourselves. These recommendations support your kitten's health, comfort, and well-being—from nutrition and grooming to enrichment and safety.",
        overlayColor: "rgba(0,0,0,0.25)",
        parallaxSpeed: 0.25,
        backgroundColor: "#FFF8EE",
    }
    const recommendedProductsData = {
        sections: [
            {
                heading: "HYDRATION",
                categories: [
                    {
                        title: "Drinking Fountains",
                        products: [
                            {
                                imageSrc: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=900&h=700&fit=crop",
                                imageAlt: "Ceramic drinking fountain",
                                title: "Drinkwell Seascape Ceramic",
                                bullets: [
                                    "Dishwasher‑safe glazed ceramic",
                                    "Dual waterfall with replaceable filters",
                                ],
                                cta: { label: "SHOP NOW", href: "#" },
                            },
                            {
                                imageSrc: "https://images.unsplash.com/photo-1511044568932-338cba0ad803?w=900&h=700&fit=crop",
                                imageAlt: "Pagoda water fountain",
                                title: "Drinkwell Pagoda Pet Water Fountain",
                                bullets: [
                                    "Dual free‑falling streams",
                                    "Easy to clean ceramic body",
                                ],
                                cta: { label: "SHOP NOW", href: "#" },
                            },
                        ],
                    },
                    {
                        title: "Fountain Filters",
                        products: [
                            {
                                imageSrc: "https://images.unsplash.com/photo-1568572933382-74d440642117?w=900&h=700&fit=crop",
                                imageAlt: "Round fountain filters",
                                title: "PetSafe Fountain Filters",
                                bullets: [
                                    "Charcoal + foam combo",
                                    "2‑pack replacements",
                                ],
                                cta: { label: "SHOP NOW", href: "#" },
                            },
                            {
                                imageSrc: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=900&h=700&fit=crop",
                                imageAlt: "Fountain replacement kit",
                                title: "MyfatBOSS Replacement Filters",
                                bullets: [
                                    "Compatible with many pagoda models",
                                    "Rinse before use",
                                ],
                                cta: { label: "SHOP NOW", href: "#" },
                            },
                        ],
                    },
                    {
                        title: "Fountain Lights",
                        products: [
                            {
                                imageSrc: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=900&h=700&fit=crop",
                                imageAlt: "Submersible UV light",
                                title: "TAISHAN UV Fountain Light",
                                bullets: [
                                    "Waterproof UV sterilizing light",
                                    "Helps reduce biofilm and odors",
                                ],
                                cta: { label: "SHOP NOW", href: "#" },
                            },
                        ],
                    },
                ],
            },
            {
                heading: "GROOMING",
                categories: [
                    {
                        title: "Combs",
                        products: [
                            {
                                imageSrc: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&h=700",
                                imageAlt: "Fine pet comb",
                                title: "Shiny Pet Grooming Comb",
                                bullets: ["Fine & gentle on long coats"],
                                cta: { label: "SHOP NOW", href: "#" },
                            },
                            {
                                imageSrc: "https://images.unsplash.com/photo-1513366208864-87536b8bd7b4?auto=format&fit=crop&w=900&h=700",
                                imageAlt: "Rake comb",
                                title: "Coastal Pet Grooming Rake",
                                bullets: ["Rounded pins to prevent irritation"],
                                cta: { label: "SHOP NOW", href: "#" },
                            },
                        ],
                    },
                    {
                        title: "Shampoos & Degreasers",
                        products: [
                            {
                                imageSrc: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&h=700",
                                imageAlt: "Orange shampoo bottle",
                                title: "Pooch Botanique F&T Degreaser",
                                bullets: ["Breaks down oil; rinses clean"],
                                cta: { label: "SHOP NOW", href: "#" },
                            },
                            {
                                imageSrc: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=900&h=700",
                                imageAlt: "White paste cleaner jar",
                                title: "Orvus WA Paste Cleaner",
                                bullets: ["Gentle brightening for coats"],
                                cta: { label: "SHOP NOW", href: "#" },
                            },
                        ],
                    },
                ],
            },
        ],
        cardsPerRow: 2 as const,
        cardBg: "#ffffff",
        accentDividerColor: "#E5E7EB",
    }
  return (
    <div>
        <CardImage {...cardImage} />
        <RecommendedProducts {...recommendedProductsData} />
    </div>
  )
}

export default page