PPP — jednoduchý statický web (připraveno pro GitHub Pages)

Co je uvnitř:
- index.html, citaty.html, prednasky.html, diskuze.html, manifest.html, o-projektu.html, pravidla-diskuze.html, ochrana-soukromi.html, kontakt.html
- assets/css/main.css (styl)
- assets/js/main.js (menu, přepínač barev, „sticky“ navigace)
- data/search.json + jednoduché vyhledávání na každé stránce
- .nojekyll (aby GitHub Pages servíroval statiku „as-is“)

==========================================================
NEJJEDNODUŠŠÍ POSTUP (nahraj ZIP přes webové rozhraní GitHubu)
==========================================================
1) Stáhni tento ZIP do počítače a rozbal.
2) Na GitHubu klikni **New repository** → název třeba `ppp-web` (Public) → Create.
3) Na stránce repozitáře klikni **Add file → Upload files** a nahraj VŠECHNY soubory a složky z rozbalené složky.
   - Ujisti se, že `index.html` je v KOŘENI repa (ne ve podsložce).
   - Soubor `.nojekyll` musí být také v kořeni.
4) Klikni **Commit changes** (na branch `main`).

5) Zapni GitHub Pages:
   - Otevři **Settings → Pages**.
   - **Source:** *Deploy from a branch*.
   - **Branch:** vyber `main` a **/(root)**.
   - **Save**.

6) Po chvíli bude web dostupný na adrese:
   `https://<tvoje-username>.github.io/ppp-web/`

(Pokud chceš, aby adresa byla bez `/ppp-web/`, založ repo s názvem `username.github.io` a nahrávej přímo do něj.)

==========================================================
PŘIDÁVÁNÍ OBSAHU A ÚPRAVY (bez nástrojů)
==========================================================
A) Nová stránka
  - Zkopíruj soubor `o-projektu.html` na `nova-stranka.html` a uprav obsah mezi `<main class="wrap">…` a `</main>`.
  - Do menu (v hlavičce) přidej odkaz: `<a href="nova-stranka.html">Název</a>` v sekci `<nav>`.

B) Karty na domovce
  - V `index.html` najdi `<div class="cards" id="cards-home">` a duplikuj blok `<article class="card">…</article>`.
  - Texty a odkazy uprav přímo v HTML.

C) Vyhledávání
  - Otevři `data/search.json` a přidej položku ve tvaru:
    {"title":"Název","url":"nova-stranka.html","excerpt":"Krátký popis","tags":["štítek1","štítek2"]}
  - Po uložení a commitu se nový záznam začne objevovat při psaní dotazu.

D) Komentáře (Giscus) – volitelné, 3 kroky
  1. V repozitáři GitHubu zapni **Discussions** (Settings → Features → Discussions).
  2. Na **https://giscus.app** vyber repo, kategorii (např. `General`) a vygeneruj `<script …>`.
  3. Otevři `diskuze.html` a NAHRAĎ box s id `giscus-placeholder` vloženým `<script>…</script>` kódem. Ulož a commitni.

E) Vlastní doména (volitelné)
  - DNS: CNAME `www.tvoje-domena.cz` → `username.github.io`
  - Do kořene repozitáře přidej soubor `CNAME` s textem `www.tvoje-domena.cz`
  - V **Settings → Pages** zapni „Enforce HTTPS“.


Vytvořeno: 2025-09-14T16:51:35
