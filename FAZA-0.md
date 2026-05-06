# Faza 0: Inicijalizacija Projekta i TypeScript Setup

Dobrodošli u prvu fazu razvoja **E-commerce Vibe** aplikacije! U ovoj fazi smo postavili temelje za naš monorepo (projekat koji sadrži i frontend i backend u istom repozitorijumu).

## Šta smo uradili?

### 1. Struktura Projekta
Kreirali smo dva glavna foldera:
- `/backend`: Node.js server sa Express-om.
- `/frontend`: React aplikacija kreirana pomoću Vite-a.

### 2. Backend Setup (Node.js + TypeScript)
Zašto koristimo **TypeScript** na bekendu?
- **Tipizacija**: Smanjujemo broj grešaka jer TypeScript zna koji tip podataka očekujemo.
- **Autocompletion**: Lakše snalaženje u kodu jer nam IDE sugeriše dostupne metode i property-je.

**Ključni fajlovi:**
- `package.json`: Sadrži zavisnosti (`express`) i razvojne alate (`typescript`, `ts-node`, `nodemon`).
- `tsconfig.json`: Konfiguracija TypeScript kompajlera (gde se nalazi kod, gde ide kompajliran kod, verzija JS-a).
- `src/index.ts`: Osnovni server koji sluša na portu 3000.

**Komande za pokretanje:**
```bash
cd backend
npm run dev
```

### 3. Frontend Setup (React + TypeScript)
Koristimo **Vite** jer je ekstremno brz alat za razvoj React aplikacija.

**Zašto React sa TS?**
- Komponente dobijaju strogo definisane `Props` (svojstva), što sprečava proleđivanje pogrešnih podataka.
- Bolje upravljanje stanjem aplikacije.

**Komande za pokretanje:**
```bash
cd frontend
npm install  # (ako već nisu instalirani)
npm run dev
```

## Kako pratiti kod?

1. Pogledajte `backend/src/index.ts`. Obratite pažnju kako smo uvezli `Request` i `Response` tipove iz `express` biblioteke. To nam omogućava da imamo uvid u sve što jedan HTTP zahtev/odgovor sadrži.
2. Pogledajte `frontend/src/App.tsx`. To je polazna tačka naše React aplikacije.

---

## Zadatak za studente
- Pokrenite backend komandom `npm run dev`.
- Otvorite `http://localhost:3000/api` u brauzeru. Trebalo bi da vidite poruku: `{"message": "E-commerce API is running"}`.
- Pokrenite frontend i uverite se da se učitava default Vite stranica.

---

**Sledeća faza:** Kreiranje Product modela i prvih API ruta!
