import {test} from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import ts from 'typescript';
const fallback=JSON.parse(readFileSync(new URL('../lib/cms-fallback.json',import.meta.url),'utf8'));
function setup(env={},transport=()=>Promise.reject(new Error('offline'))){
 const exports={},calls=[];
 const source=ts.transpileModule(readFileSync(new URL('../lib/cms.ts',import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText;
 vm.runInNewContext(source,{exports,process:{env},console:{warn(){}},AbortSignal,fetch:async(...args)=>{calls.push(args);return transport(...args)},require:name=>({'server-only':{},react:{cache:fn=>fn},'./cms-fallback.json':fallback,'@supabase/supabase-js':{createClient:()=>({from:()=>({insert:async()=>({error:null})})})}}[name])});
 return {...exports,calls};
}
test('missing environment and failed Supabase queries preserve every seeded collection and colour note',async()=>{
 for(const app of [setup(),setup({NEXT_PUBLIC_SUPABASE_URL:'http://local',NEXT_PUBLIC_SUPABASE_ANON_KEY:'public'})]){
  const data=await app.getCms();assert.equal(data.lists.kittens.length,2);assert.equal(data.lists.cats.length,16);assert.equal(data.lists.posts.length,9);assert.ok(data.content['home.hero-heading'].heading);const form=await app.getApplication();assert.equal(form.questions.length,18);assert.ok(form.questions[1].note);
 }
});
test('valid empty collections stay empty; successful reads use ISR and the cms revalidation tag',async()=>{
 const app=setup({NEXT_PUBLIC_SUPABASE_URL:'http://local',NEXT_PUBLIC_SUPABASE_ANON_KEY:'public'},async()=>Response.json([]));
 const data=await app.getCms();assert.equal(data.lists.kittens.length,0);assert.equal(data.lists.posts.length,0);assert.equal(app.calls.length,6);assert.ok(app.calls.every(([,options])=>options.next.revalidate===60&&options.next.tags[0]==='cms'));assert.ok(data.content['home.hero-heading'].heading);
});
test('service-role insert is optional and is never configured with a public key',async()=>{
 assert.equal(await setup().saveApplication({},[]),false);
 assert.equal(await setup({NEXT_PUBLIC_SUPABASE_URL:'http://local',SUPABASE_SERVICE_ROLE_KEY:'private-test'}).saveApplication({},[]),true);
});

test('visible review photos and their lightbox destinations share one image value',async()=>{
 const {createRequire}=await import('node:module');const {renderToStaticMarkup}=await import('react-dom/server');const {createElement}=await import('react');
 const require=createRequire(import.meta.url),exports={};
 const source=ts.transpileModule(readFileSync(new URL('../components/generated-content.tsx',import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText;
 vm.runInNewContext(source,{exports,require});
 const lists=structuredClone(fallback),review=lists.reviews.find(row=>row.group_key==='carousel');
 review.data.image='https://example.com/replaced-family-photo.webp';
 const html=renderToStaticMarkup(createElement(exports.PageContent,{page:'home',content:Object.fromEntries(fallback.site_content.map(row=>[row.key,row.data])),lists}));
 assert.ok(html.includes('data-photo="https://example.com/replaced-family-photo.webp"'));
});
test('kitten badges and accessible profile names derive from the structured status and name',async()=>{
 const {createRequire}=await import('node:module');const {renderToStaticMarkup}=await import('react-dom/server');const {createElement}=await import('react');
 const require=createRequire(import.meta.url),exports={};
 const source=ts.transpileModule(readFileSync(new URL('../components/generated-content.tsx',import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText;
 vm.runInNewContext(source,{exports,require});
 const lists=structuredClone(fallback);lists.kittens[0].name='Renamed';lists.kittens[0].status='reserved';
 const html=renderToStaticMarkup(createElement(exports.PageContent,{page:'available-kittens',content:Object.fromEntries(fallback.site_content.map(row=>[row.key,row.data])),lists}));
 const card=html.match(/<article\b[^>]*data-kitten-status="reserved"[\s\S]*?<\/article>/)?.[0];
 assert.ok(card);assert.equal((card.match(/>Reserved</g)||[]).length,2);
 assert.ok(card.includes('Read Renamed&#x27;s full profile and watch Renamed&#x27;s video'));
});
