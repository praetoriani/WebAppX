# SuperDo

> Version: **v1.00.02**  
> Part of the [WebAppX](https://github.com/praetoriani/WebAppX) project

SuperDo is a modern, self-contained single-file task management web app – the evolution of *PSAppRocket-ToDo-Demo*, built with pure HTML/CSS/JavaScript and no external dependencies (except Google Fonts).

---

## Features

- **Slide-in sidebar** – toggle via hamburger button with smooth slide effect
- **Dashboard view** – ring progress indicator, priority stat cards and category bar chart (fully scrollable)
- **Status bar (bottom)** – compact overview with priority counts, progress bar and completion counter
- Dark / Light theme toggle
- Full-text search
- Filter by priority, category and status
- CSV export
- Responsive (mobile-optimized with overlay drawer)
- State persisted via `sessionStorage`

---

## Colour Palette

### Dark Mode
Rich, dark-grey backgrounds (no blue tint) with a vivid **`#0066cc`** blue accent. High contrast, easy on the eyes for extended sessions.

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#1a1b1e` | App background |
| `--surface` | `#222428` | Cards, sidebar |
| `--primary` | `#0066cc` | Accent / buttons |
| `--text` | `#d4d6dc` | Body text |

### Light Mode
Soft, pastel-grey tones – easy on the eyes when switching from dark mode. No harsh white or saturated colours.

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#eef0f4` | App background |
| `--surface` | `#f5f6f8` | Cards, sidebar |
| `--primary` | `#0066cc` | Accent / buttons |
| `--text` | `#2c3143` | Body text |

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
- **Dark Mode redesign:** rich dark-grey backgrounds (`#1a1b1e` / `#222428`), vivid `#0066cc` blue accent, strong but comfortable contrast
- **Light Mode redesign:** soft pastel-grey palette (`#eef0f4` / `#f5f6f8`), same `#0066cc` accent, no harsh whites
- **Dashboard scroll fix:** dashboard content now scrolls correctly inside `.page-body`; scroll position resets on view switch
- Filter bar is now `position:sticky` so it stays visible while scrolling the task list
- Changed accent color from teal (`#01696f`) to blue (`#0066cc`)
- Switched entire UI to English
- Translated all task titles and descriptions to English

### v1.00.01 (2026-04-12)
- Initial release based on PSAppRocket-ToDo-Demo
- Slide-in sidebar with navigation
- Dashboard with ring chart, priority cards and category overview
- Stats bar moved to bottom status bar
- Filter bar retained
