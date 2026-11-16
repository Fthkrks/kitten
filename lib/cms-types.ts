export type ContentFields = Record<string, string>;
export type PublicRow = { id:string; name:string; group_key:string; data:ContentFields & { _template?:number; photos?:string[]; video?:string; description?:string; traits?:{label:string;value:string}[] }; sort_order:number; is_published:boolean; status?:string; slug?:string; faq_page?:boolean; home_preview?:boolean; buyer_faq?:boolean };
export type PublicLists = Record<'kittens'|'cats'|'faqs'|'reviews'|'posts',PublicRow[]>;
export type ContentMap = Record<string,ContentFields>;
export type SiteSettings = {brand:string;email:string;logo:string;applyLabel:string;navigation:{href:string;label:string}[];socials:{href:string;label:string;icon:string}[];ui:{loadMore:string;readMore:string;subscribe:string}};
