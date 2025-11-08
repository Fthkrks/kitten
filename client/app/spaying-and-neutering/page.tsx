import React from 'react'
import CardImage from '../_components/CardImage'
import Paragrafh from '../_components/paragrafh'

function page() {
    const cardImage = {
        heroImage: "https://images.unsplash.com/photo-1555680209-51b6ecfa0db9?auto=format&fit=crop&q=80&w=1800",
        heading: "SPAYING AND NEUTERING",
        cardTitle: "RESPONSIBLE SURGERY PROTOCOL",
        cardText: "We believe in responsible pet ownership and veterinarian-guided care. Our kittens receive spay or neuter procedures when age-appropriate, following veterinary recommendations for optimal timing and recovery. We prioritize their health and comfort throughout the process.",
        overlayColor: "rgba(0,0,0,0.25)",
        parallaxSpeed: 0.25,
        backgroundColor: "#F9F1F1",
    }
    const paragrafhData = {
        sections: [
            {
                title: "THE PROS OF SPAYING & NEUTERING",
                paragraphs: [
                    "Spaying and neutering before sexual maturity brings notable health and behavior benefits. Females are protected from pyometra and drastically reduced risk of certain cancers; males avoid testicular cancer. Both sexes typically become calmer, more predictable companions that integrate better with family life and receive veterinary care more readily when needed.",
                ],
            },
            {
                title: "THE CONS OF SPAYING AND NEUTERING",
                paragraphs: [
                    "Sex hormones influence muscle formation, bone density, and metabolism. After surgery, the body compensates for lowered hormones and the digestive system can slow slightly. Without portion adjustments and activity, some cats may gain weight more easily. Thoughtful feeding and play time help offset these changes.",
                ],
            },
            {
                title: "MAKE NO MISTAKE",
                paragraphs: [
                    "Even considering hormonal changes, the benefits of desexing far outweigh the drawbacks for most pet homes. Responsible timing prevents unwanted litters and discourages breeding of cats with sub‑optimal characteristics. If you are not prepared to devote time and space to breeding, please alter your pet.",
                ],
            },
            {
                title: "PESKY MATING BEHAVIORS",
                paragraphs: [
                    "Intact males and females often spray, vocalize, and display territorial disputes. Males may spray both indoors and outdoors; females can also spray and call loudly during heat. Territorial conflicts are common and stressful. For these reasons, intact males must often be separated from females and kittens—altered cats make better pets for most families.",
                ],
            },
        ],
        bg: "#ffffff",
    }
  return (
    <div>
        <CardImage {...cardImage} />
        <Paragrafh {...paragrafhData} />
    </div>
  )
}

export default page