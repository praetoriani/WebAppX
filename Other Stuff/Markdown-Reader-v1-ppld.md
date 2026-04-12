<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Bitte erstelle eine modern aussehende WebApp, mit der es möglich ist, Markdown-Dateien anzuzeigen und zu lesen. Die WebApp soll zwei Frames haben. Links ein Menü-Frame, welcher die einzelnen Überschriften aus einer MD-Datei Strukturiert darstellt (um schneller zu einem bestimmten Punkt zu springen). Rechts der Content-Frame, welcher die eigentliche MD-Datei rendert. Oberhalb der beiden Frames soll eine Tool-Leiste mit Buttons sein. Ein Button soll lokale MD-Dateien laden und ein anderer Button soll MDH-Dateien von einer URL laden. Es wäre toll, wenn das Design/UI der WebApp in einer Arr DarkMode wäre, aber trotzdem ein modernes, ansprechendes und benutzerfreundliches Interface bietet. Vielen lieben Dank für deine Hilfe und Unterstützung

Hier ist deine fertige **MarkdownReader WebApp** — eine einzelne `.html`-Datei, die du direkt im Browser öffnen kannst, ohne Server oder Installation.

***

## Was die App kann

### Toolbar

- **„Datei öffnen"**-Button (blau) — öffnet einen lokalen Dateidialog für `.md`, `.markdown`, `.mdx` und `.txt`-Dateien
- **URL-Feld** — URL einer Raw-Markdown-Datei einfügen (z. B. von `raw.githubusercontent.com`) und auf **Laden** klicken; GitHub-URLs werden automatisch in Raw-URLs umgewandelt
- **Datei-Badge** — zeigt den aktuell geöffneten Dateinamen
- **Sidebar-Toggle** — blendet die Navigation ein/aus
- **Theme-Toggle** — schaltet zwischen Dark und Light Mode um


### Navigations-Frame (links)

- Listet alle Überschriften (H1–H6) hierarchisch mit Einrückung auf
- **Suchfeld** filtert die Überschriften in Echtzeit
- Klick auf einen Eintrag scrollt smooth zur Stelle im Dokument
- Aktiver Abschnitt wird beim Scrollen **automatisch hervorgehoben**
- Breite ist per **Drag \& Drop am Rand** anpassbar


### Content-Frame (rechts)

- Vollständiges **GFM Markdown-Rendering**: Tabellen, Code-Blöcke, Blockquotes, Checkboxen, Bilder, Links
- **Code-Blöcke** mit Kopieren-Button (erscheint beim Hover)
- **Leseprogress-Balken** am oberen Rand
- **Drag \& Drop** — Markdown-Dateien einfach ins Fenster ziehen


### Tastaturkürzel

| Kürzel | Funktion |
| :-- | :-- |
| `Strg + O` | Datei öffnen |
| `Strg + \` | Seitenleiste togglen |


***

## Design

Die App verwendet ein **sattes Dark-Mode-Theme** mit tiefen, warmen Grautönen (`#0f0f0e` Hintergrund) und einem **Teal-Akzent** (`#3fa8b0`) für interaktive Elemente — angelehnt an Tools wie Linear oder Vercel.  Schriftart ist **Inter** für maximale Lesbarkeit. Es gibt auch einen vollständig ausgearbeiteten **Light Mode** mit warmen Beige-Tönen.

---
