# Faza 2: Frontend Osnova — Prikaz proizvoda

U ovoj fazi smo povezali naš React frontend sa Node.js backendom. Sada naša aplikacija može da preuzima prave podatke iz baze podataka i da ih prikazuje korisnicima u obliku prelepih kartica. Pored funkcionalnosti, uveli smo Vibe Coding dizajn (tamna tema, glassmorphism, fluidne animacije).

---

## 📚 Teorijski deo: Komponente, State i Efekti

### 1. Šta je React i zašto "Komponente"?
React je biblioteka za pravljenje korisničkih interfejsa. Njegova najveća moć leži u **komponentama**.
Zamislite Lego kockice. Ne pravite dvorac odjednom, već ga sklapate od manjih, ponovo upotrebljivih kockica. U Reactu, `Navbar`, `ProductCard`, `LoadingSpinner` su naše Lego kockice. 
Kada nam zatreba prikaz 100 proizvoda, mi ne pišemo 100 puta HTML za karticu, već napravimo jednu `ProductCard` komponentu i pozovemo je 100 puta kroz "petlju" (koristeći funkciju `.map()`).

### 2. Upravljanje stanjem (`useState`)
U običnom HTML-u/JavaScript-u, ako se neki podatak promeni, morate ručno da nađete HTML element (npr. `document.getElementById`) i da mu promenite tekst.
React koristi **State (Stanje)**. Kada se stanje promeni, React automatski ponovo iscrtava (re-renderuje) komponentu na ekranu sa novim podacima.
```typescript
const [products, setProducts] = useState<Product[]>([]);
```
Ovde čuvamo naše proizvode. U početku je to prazan niz `[]`. Čim dobijemo podatke sa bekenda, pozovemo `setProducts(data)` i magija se dešava – na ekranu se iscrtavaju kartice!

### 3. Asinhroni efekti (`useEffect`)
Kada naša React komponenta "oživi" na ekranu (to se zove *mount*), mi moramo da kažemo aplikaciji: "Hej, idi sada na backend i zatraži mi proizvode". Tu na scenu stupa `useEffect`.
```typescript
useEffect(() => {
  // Ovaj kod se izvršava odmah nakon što se komponenta prvi put prikaže
  fetchProducts();
}, []);
```
Prazan niz `[]` na kraju znači: "Uradi ovo samo jednom, pri prvom učitavanju stranice". 

### 4. SPA (Single Page Application) i React Router
Naša aplikacija je **SPA**. To znači da kada korisnik prelazi sa početne stranice na stranicu sa detaljima o proizvodu, brauzer **ne učitava celu novu HTML stranicu**. Umesto toga, JavaScript samo prebriše stari sadržaj novim. Zbog toga se stranice menjaju instantno!
Da bi ovo radilo, koristimo **React Router** (`<BrowserRouter>`, `<Routes>`, `<Route>`).

### 5. Kako Frontend priča sa Backendom? (Axios i Proxy)
Da bismo dobili podatke iz baze, Frontend mora da pošalje HTTP GET zahtev Backend-u. Za to koristimo biblioteku **Axios**.
Međutim, brauzeri blokiraju zahteve iz bezbednosnih razloga ako frontend (radi na portu `5173`) pokuša da priča sa backendom (radi na portu `3000`). To se zove CORS politika.
Umesto komplikovane CORS konfiguracije, mi smo u `vite.config.ts` podesili **Proxy**. Proxy kaže Vite serveru: *"Kada god React zatraži nešto što počinje sa `/api/`, tajno prosledi taj zahtev na port 3000"*. Tako smo prevarili brauzer!

---

## 🛠 Praktični deo: Naš Vibe Coding Dizajn

Svi kodovi za izgled se nalaze u CSS fajlovima. Nismo koristili Tailwind jer želimo maksimalnu kontrolu i razumevanje CSS-a.
Uključili smo sledeće moderne tehnike:

1. **CSS Varijable (Custom Properties)**: U `index.css` smo definisali boje poput `--bg-primary` i `--accent-primary`. Ovo omogućava neverovatno lako menjanje cele teme (npr. dodavanje "Light Mode"-a).
2. **Glassmorphism**: U klasi `.glass-panel` koristimo `backdrop-filter: blur(12px)`. Ovo stvara efekat mutnog zamagljenog stakla iza elemenata, što je zaštitni znak modernog UI dizajna (kao u iOS-u ili Windows 11).
3. **CSS Grid**: U `ProductListPage.css` koristimo Grid sistem (`grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))`). Ovo je samo jedna linija koda koja automatski rešava responsive dizajn! Kako se ekran smanjuje, kartice se same slažu jedna ispod druge.
4. **CSS Animacije**: `LoadingSpinner` je u potpunosti napravljen pomoću CSS-a koristeći `@keyframes`. Nema teških slika ili GIF-ova.

---

## 🚀 Kako testirati i šta treba da uradite?

1.  Uverite se da vam je **backend server upaljen** (`npm run dev` u backend folderu).
2.  U drugom terminalu uđite u `frontend` folder i pokrenite **frontend server**: `npm run dev`.
3.  Posetite `http://localhost:5173`. Trebalo bi da vidite prelepu Vibe prodavnicu!

### Zadatak za studente 👨‍💻
1. Uđite u `frontend/src/index.css` i promenite boju `--accent-primary: #3b82f6;` u npr. `#ec4899` (roze boju). Posmatrajte kako se cela tema sajta momentalno menja!
2. U `frontend/src/components/Navbar.tsx` promenite logo iz "VIBE" u naziv vaše zamišljene prodavnice.
3. Otvorite karticu nekog proizvoda. Primetićete URL `/products/{id}`. Ovo je dinamička ruta! React Router gleda taj ID i šalje ga backedu da dobavi baš taj jedan proizvod.

Sledeća faza se bavi dodavanjem korpe za kupovinu i naprednog Globalnog State Management-a koristeći Zustand!
