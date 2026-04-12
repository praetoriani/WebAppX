<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Ein Kunde sucht nach einer Möglichkeit, für seine Mitarbeiter eine zentrale ToDo App auf Basis einer WebApp zur Verfügung zu stellen. Diese WebApp sollte folgende Grundvoraussetzungen erfüllen.

- Sie sollte in einer XAMP-Umgebung laufen (welche auf einer virtuellen VSphere-Umgebung als virueller Server läuft und im Netzwerk unter einer entsprechenden URL verfügbar ist).
- Die WebApp sollte in der Lage sein, mehrere ToDo Listen verwalten zu können
- Die WebApp sollte in der Lage sein, den Status der einzelnen ToDo Listen zu speichern
- Die Daten der WebApp sollten am Besten persistent gespeichert werden (local storage browser datenbank?)
- Die WebApp soll ein modernes Aussehen haben, mit UI-Effekten (Hover-, Slide-Effekte, etc.) arbeiten und es muss die Möglichkeit geben, zwischen einem Dark Mode und einem Light Mode zu wechseln.
- Die WebApp soll vollständig auf deutsch sein.

Bitte erstelle mir eine erste, Version einer solchen WebApp (die nach Möglichkeit die Meisten ... im optimalfall alle Funktionen von oben enthält), damit ich einfach mal sehe, wie so etwas aussehen kann.

Vielen lieben Dank für deine Hilfe und deine Unterstützung

Hier ist deine fertige ToDo-WebApp! Die Datei einfach in den `htdocs`-Ordner deiner XAMPP-Instanz legen und im Browser öffnen – fertig.

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

