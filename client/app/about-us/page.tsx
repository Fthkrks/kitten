import React from "react";
import CardImage from "../_components/CardImage";
import About from "./_components/About";
import Parag from "../_components/Parag";
import TimeLine from "./_components/TimeLine";
import Card from "../_components/Card";
import Cards from "../_components/Card";
import Faq from "../_components/Faq";
import Why from "./_components/Why";
import Media from "../_components/Media";
import VideoGallery from "../_components/Video";

const cards = [
  {
    title: "A Tribute To Jason: The Kerosene To My Fire",
    text: `This section is dedicated to my best friend, my confidant, my partner – Jason Geers. His support has been invaluable in my life and in the growth of Ethereal Persians. 

Back in 2015 I imagined I could run Ethereal Persians all by myself. That was naive. There were moments of exhaustion, depression and financial crisis that I could not overcome on my own. Jason helped me overcome incredible challenges and over time it became apparent that running a cattery was a 2 person job (or more; at least for us). In 2022, our cattery became financially sustainable (not lucrative). In response, Jason gave up his career (and income) as a mailman to help grow our dream cattery.

You may recognize his hand in our cat photos or his voice in the background of our videos. What is not as obvious is his role behind the scene. He medicates, feeds and takes care of all physical and many online kitty chores when I am sick, overwhelmed or unable to for any reason. He also specializes in things I don’t, like website management. Jasons encourages me like no ne else can.  He is the glue that keeps me together and the kerosene to my fire!    `,
    img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=80&w=500",
  },
  
  {
    title: "The Healer In Me",
    text: "A large part of who I am as a breeder was influenced by my experience as a veterinary technician. The clinic is where I witnessed first hand the grave impact disease has on pets and pet owners. That’s where I cultivated my fundamental beliefs about disease management and where I learned to build and present treatment plans, aid in surgeries, perform dental cleanings, medicate and confidently restrain dogs and cats. I gained invaluable clinical experience and learned conventional veterinary medicine and pathology at an accelerated rate. My appreciation and understanding of veterinary medicine grew tremendously as a vet tech.",
    img: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&q=80&w=500",
    bg: "#fff",
    reverse: true
  }
]

const faqsTitle = "FAQ";
const faqs = [
  {
    question: "What is the purpose of this website?",
    answer: "This website is a platform for sharing information about the company and its products."
  },
  {
    question: "What is the purpose of this website?",
    answer: "This website is a platform for sharing information about the company and its products."
  },
  {
    question: "What is the purpose of this website?",
    answer: "This website is a platform for sharing information about the company and its products."
  },
  {
    question: "What is the purpose of this website?",
    answer: "This website is a platform for sharing information about the company and its products."
  }
];

function page() {
  const story = {
    heroImage: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&q=80&w=1800",
    heading: "ABOUT US",
    cardTitle: "OUR STORY",
    cardText: "Hey Friend! I'm glad you're here. My name is Roxy and my hubby is Jason. Together, we created Ethereal Persians. Neither of us grew up planning to breed persian cats. We simply allowed our passion to guide us and paid close attention to detail. Now, we proudly produce exceptional persian kittens for the most fanatic persian lovers.",
    overlayColor: "rgba(0,0,0,0.10)",
    parallaxSpeed: 0.3,
    backgroundColor: "#f9f1f1",
  }


  return (
    <div>
      <CardImage {...story} />
      <About />
      <Parag />
      <TimeLine />
      {cards.map((card) => (
        <Cards key={card.title} {...card} />
      ))}
      <Faq title={faqsTitle} questions={faqs} />
      <Why />
      <Media/>
      <VideoGallery/>
    </div>
  );
}

export default page;
