# Testiranje Faze 1: Automatizacija i Sigurnost

Sada kada imamo funkcionalan backend, vreme je da osiguramo da on zaista radi ono što očekujemo. Profesionalni Vibe Coding uvek uključuje testove. Zašto? Zato što svaki put kada dodamo novu funkciju (feature) postoji šansa da slučajno "pokvarimo" neku staru. Testovi nas čuvaju od toga.

---

## 📚 Teorijski deo: Piramida Testiranja

U modernom razvoju softvera testovi se dele u tri osnovne kategorije (tzv. "Piramida testiranja"):

1.  **Unit (Jedinični) Testovi**: Testiraju najmanji izolovani deo koda, obično jednu jedinu funkciju. Pišu se brzo, izvršavaju se u milisekundi i imamo ih najviše. Međutim, ne garantuju da te male funkcije lepo rade kada se spoje.
2.  **Integracioni Testovi**: Testiraju kako više komponenti funkcioniše zajedno. Npr. da li naša Express ruta (`GET /api/products`) ispravno komunicira sa našom Sequelize bazom podataka. Ovo je upravo ono što smo mi iskodirali u ovoj fazi.
3.  **E2E (End-to-End) Testovi**: Testiraju kompletnu aplikaciju, od korisničkog interfejsa do baze podataka. Oni otvaraju stvarni brauzer (poput Chrome-a), klikću dugmiće na stranici i proveravaju da li se dešava ono što korisnik očekuje. Najskuplji su i najsporiji za izvršavanje, ali ulivaju najviše poverenja.

---

## 🛠 Praktični deo: Šta smo zapravo iskodirali?

### 1. Refaktorisanje za lakše testiranje (`app.ts` vs `index.ts`)
Da bismo testirali naš API, morali smo malo da promenimo arhitekturu koda.
Pre ovoga, naš kod je kreirao Express aplikaciju i *odmah* je vezao za port (slušao na određenom kanalu). Alati za testiranje mrze kada kod sam otvara portove.
- Umesto toga, izmestili smo celokupnu definiciju aplikacije (rute i middleware) u `src/app.ts` i prosto *exportovali* taj objekat.
- U `src/index.ts` smo uvezli tu aplikaciju, i tu radimo pokretanje servera `app.listen(...)` kao i konekciju na pravu bazu.
Zahvaljujući ovom razdvajanju koncepata, naš testni fajl može slobodno da importuje `app` i testira ga "ispod haube" bez obaveze pokretanja servera.

### 2. Integracioni Backend Testovi (Vitest + Supertest)
Koristimo dva fantastična alata:
- **Vitest**: Test runner. On je odgovoran za pronalaženje fajlova sa testovima i izvršavanje blokova `describe`, `it`, `beforeAll`, `expect`. Nudi sintaksu pomoću koje jasno definišemo šta očekujemo od našeg koda.
- **Supertest**: Biblioteka koja simulira HTTP zahteve (glumi da je Postman ili brauzer).

Pogledajte kod u `backend/src/__tests__/product.test.ts`. Primetite životni ciklus (Lifecycle) testa:
1.  **Setup (`beforeAll`)**: Pre nego što išta krene, čistimo bazu `sequelize.sync({ force: true })` kako prethodni podaci ne bi lažirali rezultate testa. Zatim ručno kreiramo jedan proizvod i čuvamo njegov ID u memoriji. To je takozvana pripremna faza.
2.  **Test 1 (Pozitivan ishod)**: Supertest šalje `GET` zahtev na `/api/products`. Mi preko Vitest-a `expect(...)` (očekujemo) da odgovor servera ima status 200 i da vrati listu koja sadrži testni proizvod.
3.  **Test 2 (Negativan ishod)**: Supertest traži fiktivni ID (nešto što sigurno ne postoji). Očekujemo da naš backend bude pametan i prepozna to vraćajući `404 Not Found` grešku, umesto da "pukne" sa 500.

**Zadatak za probu:**
Otvorite terminal, pređite u backend folder i pokrenite komandu:
```bash
npm run test
```
Videćete zelene kvačice koje znače da su svi testovi uspešni.

### 3. E2E Infrastruktura (Playwright)
Kreirali smo `e2e` (End-to-End) folder. Instalirali smo Microsoft-ov alat **Playwright**.
Ovaj alat je bukvalno robot koji programerski upravlja brauzerom.

U `playwright.config.ts` fajlu smo napisali "magiju" – pre nego što pokrene brauzer, Playwright je instruisan da automatski u pozadini pokrene oba naša servera (i backend na portu 3000 i frontend na portu 5173).

Zatim smo napisali "Smoke Test" u `tests/smoke.spec.ts`. Naziv dolazi iz inženjerstva hardvera: "Uključi struju i vidi da li negde izlazi dim". To su najosnovniji testovi koji samo proveravaju da li se naša aplikacija uopšte "pali".
- Robot poseti `localhost:5173`.
- Očekuje da pročita naslov u tabu "E-commerce Vibe" (što smo podesili u HTML-u frontenda).
- Zatim proveri da li backend vraća proizvode.

Kada dođemo do Faze 2 i izgradimo pravi korisnički interfejs sa dugmićima i slikama, naučićemo kako da naučimo Playwright-a da "klikne" na dugme "Dodaj u korpu".

---

Sledeća stanica: **Faza 2 i izgradnja React korisničkog interfejsa!**
