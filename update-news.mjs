// يجلب عناوين الكرة من أخبار Google (RSS) ويكتب news.json — عدّل القائمة Q لتغيير المواضيع
import { writeFileSync } from 'node:fs';
const Q = [['dz','المنتخب الجزائري'],['dz','الرابطة المحترفة الأولى'],['eu','دوري أبطال أوروبا'],['eu','الدوري الإنجليزي الممتاز'],['eu','الدوري الإسباني'],['af','كأس أمم أفريقيا'],['af','المنتخب المغربي'],['tr','انتقالات اللاعبين']];
const ENT = {amp:'&',lt:'<',gt:'>',quot:'"',apos:"'"};
const dec = s => s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g,'$1').replace(/&(#x[0-9a-f]+|#\d+|\w+);/gi,(m,e)=>e[0]==='#'?String.fromCodePoint(e[1].toLowerCase()==='x'?parseInt(e.slice(2),16):+e.slice(1)):(ENT[e.toLowerCase()]??m)).trim();
const tag = (x,t) => { const m = x.match(new RegExp('<'+t+'[^>]*>([\\s\\S]*?)</'+t+'>')); return m ? dec(m[1]) : ''; };
const out = [], seen = new Set();
for (const [c,q] of Q) {
  try {
    const url = 'https://news.google.com/rss/search?q=' + encodeURIComponent(q + ' when:3d') + '&hl=ar&gl=DZ&ceid=DZ:ar';
    const r = await fetch(url, { headers: {'User-Agent':'Mozilla/5.0 (compatible; FootballNewsBot/1.0)'}, signal: AbortSignal.timeout(20000) });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    const xml = await r.text();
    for (const [, it] of xml.matchAll(/<item>([\s\S]*?)<\/item>/g)) {
      const src = tag(it,'source'); let t = tag(it,'title');
      if (src && t.endsWith(' - ' + src)) t = t.slice(0, -(src.length + 3));
      const k = t.replace(/[^\p{L}\p{N}]/gu,'').slice(0,40), d = new Date(tag(it,'pubDate'));
      if (!t || seen.has(k) || isNaN(d)) continue;
      seen.add(k); out.push({ c, t, r: src, u: tag(it,'link'), d: d.toISOString() });
    }
  } catch (e) { console.log('فشل:', q, e.message); }
  await new Promise(r => setTimeout(r, 500));
}
if (!out.length) { console.error('لم يتم جلب أي خبر — لم يتغير news.json'); process.exit(1); }
out.sort((a,b) => b.d.localeCompare(a.d));
const n = {}, items = out.filter(i => (n[i.c] = (n[i.c] || 0) + 1) <= 12);
writeFileSync('news.json', JSON.stringify({ updated: new Date().toISOString(), items }, null, 1));
console.log(items.length, 'خبر');
