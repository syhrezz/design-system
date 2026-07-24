/**
 * Syhrezz Design System — Shared Shell
 * Powers: navigation, search, keyboard shortcuts, copy buttons,
 *         syntax highlighting, playground, deep linking, prev/next.
 * No framework dependencies. Pure vanilla JS.
 */

// ── PATH PREFIX — resolves relative to current page depth ───────
// All nav hrefs are defined relative to v2/ root (no leading ../)
// At runtime we prepend the correct number of "../" based on depth.
function getPathPrefix() {
  const path = window.location.pathname;
  // Count subdirectory depth by how many path segments sit above the current file.
  // The last segment is the filename itself, so depth = total segments - 1.
  // e.g. /index.html              → parts = ['index.html']            → depth 0 → ''
  // e.g. /components/button.html  → parts = ['components','button.html'] → depth 1 → '../'
  // e.g. /patterns/error.html     → parts = ['patterns','error.html']  → depth 1 → '../'
  // This works the same locally and on Vercel regardless of subdomain or project prefix.
  const parts = path.split('/').filter(Boolean);
  // Remove the filename (last segment) to count only directory levels
  const depth = parts.length - 1;
  return depth > 0 ? '../'.repeat(depth) : '';
}

// ── NAV STRUCTURE (paths relative to v2/ root) ──────────────────
const DS_NAV_DEF = [
  {
    group: 'Getting Started',
    items: [
      { label: 'Introduction',      href: 'index.html',                   id: 'intro' },
      { label: 'Quick Start',       href: 'index.html#quickstart',        id: 'quickstart' },
      { label: 'Design Principles', href: 'index.html#principles',        id: 'principles' },
    ]
  },
  {
    group: 'Foundations',
    items: [
      { label: 'Colors',          href: 'foundations/colors.html',       id: 'colors' },
      { label: 'Typography',      href: 'foundations/typography.html',   id: 'typography' },
      { label: 'Spacing',         href: 'foundations/spacing.html',      id: 'spacing' },
      { label: 'Border Radius',   href: 'foundations/radius.html',       id: 'radius' },
      { label: 'Shadows',         href: 'foundations/shadows.html',      id: 'shadows' },
      { label: 'Motion',          href: 'foundations/motion.html',       id: 'motion' },
      { label: 'Icons',           href: 'foundations/icons.html',        id: 'icons' },
      { label: 'Grid & Layout',   href: 'foundations/grid.html',         id: 'grid' },
      { label: 'Breakpoints',     href: 'foundations/breakpoints.html',  id: 'breakpoints' },
      { label: 'Design Tokens',   href: 'foundations/tokens.html',       id: 'tokens' },
    ]
  },
  {
    group: 'Components',
    items: [
      { label: 'Button',         href: 'components/button.html',        id: 'button' },
      { label: 'Badge',          href: 'components/badge.html',         id: 'badge' },
      { label: 'Tag / Chip',     href: 'components/tag.html',           id: 'tag' },
      { label: 'Input',          href: 'components/input.html',         id: 'input' },
      { label: 'Number Input',   href: 'components/number-input.html',  id: 'number-input' },
      { label: 'Textarea',       href: 'components/textarea.html',      id: 'textarea' },
      { label: 'Select',         href: 'components/select.html',        id: 'select' },
      { label: 'Checkbox',       href: 'components/checkbox.html',      id: 'checkbox' },
      { label: 'Radio Group',    href: 'components/radio-group.html',   id: 'radio-group' },
      { label: 'Toggle / Switch',href: 'components/toggle.html',        id: 'toggle' },
      { label: 'Card',           href: 'components/card.html',          id: 'card' },
      { label: 'Accordion',      href: 'components/accordion.html',     id: 'accordion' },
      { label: 'Table',          href: 'components/table.html',         id: 'table' },
      { label: 'Modal',          href: 'components/modal.html',         id: 'modal' },
      { label: 'Popover',        href: 'components/popover.html',       id: 'popover' },
      { label: 'Dropdown',       href: 'components/dropdown.html',      id: 'dropdown' },
      { label: 'Tabs',           href: 'components/tabs.html',          id: 'tabs' },
      { label: 'Toast',          href: 'components/toast.html',         id: 'toast' },
      { label: 'Alert',          href: 'components/alert.html',         id: 'alert' },
      { label: 'Avatar',         href: 'components/avatar.html',        id: 'avatar' },
      { label: 'Progress',       href: 'components/progress.html',      id: 'progress' },
      { label: 'Skeleton',       href: 'components/skeleton.html',      id: 'skeleton' },
      { label: 'Tooltip',        href: 'components/tooltip.html',       id: 'tooltip' },
      { label: 'Breadcrumb',     href: 'components/breadcrumb.html',    id: 'breadcrumb' },
      { label: 'Stepper',        href: 'components/stepper.html',       id: 'stepper' },
      { label: 'Timeline',       href: 'components/timeline.html',      id: 'timeline' },
      { label: 'Divider',        href: 'components/divider.html',       id: 'divider' },
      { label: 'Sidebar',        href: 'components/sidebar.html',       id: 'sidebar-comp' },
      { label: 'Topbar',         href: 'components/topbar.html',        id: 'topbar-comp' },
      { label: 'Pagination',     href: 'components/pagination.html',    id: 'pagination' },
      { label: 'Empty State',    href: 'components/empty-state.html',   id: 'empty-state' },
      { label: 'Wizard',         href: 'components/wizard.html',        id: 'wizard' },
    ]
  },
  {
    group: 'Patterns',
    items: [
      { label: 'Dashboard Layout', href: 'patterns/dashboard.html',    id: 'p-dashboard' },
      { label: 'CRUD Table',       href: 'patterns/crud-table.html',   id: 'p-crud' },
      { label: 'Form Layout',      href: 'patterns/form-layout.html',  id: 'p-form' },
      { label: 'Filter & Search',  href: 'patterns/filter.html',       id: 'p-filter' },
      { label: 'Loading States',   href: 'patterns/loading.html',      id: 'p-loading' },
      { label: 'Error States',     href: 'patterns/error.html',        id: 'p-error' },
      { label: 'Empty States',     href: 'patterns/empty.html',        id: 'p-empty' },
      { label: 'Approval Flow',    href: 'patterns/approval.html',     id: 'p-approval' },
    ]
  },
  {
    group: 'Templates',
    items: [
      { label: 'Dashboard',     href: 'templates/dashboard.html',   id: 't-dashboard' },
      { label: 'List Page',     href: 'templates/list.html',        id: 't-list' },
      { label: 'Detail Page',   href: 'templates/detail.html',      id: 't-detail' },
      { label: 'Form Page',     href: 'templates/form.html',        id: 't-form' },
      { label: 'Auth Page',     href: 'templates/auth.html',        id: 't-auth' },
    ]
  },
  {
    group: 'Resources',
    items: [
      { label: 'AI Implementation Guide', href: 'resources/ai-guide.html',        id: 'ai-guide' },
      { label: 'Accessibility',           href: 'resources/accessibility.html',   id: 'a11y' },
      { label: 'Component API',           href: 'resources/component-api.html',   id: 'comp-api' },
      { label: 'Writing Guidelines',      href: 'resources/writing.html',         id: 'writing' },
      { label: 'Changelog',               href: 'resources/changelog.html',       id: 'changelog' },
    ]
  }
];

// Build DS_NAV by prepending dynamic path prefix at runtime
const DS_NAV = DS_NAV_DEF;

// ── RENDER NAV ──────────────────────────────────────────────────
function renderNav(activeId) {
  const nav = document.getElementById('ds-nav-links');
  if (!nav) return;
  const prefix = getPathPrefix();
  const currentPath = window.location.pathname;
  let html = '';
  DS_NAV.forEach(group => {
    html += `<div class="ds-nav-group">
      <div class="ds-nav-group-label">${group.group}</div>`;
    group.items.forEach(item => {
      // Active detection: prefer explicit DS_ACTIVE_PAGE id match.
      // Fall back to path matching ONLY if activeId is not set,
      // and only match the exact filename (not anchor fragments).
      const itemFile = item.href.split('#')[0]; // strip #anchor
      let isActive = false;
      if (activeId) {
        // Explicit id match — most reliable, avoids multi-active on index.html
        isActive = (activeId === item.id);
      } else {
        // Fallback: exact path match (ignore items that are just anchors on the same page)
        const hasAnchor = item.href.includes('#');
        if (!hasAnchor) {
          isActive = currentPath.endsWith('/' + itemFile) ||
            currentPath.endsWith('\\' + itemFile.replace(/\//g, '\\'));
        }
        // Anchor items on the same page: active is handled by scroll observer below
      }
      const resolvedHref = prefix + item.href;
      html += `<a href="${resolvedHref}" class="ds-nav-link ${isActive ? 'active' : ''}" data-id="${item.id}" data-anchor="${item.href.includes('#') ? item.href.split('#')[1] : ''}">${item.label}</a>`;
    });
    html += '</div>';
  });
  nav.innerHTML = html;

  // Handle nav link clicks — smooth scroll for same-page anchor links
  nav.querySelectorAll('.ds-nav-link').forEach(a => {
    a.addEventListener('click', e => {
      const anchor = a.dataset.anchor;
      if (!anchor) return; // normal page link — let browser handle
      // Check if we're already on the target page
      const href = a.getAttribute('href');
      const targetFile = href.split('#')[0]; // e.g. '../index.html' or 'index.html'
      const targetAnchorEl = document.getElementById(anchor);
      if (targetAnchorEl) {
        // Already on the right page — scroll smoothly, offset by fixed topbar height
        e.preventDefault();
        const topbarHeight = document.querySelector('.ds-topbar')?.offsetHeight || 52;
        const targetTop = targetAnchorEl.getBoundingClientRect().top + window.scrollY - topbarHeight - 16;
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
        // Update active state
        nav.querySelectorAll('.ds-nav-link').forEach(l => l.classList.remove('active'));
        a.classList.add('active');
      }
      // If not on the right page, let browser navigate normally (anchor in URL will auto-scroll)
    });
  });

  // For anchor-based nav items on same page: track active via scroll
  const anchorItems = DS_NAV.flatMap(g => g.items).filter(i => i.href.includes('#'));
  if (anchorItems.length > 0) {
    anchorItems.forEach(item => {
      const anchor = item.href.split('#')[1];
      const el = document.getElementById(anchor);
      if (!el) return;
      const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          nav.querySelectorAll('.ds-nav-link[data-anchor]').forEach(l => l.classList.remove('active'));
          const link = nav.querySelector(`.ds-nav-link[data-anchor="${anchor}"]`);
          if (link) link.classList.add('active');
        }
      }, { rootMargin: '-10% 0px -80% 0px' });
      observer.observe(el);
    });
  }

  // Only scroll the active item into view if it's outside the sidebar's visible area.
  // This avoids jarring jumps when the item is already visible after clicking.
  const active = nav.querySelector('.active');
  if (active) {
    const navRect = nav.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();
    const isOutOfView = activeRect.bottom > navRect.bottom || activeRect.top < navRect.top;
    if (isOutOfView) active.scrollIntoView({ block: 'nearest', behavior: 'instant' });
  }
}

// ── SEARCH ──────────────────────────────────────────────────────
function initSearch() {
  const input = document.getElementById('ds-search-input');
  const results = document.getElementById('ds-search-results');
  if (!input || !results) return;

  const allItems = DS_NAV.flatMap(g => g.items.map(i => ({ ...i, group: g.group })));

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (!q) { results.innerHTML = ''; results.style.display = 'none'; return; }

    const matches = allItems.filter(i =>
      i.label.toLowerCase().includes(q) || i.group.toLowerCase().includes(q)
    );

    if (!matches.length) {
      results.innerHTML = '<div class="ds-search-empty">No results found</div>';
    } else {
      const pfx = getPathPrefix();
      results.innerHTML = matches.slice(0,8).map(m => `
        <a href="${pfx}${m.href}" class="ds-search-result">
          <span class="ds-search-result-group">${m.group}</span>
          <span class="ds-search-result-label">${highlight(m.label, q)}</span>
        </a>`).join('');
    }
    results.style.display = 'block';
  });

  document.addEventListener('click', e => {
    if (!results.contains(e.target) && e.target !== input) {
      results.style.display = 'none';
    }
  });

  // Keyboard: Escape closes, ArrowDown focuses first result
  input.addEventListener('keydown', e => {
    if (e.key === 'Escape') { results.style.display = 'none'; input.blur(); }
    if (e.key === 'ArrowDown') {
      const first = results.querySelector('.ds-search-result');
      if (first) { e.preventDefault(); first.focus(); }
    }
  });
}

function highlight(text, q) {
  const idx = text.toLowerCase().indexOf(q);
  if (idx === -1) return text;
  return text.slice(0,idx) +
    '<mark style="background:#EEF2FF;color:#6366F1;border-radius:2px;padding:0 1px">' +
    text.slice(idx, idx + q.length) + '</mark>' +
    text.slice(idx + q.length);
}

// ── KEYBOARD SHORTCUTS ──────────────────────────────────────────
function initKeyboardShortcuts() {
  document.addEventListener('keydown', e => {
    // Cmd/Ctrl+K — open search
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      const input = document.getElementById('ds-search-input');
      if (input) { input.focus(); input.select(); }
    }
    // Escape — close modals/search
    if (e.key === 'Escape') {
      document.querySelectorAll('.ds-modal.open').forEach(m => m.classList.remove('open'));
    }
  });
}

// ── COPY BUTTONS ────────────────────────────────────────────────
function initCopyButtons() {
  document.querySelectorAll('.ds-copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.closest('.ds-code-block');
      const code = target ? target.querySelector('code, pre') : null;
      const text = code ? code.innerText : btn.dataset.copy || '';
      navigator.clipboard.writeText(text).then(() => {
        const orig = btn.innerHTML;
        btn.innerHTML = '<svg style="width:13px;height:13px" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg> Copied!';
        btn.style.color = '#0E9F6E';
        setTimeout(() => { btn.innerHTML = orig; btn.style.color = ''; }, 2000);
      });
    });
  });
}

// ── PREV / NEXT NAV ─────────────────────────────────────────────
function initPrevNext() {
  const allItems = DS_NAV.flatMap(g => g.items);
  const currentPath = window.location.pathname;
  const prefix = getPathPrefix();
  const currentIdx = allItems.findIndex(i =>
    currentPath.includes(i.href.split('#')[0])
  );
  if (currentIdx === -1) return;

  const prev = allItems[currentIdx - 1];
  const next = allItems[currentIdx + 1];
  const container = document.getElementById('ds-prev-next');
  if (!container) return;

  container.innerHTML = `
    <div class="ds-prev-next">
      ${prev ? `<a href="${prefix}${prev.href}" class="ds-prev-next-btn prev">
        <svg style="width:14px;height:14px" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
        <div><div class="ds-prev-next-label">Previous</div><div class="ds-prev-next-title">${prev.label}</div></div>
      </a>` : '<div></div>'}
      ${next ? `<a href="${prefix}${next.href}" class="ds-prev-next-btn next">
        <div><div class="ds-prev-next-label">Next</div><div class="ds-prev-next-title">${next.label}</div></div>
        <svg style="width:14px;height:14px" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
      </a>` : '<div></div>'}
    </div>`;
}

// ── PAGE ANCHOR LINKS ───────────────────────────────────────────
function initAnchors() {
  document.querySelectorAll('h2[id], h3[id]').forEach(heading => {
    heading.style.cursor = 'pointer';
    heading.addEventListener('click', () => {
      // Smooth scroll to section - no hash change to avoid file:// security issues
      heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Try clipboard copy (fails silently on file:// - that's OK)
      try {
        const url = window.location.href.split('#')[0] + '#' + heading.id;
        navigator.clipboard.writeText(url).catch(() => {});
      } catch(e) {}
    });
    heading.title = 'Click to scroll to section';
  });
}

// ── ON-PAGE TOC ─────────────────────────────────────────────────
function initTOC() {
  const toc = document.getElementById('ds-toc');
  if (!toc) return;
  const headings = document.querySelectorAll('.ds-page h2[id]');
  if (headings.length < 2) { toc.style.display = 'none'; return; }

  toc.innerHTML = '<div class="ds-toc-label">On this page</div>' +
    Array.from(headings).map(h =>
      `<a class="ds-toc-link" href="javascript:void(0)" data-target="${h.id}">${h.textContent.replace(/[#\s]+$/, '')}</a>`
    ).join('');

  // Smooth scroll on click — no hash change to avoid file:// security issues
  toc.querySelectorAll('.ds-toc-link').forEach(link => {
    link.addEventListener('click', () => {
      const target = document.getElementById(link.dataset.target);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Highlight active section on scroll
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        toc.querySelectorAll('.ds-toc-link').forEach(l => l.classList.remove('active'));
        const link = toc.querySelector(`[data-target="${e.target.id}"]`);
        if (link) link.classList.add('active');
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });

  headings.forEach(h => observer.observe(h));
}

// ── CODE TABS (React / HTML) ────────────────────────────────────
function initCodeTabs() {
  document.querySelectorAll('.ds-code-tabs').forEach(container => {
    const tabs = container.querySelectorAll('.ds-code-tab-btn');
    const panels = container.querySelectorAll('.ds-code-panel');
    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        panels[i].classList.add('active');
      });
    });
  });
}

// ── SHOW/HIDE SOURCE ────────────────────────────────────────────
function initShowSource() {
  document.querySelectorAll('.ds-show-source-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const block = btn.closest('.ds-example');
      const code = block ? block.querySelector('.ds-code-block') : null;
      if (!code) return;
      const isOpen = code.style.display !== 'none';
      code.style.display = isOpen ? 'none' : 'block';
      btn.textContent = isOpen ? 'Show source' : 'Hide source';
    });
  });
}

// ── INIT ALL ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderNav(window.DS_ACTIVE_PAGE || '');
  initSearch();
  initKeyboardShortcuts();
  initCopyButtons();
  initPrevNext();
  initAnchors();
  initTOC();
  initCodeTabs();
  initShowSource();
});
