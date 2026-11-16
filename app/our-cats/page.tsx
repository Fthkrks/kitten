import type { Metadata } from "next";
import { CmsPage } from "@/components/cms-page";
import data from "@/lib/our-cats.json";
export const metadata: Metadata = { title: data.title, description: data.description };
export default function Page() {return <CmsPage page="our-cats"/>}
export const revalidate=60;
