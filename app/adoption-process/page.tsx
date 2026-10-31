import type { Metadata } from "next";
import { SourcePage } from "@/components/source-page";
import data from "@/lib/adoption-process.json";
export const metadata: Metadata = { title: data.title, description: data.description };
export default function AdoptionProcess() { return <SourcePage data={data} />; }
