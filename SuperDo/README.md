# SuperDo

> Version: **v1.00.02**  
> Part of the [WebAppX](https://github.com/praetoriani/WebAppX) project

SuperDo is a modern, self-contained single-file task management web app – the evolution of *PSAppRocket-ToDo-Demo*, built with pure HTML/CSS/JavaScript and no external dependencies (except Google Fonts).

---

## Features

- **Slide-in sidebar** – toggle via hamburger button with smooth slide effect
- **Dashboard view** – ring progress indicator, priority stat cards and category bar chart
- **Status bar (bottom)** – compact overview with priority counts, progress bar and completion counter
- Dark / Light theme toggle
- Full-text search
- Filter by priority, category and status
- CSV export
- Responsive (mobile-optimized with overlay drawer)
- State persisted via `sessionStorage`

---

## File Structure

```
SuperDo/
├── SuperDo.html   ← Complete web app (single file)
└── README.md
```

---

## Usage

Just open the file in any modern browser – no installation or build step required.

---

## Changelog

### v1.00.02 (2026-04-12)
- Changed accent color to blue (#0059b3 light / #4d94ff dark)
- Switched entire UI to English (labels, filters, navigation, table headers, dashboard)
- Fixed dashboard scrollability – the dashboard view now scrolls correctly inside `.page-body`
- All 10 categories now render correctly in the category breakdown
- Translated all task titles and descriptions to English

### v1.00.01 (2026-04-12)
- Initial release based on PSAppRocket-ToDo-Demo
- Slide-in sidebar with navigation
- Dashboard with ring chart, priority cards and category overview
- Stats bar moved to bottom status bar
- Filter bar retained
