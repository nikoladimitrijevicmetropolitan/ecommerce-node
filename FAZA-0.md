# Faza 0: Inicijalizacija Projekta i TypeScript Setup

Dobrodošli u prvu fazu razvoja **E-commerce Vibe** aplikacije! U ovoj fazi postavljamo temelje za ceo projekat. Umesto da sve držimo u jednom folderu, koristimo **monorepo** pristup — gde su i frontend i backend deo istog repozitorijuma, ali rade kao zasebne celine.

---

## 1. Struktura foldera (Monorepo)

Zašto smo ovako organizovali fajlove?
- `/backend`: Ovde živi naš server, API i baza podataka.
- `/frontend`: Ovde živi naša React aplikacija (korisnički interfejs).
- `package.json` u svakom folderu: Svaki deo aplikacije ima svoje zavisnosti (biblioteke).

---

## 2. Backend: Duboko zaron u Node.js + TypeScript

U backend folderu smo instalirali nekoliko ključnih alata:

### Ključne biblioteke:
1.  **express**: Minimalistički web framework za Node.js koji nam omogućava da lako pravimo rute.
2.  **typescript**: Programski jezik koji dodaje tipove JavaScript-u.
3.  **ts-node**: Alat koji nam omogućava da direktno pokrećemo `.ts` fajlove bez prethodnog ručnog kompajliranja u JS.
4.  **nodemon**: Nadgleda promene u kodu. Čim sačuvate fajl, on restartuje server.

### Razumevanje `package.json` skripti:
Pogledajte `backend/package.json`. Dodali smo:
- `"dev": "nodemon src/index.ts"`: Koristimo ga tokom razvoja.
- `"build": "tsc"`: Pretvara sav TS kod u čist JS za produkciju.
- `"start": "node dist/index.js"`: Pokreće gotov, kompajliran kod.

### Šta je to `express.json()`?
U `index.ts` smo dodali `app.use(express.json())`. To je **middleware** koji govori Express-u: *"Ako ti stigne zahtev sa JSON podacima (npr. kad se neko loguje), automatski ih pretvori u JavaScript objekat da mogu da im pristupim preko `req.body`"*.

---

## 3. Frontend: Zašto Vite + TypeScript?

Vite (francuska reč za "brzo") je zamenio stari `create-react-app`.

### TypeScript u React-u:
- **`App.tsx`**: Ekstenzija `.tsx` govori brauzeru da fajl sadrži i TypeScript i JSX (React kod).
- **Stroga pravila**: Ako u React komponentu pokušate da pošaljete broj tamo gde se očekuje tekst, TypeScript će vam podvući kod crvenom bojom pre nego što uopšte pokrenete aplikaciju. To štedi sate debagovanja!

---

## 4. Kako pokrenuti projekat?

Otvorite dva terminala:

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

---

## 💡 Lekcija za studente: Razlika između Dependencies i DevDependencies

Ako pogledate `backend/package.json`, videćete dve grupe:
1.  **`dependencies`**: Biblioteke koje su neophodne da bi aplikacija radila (npr. `express`). One idu na server kada objavimo sajt.
2.  **`devDependencies`**: Alati koji nam trebaju samo dok kucamo kod (npr. `typescript`, `nodemon`). Oni se ne šalju na finalni server, čime štedimo prostor i resurse.

---

## Zadatak za istraživanje:
1.  Otvorite `backend/src/index.ts` i promenite poruku u `res.json`. Primetićete da se u terminalu server sam restartovao zahvaljujući **nodemon-u**.
2.  Pokušajte da u `index.ts` obrišete tipove `: Request` i `: Response` iz rute. Primetite kako vam VS Code više ne nudi opcije kada kucate `res.` (to je moć TypeScript-a!).

---

**Sledeća faza:** Povezivanje sa bazom podataka i kreiranje `Product` modela!
