import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp,mkdir,writeFile,readFile,rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import vm from 'node:vm';
import { exportPwa } from '../scripts/pwa-export';
test('Pages PWA scopes installation and offline caching without intercepting Google or server APIs',async()=>{
 const dir=await mkdtemp(path.join(tmpdir(),'learnspace-pwa-'));
 try{
 await mkdir(path.join(dir,'_next/static/[id]'),{recursive:true});await writeFile(path.join(dir,'_next/static/[id]/app.js'),'');await writeFile(path.join(dir,'index.html'),'<h1>app</h1>');
 await exportPwa(dir,'/master-learn');const manifest=JSON.parse(await readFile(path.join(dir,'manifest.webmanifest'),'utf8'));
 assert.equal(manifest.scope,'/master-learn/');assert.equal(manifest.start_url,'/master-learn/today/');assert.equal(manifest.icons.length,2);
 assert.match(await readFile(path.join(dir,'sw.js'),'utf8'),/%5Bid%5D/);
 const events:Record<string,(event:unknown)=>void>={};const cache={match:async(url:Request|string)=>typeof url==='string'&&url.endsWith('/offline/')?new Response('Offline fallback'):undefined};
 vm.runInNewContext(await readFile(path.join(dir,'sw.js'),'utf8'),{URL,Response,self:{location:{origin:'https://example.github.io'},addEventListener:(name:string,fn:(event:unknown)=>void)=>events[name]=fn},caches:{open:async()=>cache},fetch:async()=>{throw new Error('offline');}});
 for(const url of ['https://sheets.googleapis.com/v4/spreadsheets','https://example.github.io/master-learn/api/private','https://example.github.io/other/']){let handled=false;events.fetch({request:{url,method:'GET',mode:'cors'},respondWith:()=>handled=true});assert.equal(handled,false);}
 let result:Promise<Response>|undefined;events.fetch({request:{url:'https://example.github.io/master-learn/tasks/CS12/?file=notes',method:'GET',mode:'navigate'},respondWith:(p:Promise<Response>)=>result=p});assert.equal(await (await result!).text(),'Offline fallback');
 }finally{await rm(dir,{recursive:true,force:true});}
});
