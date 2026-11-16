/* =========================================================
   alis · journal — flip engine + content  (home · projects · writings · stack)
   ========================================================= */
(() => {
'use strict';

/* the address shown on the stack page */
const DISPLAY_EMAIL = 'softmaxxer101@gmail.com';
/* where every "dear alis" letter is actually mailed — change only if the inbox changes */
const CONTACT_EMAIL = 'softmaxxer101@gmail.com';
/* The letter form POSTs everything the visitor typed here, so the message reaches the
   inbox even if they never press send in their own mail app. FormSubmit needs no account:
   the first submission emails an activation link to CONTACT_EMAIL — click it once and
   delivery is on. Swap in any endpoint that accepts JSON (Formspree, Web3Forms, your own
   function). Set to '' to fall back to the mailto hand-off alone. */
const FORM_ENDPOINT = 'https://formsubmit.co/ajax/softmaxxer101@gmail.com';

const GITHUB   = 'https://github.com/softmaxxer101';
const HF       = 'https://huggingface.co/softmaxxer101';
const X_URL    = 'https://x.com/import_alis';
const BLOG     = 'https://softmaxxer101.github.io/';

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const ico = (id, cls = 'i') => `<svg class="${cls}"><use href="#${id}"></use></svg>`;

/* ---------------- content ---------------- */
const SECTIONS = [
  { key:'home',     label:'home',          icon:'i-book'   },
  { key:'projects', label:'things i do',   icon:'i-folder' },
  { key:'writings', label:'writings',      icon:'i-pen'    },
  { key:'stack',    label:'stack + say hi', icon:'i-chip'  }
];

/* featured first — the folder grid and the detail panel both read this order.
   href:null renders a quiet note instead of a link. */
const PROJECTS = [
  { n:'Agentic Serving Lab', short:'Agentic Serving', tag:'agentic serving · 3 phases', c:'#fbe38a', i:'i-flask', feat:true,
    blurb:'A three-phase study of multi-step agentic LLM serving, completed November 2026. Phase 0 built a custom request harness around Qwen3-0.6B on one 6 GiB RTX 3050; Phase 1 reproduced the workload with a trie-structured harness; Phase 2 scaled it to Qwen3.8-27B-NVFP4 on dual RTX 5090s via Vast.ai. Every phase is logged as JSONL and reported — latency, throughput and queueing under admission control, including the runs that did not behave.',
    href:'https://github.com/softmaxxer101/agentic-serving',
    links:[
      { t:'phase 2 dashboard', href:'https://softmaxxer101.github.io/agentic-serving/phase-2/index.html' },
      { t:'phase 0 report', href:'https://softmaxxer101.github.io/agentic-serving/agentic-serving-phase1.pdf' },
      { t:'phase 2 report', href:'https://softmaxxer101.github.io/agentic-serving/agentic-serving-phase2.pdf' }
    ] },

  { n:'Inference Engine', tag:'vLLM internals · completed', c:'#c9e4f7', i:'i-rocket',
    blurb:'A vLLM-based inference engine built from first principles and completed this year. I studied the vLLM v1 architecture — paged KV-cache with block tables, continuous batching, the scheduler — then implemented the core components rather than wrapping the library. It runs end to end, which is the only way I trust a claim about memory or scheduling.',
    href:'https://github.com/softmaxxer101/qwenchana' },

  { n:'Inference Gateway', tag:'admission control · completed', c:'#bfe7e1', i:'i-terminal',
    blurb:'A FastAPI gateway in front of vLLM, built to make admission control measurable. Bounded queues, queue deadlines, upstream timeouts, per-request JSONL logs and Prometheus metrics, then SLA-aware admission on top. The two write-ups follow one decision at a time: what the queue did, and what changed when the policy did.',
    href:'https://github.com/softmaxxer101/inference_gateway',
    links:[
      { t:'project site', href:'https://softmaxxer101.github.io/inference_gateway/' },
      { t:'blog 1', href:'https://softmaxxer101.github.io/inference_gateway/blog1.pdf' },
      { t:'blog 2', href:'https://softmaxxer101.github.io/inference_gateway/blog2.pdf' }
    ] },

  { n:'vLLM Workbench', tag:'serving experiments', c:'#e3e0d8', i:'i-doc',
    blurb:'Hands-on vLLM work: serving Qwen through the OpenAI-compatible API, varying concurrency, reading KV-cache logs, and benchmarking streaming TTFT, TPOT, total latency and throughput against Transformers. Also holds the Qwen2.5-0.5B wrapper and CLI, an evaluation pipeline, and a FastAPI server that streams tokens back as plain text.',
    href:'https://github.com/softmaxxer101/vllm-workbench' },

  { n:'PagedAttention from Scratch', short:'PagedAttention', tag:'pure pytorch', c:'#d6cbf6', i:'i-db',
    blurb:'Paged Attention implemented from the paper in pure PyTorch: fixed 16-token KV blocks, per-sequence block tables, free-block tracking, token appends and online blockwise softmax, verified against dense attention. The accompanying PDF works through the block table and the memory-fragmentation question with measurements instead of guesses.',
    href:'https://github.com/softmaxxer101/vllm_architecture',
    writeup:'https://softmaxxer101.github.io/vllm_architecture/paged_attention.pdf' },

  { n:'DeepSeek MLA', tag:'attention · latent kv', c:'#f8b39b', i:'i-layers',
    blurb:'Multi-head Latent Attention from DeepSeek-V2: queries and KV states compressed into a 128-dimensional latent space, separate RoPE components, compressed KV caching and key/value reconstruction. Compares per-token cache cost against standard multi-head attention.',
    href:'https://github.com/softmaxxer101/deepseek-mla' },

  { n:'Transformer with KV-Cache', short:'Transformer + KV', tag:'from scratch', c:'#dcee9c', i:'i-grid',
    blurb:'The original Transformer with multi-head self-attention, residual connections, LayerNorm and encoder cross-attention, extended with a low-level KV-cache so decoding attends only over cached history. Benchmarked against full recomputation for latency, throughput and GPU memory.',
    href:'https://github.com/softmaxxer101/transformer' },

  { n:'DeepSeek Sparse Attention', short:'Sparse Attention', tag:'top-k · lightning indexer', c:'#f6cfd9', i:'i-spark',
    blurb:'DeepSeek\u2019s sparse attention as a PyTorch prototype: MLA/MQA-style compressed KV-cache, RoPE, a ReLU-gated Lightning Indexer and top-k token selection before attention. Measures what the indexer costs against what the sparsity saves.',
    href:'https://github.com/softmaxxer101/deepseek-sparse-attention' }
];

/* newest first — the first entry is highlighted automatically.
   add a new post anywhere and it re-sorts itself into place. */
const WRITINGS = [
  { iso:'2026-11-20', d:'NOV 2026', len:'PDF', cta:'read the report',
    t:'Agentic Serving Lab — Phase 2 report',
    note:'Qwen3.8-27B-NVFP4 on dual RTX 5090s: the scale-up, the serving numbers, and what the measurements changed.',
    url:'https://softmaxxer101.github.io/agentic-serving/agentic-serving-phase2.pdf' },
  { iso:'2026-11-05', d:'NOV 2026', len:'PDF', cta:'read the report',
    t:'Agentic Serving Lab — Phase 0 report',
    note:'the trie harness on Qwen3-0.6B and one 6 GB GPU: workload, queueing, admission control.',
    url:'https://softmaxxer101.github.io/agentic-serving/agentic-serving-phase1.pdf' },
  { iso:'2026-10-10', d:'OCT 2026', len:'PDF',
    t:'Inference Gateway — blog 2',
    note:'SLA-aware admission: what the queue did once the policy changed.',
    url:'https://softmaxxer101.github.io/inference_gateway/blog2.pdf' },
  { iso:'2026-09-26', d:'OCT 2026', len:'PDF',
    t:'Inference Gateway — blog 1',
    note:'bounded queues, queue deadlines and upstream timeouts.',
    url:'https://softmaxxer101.github.io/inference_gateway/blog1.pdf' },
  { iso:'2026-09-22', d:'SEP 2026', len:'PDF',
    t:'Paged Attention, from the paper',
    note:'the block table and online softmax, written up with measurements.',
    url:'https://softmaxxer101.github.io/vllm_architecture/paged_attention.pdf' },
  { iso:'2026-07-31', d:'JUL 2026', len:'blog',
    t:'DeepSeek MLA, from the formulas up',
    note:'compressing the KV cache into a latent space.',
    url:'https://alisintensorland.blogspot.com/2026/07/deepseek-v2-multi-head-latent-attention.html' },
  { iso:'2026-07-28', d:'JUL 2026', len:'blog',
    t:'KV-cache — a question or a solution?',
    note:'why decoding is memory bound.',
    url:'https://alisintensorland.blogspot.com/2026/07/kv-cache-question-or-solution-i-bet.html' }
];

const STACK = [
  { k:'Language',                 v:'Python' },
  { k:'Inference & models',       v:'PyTorch · vLLM' },
  { k:'Serving & APIs',           v:'FastAPI · Uvicorn · httpx' },
  { k:'Measurement',              v:'JSONL structured logging · Prometheus metric scraping' },
  { k:'Environment',              v:'Linux · WSL Ubuntu' }
];
const HARDWARE = [
  { b:'NVIDIA RTX 3050 Laptop GPU', s:'6 GiB VRAM · every local baseline' }
];

const CONTACTS = [
  { k:'email',        v:DISPLAY_EMAIL,          href:'mailto:' + DISPLAY_EMAIL, ic:'i-mail'   },
  { k:'x',            v:'@import_alis',         href:X_URL,                     ic:'i-x'      },
  { k:'github',       v:'softmaxxer101',        href:GITHUB,                    ic:'i-branch' },
  { k:'huggingface',  v:'softmaxxer101',        href:HF,                        ic:'i-brain'  },
  { k:'linkedin',     v:'in/softmaxxer101',     href:'https://www.linkedin.com/in/softmaxxer101', ic:'i-link' },
  { k:'blog',         v:'softmaxxer101.github.io', href:BLOG,                   ic:'i-book'   }
];

/* ---------------- render ---------------- */
function render(){
  /* edge tabs */
  $('.tabs').innerHTML = SECTIONS.map((s, i) =>
    `<a class="tab" href="#${s.key}" data-i="${i}" data-c="${s.key}"><span>${s.label}</span></a>`
  ).join('');

  /* spiral binding rings */
  $('.binding').innerHTML = Array.from({ length: 5 }, (_, k) =>
    `<span class="ring" style="top:${5 + k * 19}%"></span>`).join('');

  /* projects — folder grid, click to open the detail on the right */
  const fol = $('#folders');
  fol.innerHTML = PROJECTS.map((p, i) => `
    <button class="folder${i === 0 ? ' on' : ''}" data-i="${i}" type="button">
      <span class="ficon" style="background:linear-gradient(160deg,rgba(255,255,255,.5),${p.c})">${ico(p.i)}</span>
      <b>${p.short || p.n}</b>
    </button>`).join('');
  fol.addEventListener('click', e => {
    const b = e.target.closest('.folder'); if (!b) return;
    $$('.folder', fol).forEach(f => f.classList.toggle('on', f === b));
    showProject(+b.dataset.i);
  });
  showProject(0);

  /* writings — newest highlighted on top, and every note (including the newest) below */
  const sorted = [...WRITINGS].sort((a, b) => b.iso.localeCompare(a.iso));
  const newest = sorted[0];
  $('#wcount').textContent = `${sorted.length} notes`;
  $('#wfeature').innerHTML = `
    <p class="mono">newest · ${newest.d} · ${newest.len}</p>
    <h3>${newest.t}</h3>
    <p>${newest.note}</p>
    <a href="${newest.url}" target="_blank" rel="noopener">${newest.cta || 'read it here'} ${ico('i-arrow', 'i sm')}</a>`;
  $('#wlist').innerHTML = sorted.map((p, i) => `<li class="${i === 0 ? 'is-new' : ''}"><a href="${p.url}" target="_blank" rel="noopener">
      <time>${p.d}</time><b>${p.t}</b>${i === 0 ? '<span class="newtag">newest</span>' : ''}<span class="len">${p.len}</span></a></li>`).join('');

  /* stack */
  $('#stackrows').innerHTML = STACK.map(r =>
    `<div class="strow"><h4>${r.k}</h4><p>${r.v}</p></div>`).join('');
  $('#hwrow').innerHTML = HARDWARE.map(h =>
    `<li><span class="ph">${ico('i-chip')}</span><div><b>${h.b}</b><span>${h.s}</span></div></li>`).join('');

  /* say hi */
  $('#sayhi').innerHTML = CONTACTS.map(c =>
    `<li><span class="ic">${ico(c.ic)}</span><b>${c.k}</b>
      <a href="${c.href}" target="_blank" rel="noopener">${c.v}</a></li>`).join('');

  /* skyline — one bar per day of study since june 2026 */
  const sky = $('.skyline');
  const seed = [2,1,4,2,6,3,1,5,2,7,3,2,4,1,6,2,3,8,4,2,5,3,2,6,1,4,2,3,5,2];
  if (sky) sky.innerHTML = seed.map(v => `<i style="height:${8 + v * 4.4}px" class="${v >= 7 ? 'on' : ''}"></i>`).join('');
}

function showProject(i){
  const p = PROJECTS[i], v = $('#projview');
  const links = [];
  if (p.href) links.push(`<a class="go" href="${p.href}" target="_blank" rel="noopener">${p.codeLabel || 'see the code'} ${ico('i-arrow', 'i sm')}</a>`);
  if (p.writeup) links.push(`<a class="go alt" href="${p.writeup}" target="_blank" rel="noopener">${ico('i-dl', 'i sm')} read the write-up</a>`);
  (p.links || []).forEach(l => links.push(`<a class="go alt" href="${l.href}" target="_blank" rel="noopener">${l.t}</a>`));
  const row = links.length ? links.join('') : `<span class="go muted">${p.note || 'code coming soon'}</span>`;
  v.innerHTML = `<div class="pv">
    <p class="mono">${String(i + 1).padStart(2, '0')} / ${String(PROJECTS.length).padStart(2, '0')}</p>
    <h2>${p.n}</h2>
    <span class="tag">${p.tag}</span>${p.feat ? ' <span class="tag feat">featured</span>' : ''}
    <p>${p.blurb}</p>
    <div class="gorow">${row}</div>
  </div>`;
}

/* ---------------- theme ---------------- */
const THEME_KEY = 'alis-theme';
function applyTheme(t){
  document.documentElement.setAttribute('data-theme', t);
  const b = $('#themebtn');
  if (b){
    b.querySelector('span').textContent = t === 'dark' ? 'light' : 'dark';
    b.querySelector('use').setAttribute('href', t === 'dark' ? '#i-bulb' : '#i-cloud');
    b.setAttribute('aria-label', t === 'dark' ? 'switch to light mode' : 'switch to dark mode');
  }
}
function initTheme(){
  let saved = null;
  try { saved = localStorage.getItem(THEME_KEY); } catch (e) {}
  applyTheme(saved === 'dark' ? 'dark' : 'light');
  $('#themebtn').addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
  });
}

/* ---------------- flip engine ---------------- */
const stage = $('.stage'), scene = $('.scene'), flip = $('#flip');
const spreads = $$('.spread');
let cur = 0, busy = false;
const mobile = () => matchMedia('(max-width:900px)').matches;

function fit(){
  if (mobile()){ stage.style.transform = ''; return; }
  const s = Math.min((innerWidth - 32) / 1230, (innerHeight - 40) / 880, 1.1);
  stage.style.transform = `scale(${s.toFixed(3)})`;
}
addEventListener('resize', fit);

function chrome(){
  const s = SECTIONS[cur];
  $$('.tab').forEach((t, i) => {
    t.classList.toggle('on', i === cur);
    t.setAttribute('aria-current', i === cur ? 'page' : 'false');
  });
  $('#spineLabel').textContent = s.label;
  $('#spineIcon').firstElementChild.setAttribute('href', '#' + s.icon);
  $('#counter').textContent = `${cur + 1} / ${SECTIONS.length}`;
  $('#prevBtn').disabled = cur === 0;
  $('#nextBtn').disabled = cur === SECTIONS.length - 1;
  document.title = `${s.label} · alis`;
}

function paint(i){
  spreads.forEach((sp, n) => sp.classList.toggle('on', n === i));
}

function go(next, dir){
  if (busy || next === cur || next < 0 || next >= spreads.length) return;
  dir = dir || (next > cur ? 1 : -1);
  busy = true;

  if (mobile() || !flipEnabled()){ finish(next); return; }

  const out = spreads[cur], inn = spreads[next];
  const outPage = $(dir > 0 ? '.page.pr' : '.page.pl', out);
  const innPage = $(dir > 0 ? '.page.pl' : '.page.pr', inn);

  out.classList.add('out');
  inn.classList.add('on', 'inn');
  innPage.style.opacity = '0';
  outPage.style.visibility = 'hidden';

  const inner = $('.flipinner', flip);
  const face  = document.createElement('div');
  face.className = 'face front';
  const clone = outPage.cloneNode(true);
  clone.style.visibility = 'visible';
  clone.style.position = 'absolute';
  clone.style.top = '0'; clone.style.left = '0';
  clone.style.width = 'var(--page-w)'; clone.style.height = 'var(--page-h)';
  face.appendChild(clone);
  const shadow = document.createElement('div');
  shadow.className = 'shadow';
  inner.replaceChildren(face, shadow);

  flip.className = 'flip ' + (dir > 0 ? 'next' : 'prev');
  inner.style.transition = 'none';
  inner.style.transform = 'rotateY(0deg)';
  inner.style.opacity = '1';
  void inner.offsetWidth;
  inner.style.transition = 'transform .74s cubic-bezier(.44,.05,.35,1)';
  shadow.style.transition = 'opacity .74s ease';

  requestAnimationFrame(() => {
    inner.style.transform = `rotateY(${dir > 0 ? -180 : 180}deg)`;
    shadow.style.opacity = '.9';
    setTimeout(() => shadow.style.opacity = '.15', 320);
  });
  setTimeout(() => { innPage.style.opacity = '1'; }, 400);
  setTimeout(() => {
    inner.style.opacity = '0';
    setTimeout(() => {
      inner.replaceChildren();
      flip.className = 'flip';
      outPage.style.visibility = '';
      innPage.style.opacity = '';
      out.classList.remove('out');
      inn.classList.remove('inn');
      finish(next);
    }, 180);
  }, 745);
}

function finish(next){
  cur = next;
  paint(next);
  const key = SECTIONS[next].key;
  if (location.hash.slice(1) !== key) history.replaceState(null, '', '#' + key);
  chrome();
  const act = spreads[next];
  if (mobile()){ act.scrollTop = 0; scene.classList.add(next > 0 ? 'slide-next' : 'slide-prev'); setTimeout(() => scene.classList.remove('slide-next', 'slide-prev'), 360); }
  setTimeout(() => { busy = false; }, 40);
}
const flipEnabled = () => !matchMedia('(prefers-reduced-motion:reduce)').matches;

/* ---------------- input ---------------- */
$('#prevBtn').addEventListener('click', () => go(cur - 1, -1));
$('#nextBtn').addEventListener('click', () => go(cur + 1, 1));
$('.tabs').addEventListener('click', e => {
  const a = e.target.closest('.tab'); if (!a) return;
  e.preventDefault();
  go(+a.dataset.i, +a.dataset.i > cur ? 1 : -1);
});
/* the quiet header nav: writings · stack + say hi */
$$('.jump').forEach(a => a.addEventListener('click', e => {
  e.preventDefault();
  const i = SECTIONS.findIndex(s => s.key === a.dataset.to);
  if (i >= 0) go(i, i > cur ? 1 : -1);
}));
addEventListener('keydown', e => {
  const tag = document.activeElement.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA') return;
  const k = e.key;
  if (k === ' ') { if (tag === 'BUTTON' || tag === 'A') return; e.preventDefault(); go(cur + 1, 1); return; }
  if (k === 'ArrowDown' || k === 'PageDown') { e.preventDefault(); go(cur + 1, 1); }
  if (k === 'ArrowUp' || k === 'PageUp') { e.preventDefault(); go(cur - 1, -1); }
  if (k === 'Home') go(0, -1);
  if (k === 'End') go(spreads.length - 1, 1);
  const n = parseInt(k, 10);
  if (n >= 1 && n <= SECTIONS.length) go(n - 1, n - 1 > cur ? 1 : -1);
});
let acc = 0, wheelLock = false;
addEventListener('wheel', e => {
  if (mobile()) return;
  if (Math.abs(e.deltaY) < 2) return;
  acc += e.deltaY;
  if (wheelLock || Math.abs(acc) < 60) return;
  const dir = acc > 0 ? 1 : -1;
  acc = 0; wheelLock = true;
  go(cur + dir, dir);
  setTimeout(() => wheelLock = false, 820);
}, { passive:true });

let ty = 0, tx = 0;
addEventListener('touchstart', e => { ty = e.touches[0].clientY; tx = e.touches[0].clientX; }, { passive:true });
addEventListener('touchend', e => {
  const dy = ty - e.changedTouches[0].clientY, dx = tx - e.changedTouches[0].clientX;
  if (Math.abs(dy) < 55 || Math.abs(dx) > Math.abs(dy)) return;
  const sp = spreads[cur];
  const atBottom = sp.scrollTop + sp.clientHeight >= sp.scrollHeight - 8;
  if (mobile()){
    if (dy > 0 && atBottom) go(cur + 1, 1);
    else if (dy < 0 && sp.scrollTop <= 2) go(cur - 1, -1);
  } else {
    go(cur + (dy > 0 ? 1 : -1), dy > 0 ? 1 : -1);
  }
}, { passive:true });

/* ---------------- dear alis letter ---------------- */
const mailtoLink = (from, back, msg) => {
  const body = `dear alis,\n\n${msg}\n\n— ${from}${back ? '\nwrite back at ' + back : ''}`;
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('hello from ' + from)}&body=${encodeURIComponent(body)}`;
};

$('#letter').addEventListener('submit', async e => {
  e.preventDefault();
  const f = e.target;
  const from = f.from.value.trim() || 'someone';
  const back = f.email.value.trim();
  const msg  = f.msg.value.trim();
  if (!msg){ f.msg.focus(); return; }

  const btn = f.querySelector('.send');
  const label = btn.innerHTML;
  btn.disabled = true;
  btn.textContent = 'sending…';

  /* deliver the whole letter to the inbox first */
  let delivered = false;
  if (FORM_ENDPOINT){
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name: from, email: back, message: msg, _subject: `dear alis · ${from}` })
      });
      delivered = res.ok;
    } catch (err){ delivered = false; }
  }

  btn.disabled = false;
  btn.innerHTML = label;

  const mail = mailtoLink(from, back, msg);
  $('#sentmail').href = mail;
  $('#sentstate').textContent = delivered ? 'delivered · to alis' : 'one more step';
  $('#sentmsg').textContent = delivered
    ? 'it is in the inbox now — your name, your address and everything you wrote. thank you for taking the time.'
    : 'your mail app should have opened with the whole letter in it. hit send there and it lands in the inbox.';

  $('#letter').hidden = true;
  $('#sent').hidden = false;
  /* keep the mail hand-off too — open it now if the direct delivery did not go through */
  if (!delivered) location.href = mail;
});
$('#again').addEventListener('click', () => {
  $('#letter').hidden = false; $('#sent').hidden = true;
  $('#sentmail').removeAttribute('href');
  $('#letter').reset();
});

/* ---------------- boot ---------------- */
initTheme();
render();
const start = Math.max(0, SECTIONS.findIndex(s => s.key === location.hash.slice(1)));
paint(start);
cur = start;
chrome();
fit();
addEventListener('hashchange', () => {
  const i = SECTIONS.findIndex(s => s.key === location.hash.slice(1));
  if (i >= 0 && i !== cur) go(i, i > cur ? 1 : -1);
});
document.body.classList.add('ready');
})();
