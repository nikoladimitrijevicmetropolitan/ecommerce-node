# React Testiranje: Sveobuhvatni Vodič

Testiranje frontend aplikacija je ključna veština svakog modernog inženjera. U React-u, testiranje nije samo "provera da li kod radi", već osiguranje da se korisnički interfejs ponaša predvidivo u svim scenarijima.

---

## 📚 Tri stuba frontend testiranja

Kao što smo radili na backendu, i na frontendu koristimo "Piramidu testiranja", ali sa alatima specifičnim za brauzer:

### 1. Unit (Jedinični) Testovi — Vitest + React Testing Library (RTL)
Ovi testovi proveravaju jednu izolovanu komponentu. 
- **Cilj**: Da li se dugme renderuje? Da li je `disabled` kada treba?
- **Alat**: `vitest` (pokretač) i `React Testing Library` (RTL).
- **Filozofija**: RTL nas uči da testiramo komponente **kao korisnici**, a ne kao programeri. Umesto da proveravamo "state" ili "props", mi proveravamo šta korisnik vidi na ekranu (npr. `screen.getByText('Add to Cart')`).

### 2. Integracioni Testovi — Testiranje stranica i protoka podataka
Ovde testiramo kako komponenta (npr. `ProductListPage`) komunicira sa našim servisima (`api.ts`).
- **Problem**: Ne želimo da testovi zavise od pravog interneta ili upaljenog bekenda.
- **Rešenje: Mocking**. Koristimo `vi.mock()` da "presretnemo" pozive ka API-ju i vratimo lažne (ali predvidive) podatke. Ovo nam omogućava da testiramo:
  - Šta se vidi dok se podaci učitavaju (`LoadingSpinner`).
  - Šta se vidi kada podaci stignu.
  - Šta se vidi kada se desi greška (npr. backend padne).

### 3. E2E (End-to-End) Testovi — Playwright
Ovo su "kraljevski" testovi. Oni simuliraju pravog korisnika koji sedi ispred ekrana.
- **Cilj**: "Korisnik otvori sajt, klikne na laptop, vidi cenu, vrati se nazad".
- **Alat**: `Playwright`.
- **Značaj**: Oni proveravaju **ceo sistem** (Frontend + Backend + Baza). Ako E2E prolazi, možemo mirno da spavamo.

---

## 🛠 Detaljna analiza koda

### Podešavanje okruženja (`vite.config.ts` i `setupTests.ts`)
Vite je alat za build, ali smo ga proširili da razume i testove.
- `environment: 'jsdom'`: Pošto testove pokrećemo u terminalu (koji nema ekran), koristimo `jsdom` — virtuelni brauzer u memoriji koji simulira HTML DOM.
- `setupTests.ts`: Ovde uvozimo `@testing-library/jest-dom` kako bismo imali moćne provere poput `.toBeInTheDocument()` ili `.toBeDisabled()`.

### Testiranje komponente (`ProductCard.test.tsx`)
```typescript
it('renders product details correctly', () => {
  render(
    <MemoryRouter>
      <ProductCard product={mockProduct} />
    </MemoryRouter>
  );
  expect(screen.getByText('Test Laptop')).toBeInTheDocument();
});
```
- **MemoryRouter**: Naša komponenta ima `<Link>` tagove. Oni ne rade van React Router-a. Zato u testovima koristimo `MemoryRouter` koji simulira navigaciju u memoriji.
- **render**: Ova funkcija iz RTL-a bukvalno "nacrta" komponentu u naš virtuelni brauzer.

### Integracija i Mocking (`ProductListPage.test.tsx`)
```typescript
vi.mock('../../services/api', () => ({
  api: { products: { getAll: vi.fn() } }
}));
```
Ova linija je magična. Ona kaže: "Kad god bilo ko u ovom testu zatraži `api.ts`, daj mu ovaj lažni objekat sa lažnom funkcijom `vi.fn()`". Na taj način možemo kontrolisati šta API vraća (`mockResolvedValue`).

### E2E i WebServer (`playwright.config.ts`)
Jedna od najboljih stvari u Playwright-u je automatski `webServer`.
- Mi smo ga konfigurisali da on **sam pokrene** `npm run dev` u backend i frontend folderu pre nego što krene test.
- On čeka da portovi 3000 i 5173 postanu aktivni, i tek onda pušta robota u akciju.

---

## 🚀 Kako studenti treba da koriste ove testove?

1.  **Promeni kod i pokreni test**: Pokušaj da obrišeš naslov u `ProductCard.tsx` i pokreni `npm run test` u frontendu. Videćeš kako test "vrišti" jer ne može da nađe naslov. To je dokaz da test radi svoj posao!
2.  **Testiraj greške**: U integracionom testu smo simulirali šta se desi kad API vrati grešku. To je nemoguće (ili jako teško) testirati ručno u brauzeru, ali u testovima je to samo jedna linija koda (`mockRejectedValue`).
3.  **Gledaj robota**: Pokreni `npx playwright test --ui` u `e2e` folderu. Otvoriće se prozor gde možeš da vidiš kako robot prolazi kroz tvoj sajt korak po korak.

Testiranje nije teret, već **investicija**. Što više testova imate, to ćete brže moći da menjate kod bez straha da ste nešto pokvarili!
