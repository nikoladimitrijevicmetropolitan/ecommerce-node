# Faza 1: Backend Osnova — Baza Podataka i Product API

U ovoj fazi smo povezali naš server sa bazom podataka i kreirali prvi funkcionalni API za rad sa proizvodima. Cilj je razumeti kako Node.js aplikacija komunicira sa podacima i kako te podatke nudi spoljnom svetu kroz REST API.

---

## 📚 Teorijski deo: Rad sa podacima i API-jem

### 1. Šta je ORM (Object-Relational Mapping)?
Kada radimo sa bazama podataka poput MySQL-a, PostgreSQL-a ili SQLite-a, standardni način komunikacije je pisanje SQL (Structured Query Language) upita. Na primer:
`SELECT * FROM Products WHERE price > 100;`

**ORM (Object-Relational Mapping)** je biblioteka koja nam omogućava da umesto pisanja SQL-a koristimo objektno-orijentisani kod u jeziku koji trenutno koristimo (u našem slučaju JavaScript/TypeScript).
- **Bez ORM-a**: Morali bismo ručno da pišemo tekstualne SQL upite, brinemo o SQL Injection napadima i ručno mapiramo redove iz baze u JavaScript objekte.
- **Sa ORM-om (Sequelize)**: Pišemo `Product.findAll({ where: { price: { [Op.gt]: 100 } } })`. ORM u pozadini prevodi ovaj kod u SQL upit, štiti nas od bezbednosnih propusta i automatski nam vraća JavaScript objekte.

Za ovaj projekat izabrali smo **Sequelize**, jedan od najpopularnijih ORM-ova za Node.js, u kombinaciji sa **SQLite** bazom (koja je odlična za početnike jer ne zahteva instalaciju posebnog servera za bazu, već sve čuva u jednom fajlu `database.sqlite`).

### 2. Šta je REST API?
API (Application Programming Interface) je interfejs koji omogućava različitim softverskim sistemima da komuniciraju. **REST (Representational State Transfer)** je arhitektonski stil za kreiranje web API-ja. 

Osnovni principi REST-a se oslanjaju na HTTP metode:
- **GET**: Za čitanje podataka (npr. daj mi listu proizvoda).
- **POST**: Za kreiranje novih podataka (npr. kreiraj novu porudžbinu).
- **PUT / PATCH**: Za ažuriranje postojećih podataka.
- **DELETE**: Za brisanje podataka.

Takođe, REST API vraća standardne **HTTP statusne kodove**:
- `200 OK`: Sve je prošlo u redu.
- `404 Not Found`: Resurs koji tražite (npr. proizvod sa tim ID-em) ne postoji.
- `500 Internal Server Error`: Nešto je puklo na našem serveru (greška u kodu ili je pala baza).

### 3. Zašto `async` i `await`?
JavaScript je *single-threaded*, što znači da može da radi samo jednu po jednu operaciju. Komunikacija sa bazom podataka traje (čitanje sa hard diska). Da server ne bi bio "zamrznut" dok čeka bazu, te operacije se izvršavaju asinhrono (u pozadini) kroz **Promise**-e.
Ključna reč `await` kaže JavaScriptu: *"Pauziraj izvršavanje ove funkcije ovde dok se Promise (odgovor iz baze) ne završi, a za to vreme slobodno opslužuj druge korisnike"*. Da bismo koristili `await`, funkcija u kojoj se nalazimo mora biti deklarisana kao `async`.

---

## 🛠 Praktični deo: Šta smo zapravo iskodirali?

### 1. Definisanje Modela (`src/models/Product.ts`)
Model u Sequelize-u predstavlja tabelu u bazi. Definisali smo koje kolone naša tabela `Products` ima:
- `id`: Koristili smo `UUID` (Universal Unique Identifier) umesto običnih brojeva. Ovo sprečava napadače da pogode koliko korisnika/proizvoda imamo prostim dodavanjem broja +1 na ID.
- `name`, `description`, `price`, `stock`, `category`, `imageUrl`: Osnovne informacije o proizvodu, zajedno sa njihovim tipovima (`STRING`, `TEXT`, `FLOAT`, `INTEGER`). `allowNull: false` znači da su ova polja obavezna.

### 2. Konekcija i Sinhronizacija (`src/models/index.ts`)
Podesili smo konekciju ka `database.sqlite` fajlu. Korišćenjem metode `sequelize.sync()`, Sequelize pri startu servera proverava da li tabela `Products` postoji. Ako ne postoji, sam izvršava `CREATE TABLE` SQL upit!

### 3. Seeding (Početni podaci) (`src/seed.ts`)
Prazna aplikacija nije zanimljiva. "Seeding" je proces popunjavanja baze inicijalnim (dummy) podacima. Napisali smo skriptu koja briše postojeću bazu i unosi 5 proizvoda. Ovo je standardna praksa pre svakog automatskog testiranja.

### 4. Kreiranje API Ruta (`src/app.ts` / `src/index.ts`)
Napravili smo dve rute korišćenjem Express.js-a:
```typescript
app.get('/api/products', async (req: Request, res: Response) => { ... })
```
Kada korisnik pogodi `/api/products`, Express poziva asinhronu funkciju koja preko `Product.findAll()` izvlači sve proizvode iz baze i šalje ih nazad korisniku u JSON formatu (`res.json()`).

---

## 🚀 Kako testirati i šta treba da uradite?

1.  Pokrenite server kucanjem `npm run dev` unutar `backend` foldera.
2.  Otvorite brauzer i posetite `http://localhost:3000/api/products`.
3.  Trebalo bi da vidite JSON (tekstualni format za prenos podataka) sa listom svih proizvoda.

### Zadatak za studente 👨‍💻
1. Otvorite fajl `backend/src/seed.ts` i dodajte još jedan proizvod u listu `products`.
2. Sačuvajte fajl, a zatim u novom terminalu (unutar `backend` foldera) pokrenite komandu: `npx ts-node src/seed.ts`.
3. Osvežite brauzer na adresi `http://localhost:3000/api/products`. Da li se pojavio vaš novi proizvod?
4. Probajte u kodu `app.ts` rute `/api/products/:id` da pronađete liniju koja vraća grešku 404. Promenite tekst poruke iz `'Product not found'` u nešto drugo, sačuvajte fajl i testirajte promenu tako što ćete u brauzeru pristupiti nekom fiktivnom ID-u (npr. `http://localhost:3000/api/products/123`).

---
Sledeća faza se bavi pisanjem profesionalnih automatizovanih testova kako bismo bili sigurni da naš kod zauvek radi ispravno!
