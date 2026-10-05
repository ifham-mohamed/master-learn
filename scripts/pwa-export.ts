import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
export async function exportPwa(out: string, base: string) {
  const urls: string[] = [];
  async function walk(dir: string) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) await walk(full);
      else if (/\.(js|css|woff2)$/.test(entry.name))
        urls.push(base + "/" + path.relative(out, full).split(path.sep).map(encodeURIComponent).join("/"));
    }
  }
  await walk(path.join(out, "_next", "static"));
  urls.push(
    ...[
      "/",
      "/today/",
      "/reviews/",
      "/settings/",
      "/search/",
      "/plan/",
      "/weeks/",
      "/learning/",
      "/offline/",
      "/search-index.json",
      "/icon.svg",
      "/icons/icon-192.png",
      "/icons/icon-512.png",
    ].map((p) => base + p),
  );
  const version = createHash("sha256")
    .update(
      JSON.stringify(urls) + (await readFile(path.join(out, "index.html"))),
    )
    .digest("hex")
    .slice(0, 12);
  const sw = `const PREFIX='learnspace-shell-',CACHE=PREFIX+'${version}',TASKS='learnspace-tasks-v1',BASE=${JSON.stringify(base)},URLS=${JSON.stringify(urls)};
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(URLS))));
self.addEventListener('activate',event=>event.waitUntil((async()=>{for(const key of await caches.keys())if(key.startsWith(PREFIX)&&key!==CACHE){await caches.delete(key);await caches.delete(TASKS);};await self.clients.claim();})()));
self.addEventListener('message',event=>{if(event.data?.type==='ACTIVATE')self.skipWaiting();});
self.addEventListener('fetch',event=>{const request=event.request,url=new URL(request.url);if(request.method!=='GET'||url.origin!==self.location.origin||!url.pathname.startsWith(BASE+'/')||url.pathname.includes('/api/')||(url.search&&request.mode!=='navigate'))return;
event.respondWith((async()=>{const shell=await caches.open(CACHE);if(url.pathname.includes('/_next/static/'))return (await shell.match(request))||fetch(request);
try{const response=await fetch(request);return response;}catch{const saved=(await shell.match(request,{ignoreSearch:true}))||(await (await caches.open(TASKS)).match(request,{ignoreSearch:true}));if(saved)return saved;if(request.mode==='navigate')return await shell.match(BASE+'/offline/');return Response.error();}})());});`;
  await writeFile(path.join(out, "sw.js"), sw);
  await writeFile(
    path.join(out, "manifest.webmanifest"),
    JSON.stringify({
      id: base + "/",
      name: "Learnspace",
      short_name: "Learnspace",
      description: "Your personal learning workspace",
      start_url: base + "/today/",
      scope: base + "/",
      display: "standalone",
      background_color: "#f5f8f7",
      theme_color: "#27775f",
      icons: [192, 512].map((size) => ({
        src: base + `/icons/icon-${size}.png`,
        sizes: `${size}x${size}`,
        type: "image/png",
        purpose: "any maskable",
      })),
    }),
  );
  console.log(
    "Generated install manifest and versioned offline application cache.",
  );
}
