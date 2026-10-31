import type { Metadata } from "next";
import { SourcePage } from "@/components/source-page";
import data from "@/lib/our-cats.json";
export const metadata: Metadata = { title: data.title, description: data.description };
export default function OurCats() { return <SourcePage data={data} />; }
