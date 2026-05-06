# Faza 1: Backend Osnova — Baza Podataka i Product API

U ovoj fazi smo povezali naš server sa bazom podataka i kreirali prvi funkcionalni API za rad sa proizvodima.

## Šta smo koristili?

1.  **SQLite**: Lagana baza podataka koja ne zahteva poseban server (podaci se čuvaju u fajlu `database.sqlite`). Idealna za učenje i razvoj.
2.  **Sequelize**: ORM (Object-Relational Mapping) alat. Umesto da pišemo sirovi SQL (`SELECT * FROM Products`), mi koristimo JavaScript metode (`Product.findAll()`).

---

## Ključni koncepti

### 1. Definisanje Modela (`src/models/Product.ts`)
Model je "nacrt" naših podataka. On govori bazi kakve kolone treba da ima tabela `Products`.
- Koristimo `DataTypes.UUID` za jedinstvene identifikatore (ID-eve).
- Definišemo tipove kao što su `STRING`, `TEXT`, `FLOAT` i `INTEGER`.

### 2. Konekcija i Sinhronizacija (`src/models/index.ts`)
Ovde podešavamo Sequelize da zna gde se nalazi naša SQLite baza i kako da joj pristupi.
Komanda `sequelize.sync()` automatski kreira tabele u bazi ako one već ne postoje.

### 3. Seeding (Početni podaci)
Da ne bismo stalno ručno unosili proizvode, napravili smo `src/seed.ts` skriptu koja "puni" bazu sa 5 test proizvoda. Ovo je standardna praksa u profesionalnom razvoju.

---

## API Rute

U `src/index.ts` smo dodali dva bitna endpoint-a:

1.  `GET /api/products`: Vraća listu svih proizvoda.
2.  `GET /api/products/:id`: Vraća detalje jednog proizvoda na osnovu njegovog ID-a.

Primetićete korišćenje `async/await` ključnih reči. Rad sa bazom je asinhron (traje neko vreme), pa moramo reći JavaScript-u da sačeka odgovor pre nego što pošalje podatke korisniku.

---

## Kako testirati?

1.  Pokrenite server: `npm run dev` (u `/backend` folderu).
2.  Otvorite brauzer ili Postman i posetite:
    - `http://localhost:3000/api/products` -> Trebalo bi da vidite JSON listu sa 5 proizvoda.
    - Kopirajte jedan `id` i posetite `http://localhost:3000/api/products/{id}`.

---

## Zadatak za studente
- Dodajte još jedan proizvod u `src/seed.ts` listu, ponovo pokrenite seed skriptu (`npx ts-node src/seed.ts`) i proverite da li se novi proizvod pojavljuje u listi.
- Razmislite: Šta bi se desilo ako u bazi tražimo proizvod sa ID-em koji ne postoji? Pogledajte kako smo u kodu rešili taj slučaj (provera `if (!product)`).

---

**Sledeća faza:** Prikaz ovih proizvoda na frontendu koristeći React!
