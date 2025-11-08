import React from 'react'
import CardImage from '../_components/CardImage'
import TextImage from './_components/TextImage'

function page() {
    const cardImage = {
        heroImage: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&q=80&w=1800",
        heading: "HISTORY",
        cardTitle: "OUR HISTORY",
        cardText: "Our history is a story of love, dedication, and the pursuit of perfection. It all started in 2015 when we first met and fell in love with the Persian cat breed. We were instantly hooked by their unique beauty and gentle nature. From that day forward, we knew we wanted to share our love for these cats with the world.",
        overlayColor: "rgba(0,0,0,0.15)",
        parallaxSpeed: 0.3,
        backgroundColor: "#f9f1f1",
    }

    const textImageData = {
        leftImage: {
            src: "https://images.unsplash.com/photo-1513366208864-87536b8bd7b4?w=800&h=600&fit=crop",
            alt: "Persian cat 1903",
            title: "Persian cat 1903",
            caption: "THE ARISTOMED MOGGAR"
        },
        rightImage: {
            src: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&h=600&fit=crop",
            alt: "Persian cat 2023",
            title: "Persian cat 2023",
            caption: "Tiponi Pluto of De' Ethereal"
        },
        paragraphs: [
            "Persian cats have dramatically transformed from traditional (mesocephalic) to extreme (brachycephalic) over the last century due to artificial selection, making them almost unrecognizable from their ancestors.",
            "Persian cats are descendants of Angora cats crossed with British longhairs, founded in Persia (modern-day Iran). They were popular with royal families for their luxurious coats, personality, and affection, and were shipped to the United States between 1500-1800.",
            "Breeders selectively bred traditional Persians into modern flat and peke-face types. The traditional ancestor was a short, broad cat with good bone structure and a protruding, well-rounded snout. The modern Persian retains the short, broad body but has a much rounder head and a \"peke-face\" look, with the nose break centered between the eyes and the snout flush with the face. Flat and peke-faced Persians are now more prevalent than \"doll face\" Persians.",
            "\"Ethereal Persians Cattery\" aims to produce \"doll face\" Persians. These cats have midstream features between traditional and extreme Persians, characterized by a slightly protruding muzzle and a nose below the lower eyelid. Doll face snouts are shorter than traditional Persians but longer than extreme Persians. The cattery also breeds for the exaggerated extreme coat seen in modern Persians."
        ],
        showPhylogeneticTree: true
    }

  return (
    <div>
        <CardImage {...cardImage} />
        <TextImage {...textImageData} />
    </div>
  )
}

export default page