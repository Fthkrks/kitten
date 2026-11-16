import {getCms} from '@/lib/cms';
import {PageContent} from './generated-content';
import {SourcePage} from './source-page';
export async function CmsPage({page}:{page:'home'|'available-kittens'|'our-cats'|'adoption-process'|'faq'|'blog'}){
 const {content,lists,settings}=await getCms();
 return <SourcePage lists={lists} applyLabel={settings.applyLabel}><PageContent page={page} content={content} lists={lists}/></SourcePage>;
}
