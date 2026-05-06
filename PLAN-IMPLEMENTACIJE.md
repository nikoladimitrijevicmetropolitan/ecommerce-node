# Plan Implementacije: E-commerce Node

Ovaj dokument definiše detaljan plan implementacije projekta po fazama.
Svaka faza ima jasan cilj, listu zadataka, Git workflow korake i kriterijume za završetak.

> **Filozofija**: Gradimo projekat inkrementalno — svaka faza se završava funkcionalnošću koju možemo demonstrirati. Git koristimo profesionalno od prvog dana.

---

## Pregled Faza

| Faza | Naziv | Branch | Rezultat |
|------|-------|--------|----------|
| 0 | Inicijalizacija projekta | `main` | Prazan projekat sa strukturom |
| 1 | Backend osnova — Product API | `feature/product-api` | REST API za proizvode |
| 2 | Frontend osnova — Prikaz proizvoda | `feature/product-listing` | React app prikazuje proizvode |
| 3 | Korpa (Cart) | `feature/shopping-cart` | Dodavanje u korpu, pregled korpe |
| 4 | Porudžbine (Orders) | `feature/orders` | Checkout flow, kreiranje porudžbina |
| 5 | Paginacija, pretraga, filtriranje | `feature/pagination-search` | Napredna lista proizvoda |
| 6 | Autentifikacija (Auth) | `feature/authentication` | JWT login/register, zaštićene rute |
| 7 | Admin Panel | `feature/admin-panel` | CRUD za proizvode (admin) |
| 8 | UX poliranje i testovi | `feature/ux-polish` | Finalni proizvod |

---

## Faza 0: Inicijalizacija Projekta

**Cilj**: Postaviti monorepo strukturu sa TypeScript-om za backend i frontend.

### Zadaci

#### Backend (`/backend`)
- [ ] `npm init -y` u `/backend` folderu
- [ ] Instalirati zavisnosti: `express`, `typescript`, `ts-node`, `@types/express`, `@types/node`
- [ ] Kreirati `tsconfig.json`
- [ ] Kreirati osnovnu strukturu foldera:
  ```
  backend/
  ├── src/
  │   ├── index.ts          # Entry point
  │   ├── routes/            # Express rute
  │   ├── controllers/       # Kontroleri
  │   ├── models/            # Sequelize/Prisma modeli
  │   ├── middleware/         # Auth, error handling
  │   ├── services/          # Poslovna logika
  │   └── types/             # TypeScript tipovi/interfejsi
  ├── tsconfig.json
  └── package.json
  ```
- [ ] Kreirati `src/index.ts` sa osnovnim Express serverom (port 3000)
- [ ] Dodati `dev` skriptu u `package.json` (`ts-node` ili `tsx`)

#### Frontend (`/frontend`)
- [ ] Inicijalizovati Vite + React + TypeScript projekat
- [ ] Obrisati default sadržaj, postaviti čistu početnu stranicu
- [ ] Podesiti proxy ka backendu u `vite.config.ts`

#### Root
- [ ] Kreirati `.gitignore` (node_modules, dist, .env, *.db)
- [ ] Kreirati `README.md` sa opisom projekta
- [ ] Kreirati `.env.example`

### 🔀 Git Workflow — Faza 0
```bash
# Ovo radimo direktno na main jer je inicijalni setup
git add .
git commit -m "chore: inicijalizacija monorepo strukture (backend + frontend)"
git push origin main
```

### ✅ Kriterijum za završetak
- Backend se pokreće na `localhost:3000` i vraća `{ message: "API is running" }`
- Frontend se pokreće na `localhost:5173` i prikazuje početnu stranicu
- Oba projekta koriste TypeScript

---

## Faza 1: Backend Osnova — Product API

**Cilj**: Kreirati Product model, seed podatke i REST API za čitanje proizvoda.

### Zadaci

- [ ] Instalirati ORM (Sequelize + SQLite ili Prisma)
- [ ] Definisati `Product` model/interfejs:
  ```typescript
  interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl: string;
    stock: number;
  }
  ```
- [ ] Kreirati `seed.ts` — ubaciti 15-20 test proizvoda u bazu
- [ ] Implementirati rute:
  - `GET /api/products` — lista svih proizvoda
  - `GET /api/products/:id` — detalji jednog proizvoda
- [ ] Kreirati `ProductController` i `ProductService`
- [ ] Dodati osnovni error handling middleware
- [ ] Testirati API sa Postman-om ili `curl`

### 🔀 Git Workflow — Faza 1
```bash
# Kreiranje nove grane
git checkout -b feature/product-api

# Radimo u malim commit-ovima:
git add .
git commit -m "feat: dodat Product model i konekcija ka SQLite bazi"

git add .
git commit -m "feat: seed skripta sa test proizvodima"

git add .
git commit -m "feat: GET /api/products i GET /api/products/:id endpoint-i"

# Push na remote
git push origin feature/product-api

# Merge u main (simuliramo Pull Request)
git checkout main
git merge feature/product-api
git push origin main
```

### ✅ Kriterijum za završetak
- `GET /api/products` vraća JSON listu proizvoda
- `GET /api/products/1` vraća jedan proizvod
- `GET /api/products/999` vraća 404 grešku

---

## Faza 2: Frontend Osnova — Prikaz Proizvoda

**Cilj**: Prikazati proizvode sa backend-a u React aplikaciji.

### Zadaci

- [ ] Kreirati `types.ts` — deljeni TypeScript tipovi (`Product`, itd.)
- [ ] Kreirati `api.ts` — servis za komunikaciju sa backendom (fetch/axios)
- [ ] Implementirati stranice:
  - `ProductListPage` — prikaz kartica proizvoda
  - `ProductDetailPage` — detalji jednog proizvoda
- [ ] Podesiti React Router:
  - `/` → lista proizvoda
  - `/products/:id` → detalji proizvoda
- [ ] Stilizovati kartice proizvoda (CSS Grid, responsive dizajn)
- [ ] Dodati loading stanje i error fallback

### 🔀 Git Workflow — Faza 2
```bash
git checkout -b feature/product-listing

git commit -m "feat: dodat API servis i TypeScript tipovi"
git commit -m "feat: ProductListPage sa karticama proizvoda"
git commit -m "feat: ProductDetailPage sa detaljima"
git commit -m "style: responsive CSS grid za kartice"

git push origin feature/product-listing
git checkout main
git merge feature/product-listing
git push origin main
```

### ✅ Kriterijum za završetak
- Početna stranica prikazuje kartice proizvoda sa slikom, imenom i cenom
- Klik na karticu otvara stranicu sa detaljima
- Prikazuje se loading spinner dok se podaci učitavaju

---

## Faza 3: Korpa (Shopping Cart)

**Cilj**: Implementirati funkcionalnost korpe koristeći React Context.

### Zadaci

- [ ] Kreirati `CartContext.tsx`:
  - `addToCart(product, quantity)`
  - `removeFromCart(productId)`
  - `updateQuantity(productId, quantity)`
  - `clearCart()`
  - `cartTotal` (izračunata vrednost)
- [ ] Kreirati `CartPage.tsx`:
  - Lista artikala u korpi
  - Dugmad za +/- količine
  - Dugme za uklanjanje
  - Prikaz ukupne cene
- [ ] Dodati "Add to Cart" dugme na `ProductDetailPage`
- [ ] Dodati badge na ikonicu korpe u navigaciji (broj artikala)
- [ ] Čuvati korpu u `localStorage` (persistencija)
- [ ] Napisati unit testove za cart logiku

### 🔀 Git Workflow — Faza 3
```bash
git checkout -b feature/shopping-cart

git commit -m "feat: CartContext sa add/remove/update funkcijama"
git commit -m "feat: CartPage sa prikazom korpe"
git commit -m "feat: Add to Cart dugme na stranici proizvoda"
git commit -m "feat: localStorage persistencija korpe"
git commit -m "test: unit testovi za CartContext logiku"

git push origin feature/shopping-cart
git checkout main
git merge feature/shopping-cart
git push origin main
```

### ✅ Kriterijum za završetak
- Korisnik može dodati proizvod u korpu
- Korpa prikazuje ispravnu ukupnu cenu
- Korpa se čuva nakon reload stranice
- Unit testovi prolaze

---

## Faza 4: Porudžbine (Orders)

**Cilj**: Omogućiti checkout proces — kreiranje porudžbina sa validacijom stock-a.

### Zadaci

#### Backend
- [ ] Definisati `Order` i `OrderItem` modele
- [ ] Implementirati `POST /api/orders` endpoint:
  - Validacija ulaznih podataka
  - Provera stock-a za svaki proizvod
  - Transakciono smanjivanje stock-a
  - Kreiranje porudžbine sa stavkama
  - Vraćanje greške ako nema dovoljno na stanju
- [ ] Kreirati `OrderService` sa poslovnom logikom

#### Frontend
- [ ] Kreirati `CheckoutPage.tsx`:
  - Forma: ime, email, adresa
  - Pregled korpe pre slanja
  - Submit → poziv ka `POST /api/orders`
- [ ] Kreirati `OrderSuccessPage.tsx` — potvrda porudžbine
- [ ] Dodati validaciju forme (obavezna polja)
- [ ] Očistiti korpu nakon uspešne porudžbine

### 🔀 Git Workflow — Faza 4
```bash
git checkout -b feature/orders

# Backend deo
git commit -m "feat: Order i OrderItem modeli"
git commit -m "feat: POST /api/orders sa validacijom i stock upravljanjem"

# Frontend deo
git commit -m "feat: CheckoutPage sa formom za porudžbinu"
git commit -m "feat: OrderSuccessPage i integracija sa backendom"

git push origin feature/orders
git checkout main
git merge feature/orders
git push origin main
```

### ✅ Kriterijum za završetak
- Korisnik može popuniti checkout formu i kreirati porudžbinu
- Stock se smanjuje u bazi nakon porudžbine
- Ako proizvod nema dovoljno na stanju, prikazuje se greška
- Nakon uspešne porudžbine, korpa se prazni

---

## Faza 5: Paginacija, Pretraga i Filtriranje

**Cilj**: Dodati napredne mogućnosti pregleda proizvoda.

### Zadaci

#### Backend
- [ ] Ažurirati `GET /api/products` da podrži query parametre:
  - `page` i `size` (paginacija)
  - `search` (pretraga po imenu)
  - `category` (filtriranje)
  - `sortBy` (cena rastuće/opadajuće, ime)
- [ ] Vraćati metadata: `{ data: [...], total, page, totalPages }`

#### Frontend
- [ ] Kreirati `Pagination` komponentu
- [ ] Dodati search bar sa debounce logikom (300ms)
- [ ] Dodati dropdown za kategorije
- [ ] Dodati sortiranje (po ceni, po imenu)
- [ ] Ažurirati URL query parametre (da se može deliti link)

### 🔀 Git Workflow — Faza 5
```bash
git checkout -b feature/pagination-search

git commit -m "feat: paginacija i filtriranje na GET /api/products"
git commit -m "feat: Pagination komponenta na frontendu"
git commit -m "feat: search bar sa debounce pretragom"
git commit -m "feat: filtriranje po kategoriji i sortiranje"

git push origin feature/pagination-search
git checkout main
git merge feature/pagination-search
git push origin main
```

### ✅ Kriterijum za završetak
- Lista proizvoda prikazuje po 10 proizvoda po stranici
- Pretraga filtrira u realnom vremenu
- Filtriranje po kategoriji radi ispravno
- Sortiranje menja redosled prikazanih proizvoda

---

## Faza 6: Autentifikacija i Autorizacija

**Cilj**: Implementirati JWT autentifikaciju sa login/register funkcionalnostima.

### Zadaci

#### Backend
- [ ] Definisati `User` model
- [ ] Instalirati `bcrypt` i `jsonwebtoken`
- [ ] Implementirati rute:
  - `POST /api/auth/register` — registracija (hash lozinke)
  - `POST /api/auth/login` — login (vraća JWT)
- [ ] Kreirati `authMiddleware` — validacija JWT tokena
- [ ] Kreirati `adminMiddleware` — provera `role === 'ADMIN'`
- [ ] Kreirati seed za admin korisnika

#### Frontend
- [ ] Kreirati `AuthContext.tsx`:
  - `login(email, password)`
  - `register(email, password)`
  - `logout()`
  - `user` (trenutni korisnik)
  - `isAuthenticated`, `isAdmin`
- [ ] Kreirati `LoginPage.tsx` i `RegisterPage.tsx`
- [ ] Čuvanje JWT u `localStorage`
- [ ] Dodati Authorization header na zaštićene pozive
- [ ] Prilagoditi navigaciju (prikaži login/logout u zavisnosti od stanja)

### 🔀 Git Workflow — Faza 6
```bash
git checkout -b feature/authentication

# Backend
git commit -m "feat: User model i bcrypt hash lozinki"
git commit -m "feat: POST /api/auth/register i /api/auth/login"
git commit -m "feat: JWT auth middleware i admin middleware"

# Frontend
git commit -m "feat: AuthContext sa login/register/logout"
git commit -m "feat: LoginPage i RegisterPage"
git commit -m "feat: JWT token u Authorization header"

git push origin feature/authentication
git checkout main
git merge feature/authentication
git push origin main
```

### ✅ Kriterijum za završetak
- Korisnik može da se registruje i uloguje
- JWT se čuva i šalje uz svaki zaštićeni zahtev
- Neulogovani korisnici ne mogu pristupiti zaštićenim rutama
- Admin korisnik ima dodatna prava

---

## Faza 7: Admin Panel

**Cilj**: Omogućiti admin korisnicima CRUD operacije nad proizvodima.

### Zadaci

#### Backend
- [ ] Implementirati zaštićene rute:
  - `POST /api/products` (Admin)
  - `PUT /api/products/:id` (Admin)
  - `DELETE /api/products/:id` (Admin)
- [ ] Validacija ulaznih podataka (ime, cena, stock)

#### Frontend
- [ ] Kreirati `ProtectedRoute` komponentu (provera uloge)
- [ ] Kreirati `AdminProductsPage.tsx` — tabela sa svim proizvodima
- [ ] Kreirati `ProductFormPage.tsx` — forma za dodavanje/editovanje
- [ ] Dodati dugme za brisanje sa potvrdom (confirm dialog)
- [ ] Dodati `/admin` sekciju u navigaciju (samo za admin korisnike)

### 🔀 Git Workflow — Faza 7
```bash
git checkout -b feature/admin-panel

git commit -m "feat: admin CRUD rute za proizvode (POST/PUT/DELETE)"
git commit -m "feat: ProtectedRoute komponenta"
git commit -m "feat: AdminProductsPage sa tabelom proizvoda"
git commit -m "feat: ProductFormPage za dodavanje i editovanje"

git push origin feature/admin-panel
git checkout main
git merge feature/admin-panel
git push origin main
```

### ✅ Kriterijum za završetak
- Admin može dodati novi proizvod
- Admin može editovati postojeći proizvod
- Admin može obrisati proizvod
- Obični korisnici ne vide admin sekciju

---

## Faza 8: UX Poliranje i Testovi

**Cilj**: Završni sloj kvaliteta — UX poboljšanja i automatizovani testovi.

### Zadaci

#### UX Poboljšanja
- [ ] Loading skeleton komponente (umesto spinnera)
- [ ] Toast notifikacije (uspeh, greška, info)
- [ ] Globalni error handling (ErrorBoundary)
- [ ] Responsive navigacija (hamburger meni na mobilnom)
- [ ] 404 stranica

#### Testovi
- [ ] Backend integration testovi (Vitest + Supertest):
  - Testiranje svih API endpoint-a
  - Testiranje validacije i error odgovora
- [ ] Frontend unit testovi:
  - CartContext logika
  - AuthContext logika
- [ ] E2E testovi (Playwright):
  - Pregled proizvoda → dodavanje u korpu → checkout
  - Login → pristup admin panelu → dodavanje proizvoda

### 🔀 Git Workflow — Faza 8
```bash
git checkout -b feature/ux-polish

git commit -m "feat: loading skeleton komponente"
git commit -m "feat: toast notifikacije"
git commit -m "feat: ErrorBoundary i 404 stranica"
git commit -m "test: backend integration testovi"
git commit -m "test: frontend unit testovi"
git commit -m "test: Playwright E2E testovi"

git push origin feature/ux-polish
git checkout main
git merge feature/ux-polish
git push origin main

# Tagujemo finalnu verziju
git tag v1.0.0
git push origin v1.0.0
```

### ✅ Kriterijum za završetak
- Svi testovi prolaze
- Aplikacija je responsivna
- Error stanja su pravilno obrađena
- Korisničko iskustvo je uglađeno

---

## Git Cheat Sheet za Studente

### Osnovno
```bash
git status                    # Provera stanja
git add .                     # Dodaj sve promene
git commit -m "poruka"        # Komituj promene
git push origin branch-name   # Pošalji na remote
```

### Rad sa granama
```bash
git checkout -b feature/ime   # Kreiraj novu granu
git checkout main             # Prebaci se na main
git merge feature/ime         # Spoji granu u main
git branch -d feature/ime     # Obriši granu lokalno
```

### Konvencija za commit poruke
```
feat: nova funkcionalnost
fix: ispravka baga
style: CSS/stilizacija promene
test: dodavanje/menjanje testova
docs: dokumentacija
chore: konfiguracija, setup
refactor: promena koda bez promene ponašanja
```

### Vibe Coding sa Git-om
1. **Pre rada** → Napravi novu granu (`git checkout -b feature/...`)
2. **Tokom rada** → Komituj često, u malim celinama
3. **Kad završiš** → Push, merge u main, push main
4. **Pravilo**: `main` grana uvek mora biti u stabilnom stanju!

---

## Vremenski Plan (Okvirno)

| Faza | Trajanje | Kumulativno |
|------|----------|-------------|
| Faza 0 | 1 čas | 1 čas |
| Faza 1 | 2 časa | 3 časa |
| Faza 2 | 2 časa | 5 časova |
| Faza 3 | 2 časa | 7 časova |
| Faza 4 | 2 časa | 9 časova |
| Faza 5 | 2 časa | 11 časova |
| Faza 6 | 3 časa | 14 časova |
| Faza 7 | 2 časa | 16 časova |
| Faza 8 | 3 časa | 19 časova |
