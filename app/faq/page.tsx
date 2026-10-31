import type { Metadata } from "next";
import { SourcePage } from "@/components/source-page";
import data from "@/lib/faq.json";
export const metadata: Metadata = { title: data.title, description: data.description };
export default function FAQ() { return <SourcePage data={data} />; }
