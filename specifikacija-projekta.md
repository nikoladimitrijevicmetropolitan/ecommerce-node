# Specifikacija Projekta: E-commerce Vibe

Ovaj dokument služi kao kompletna specifikacija za razvoj **E-commerce Vibe** aplikacije od nule. Projekat je dizajniran da nauči studente modernom web razvoju, radu sa bazama podataka, sigurnosti (JWT), automatizovanom testiranju i profesionalnom Git workflow-u.

---

## 1. Pregled Projekta
E-commerce Vibe je web prodavnica koja omogućava korisnicima da pregledaju proizvode, pretražuju ih, dodaju u korpu i kreiraju porudžbine. Admin korisnici imaju mogućnost upravljanja zalihama i proizvodima.

---

## 2. Tehnološki Stack

### Frontend
- **Framework**: React (Vite + TypeScript)
- **Styling**: Vanilla CSS
- **State Management**: React Context API
- **Routing**: React Router
- **Testiranje**: Vitest (Unit), Playwright (End-to-End)

### Backend
- **Runtime**: Node.js + TypeScript
- **Framework**: Express.js
- **Database**: SQLite (za razvoj) / PostgreSQL (produkcija)
- **ORM**: Sequelize ili Prisma
- **Autentifikacija**: JWT (JSON Web Tokens)
- **Testiranje**: Vitest & Supertest

---

## 3. Model Podataka (Entiteti)

### Product
- `id`: `string` (UUID)
- `name`: `string` (Obavezno, min 3 karaktera)
- `description`: `string`
- `price`: `number` (Obavezno, > 0)
- `category`: `string`
- `imageUrl`: `string`
- `stock`: `number` (Obavezno, >= 0)

### User
- `id`: `string` (UUID)
- `email`: `string`
- `password`: `string` (Hashed)
- `role`: `'USER' | 'ADMIN'`

### Order
- `id`: `string` (UUID)
- `customerName`: `string`
- `customerEmail`: `string`
- `customerAddress`: `string`
- `totalPrice`: `number`
- `items`: `OrderItem[]`

### OrderItem
- `id`: `number`
- `productId`: `string`
- `quantity`: `number`

---

## 4. API Specifikacija

| Metod | Ruta | Pristup | Opis |
|---|---|---|---|
| `GET` | `/api/products` | Javno | Lista proizvoda (Query params: `page`, `size`, `search`, `category`, `sortBy`) |
| `GET` | `/api/products/:id` | Javno | Detalji proizvoda |
| `POST` | `/api/auth/register` | Javno | Registracija korisnika |
| `POST` | `/api/auth/login` | Javno | Login -> vraća JWT token i podatke o korisniku |
| `POST` | `/api/orders` | User | Kreiranje porudžbine (Smanjuje stock proizvoda) |
| `POST` | `/api/products` | Admin | Dodavanje novog proizvoda |
| `PUT` | `/api/products/:id` | Admin | Izmena proizvoda |
| `DELETE` | `/api/products/:id` | Admin | Brisanje proizvoda |

---

## 5. Ključne Poslovne Logike

1. **Paginacija**: Server ne sme slati sve proizvode odjednom. Koristi se `limit` i `offset`.
2. **Upravljanje zalihama (Stock)**: Prilikom kreiranja porudžbine, sistem mora proveriti da li ima dovoljno proizvoda na stanju. Ako ima, stock se smanjuje. Operacija mora biti transakciona.
3. **Sigurnost**: Admin rute su zaštićene middleware-om koji proverava ulogu unutar JWT tokena.
4. **Validacija**: Svaki unos sa frontenda mora biti validiran i na backendu (npr. cena ne sme biti negativna).

---

## 6. Faze Implementacije (Plan za studente)

### Faza 1: Osnova i Prikaz Proizvoda
- Setup projekta (Frontend & Backend).
- Kreiranje `Product` modela i baze.
- Prikaz liste proizvoda i detalja na frontendu.
- **Git**: Inicijalizacija repozitorijuma, prvi commit-ovi.

### Faza 2: Korpa i Porudžbine
- Implementacija `CartContext` na frontendu.
- Kreiranje endpoint-a za porudžbine.
- Logika smanjivanja stock-a.
- **Testiranje**: Unit testovi za logiku korpe.

### Faza 3: Paginacija, Filtriranje i Pretraga
- Dodavanje parametara u API.
- Implementacija `Pagination` komponente.
- Debounce pretraga na frontendu.

### Faza 4: Autentifikacija i Autorizacija
- JWT implementacija na backendu.
- Login i Register stranice.
- Čuvanje tokena u `localStorage` i presretanje zahteva (Interceptor/AuthContext).

### Faza 5: Admin Panel (CRUD)
- Zaštićene rute na frontendu.
- Forme za dodavanje i editovanje proizvoda.
- **Git**: Rad sa granama (feature branches) i Pull Request-ovi.

### Faza 6: UX i Poliranje
- Loading skeletoni.
- Toast notifikacije.
- Error handling (prikaz grešaka korisniku).
- **Testiranje**: Playwright E2E testovi za kritične tokove (kupovina, login).

---

## 7. Strategija Testiranja

- **Unit Testovi**: Testirati servise na backendu i Context logiku na frontendu.
- **Integration Testovi**: Testirati API endpoint-e sa testnom bazom.
- **E2E Testovi**: Automatizovan prolaz kroz celu aplikaciju (dodavanje u korpu -> checkout -> uspeh).

---

## 8. Git Workflow Pravila
1. Nikada ne raditi direktno na `main` grani.
2. Svaki feature ima svoju granu: `feature/naziv-funkcionalnosti`.
3. Commit poruke moraju biti opisne (npr. `feat: dodata paginacija na listi proizvoda`).
4. Pre spajanja u `main`, obavezan je Code Review (Pull Request).
