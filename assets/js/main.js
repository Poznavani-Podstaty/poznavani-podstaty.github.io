
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

// Simple global search (loads data/search.json relative to current page)
async function pppSearchInit() {
  const input = document.getElementById('q');
  const out = document.getElementById('search-results');
  if (!input || !out) return;
  let db = [];
  try {
    const res = await fetch('data/search.json');
    db = await res.json();
  } catch (e) { /* ignore */ }

  function render(q) {
    out.innerHTML = '';
    if (!q) return;
    const qq = q.toLowerCase();
    const found = db.filter(it =>
      (it.title || '').toLowerCase().includes(qq) ||
      (it.excerpt || '').toLowerCase().includes(qq) ||
      (it.tags || []).some(t => t.toLowerCase().includes(qq))
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
