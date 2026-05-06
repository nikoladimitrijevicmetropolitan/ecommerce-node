# Faza 4: Refaktorisanje — Tailwind CSS v4 i Čistiji Kod

U ovoj fazi smo uradili "veliko spremanje" našeg frontenda. Prešli smo sa custom CSS fajlova na **Tailwind CSS v4**, što je donelo ogromno olakšanje u održavanju koda.

## 📚 Šta je Tailwind CSS v4?

Tailwind v4 je najnovija evolucija najpopularnijeg "utility-first" CSS framework-a. 
Zašto smo prešli na njega?
1.  **Nema konfiguracionog pakla**: U v4 verziji, više nam ne treba ogroman `tailwind.config.js`. Sve se rešava kroz Vite plugin.
2.  **Brzina**: Kompajliranje je munjevito brzo.
3.  **Moderni CSS**: Koristi najnovije standarde poput CSS varijabli unutar `@theme` bloka u `index.css`.

## 🛠 Šta smo uradili tokom refaktorisanja?

### 1. Eliminacija custom CSS-a
Obrisali smo sve `.css` fajlove koji su bili vezani za komponente (`Navbar.css`, `ProductCard.css`, itd.). Stilovi su sada "unutar" HTML-a (JSX-a), što znači da više ne morate da skačete iz fajla u fajl da biste promenili boju dugmeta.

### 2. Upravljanje temama
U `index.css` smo definisali temu:
```css
@theme {
  --color-accent-primary: #3b82f6;
  --color-accent-secondary: #8b5cf6;
}
```
Sada možemo da koristimo klase poput `text-accent-primary` bilo gde u aplikaciji.

### 3. Responzivnost bez muke
Umesto pisanja `@media` upita u CSS-u, sada koristimo prefikse poput `md:` ili `lg:`.
Primer: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4` automatski menja broj kolona zavisno od veličine ekrana korisnika.

---

## 🧪 Da li su testovi preživeli?

Ovo je najvažniji deo lekcije za studente. Kada radite refaktorisanje dizajna, **nikako ne smete obrisati klase koje testovi koriste za prepoznavanje elemenata**.

Iako smo uveli Tailwind klase (npr. `bg-blue-600 rounded-full`), zadržali smo stare nazive kao što su:
- `.product-card`
- `.add-to-cart-btn`
- `.cart-badge`

Zahvaljujući tome, naši **E2E Playwright testovi** i dalje rade savršeno, iako aplikacija izgleda potpuno drugačije "ispod haube"!

## 🚀 Kako dalje?

1.  Pogledajte `ProductCard.tsx`. Primetićete da je kod sada malo duži zbog klasa, ali je mnogo jasnije kako komponenta izgleda.
2.  Probajte da dodate klasu `hover:rotate-3` na sliku proizvoda. Videćete koliko je lako dodavati interakcije bez otvaranja CSS fajla.

Sada imamo profesionalnu, brzu i lako održivu bazu koda spremnu za bilo kakva proširenja!
