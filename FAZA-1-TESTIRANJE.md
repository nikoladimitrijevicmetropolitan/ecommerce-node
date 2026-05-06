# Testiranje Faze 1: Automatizacija i Sigurnost

Sada kada imamo funkcionalan backend, vreme je da osiguramo da on zaista radi ono što očekujemo. Profesionalni Vibe Coding uvek uključuje testove!

## Šta smo dodali?

### 1. Refaktorisanje za lakše testiranje
Da bismo testirali naš server, morali smo malo da izmenimo kod.
- U `src/app.ts` smo definisali celu aplikaciju (Express, rute), ali je nismo pokrenuli (nismo zvali `app.listen`).
- U `src/index.ts` smo uvezli tu aplikaciju, povezali se na bazu i pokrenuli server.

*Zašto?* Alati za testiranje vole da sami pokreću "mini verzije" našeg servera dok vrte testove. Ovim smo im to omogućili!

### 2. Integracioni Testovi (Backend)
Koristimo **Vitest** i **Supertest**.
- **Vitest** pokreće testove i proverava da li je rezultat ono što očekujemo (`expect(...)`).
- **Supertest** glumi klijenta (npr. brauzer ili Postman) i šalje prave HTTP zahteve našoj aplikaciji.

Pogledajte `backend/src/__tests__/product.test.ts`:
1. Pre svih testova (`beforeAll`), čistimo bazu i dodajemo jedan probni proizvod.
2. Zatim gađamo `/api/products` i očekujemo status `200 OK` i listu u kojoj je naš testni proizvod.
3. Gađamo nepostojeći proizvod i očekujemo `404 Not Found`.

**Probajte sami:**
```bash
cd backend
npm run test
```

### 3. E2E Infrastruktura (Playwright)
Kreirali smo `e2e` folder za **End-to-End** testove.
Ovi testovi bukvalno otvaraju pravi Chromium (Chrome) brauzer i klikću po aplikaciji kao pravi korisnik!

Pošto frontend još nema funkcije, napisali smo samo "Smoke Test" (`e2e/tests/smoke.spec.ts`):
- Proverava da li se frontend podiže i ima pravi naslov ("E-commerce Vibe").
- Proverava da li backend odgovara na pozive.

Playwright je magija jer smo ga podesili (`playwright.config.ts`) da pre pokretanja testova *sam automatski pokrene i backend i frontend servere*!

**Probajte sami:**
```bash
cd e2e
npm run test
```

---

Sledeća stanica: **Faza 2 i izgradnja React korisničkog interfejsa!**
