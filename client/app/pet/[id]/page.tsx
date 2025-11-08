import CardImage from "../../_components/CardImage";
import PetDetail from "../../_components/PetDetail";
import { petsData } from "../../../data/petData";
import type { PetDetail as PetDetailType } from "../../../data/petData";

// Generate static params for all pets
export async function generateStaticParams() {
  return petsData.map((pet) => ({
    id: pet.id,
  }));
}

// Get pet by id
function getPetById(id: string): PetDetailType | null {
  const pet = petsData.find((pet) => pet.id === id);
  return pet || null;
}

export default async function PetPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pet = getPetById(id);

  if (!pet) {
    const availableIds = petsData.map(p => p.id).join(", ");
    const defaultDetailBg = "#E0F2F7";
    return (
      <>
        <CardImage
          heroImage="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=1800"
          heading="AVAILABLE KITTEN"
          cardTitle="AVAILABLE KITTENS"
          cardText="Discover our adorable Persian kittens ready for their forever homes. Each kitten is lovingly raised with care, socialized, and comes from our champion bloodlines."
          overlayColor="rgba(0,0,0,0.15)"
          parallaxSpeed={0.3}
          backgroundColor="#f9f1f1"
        />
        <div className="w-full min-h-screen flex items-center justify-center" style={{ backgroundColor: defaultDetailBg }}>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Pet Not Found</h1>
            <p className="text-gray-600 mb-6">
              Pet with ID "{id}" doesn't exist.
              <br />
              Available IDs: {availableIds}
            </p>
            <a
              href="/avaible-kittens"
              className="text-[#b1868e] hover:text-[#a67d8f] font-semibold"
            >
              ← Back to Available Kittens
            </a>
          </div>
        </div>
      </>
    );
  }

  // Create cardImage props from pet data
  const cardImage = {
    heroImage: pet.image,
    heading: pet.name.split("|")[0].trim().toUpperCase() || pet.name.toUpperCase(),
    cardTitle: pet.name,
    cardText: pet.gender 
      ? `${pet.gender.split("|")[0]?.trim() || ""} ${pet.breed ? `- ${pet.breed}` : ""} ${pet.coatColor ? `- ${pet.coatColor}` : ""}`.trim()
      : pet.breed || "Persian Cat",
    overlayColor: "rgba(0,0,0,0.15)",
    parallaxSpeed: 0.3,
    backgroundColor: "#f9f1f1",
  };

  return (
    <>
      <CardImage {...cardImage} />
      <PetDetail pet={pet} />
    </>
  );
}

