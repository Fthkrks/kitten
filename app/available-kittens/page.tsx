import type { Metadata } from "next";
import { SourcePage } from "@/components/source-page";
import data from "@/lib/available-kittens.json";
export const metadata: Metadata = { title: data.title, description: data.description };
export default function AvailableKittens() { return <SourcePage data={data} />; }
