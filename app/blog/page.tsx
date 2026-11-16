import {getCms} from "@/lib/cms";
import type { Metadata } from "next";
import { CmsPage } from "@/components/cms-page";
import { BlogGrid } from "@/components/blog-grid";
import data from "@/lib/blog.json";
export const metadata: Metadata = { title: data.title, description: data.description };
export default async function Page() {const {lists,settings}=await getCms();return <><CmsPage page="blog"/><BlogGrid posts={lists.posts.map(row=>({...row.data,date:row.data.date,image:row.data.image,excerpt:row.data.excerpt,title:row.name,slug:row.slug!,href:"/blog/"+row.slug}))} loadMore={settings.ui.loadMore} readMore={settings.ui.readMore}/></>;}
export const revalidate=60;
