# sajt-creator-fixer

Ett skill för Claude Code som bygger **nya** hemsidor och bygger **om** befintliga för lokala företag, från grunden, till 100 000 kr-nivå. En sajt i taget.

Skillet slår ihop Carlius Digitals arbetsflöde med flera design-skills (Impeccable, taste-skill, Emil Kowalski, Apple) och lägger till:

- research på världens bästa sajter för just den typen av ställe, med riktiga skärmdumpar och ett memo
- variation mellan sajterna, men alltid det som ser bäst ut
- bilder från kunden först, stockbilder märkta "Exempelbild"
- ingen zoom, inga tankstreck, inga påhittade fakta
- verifiering i riktig Chrome på 1440, 820 och 390 px, och språkgranskning på svenska och engelska
- fristående design- och faktagranskare, och öppnande i Safari när varje sajt är klar

## Innehåll

- `skills/sajt-creator-fixer/SKILL.md` är själva skillet.
- `scripts/realsite.mjs` tar skärmdumpar av en sajt i riktig Chrome (stegvis scroll, konsolfel, overflow).
- `scripts/refshot.mjs` tar skärmdumpar av referenssajter på nätet.
- `scripts/extract-text.py` plockar ut all synlig text för språkgranskning.

## Installera

```bash
mkdir -p ~/.claude/skills ~/.claude/omdesign
cp -R skills/sajt-creator-fixer ~/.claude/skills/
cp scripts/* ~/.claude/omdesign/
```

Skillet förutsätter Google Chrome, Node 22, Python 3 med Pillow, och de andra skillarna som det hänvisar till.

Uppdateras automatiskt av `publish-skill.sh` varje gång skillet ändras.
