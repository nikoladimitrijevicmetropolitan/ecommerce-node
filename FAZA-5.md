# Faza 5: Paginacija, Pretraga i Filtriranje

U ovoj fazi smo transformisali našu listu proizvoda u moćan alat za pretragu. Naučili smo kako da efikasno upravljamo velikim količinama podataka koristeći **Server-side** logiku.

## 📚 Teorija: Zašto Serverska Paginacija?

Kada imate 5-10 proizvoda, lako ih je sve učitati odjednom. Ali šta ako imate 50.000? 
- **Client-side**: Učitavate svih 50.000 (aplikacija "puca" ili se učitava 30 sekundi).
- **Server-side**: Učitavate samo 8 ili 10 koji su vam potrebni za trenutni prikaz.

### SQL `LIMIT` i `OFFSET`
Naš backend sada koristi ove dve komande:
- `LIMIT 8`: Vrati mi samo 8 rezultata.
- `OFFSET 16`: Preskoči prvih 16 (što znači da smo na 3. stranici).

---

## 🛠 Ključne Funkcionalnosti

### 1. Debounce Pretraga
Kada korisnik kuca u polje za pretragu, ne želimo da šaljemo zahtev serveru za svako slovo (npr. kucanje "laptop" bi poslalo 6 zahteva). 
Implementirali smo **Debouncing**: Aplikacija čeka 500ms nakon što korisnik prestane da kuca, i tek onda šalje JEDAN zahtev. Ovo drastično štedi resurse.

### 2. Sinhronizacija sa URL-om (`useSearchParams`)
Sve što korisnik uradi (promena stranice, pretraga, filter) se odmah upisuje u URL:
`?page=2&search=vibe&category=Audio`

**Zašto je ovo važno?**
- Korisnik može da pritisne "Back" dugme u brauzeru i vrati se na prethodnu pretragu.
- Korisnik može da pošalje link prijatelju, i prijatelj će videti TAČNO iste rezultate.

---

## 🧪 Testiranje Naprednih Funkcija

Uveli smo nove testove koji simuliraju kompleksno ponašanje:
1.  **Backend testovi**: Proveravamo da li parametri `page` i `limit` ispravno seku podatke.
2.  **E2E testovi (`search-pagination.spec.ts`)**: Naš robot sada kuca "Laptop", čeka sekundu, i proverava da li je lista ostala filtrirana. Takođe menja kategorije i proverava rezultate.

## 🚀 Zadatak za studente
1.  Pokušajte da dodate novi filter — npr. "Minimalna cena".
2.  Morate dodati input na frontend, proslediti ga kroz `api.ts`, i na backendu dodati `where.price = { [Op.gte]: minPrice }`.

Sada naša aplikacija izgleda i ponaša se kao pravi moderni web shop!
