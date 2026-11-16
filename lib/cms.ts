import 'server-only';
import {cache} from 'react';
import {createClient} from '@supabase/supabase-js';
import fallback from './cms-fallback.json';
import type {ContentMap,PublicLists,SiteSettings} from './cms-types';
import type {KittenApplicationData} from './kitten-application';
const tables=['site_content','kittens','cats','faqs','reviews','posts'] as const;
async function readTable(table:typeof tables[number]) {
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
 if(url&&key)try{
  const query=table==='site_content'?'select=*&is_published=eq.true':'select=*&is_published=eq.true&order=sort_order.asc,id.asc';
  const response=await fetch(`${url.replace(/\/$/,'')}/rest/v1/${table}?${query}`,{headers:{apikey:key,Authorization:`Bearer ${key}`},next:{revalidate:60,tags:['cms']},signal:AbortSignal.timeout(5000)});
  if(!response.ok)throw new Error();
  const data:unknown=await response.json();
  if(!Array.isArray(data)||data.some(row=>!row||typeof row!=='object'||!row.data||typeof row.data!=='object'||Array.isArray(row.data)))throw new Error();
  return data;
 }catch{console.warn(`CMS ${table} unavailable; using bundled content.`)}
 return fallback[table];
}
export const getCms=cache(async()=>{
 const [content,...lists]=await Promise.all(tables.map(readTable));
 const defaults=Object.fromEntries(fallback.site_content.map(row=>[row.key,row.data]));
 const contentMap={...defaults,...Object.fromEntries(content.map(row=>[row.key,{...defaults[row.key],...row.data}]))} as ContentMap;
 // Canonical settings also update the matching seeded copy in sections/footer.
 const original=fallback.site_content.find(row=>row.key==='settings')!.data as unknown as SiteSettings;
 const settings=contentMap.settings as unknown as SiteSettings & {location:string;prices:{kitten:number;deposit:number;balance:number}};
 const replacements=[[original.logo,settings.logo],[original.ui.subscribe,settings.ui.subscribe],[original.ui.readMore,settings.ui.readMore],[original.brand,settings.brand],[original.email,settings.email],['Austin, Texas',settings.location],...([['$4,500',settings.prices?.kitten],['$1,000',settings.prices?.deposit],['$3,500',settings.prices?.balance]] as const).map(([old,price])=>[old,typeof price==='number'?'$'+price.toLocaleString('en-US'):old])];
 for(const [key,fields] of Object.entries(contentMap)){
  if(key==='settings'||key==='application')continue;
  contentMap[key]=Object.fromEntries(Object.entries(fields).map(([name,value])=>[name,typeof value==='string'?replacements.reduce((s,[from,to])=>from&&to?s.replaceAll(from,to):s,value):value]));
 }
 return {content:contentMap,settings:contentMap.settings as unknown as SiteSettings,lists:Object.fromEntries(tables.slice(1).map((t,i)=>[t,lists[i]])) as PublicLists};
});
export async function getApplication():Promise<KittenApplicationData>{
 const {content}=await getCms();
 const data=content.application as unknown as KittenApplicationData;
 if(!data?.title||!data.description||!Array.isArray(data.questions)||!data.questions.length||new Set(data.questions.map(q=>q.id)).size!==data.questions.length||data.questions.some(q=>!Number.isSafeInteger(q.id)||!q.question||!Array.isArray(q.options)||q.options.some(o=>typeof o!=='string')))return fallback.site_content.find(r=>r.key==='application')!.data as unknown as KittenApplicationData;
 return data;
}
export async function saveApplication(contact:Record<string,string>,answers:unknown[]){
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!url||!key)return false;
 try{const db=createClient(url,key,{auth:{persistSession:false},global:{fetch:(input,init)=>fetch(input,{...init,signal:AbortSignal.timeout(10000)})}});const {error}=await db.from('applications').insert({contact,answers});return !error}catch{return false}
}
