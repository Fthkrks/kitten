import type { Metadata } from "next";
import { SourcePage } from "@/components/source-page";
import data from "@/lib/home.json";
export const metadata: Metadata = { title: data.title, description: data.description };
export default function Home() { return <SourcePage data={data} />; }
