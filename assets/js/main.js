
// Mobile drawer
const menuBtn = document.getElementById('menuBtn');
const drawer = document.getElementById('drawer');
menuBtn?.addEventListener('click', () => {
  const open = drawer.classList.toggle('open');
  drawer.hidden = !open;
  menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
});

// Theme switcher
const themes = ['theme-blue','theme-red','theme-orange'];
function current() { return themes.findIndex(t=>document.body.classList.contains(t)); }
function apply(i) { document.body.classList.remove(...themes); document.body.classList.add(themes[i]); }
document.getElementById('themeBtn')?.addEventListener('click', () => apply((current()+1)%themes.length));
document.getElementById('themeBtn2')?.addEventListener('click', () => apply((current()+1)%themes.length));

// Sticky subnav shadow
const subnav = document.getElementById('subnav');
if (subnav) {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => subnav.classList.toggle('is-stuck', !e.isIntersecting));
  }, { threshold:[1] });
  const sentinel = document.createElement('div');
  sentinel.style.position='absolute'; sentinel.style.top='0'; sentinel.style.height='1px'; sentinel.style.width='1px';
  document.body.prepend(sentinel); obs.observe(sentinel);
}

// -------- Simple search (merges search.json + lectures.json + quotes.json if present) --------
async function fetchJSON(rel) {
  try { const r = await fetch(rel); if (!r.ok) throw new Error(); return await r.json(); }
  catch { return []; }
}
async function pppSearchInit() {
  const input = document.getElementById('q');
  const out = document.getElementById('search-results');
  if (!input || !out) return;
  const [base, lectures, quotes] = await Promise.all([
    fetchJSON('data/search.json'),
    fetchJSON('data/lectures.json'),
    fetchJSON('data/quotes.json')
  ]);
  const q2items = quotes.map(q => ({
    title: (q.text || '').slice(0, 60) + (q.text && q.text.length>60 ? '…' : ''),
    url: 'citaty.html',
    excerpt: q.text,
    tags: q.tags || []
  }));
  const l2items = lectures.map(l => ({
    title: l.title, url: l.url || 'prednasky.html', excerpt: l.excerpt, tags: l.tags || []
  }));
  const db = [...base, ...l2items, ...q2items];

  function render(q) {
    out.innerHTML = '';
    if (!q) return;
    const qq = q.toLowerCase();
    const found = db.filter(it =>
      (it.title || '').toLowerCase().includes(qq) ||
      (it.excerpt || '').toLowerCase().includes(qq) ||
      (it.tags || []).some(t => (t||'').toLowerCase().includes(qq))
    ).slice(0, 20);
    if (!found.length) { out.innerHTML = '<div class="search-item">Nic nenalezeno.</div>'; return; }
    for (const it of found) {
      const div = document.createElement('div');
      div.className = 'search-item';
      div.innerHTML = `<a href="${it.url}">${it.title}</a><div><small>${(it.excerpt||'')}</small></div>`;
      out.appendChild(div);
    }
  }
  input.addEventListener('input', e => render(e.target.value));
}
pppSearchInit();

// -------- Renderers for lists (Přednášky, Citáty) --------
async function renderLectures() {
  const wrap = document.getElementById('lectures-list');
  if (!wrap) return;
  const data = await fetchJSON('data/lectures.json');
  if (!data.length) { wrap.innerHTML = '<p class="meta">Zatím žádné přednášky…</p>'; return; }
  wrap.innerHTML = data.map(l => `
    <article class="card">
      <div class="media"></div>
      <div class="body">
        <h3><a href="${l.url}">${l.title}</a></h3>
        <div class="meta">${l.length || ''} • ${l.excerpt || ''}</div>
      </div>
    </article>
  `).join('');
}
async function renderQuotes() {
  const list = document.getElementById('quotes-list');
  if (!list) return;
  const data = await fetchJSON('data/quotes.json');
  if (!data.length) { list.innerHTML = '<p class="meta">Zatím žádné citáty…</p>'; return; }
  list.innerHTML = data.map(q => `<li>“${q.text}” — <span class="meta">${q.author || ''}</span></li>`).join('');
}
renderLectures();
renderQuotes();
