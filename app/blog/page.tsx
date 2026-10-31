import type { Metadata } from "next";
import { SourcePage } from "@/components/source-page";
import { BlogGrid } from "@/components/blog-grid";
import data from "@/lib/blog.json";
export const metadata: Metadata = { title: data.title, description: data.description };
export default function Blog() { return <><SourcePage data={{ sections: data.sections.slice(0, 1) }} /><BlogGrid /></>; }
