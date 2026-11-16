import type { Metadata } from "next";
import { CmsPage } from "@/components/cms-page";
import data from "@/lib/available-kittens.json";
export const metadata: Metadata = { title: data.title, description: data.description };
export default function Page() {return <CmsPage page="available-kittens"/>}
export const revalidate=60;
