import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
const require = createRequire(path.resolve(process.env.HASH_DEPENDENCIES, 'package.json'));
const { hash } = require('blake3-wasm');
const baseline = JSON.parse(await fs.readFile('ops/live-baseline.json', 'utf8'));
const out = path.resolve('website/live');
await fs.mkdir(out, {recursive:true});
const entries = Object.entries(baseline.files).filter(([p]) => !p.startsWith('/.'));
const verified = {};
let next = 0;
const failures = [];
async function getOne(name, expected) {
  const relative = name.slice(1);
  const target = path.resolve(out, relative);
  if (!target.startsWith(out + path.sep)) throw new Error('Unsafe path ' + name);
  let last;
  for (let attempt=0; attempt<3; attempt++) {
    try {
      const res = await fetch(baseline.url + name, {signal:AbortSignal.timeout(60000)});
      if (!res.ok && !(res.status===404 && /404(?:\/index)?\.html$/.test(name))) throw new Error('HTTP ' + res.status);
      const bytes = Buffer.from(await res.arrayBuffer());
      const actual = hash(bytes.toString('base64') + path.extname(name).slice(1)).toString('hex').slice(0,32);
      if (actual !== expected) throw new Error('Hash mismatch: expected ' + expected + ' got ' + actual);
      await fs.mkdir(path.dirname(target), {recursive:true});
      await fs.writeFile(target, bytes);
      verified[name] = {cloudflare:actual,sha256:createHash('sha256').update(bytes).digest('hex'),bytes:bytes.length};
      return;
    } catch(err) { last=err; }
  }
  throw new Error(name + ': ' + last.message);
}
await Promise.all(Array.from({length:8}, async () => {
  while(next<entries.length) {
    const [name,expected] = entries[next++];
    try { await getOne(name,expected); } catch(err) { failures.push(err.message); }
    if(Object.keys(verified).length%100===0) console.log('Verified '+Object.keys(verified).length+'/'+entries.length);
  }
}));
if (failures.length) throw new Error(failures.join('\n'));
const htmlPath=path.join(out,'index.html');
const html=await fs.readFile(htmlPath,'utf8');
const before='אירועי ספורט ותרבות, כנסים, הרצאות, סמינרים וחתונות';
const after='אירועי ספורט ותרבות, כנסים, הרצאות, סמינרים';
if(html.split(before).length!==2) throw new Error('Expected exactly one events sentence');
await fs.writeFile(htmlPath,html.replace(before,after),'utf8');
const report={deployment_id:baseline.id,source_url:baseline.url,verified_files:entries.length,excluded_internal_build_files:Object.keys(baseline.files).filter(p=>p.startsWith('/.')),changes:[{path:'/index.html',before,after}],files:Object.fromEntries(Object.entries(verified).sort())};
await fs.writeFile('ops/live-recovery-report.json',JSON.stringify(report,null,2)+'\n');
console.log('Verified all '+entries.length+' public assets; only change: remove וחתונות from homepage.');
