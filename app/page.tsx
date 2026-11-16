import type { Metadata } from "next";
import { CmsPage } from "@/components/cms-page";
import data from "@/lib/home.json";
export const metadata: Metadata = { title: data.title, description: data.description };
export default function Page() {return <CmsPage page="home"/>}
export const revalidate=60;
