# @syhrezz/ui

Syhrezz Design System — CSS utility classes, design tokens, and app shell layout.

## Install

```bash
npm install @syhrezz/ui
```

## Usage

### Option A — Everything at once
```js
import '@syhrezz/ui'
```

### Option B — Pick what you need
```js
// Required: design tokens (colors, spacing, radius, shadows, z-index)
import '@syhrezz/ui/tokens.css'

// Required: component classes (badges, tables, callouts, anatomy, changelog...)
import '@syhrezz/ui/components.css'

// Optional: app shell layout (sidebar, topbar, main area)
import '@syhrezz/ui/shell.css'
```

## What is included

| File | Contents |
|---|---|
| `tokens.css` | CSS custom properties — colors, spacing, radius, shadows, motion, z-index |
| `components.css` | Component utility classes — badge, table, callout, anatomy, changelog, do/dont, states, kbd |
| `shell.css` | App shell layout — sidebar, topbar, nav links, main content area |
| `index.css` | Convenience import — loads all three in order |

## Class reference

Full documentation and interactive examples at:
**https://design-system-five-kappa.vercel.app**

### Quick examples

```html
<!-- Badges -->
<span class="ds-status-badge stable">Stable</span>
<span class="ds-status-badge beta">Beta</span>

<!-- Callouts -->
<div class="ds-callout ds-callout-info">
  <div class="ds-callout-content">An info message.</div>
</div>

<!-- Table -->
<div class="ds-table-wrap">
  <table class="ds-table">
    <thead><tr><th>Name</th><th>Type</th></tr></thead>
    <tbody><tr><td>value</td><td class="ds-prop-type">string</td></tr></tbody>
  </table>
</div>

<!-- App shell -->
<div class="ds-shell">
  <aside class="ds-sidebar">...</aside>
  <div class="ds-main">
    <header class="ds-topbar">...</header>
    <article class="ds-page">...</article>
  </div>
</div>
```

## Fonts

The design system uses **Plus Jakarta Sans** and **JetBrains Mono**. Add them to your project:

```html
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet"/>
```

## License

MIT
