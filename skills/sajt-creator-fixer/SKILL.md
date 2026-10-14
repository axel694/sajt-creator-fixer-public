---
name: sajt-creator-fixer
description: Bygger NYA hemsidor och bygger OM befintliga, från grunden, till 100 000 kr-nivå för lokala företag. Kombinerar Carlius-standarden, Impeccable, taste-skill, Emil Kowalski och Apple-designprinciper med research på världens bästa sajter per bransch, riktiga skärmdumpar, språkgranskning och fristående granskare. En sajt i taget. Använd när någon vill bygga eller bygga om en kundsajt.
---

# /sajt: ny sajt eller omgörning, samma flöde

Uppdrag: `$ARGUMENTS`

Ett kommando som slår ihop Carlius Digitals arbetsflöde med `carlius-standard`,
`carlius-antislop`, `impeccable:impeccable`, `taste-skill:taste-skill`,
`taste-skill:brandkit`, `emil-design-eng` och `apple-design`. Axel beställde det
2026-10-13. Reglerna från alla sju är inbyggda nedan, så flödet funkar även om en skill inte
laddas. Står det "läs skillen" betyder det att du ska ladda den för fördjupning.

Mål: **varje sajt är värd 100 000 kr**, liknar kunden, passar mobil, iPad och dator och
fungerar i Chrome, Safari och Firefox. **En sajt i taget. Hela sajten, alla sidor.**

## Läge (välj automatiskt)

- **OMGÖRNING:** argumentet är en befintlig mapp i `~/Desktop/Carlius Digital/Demos för klienter/`,
  eller `nästa`. Då börjar du i fas 1B.
- **NY:** argumentet är ett företagsnamn (+ ort) eller en URL utan mapp. Då börjar du i fas 1A.
- Oklart vilket? Fråga en gång, kort. Resten av flödet är identiskt (fas 2 till 8).
- `nästa` = svagaste ej omgjorda, i ordning: Folk Pizza, Coffee Break, Gent's Groom Room,
  Love Coffee Roasters, Klippstugan FX, Fiskarns cykelbutik, Davidssons Bygg, Eriksmåleri,
  ReGarden, därefter resten.
- **Rör aldrig:** Sotenäs & Lysekil, Redovisningsbyråer, BYB (Christian), Mannz Bageri (död sajt).
- Alla sajter ligger i `Demos för klienter/<klientnamn>/`. Kolla `df -h /` först. Under 3 GB:
  städa `/tmp/*-prof-*`.

## Prioritetsordning när reglerna krockar

1. **Axels uttryckliga ord** (ingen zoom, ingen dödsajt, Exempelbild på stock, en sajt i taget,
   du väljer riktning själv, sajten ska likna kunden).
2. **Carlius-standarden:** faktaregeln, filstruktur (statisk HTML/CSS/JS, inget React eller
   Tailwind), cookie-banner, badge, sekretess, demo-status.
3. **Impeccable:** strängaste förbuden, PRODUCT.md, concept-seed, finish-review.
4. **Taste-skill:** layoutdisciplin, hero-regler, anti-AI-tells, Pre-Flight.
5. **Emil och Apple:** rörelse, känsla, tillgänglighet.
6. **Brandkit:** bara när logga saknas eller är oanvändbar.
Taste-skillens stack-råd (React, Next, Tailwind, Motion) gäller aldrig här. Samma regler,
översatta till ren HTML/CSS/JS med IntersectionObserver och CSS-övergångar.

---

## Fas 1A: NY sajt (research)

1. Mappen `Demos för klienter/<klient>/` med `_pipeline/`. Skapa aldrig sajten om kunden
   redan har en mapp, då är det omgörning.
2. Kör research parallellt (det är bred research, då är agenter motiverade):
   `research-officiellt` (hårdfakta, org.nr, adress, tider, tjänster), `research-visuellt`
   (bilder, logga, stämning) och `research-konkurrens` (lokala konkurrenter, sökord).
   Resultatet blir `_pipeline/memo.json`. **Det är enda källan till fakta.**
3. Saknas fakta som en företagare själv känner till: `[[SAKNAS: ...]]` och en rad i
   `Demos för klienter/_fragor-till-kunder.md`. Aldrig gissat. Källor som säger emot varandra
   eller tunt bildmaterial: fråga Axel direkt, kort, en fråga.
4. Fortsätt i fas 2.

## Fas 1B: OMGÖRNING (inventera)

1. Läs sajtens text, `_pipeline/memo.json` om den finns och sajtens rad i `_fragor-till-kunder.md`.
   Fakta kommer bara därifrån och från den gamla sidans innehåll. Inget nytt påhittas.
2. Flytta gamla versionen till `_pipeline/gammal-<datum>/` före allt annat.
3. Mät kundens egna bilder (`sips -g pixelWidth -g pixelHeight`) och titta på dem i en
   kontaktbild. Filnamn ljuger. Sampla loggans riktiga färger med PIL.
4. Behåll URL:er och sidnamn enligt standard §1 och §2. Allt annat byggs om.

---

## Fas 2: Research på världens bästa sidor, lär och efterlikna (alltid, i båda lägena)

Axel (2026-10-13): **alltid** research på de bästa sidorna i världen inom just den här branschen
och sidtypen, ta lärdomar av dem och efterlikna det de gör bäst. Aldrig hoppa över, inte ens
för en liten omgörning och inte ens för en enskild sektion (standard §13).

1. Hitta 8 till 10 av de bästa: världsledande och Nordens bästa i just den branschen (inte
   generiska toppsidor). Källor: Awwwards, siteinspire, Behance, branschpriser, "best <bransch>
   website", och framför allt riktiga verksamheter med riktigt bra sajter. Blanda stora och små.
2. Titta på dem på riktigt. `~/.claude/omdesign/refshot.mjs` tar skärmdumpar på 1440 och 390
   (`mkdir -p <ut>; VW=1440 VH=900 node refshot.mjs <ut> <url> <url> ...`, skicka URL:erna som
   separata argument). Läs bilderna. Stäng aldrig av med "såg bra ut", beskriv vad som funkar.
3. Memo `_pipeline/_referens-<sajt>.md` (max 40 rader) med tre block: **Vad de gör bäst** (hero,
   hierarki, sektionsordning, bildspråk, typografi, förtroende, beställ- eller bokningsväg,
   rörelse, mobil). **Vi efterliknar** (konkreta mönster och kvalitetsnivå som tas med, en rad
   per sak, med vilken referens som visar det). **Vi undviker** (det de gör fel eller det som
   inte passar kunden).
4. "Efterlikna" betyder samma kvalitet, struktur och principer. Aldrig kopierad design, text,
   bild, logga eller kod. Det som tas med ska synas i bygget och vara kundens eget.
5. Bygget granskas mot memot: granskaren får memot och skärmdumparna och bockar av varje rad under
   "Vi efterliknar". En rad som inte syns i bygget är en brist att åtgärda.
6. Gäller även enskilda sektioner (öppettider, meny, galleri, prislista, karta): kolla hur de
   bästa löser just den.

## Research per typ av ställe, variation och val av det snyggaste (Axel 2026-10-14)

1. **Research varje gång, för just den här typen av ställe.** Ett café, en barbershop, en pizzeria, en hudvårdsklinik, ett byggföretag och en trafikskola har olika bästa sajter. Hitta de bästa i världen och i Norden för exakt den typen (inte för "hemsidor" i allmänhet), titta på dem i riktig webbläsare och skriv memot (Fas 2). Lär av dem och efterlikna det de gör bäst: hero, hierarki, bokning eller beställning, bildspråk, typografi, tider och plats.
2. **Variera mellan sajterna.** Innan du väljer riktning: titta på de senaste tre sajterna som byggts (hero, typsnitt, färgvärld, layoutmönster) och välj något annat om kundens material tillåter. Exempel på heromönster att växla mellan: helbild med text över ett skydd (Gent's), hängda foton på en linje (Coffee Break), stor rubrik mot tätt beskuret foto (Folk Pizza), rubrik mot en ram med kundens eget material, tung typografisk affisch, delad skärm, galleri som tapet, video eller bildsekvens när kunden har material för det. Samma ställetyp kan få olika lösningar.
3. **Välj alltid det som blir snyggast.** Variation är inte ett mål i sig. Vinner ett mönster från en tidigare sajt för att det passar kundens bilder och bransch bäst, använd det. Avgör med research, kundens egna bilder (skärpa, motiv, ljus) och en skärmdump, inte med vana. Skriv i direction contract vilket mönster som valdes och varför de andra föll bort.
4. **Kundens material styr.** En stark, bred salongsbild bär en helbilds-hero. Små eller suddiga bilder bär ingen helbild, då blir ramar, typografi eller färgfält hjälten.

## Fas 3: Riktning (du väljer, Axel ser resultatet)

1. Skriv en rad: **"Reading this as: <sidtyp> för <publik>, <vibe>, <estetik>."** Sätt dials
   DESIGN_VARIANCE / MOTION_INTENSITY / VISUAL_DENSITY (taste-skill §1, bas 8/6/4, mindre
   för trygghetsbranscher som tandläkare och redovisning).
2. **Sajten ska likna kunden.** Kundens logga, färger, egna foton, lokal och bransch bygger
   världen. Sampla färger ur loggan. Ingen generisk mall.
3. Impeccable utan intervju (Axel har delegerat): skriv en kort `PRODUCT.md` i sajtmappen från
   memot (platform `web`, users, purpose, positioning, evidence on hand, absenser). Kör
   `impeccable concept-seed --scope direction --mode persuade` från sajtmappen och bygg
   tilldelad riktning, såvida den inte bryter mot sanning eller kundens identitet (säg då varför
   du tar en annan). Skriv direction contract med `surface-brief write`. Flytta PRODUCT.md,
   briefen och DESIGN.md till `_pipeline/` före leverans. Direction contract får aldrig in i
   kod, kommentarer, `data-`attribut eller metadata.
4. Färgstrategi först (Restrained, Committed, Full eller Drenched), sedan färger. Ljus eller mörk
   avgörs av vem som använder sajten, var och i vilket ljus, aldrig av bransch.
5. Fonter: ansikten med karaktär ur kundens värld. **Förbjudna som standard:** Inter, Fraunces,
   Instrument Serif, Playfair, Cormorant, Lora, Crimson, Newsreader, Syne, Space Grotesk, Space
   Mono, IBM Plex, DM Sans, DM Serif, Outfit, Plus Jakarta, Instrument Sans. Serif kräver
   uttalat skäl (heritage, editorial, kundens eget val). Emfas i rubrik = kursiv eller fet av
   samma familj, aldrig ett slumpat serifsord i en sans-rubrik. Kursiv med descender (y g j p q)
   får `line-height` minst 1.1.
6. Det som känns som standard-AI och därför byts: kräm-bakgrund med terrakotta, near-black med
   neon, broadsheet med hårlinjer och kursiv serif, lila gradienter, beige med mässing.
7. En accentfärg som används överallt. Ett radiussystem. Ett tema hela sidan (ingen sektion
   inverteras). Skuggor tonade mot bakgrunden, aldrig rent svarta, aldrig `#000` eller `#fff`.

## Fas 4: Bilder

1. Kundens egna bilder först, de skarpaste och mest karaktäristiska i första vyn.
2. Stock saknas? Unsplash via inbyggda browsern: `navigate` till
   `https://unsplash.com/s/photos/<sökord>`, vänta 2,5 s, scrolla, läs ut `figure img[srcset]`
   med `javascript_tool` (`src` före `?` ger `https://images.unsplash.com/photo-<id>`). Hämta
   `curl -o x.jpg "https://images.unsplash.com/photo-<id>?w=2000&q=80&fm=jpg&fit=max"`.
   curl mot sökning blockeras, bildservern fungerar. Hoppa över `plus.unsplash.com`.
3. Varje stockbild märks **"Exempelbild"** på bilden, med fotnot om att de ska bytas mot
   kundens egna. Inga främmande varumärken, kända personer eller fel mat/lokal. Egen bild och
   stock får inte krocka i ljus, färg och karaktär: beskär, tona, byt.
4. Wikimedia-krediter (CC BY-SA) behålls. Inga pillers eller etiketter ovanpå bilder,
   inga dekorativa fotokrediter. Aldrig base64.
5. Optimera: `srcset` + `sizes`, `width`/`height`, `loading="lazy"` utom hero som får
   `fetchpriority="high"`. Hero-bilden behöver skärpa på 1440 (minst 1600 px bred).
6. **Saknar kunden en användbar logga:** läs `taste-skill:brandkit`. Logga = enkel, symbolisk,
   skalbar SVG byggd av kundens namn och bransch (standard §12). Ingen klipplogga.
7. Div-fejkade skärmbilder, handritade dekor-SVG:er och ikoner som emoji är förbjudna.
   Ikoner kommer från ett riktigt bibliotek (Phosphor, Tabler eller Radix), en vikt, en stil.

## Fas 5: Bygg (hela sajten)

Skriv layout, CSS, typografi och ordning från grunden. Varje sida får egen karaktär inom samma
värld (standard §9). Filstruktur, sidnamn och cookie, badge och SEO enligt standard.

**Layout (taste + impeccable, den strängaste vinner)**
- Hero ryms i första vyn: rubrik max 2 rader, underrubrik max 20 ord, 1 primär och högst 1
  sekundär knapp, hero-toppadding max 6rem. Max 4 textelement i hero. Ingen tagline under
  knapparna, ingen trust-rad, ingen prisruta i hero.
- **Ingen eyebrow ovanför rubriker.** Impeccable förbjuder dem helt, taste tillåter 1 per 3
  sektioner: förbjud dem. Inga sektionsnummer (01/02), inga versionsetiketter, inga
  scroll-ledtrådar, inga dekorationsprickar, inga väder- eller platsremsor, inga dekorations-
  remsor i hero ("BRAND. MOTION. SPATIAL.").
- Inga lika-stora kort med ikon + rubrik + text som sidstruktur. Tre likadana kort är förbjudet.
  Kort bara när höjd (elevation) betyder något, annars `border-top`, `gap` eller luft.
  Aldrig kort i kort.
- Ingen "stor rubrik till vänster, liten text till höger" som sektionsrubrik. Rubrik och
  brödtext staplas, max 65 tecken bredd.
- Minst 4 olika layoutfamiljer på en sida med 8 sektioner. Max 2 bild+text-delningar i rad.
  Högst 1 marquee per sida. Inga spec-tabeller med linje under varje rad.
- Inga gradienttext, inga glow, ingen glasmorfism som dekor, inga `border-left` över 1 px på
  kort, inga hårda offsetskuggor, inga anpassade muspekare, inga modaler utan skäl.
- Navigation på en rad på desktop, max 80 px hög. En CTA-etikett per avsikt på hela sidan
  ("Boka tid" överallt, aldrig "Kontakta oss" + "Hör av dig" + "Boka"). En knapp bryter
  aldrig till två rader. Knapptext minst 4,5:1 mot knappen.
- Prosa, citat max 3 rader, inga påhittade siffror, inga tankstreck (`—`, `–`) i någon text,
  inga fyllnadsord ("sömlös", "elevera"), inga personer med påhittade namn.
- Sidan är ljus eller mörk, aldrig båda. Formulär: etikett ovanför fältet, felmeddelande under,
  aldrig placeholder som etikett.

**Teknik**
- Typsnitt självhostade (woff2 i `fonts/`, `font-display: swap`, hämtade via Google Fonts css2
  med modern user agent), inga Google-länkar.
- CSS custom properties för allt. `100dvh` med `100vh` som reserv, grid före flex-matte,
  `clamp()` på typ, `text-wrap: balance` på rubriker (med reserv). Brytpunkter 1024 och 768,
  testa 390, 768, 820 (iPad), 1024, 1440. Asymmetriska layouter faller till en kolumn under 768.
- Typografi (apple): tracking är storleksspecifik, rubriker negativt (`-0.02em`, golv
  `-0.04em`), brödtext nära 0. Radavstånd tajt på stora rubriker, luftigt på brödtext. Display
  max 6rem. Skala med `rem` så användarens textstorlek respekteras.
- Webbläsare: `-webkit-backdrop-filter` bredvid `backdrop-filter`, `@supports` för `:has`,
  `@starting-style`, container queries med fungerande reserv, `-webkit-line-clamp`,
  `-webkit-text-size-adjust:100%`, `touch-action: manipulation` på knappar, minst 16 px på
  formulärfält så iOS inte zoomar. Testa Safari och Firefox om de finns, annars läs koden för
  ovanstående och säg att de inte kördes.
- Touchytor minst 44 px. Hover bara bakom `@media (hover:hover) and (pointer:fine)`.
- Webbläsarens egna ytor tematiseras: `::selection`, `caret-color`, `:focus-visible`, scrollbar,
  `accent-color`, `text-decoration-thickness`, tabulära siffror för priser.
- Prestanda: bara `transform` och `opacity` animeras. Aldrig `padding`, `width`, `height`,
  `margin` i övergångar (impeccable-hooken flaggar det). Aldrig `window.addEventListener('scroll')`,
  använd IntersectionObserver eller CSS `animation-timeline`. CLS under 0,1, LCP under 2,5 s.
- Tillgänglighet: kontrast 4,5:1 brödtext och 3:1 stor text, fokusring synlig, hela sidan
  går att använda med tangentbord, `alt` på svenska, semantiska landmärken,
  `prefers-reduced-motion`, `prefers-contrast`, och fallback för `prefers-reduced-transparency`.

**Rörelse (emil + apple + standard §14)**
- **Ingen zoom. Aldrig.** Ingen Ken Burns, inget `scale()` på bilder, hero, kort, galleri eller
  reveal. Enda tillåtna `scale()` är `:active` på knappar (`.97`) och en pulserande statusprick.
- Motion claimed = motion shown: dial över 4 betyder att sidan faktiskt rör sig. Ett
  signaturmoment, planerat och orkestrerat. Varje animation har ett skäl i en mening
  (hierarki, berättelse, återkoppling, tillståndsbyte). Annars bort.
- Ska det animeras alls? Tangentbordsåtgärder och sådant användaren gör hundratals gånger:
  aldrig. Sällan sett: gärna.
- Easing: ut-/ease-out `cubic-bezier(.23,1,.32,1)` för in/ut, `cubic-bezier(.77,0,.175,1)` för
  rörelse på plats. **Aldrig `ease-in`, aldrig `transition: all`, aldrig `scale(0)`** (börja på
  `.95` med `opacity: 0`, men aldrig på bilder, se zoomregeln).
- Tider: knapptryck 100 till 160 ms, tooltips 125 till 200, dropdowns 150 till 250, drawers och
  modaler 200 till 400. UI under 300 ms. Exit snabbare än enter. Stagger 30 till 80 ms.
- Reveal: fade + `translateY` 8 till 24 px, via `@starting-style` eller `data-mounted`.
  Innehåll är synligt som standard (utan JS ska inget vara dolt).
- Avbrytbart: `transition` före `@keyframes` för allt som kan triggas flera gånger. Gester
  (swipe, drag) följer fingret 1:1, har pointer capture, hastighet från släpp, rubber-band vid
  kant, och fjäder utan studs som standard (damping 1.0, studs bara efter en riktig kast-gest).
- Spatial konsekvens: in och ut längs samma väg. Popovers skalar från sin trigger, aldrig från
  mitten (modaler undantagna). Panel som kommer in från höger lämnar åt höger.
- `prefers-reduced-motion`: bara fade och färg, inga förflyttningar, ingen parallax.
- Titta på rörelsen i slow motion (2 till 5 gånger långsammare) innan den godkänns.

**Brandkit (när logga/identitet byggs eller förstärks)**
Logo: en idé, ett symbolsystem, ur kundens verksamhet. Visa den som tre ytor på sajten
(header, footer, favicon), aldrig som mockup-tapet. Färgsystem 1 dominant + 1 accent + neutraler.

---

## Fas 6: Verifiera i riktig webbläsare, inget fusk

1. Skriptet `~/.claude/omdesign/realsite.mjs` startar Chrome utan testflaggor, scrollar stegvis,
   tar skärmdumpar, räknar konsolfel, dolda element, bildfel och horisontell overflow, och
   städar sin profil. Kör för **1440, 820 och 390**:
   `mkdir -p <ut>; SITE=<sajtmapp> VW=1440 VH=900 node ~/.claude/omdesign/realsite.mjs <ut>`
   (utmappen måste finnas, `MAXSHOTS=14` är standard).
2. Gör kontaktblad per bredd med PIL och läs dem. Kontrollera: ingen horisontell scroll,
   hamburgaren syns, rubriker bryts rent, CTA på en rad, formulärkontrast, tabbordning, fokus,
   cookie-bannern täcker inte innehåll, lightbox med tangentbord och swipe.
3. `impeccable detect --json <ändrade filer>`, en gång. Åtgärda det mekaniska.
4. Förbudsgrep: `grep -rn "scale(" css js` (bara knappar), `grep -rnP "—|–"` över synlig text,
   verktygsnamn (standard §5), `sk-`, `api_key`, `Bearer`, `x-api-key` i klientkod. Alla rena.
5. Bildvikt: bild över 300 kB utan `srcset` är ett fel. Alla bilder har `width` och `height`.
6. **Språkgranskning:** se avsnittet nedan, körs före Pre-Flight.
7. **Pre-Flight (taste §14) och 100 000 kr-testet:** Hade en konkurrerande byrå kunnat sälja
   den här sajten för 100 000 kr? Hade ägaren sagt ja i ett säljsamtal? Är något generiskt eller
   fult: bygg om det, laga det inte. Hör saken ihop med kundens identitet, eller liknar den
   vilken sajt som helst i branschen?
7. Skärmdumpar får inte ljuga (standard §10): scroll-reveal tar tid, `loading="lazy"` hinner
   inte, och en gammal cachad bild kan visas. Bedöm ett fynd först efter stegvis scroll.

## Språkgranskning (obligatorisk, svenska och engelska)

Axel 2026-10-14: kolla **alltid** grammatiken på svenska och engelska innan en sajt räknas som klar. Gäller all synlig text, alt-texter, meta, JSON-LD och ordlistor (SV och EN).

1. Plocka ut texten: `python3 ~/.claude/omdesign/extract-text.py <sajtmapp>`. Läs allt, rad för rad. Rätta i `build.py` (aldrig i de genererade filerna), bygg om, kör igen.
2. Svenska, vanliga fel att leta efter: ett- och en-ord (gott kaffe, ett te), bestämd form (första sekunden, i staden), saknad "som" i jämförelser ("så lokala som vi kan"), saknat "av" (två slices av valfri pizza), kommatecken mellan två huvudsatser (dela med punkt), stor bokstav mitt i en rubrik eller tjänstenamn (Skäggklippning och rakning, inte Rakning), "du" och "ni" blandade, inkonsekvent ordval för samma sak (rakkniv eller rakhyvel, välj ett), engelska ord där det finns bra svenska, samsägning (adjektiv och substantiv i rätt form), "och/samt" blandat, felstavade kundtermer (fråga kunden, rätta inte i det tysta), tankstreck och bindestreck i fel funktion.
3. Engelska: artiklar (a, an, the), preposition (on, in, at), ental och flertal, brittisk eller amerikansk stavning (välj en och håll den), versaler i rubriker (en stil), inga ord-för-ord-översättningar från svenskan, samma ton som svenskan.
4. Kundens egna texter är underlag men inte facit: rätta uppenbara grammatikfel och notera dem i `_fragor-till-kunder.md` om innebörden kan ändras. Ändra aldrig fakta (pris, tid, namn) för att texten ska låta bättre.
5. Granskarna (`impeccable-finish-reviewer`, `qa-fakta`) får uppdraget "granska också språket" i sitt paket. Kör extract-text-skriptet själv först så att grova fel redan är rättade.

## Fas 7: Granska och avsluta

1. En granskningsrunda: `impeccable-finish-reviewer` (färsk, med skärmdumparna som indata) och
   `qa-fakta` mot memot. Ett fixvarv. Stanna när ett varv inte löser något.
2. `impeccable-documenter` skriver DESIGN.md i `_pipeline/`.
3. Rapport till Axel, kort: vad som byggdes, referenser, riktningen och varför den liknar
   kunden, vilka bilder som är stock, vilka fakta kunden måste bekräfta (lägg dem i
   `_fragor-till-kunder.md`), mätvärden, och vad som **inte** är kontrollerat.
5. **Öppna sajten i Safari varje gång en sajt är klar** (`open -a Safari "<sajtmapp>/index.html"`), innan du går vidare. Gäller även när flera sajter byggs i rad: öppna varje sajt direkt när den är klar, och i slutet alla igen. Säg att du inte själv har sett Safari-fönstret.
6. Städa `/tmp/*-prof-*` och tillfälliga bilder. Säg vilken sajt som kommer härnäst och vänta
   på Axels klartecken före den.

## Frågor

Fråga (kort, en fråga) bara vid: fakta som källor säger emot varandra om, bildmaterial som är för
tunt för en 100 000 kr-sajt, oklart läge (ny eller omgörning), eller kundens identitet mot bästa
design. Annars bygger du. I batchläge: skriv `PAUSAD: <orsak>` i kön och gå vidare.

## Aldrig

Påhittade recensioner, betyg, namn, årtal, priser, öppettider. Zoom. Tankstreck. Verktygsnamn,
API-nycklar eller direction contract i kundkod. Publicering, mejl eller utskick utan Axels
uttryckliga ja. Att röra Sotenäs, Redovisningsbyråer, BYB eller Mannz Bageri.

## Lärdomar från de första sajterna (2026-10-14)

- Bygg sidorna med ett litet Python-skript (`_pipeline/build.py`) som delar header, footer och bildhjälpare. Gör ändringar där och kör om, aldrig handredigera de genererade HTML-filerna.
- Typsnitt: hämta woff2 (latin) från Google Fonts css2 med modern user agent och bädda in som data-URI i `css/fonts.css`. Chrome blockerar annars filtypsnitt från file://.
- Kundens raster-logga som kurva eller figur: spåra till SVG (sampla pixlar, centrumlinje, Catmull-Rom) i stället för att visa en suddig PNG. Ritas upp med `stroke-dashoffset` en gång.
- Hero ska ha ett stort kundfoto (minst halva viewportens höjd), på mobil ett riktigt foto över vikningen. Granskarna underkänner liten bildyta.
- Header-knappen får inte länka till sidan man står på. Rubrikens knapp byts per sida.
- Stark text på dammrosa/färgfält: kontrollera kontrasten för rostbrun mot rosa (3,3:1 räcker inte). Använd espresso.
- Fakta: skriv inte "varje dag" om källan säger "stort sortiment". Ta bort ingredienser i alt-text som menyn inte nämner.
- Impeccable-detektorn ger falska "cramped padding" på sektioner vars padding sätts med `clamp()` i en CSS-variabel. Verifiera med skärmdump och notera det.
- Cookie-bannern är obligatorisk enligt standarden trots granskarnas önskan. Gör den kompakt på mobil (knappar i en rad, ingen rubrik).
- Tvåspråkig sajt (SV/EN): bygg en ordlista i `build.py` (återanvänd kundens gamla texter ur deras `i18n.js`), generera sidorna med `data-i18n-html`-nycklar på svenska och `js/i18n.js` med båda språken. Språkvalet sparas i localStorage och byter titel och meta. Testa bytet på alla sidor.
- Kundens golv, vägg eller material som signatur (kakelmönster som inbäddad SVG i `--tile-img`), men begränsa ramen till 2 till 3 nyckelbilder så den behåller tyngden.
- Rader i en prislista: ge varje cell explicit `grid-column` och `grid-row`, annars hamnar namnet sist.
- **Telefonlänkar:** kontrollera att varje `tel:`-länk och `telephone` i JSON-LD motsvarar numret som visas (ett nummer som 070-123 45 67 ska bli `+46701234567`, aldrig med en extra nolla). Gör en grep över alla `tel:` mot visade nummer före leverans. Ett fel nummer är ett leveransstopp.

- **Cookie-banner:** visa den först efter 700 px scroll eller 12 s (inte efter 800 ms), annars täcker den hero och CTA i första vyn. Behåll bannern, standarden kräver den.
- **Granskaragenterna har ingen webbläsare.** Ta skärmdumparna själv (`realsite.mjs`), lägg dem i sajtens `.impeccable/review/` (desktop.png, mobile.png, tablet.png, `<sida>-desktop.png`, `<sida>-mobile.png`) och skicka sökvägen i uppdraget. Annars svarar finish-reviewer "recapture".
- **Gammal demo är inte kundkälla:** när en sajt redan byggts av oss (priser, citat, bilder), kontrollera README och kommentarer ("EXEMPELPRISER", "AI-genererade") innan texten tas som fakta. Ta bort påhittade priser, anonyma citat och obelagda superlativ. AI-bilder märks Exempelbild.
- **Sajtbildens mobil:** foto först i hero på mobil (max 34 till 40 dvh), ett enda primärt hero-knapp-läge, rubrik under bilden.
- **Detektorn flaggar beige/cream som bakgrund:** välj kallt papper (#f3f4f1 eller grönaktigt) i stället.
- **Kundens riktiga material först:** logga och foton (färg, motiv) styr palett och typsnitt (Djungelpatrullen: lime och skogsgrönt ur loggan).

## Underhåll av skillet (Axel 2026-10-14)

- **Mobilens sidhuvud:** primär knapp (Boka tid, Hitta hit) ska synas bredvid menyknappen utan att öppna menyn. Testa 360 och 390 px för overflow (logga, knapp och meny ska rymmas).
- **Inga inline-stilar på rutnät** (`style="grid-template-columns..."`): de vinner över media queries och bryter mobilen. Använd klass i CSS.
- **Kopierade filer:** byt namn i kommentaren när en JS-fil (lightbox, cookies) kopieras mellan sajter, och byt glyfikoner (×, ‹, ›) mot ritade SVG-ikoner.
- **Produktbilder med vinjett:** lägg bilderna i rutor med `mask-image: radial-gradient(...)` så att vinjetten smälter in i rutfärgen, och sätt rutnätet inom `.wrap` med 2 px linjer så det läses som en vägg.
- **Stockbilder:** gör dem svartvita i förväg om sajtens bildvärld är svartvit, och dokumentera källa och licens (`_pipeline/bildmanifest` eller `PROVENANCE`) per bild.
- **Belopp:** hårda mellanslag (`&nbsp;`) i priser så de aldrig bryts, och "kr" i gemener även i versala rubriker.
- **Cookie-banner:** standarden kräver den, men granskare föreslår ofta att den tas bort eftersom kartan har eget samtycke. Behåll den, gör den kompakt, och redovisa valet.
