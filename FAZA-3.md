# Faza 3: Globalni State Management (Context API) i Korpa

U ovoj fazi rešili smo jedan od najvećih problema u React aplikacijama: **deljenje podataka između nepovezanih komponenti**.

## 📚 Teorijski deo: Prop Drilling vs Context API

### Šta je "Prop Drilling"?
Zamislite da želite da prikažete broj stavki u korpi unutar `Navbar` komponente, a dugme za dodavanje u korpu se nalazi unutar `ProductCard` komponente. 

U klasičnom React-u, morali biste da čuvate to stanje (`items`) u njihovom zajedničkom roditelju (`App.tsx`), a zatim da to stanje (i funkcije za menjanje stanja) prosleđujete kroz *sve komponente između* (npr. od `App` -> `ProductListPage` -> `ProductCard`). 
Ovo prosleđivanje kroz komponente kojima ti podaci i ne trebaju zove se **Prop Drilling** i čini kod nečitljivim i teškim za održavanje.

### Rešenje: React Context API
Context API je ugrađena funkcija React-a koja nam omogućava da napravimo neku vrstu "globalne promenljive" (ali sigurne za React komponente) kojoj svaka komponenta može da pristupi direktno, bez obzira gde se nalazi u stablu.

U našem slučaju napravili smo `CartContext`:
1.  **Provajder (`<CartProvider>`)**: Ovu komponentu smo stavili na sam vrh aplikacije (u `App.tsx`). Ona čuva stanje (`items`) i daje ga na raspolaganje svima unutar nje.
2.  **Konzument (`useCart`)**: Napravili smo Custom Hook `useCart`. Sada, bilo koja komponenta (npr. `Navbar` ili `ProductCard`) može samo da pozove `const { addToCart } = useCart();` i dobije pristup funkciji!

Ovo arhitekturu čini izuzetno čistom i modularnom.

---

## 🛠 Praktični deo: Nova stranica za Korpu

Slušajući zahteve "klijenta" (našeg korisnika), umesto Drawer panela (koji isklizava sa strane), implementirali smo zasebnu stranicu `/cart`.

### Stilizacija i Ponašanje
- Korišćen je naš Vibe dizajn sistem sa `.glass-panel`.
- Stranica je responzivna (koristi CSS Grid koji se menja na manjim ekranima).
- Aplikacija računa `Subtotal` i `Total` jednostavnom matematikom u samom Context-u (`getTotal` funkcija u `CartContext.tsx` koristi `.reduce()` metodu iz JavaScript-a).

---

## 🧪 Kako testiramo Context?

Ova faza je uvela novi izazov za testiranje. Komponente koje koriste `useCart` ne mogu da rade ako se ne nalaze unutar `<CartProvider>`-a. Baciće nam veliku crvenu grešku!

### Zato smo uradili sledeće:
1.  **Unit Testiranje samog Context-a** (`CartContext.test.tsx`): 
    Napravili smo fiktivnu "TestComponent" samo za potrebe testa, ubacili je u `<CartProvider>` i pomoću funkcije `act()` "klikali" dugmiće da vidimo da li se matematički zbirovi ispravno računaju.
2.  **Ažuriranje starih testova**: 
    Otvorili smo testove iz Faze 2 (`ProductCard.test.tsx` i `ProductListPage.test.tsx`) i ručno ih omotali sa `<CartProvider>`. Ovo je odlična lekcija o tome kako promena arhitekture utiče na Unit testove.

---

## 🤖 E2E Testiranje: Vidljiv robot

Dodali smo novi scenario `e2e/tests/cart.spec.ts`. Sada naš robot radi sledeće:
1. Dolazi na početnu stranu.
2. Klika na 2 različita proizvoda.
3. Ide u navigaciju, klika na ikonicu korpe.
4. Na novoj `/cart` stranici proverava da li se proizvodi lepo iscrtavaju i obriše jedan.

**Probajte sami!**
1. Upalite frontend i backend (`npm run dev` u oba foldera).
2. U e2e folderu pokrenite `npx playwright test --ui`.
3. Otvoriće se prozor. Kliknite na ikonicu "Play" i uživajte dok robot umesto vas testira celu aplikaciju brzinom svetlosti!
