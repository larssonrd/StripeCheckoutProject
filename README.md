# Webbshop Projekt

Detta är ett full-stack projekt för en simpel webbshop. Projektet använder Stripe för att hantera produkter och ordrar, och PostNord API för att hantera utlämningsställen.

## Beskrivning av Uppgiften

Projektet är en webbshop där användare kan registrera sig, logga in, lägga till produkter i en kundvagn och placera en order. Alla användaruppgifter och ordrar sparas i JSON-filer och alla lösenord sparas krypterade. 

## Krav som Uppfyllts

G:
1. Produkter ska listas på en sida. 
2. Produkter som visas och köps skall hämtas ifrån Stripe.
3. Det ska gå att lägga till produkter i en kundvagn.
4. Baserad på kundvagnen skall det gå att lägga en order genom Stripe.
5. Man skall kunna registrera sig som en användare i webbshoppen. Detta skall resultera i att en ”Customer” skapas i Stripe och användaren sparas i en JSON-fil. (samtliga lösenord skall sparas krypterade).
6. Man skall kunna logga in som kund. Den inloggade kunden (som även är sparad i Stripe) skall användas vid placering av order.
7. Man skall inte kunna placera en order om man inte är inloggad.
8. Samtliga placerade ordrar skall sparas till en lista i en JSON-fil.
9. Ordern får inte under några omständigheter sparas utan genomförd betalning! (dvs. Spara aldrig ett orderobjekt såvida ni inte fått bekräftelse tillbaka ifrån stripe att betalningen gått igenom).

VG:
1. Alla punkter för godkänt är uppfyllda
2. Det skall gå att ange en rabattkod för att få rabatt på sitt köp (Detta görs genom Stripe)
3. Man skall som inloggad kunna se sina lagda ordrar.
4. Innan man betalar behöver användaren fylla i sin adress och utifrån adressen välja ett utlämningsställe där paketet skall hämtas (PostNord API).

## Hur man startar projektet

1. Klona repot: `git clone https://github.com/larssonrd/StripeCheckoutProject/`
2. Navigera till projektets mapp: `cd <projekt-namn>`

### Starta Servern

3. Navigera till servermappen: `cd server`
4. Installera serverns dependencies: `npm install`
5. Starta servern: `npm start`

### Starta Klienten

6. Öppna en ny terminal och navigera till klientmappen: `cd ../client`
7. Installera klientens dependencies: `npm install`
8. Starta klienten: `npm run dev`

Besök `http://localhost:3000` för att se applikationen.

## Länk till GitHub Repo

https://github.com/larssonrd/StripeCheckoutProject/
