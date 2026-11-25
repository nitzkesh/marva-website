import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
const root=path.resolve('website/live');
const files=[];
async function walk(dir){for(const e of await fs.readdir(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())await walk(p);else files.push(p);}}
await walk(root);
const names=new Set(files.map(p=>'/'+path.relative(root,p).split(path.sep).join('/')));
const required=['/index.html','/en/index.html','/advertisers/index.html','/distributors/index.html','/en/advertisers/index.html','/en/distributors/index.html','/photos/marva-conference-he.webp','/photos/marva-promenade-he.webp'];
for(const name of required)if(!names.has(name))throw Error('Missing required file: '+name);
const errors=[];
for(const file of files.filter(p=>/\.(html|css)$/.test(p))){
 const text=await fs.readFile(file,'utf8');
 const base='https://marva-water.com/'+path.relative(root,file).split(path.sep).join('/');
 const refs=file.endsWith('.html')?[...text.matchAll(/\b(?:src|href|poster)\s*=\s*["']([^"']+)["']/g)].map(m=>m[1]):[...text.matchAll(/url\(\s*["']?([^)"']+)["']?\s*\)/g)].map(m=>m[1]);
 for(const raw of refs){
  if(raw.startsWith('#')||/^(?:data:|mailto:|tel:|javascript:)/.test(raw))continue;
  const u=new URL(raw.replaceAll('&amp;','&'),base);
  if(u.origin!=='https://marva-water.com')continue;
  const name=decodeURIComponent(u.pathname);
  if(![name,name.replace(/\/$/,'')+'/index.html',name+'.html'].some(p=>names.has(p)))errors.push(path.relative(root,file)+': '+raw);
 }
}
if(errors.length)throw Error('Broken local references:\n'+errors.join('\n'));
if(process.argv.includes('--baseline')){
 const report=JSON.parse(await fs.readFile('ops/live-recovery-report.json','utf8'));
 if(names.size!==report.verified_files)throw Error('Recovered file count changed');
 for(const [name,metadata] of Object.entries(report.files)){
  let bytes=await fs.readFile(path.join(root,name.slice(1)));
  if(name==='/index.html'){
   let html=bytes.toString('utf8');
   for(const change of report.changes){
    if(html.includes(change.before)||html.split(change.after).length!==2)throw Error('Unexpected homepage copy');
    html=html.replace(change.after,change.before);
   }
   bytes=Buffer.from(html,'utf8');
  }
  if(createHash('sha256').update(bytes).digest('hex')!==metadata.sha256)throw Error('Unexpected difference from production: '+name);
 }
}
console.log('Validated '+names.size+' published files, required routes and local asset links'+(process.argv.includes('--baseline')?'; all bytes match production except the approved copy edit.':'.'));
