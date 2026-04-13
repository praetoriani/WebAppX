/* ============================================================
   app.js – Sidebar-Toggle & Hash-Routing
   ============================================================ */
(function () {
  'use strict';

  const shell     = document.querySelector('.app-shell');
  const toggleBtn = document.getElementById('sidebarToggle');
  const sidebarEl = document.getElementById('appSidebar');
  const pages     = document.querySelectorAll('.content-page');
  const navItems  = document.querySelectorAll('.sidebar-nav-item');

  let sidebarOpen = true;

  /* ── Sidebar ein-/ausblenden ── */
  function setSidebar(open, animate) {
    if (animate === false) {
      shell.style.transition  = 'none';
      sidebarEl.style.transition = 'none';
    }

    sidebarOpen = open;
    shell.classList.toggle('sidebar-collapsed', !open);
    sidebarEl.setAttribute('aria-hidden', String(!open));
    toggleBtn.setAttribute('aria-expanded', String(open));
    toggleBtn.setAttribute(
      'aria-label',
      open ? 'Seitenmenü schließen' : 'Seitenmenü öffnen'
    );

    if (animate === false) {
      requestAnimationFrame(() => requestAnimationFrame(() => {
        shell.style.transition     = '';
        sidebarEl.style.transition = '';
      }));
    }
  }

  toggleBtn.addEventListener('click', () => setSidebar(!sidebarOpen));

  /* Tastenkürzel: Strg / Cmd + B */
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
      e.preventDefault();
      setSidebar(!sidebarOpen);
    }
  });

  /* ── Hash-Routing ── */
  function navigateTo(hash) {
    const target = (hash || '').replace('#', '') || 'dashboard';

    pages.forEach(p => {
      p.classList.toggle('active', p.dataset.page === target);
    });

    navItems.forEach(item => {
      const link = item.querySelector('a');
      const href = (link?.getAttribute('href') || '').replace('#', '');
      const isActive = href === target;
      item.classList.toggle('active', isActive);
      const dot = item.querySelector('.nav-dot');
      if (dot) dot.style.display = isActive ? '' : 'none';
    });

    /* Scroll auf 0 zurücksetzen */
    const content = document.getElementById('appContent');
    if (content) content.scrollTop = 0;
  }

  window.addEventListener('hashchange', () => navigateTo(location.hash));

  /* Init */
  setSidebar(true, false);
  navigateTo(location.hash || '#dashboard');

})();
