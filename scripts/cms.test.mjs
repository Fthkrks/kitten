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
