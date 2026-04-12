<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Bitte erstelle eine moderne WebApp auf Basis von HTML5/CSS3/JS, die zunächst eine Art Anmeldebildschirm zeigt. Grundsätzlich soll es möglich sein, mit einem Benutzernamen und Passwort anzumelden. In der ersten Version ist es vollkommen ausreichend, wenn man sich mit Benutzername: Gast, Passwort: Gast anmelden kann. Allerdings wäre es cool, wenn es unten links eine "Konto anlegen" Option (oder sowas in der Richtung) und eine "Konten verwalten" Option gäbe. Wenn der Anwender auf "Konto anlegen" klickt, kann er ein neues Konto anlegen, mit dem er sich dann anschließend anmelden kann. Klickt er auf "Konten verwalten" sieht er lediglich eine Auflistung aller Konten und kann diese löschen (hat allerdings den vollständigen Datenverlust des Profils zur Folge). Nach erfolgreicher Anmeldung soll dann eine Art Desktop Oberfläche zu sehen sein. Allerdings ohne Taskleiste wie bei Windows. Sondern wirklich nur ein Desktop, der für Desktop-Icons gedacht sind.

Hier kannst Du auch sehr gerne deine Kreativität ausspielen, was das Design/Layout und was die Funktionen etc. angeht. Aber ich würde es gut finden, wenn es entweder ein Hintergrundbild/Wallpaper gäbe, oder aber wenigstens ein paar stylische CSS-Effekte um ein Wallpaper zu simulieren.

Was ich persönlich ganz nice finden würde, wenn es ein paar Desktop Widgeds gäbe wie z.B. eine kleine Digitaluhr (HH:MM:SS) mit vollem Datum (z.B. "Sonntag, 12. April 2026). Auch hier darfst Du gerne kreativ sein.

Entscheidend ist, dass wenn Du z.B. eine Notiz-App integrierst, diese Notizen für den aktuell angemeldeten Benutzer gespeichert werden sollten ;)

Bitte erstelle eine moderne WebApp mit den genannten Features/Funktionen und stelle mir anschließend die LocalDesk-v1.00.01 zur Verfügung.

Vielen lieben Dank für deine tolle, professionelle und hilfreiche Unterstützung und dein grenzenloses Engagement.

Sehr gerne! 😊 Hier ist deine **LocalDesk v1.00.01** — vollständig fertiggestellt und bereit zum Download.

***

## 🖥️ Was ist enthalten?

### Anmeldebildschirm

- Login mit **Benutzername \& Passwort** (Standard: `Gast` / `Gast`)
- **Konto anlegen** — neues Konto mit Validierung (Mind. 4 Zeichen, Passwort-Bestätigung, Duplikat-Check)
- **Konten verwalten** — übersichtliche Liste aller Konten mit Lösch-Funktion inkl. vollständigem Datenverlust-Hinweis


### Desktop-Oberfläche

- **Futuristisches Dark/Light-Theme** mit animiertem Wallpaper (Neon-Farbverläufe, schwebende Orbs, CSS-Grid-Pattern-Overlay)
- **Doppelklick** auf Icons öffnet Apps, Fenster sind frei **verschiebbar**, **minimierbar** und **maximierbar**
- **Rechtsklick-Kontextmenü** auf dem Desktop
- Schlanke **TopBar** mit Logo, Benutzername, Uhr und Theme-Toggle


### 4 Widgets (frei verschiebbar)

| Widget | Funktion |
| :-- | :-- |
| 🕐 **Digitaluhr** | HH:MM mit :SS-Anzeige und vollem Deutschen Datum |
| ⛅ **Wetter** | Simuliert · Freising · wechselt minütlich |
| 📊 **System Monitor** | CPU \& RAM mit Echtzeit-Animationen |
| 📋 **Schnellnotiz** | Pro-User gespeichert, persistiert in der Session |

### 6 Desktop-Apps

- **📝 Notizen** — vollständige Notiz-App mit Sidebar, Titel, Inhalt, Erstellen \& Löschen — **pro Benutzer gespeichert**
- **🧮 Rechner** — funktionaler Taschenrechner mit allen Grundoperationen
- **📁 Dateien** — simulierter Datei-Manager
- **⚙️ Einstellungen** — Kontoinfo, Theme-Toggle
- **💻 Terminal** — interaktives Terminal (`help`, `whoami`, `date`, `ls`, `echo`, `clear`)
- **🌐 Web** — Browser-Stub mit New-Tab-Oberfläche


### Technische Highlights

- **100% Single-File HTML** — kein Server, kein Backend nötig
- **Benutzerdaten vollständig isoliert** — Notizen, Schnellnotiz etc. sind pro Account getrennt
- **Dark/Light-Mode** mit einem Klick umschaltbar, konsistent überall
- Komplett in **Vanilla JS** — kein Framework, kein Build-Tool

