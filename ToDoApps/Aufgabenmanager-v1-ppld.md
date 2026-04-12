<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

***

## Was die App alles kann

### Datenverwaltung

Die App nutzt **`localStorage`** für persistente Speicherung – alle Aufgaben und Listen bleiben auch nach dem Browser-Schließen erhalten.  In einer XAMPP-Umgebung funktioniert das einwandfrei (die Einschränkung gilt nur für iframe-Sandboxes, nicht für normale Webserver-Deployments).

### Mehrere Listen

- **Übersichtsseite** mit Karten pro Liste, Fortschrittsbalken und Zähler
- **Neue Listen erstellen** mit Name und Farbauswahl (10 Farben)
- **Listen bearbeiten und löschen** direkt aus der Listenansicht
- Drei Demo-Listen (Arbeit, Privat, Einkauf) werden beim ersten Start automatisch angelegt


### Aufgabenverwaltung

- Aufgaben **hinzufügen** per Klick oder `Enter`-Taste
- **Prioritätsstufen**: Hoch / Mittel / Niedrig (farblich markiert)
- **In-Place-Bearbeitung**: Aufgabe anklicken → direkt editieren
- **Filtertabs**: Alle / Offen / Erledigt pro Liste
- **Sonderansichten**: Alle Aufgaben, Heute erstellt, Erledigte Aufgaben
- Erledigte Aufgaben **als Stapel löschen**


### Design \& UI-Effekte

- **Dark Mode / Light Mode** Toggle mit Mond-/Sonne-Icon – Einstellung wird gespeichert, Systemeinstellung wird automatisch erkannt
- **Hover-Animationen**: Karten heben sich an, Buttons reagieren mit Schatten
- **Task-Eintrittsanimation** beim Hinzufügen
- **Erledigungs-Animation** (Pulse-Effekt) beim Abhaken
- **Floating-Icon-Animation** im Empty State
- **Fortschrittsbalken** pro Liste mit flüssiger Transition
- **Toast-Benachrichtigungen** für Aktionen
- **Modales Fenster** mit Backdrop-Blur für Listen-Erstellung


### Navigation

- **Sidebar** mit allen Listen und Schnellansichten
- **Statistik-Chips** in der Sidebar (Offen / Erledigt / Anzahl Listen)
- **Mobiles Hamburger-Menü** (unter 768px)
- Vollständig **auf Deutsch**

