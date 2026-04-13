/* ============================================================
   app.js – Sidebar-Toggle, Hash-Routing & Workspace Manager
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
      shell.style.transition    = 'none';
      sidebarEl.style.transition = 'none';
    }
    sidebarOpen = open;
    shell.classList.toggle('sidebar-collapsed', !open);
    sidebarEl.setAttribute('aria-hidden', String(!open));
    toggleBtn.setAttribute('aria-expanded', String(open));
    toggleBtn.setAttribute(
      'aria-label',
      open ? 'Seitenmen\u00fc schlie\u00dfen' : 'Seitenmen\u00fc \u00f6ffnen'
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

  /* ============================================================
     WORKSPACE MANAGER
     ============================================================ */
  const WS_KEY = 'superdo_workspaces';

  /* Workspaces aus localStorage laden */
  function loadWorkspaces() {
    try {
      return JSON.parse(localStorage.getItem(WS_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  /* Workspaces in localStorage speichern */
  function saveWorkspaces(list) {
    localStorage.setItem(WS_KEY, JSON.stringify(list));
  }

  /* ── Sidebar DESKTOP-Bereich aktualisieren ── */
  function renderSidebarDesktop() {
    const list = loadWorkspaces();
    const ul   = document.getElementById('desktopNavList');
    if (!ul) return;
    ul.innerHTML = '';
    if (list.length === 0) {
      const li = document.createElement('li');
      li.className = 'sidebar-nav-item sidebar-empty-item';
      li.innerHTML = '<span class="sidebar-empty-label">Empty \uD83D\uDE41</span>';
      ul.appendChild(li);
    } else {
      list.forEach(ws => {
        const li = document.createElement('li');
        li.className = 'sidebar-nav-item';
        li.innerHTML = `<a href="#workspace" title="${ws.name}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg><span>${ws.name}</span></a>`;
        ul.appendChild(li);
      });
    }
  }

  /* ── Workspace-Seite rendern ── */
  function renderWorkspacePage() {
    const list      = loadWorkspaces();
    const emptyView = document.getElementById('wsEmptyView');
    const listView  = document.getElementById('wsListView');
    const cardGrid  = document.getElementById('wsCardGrid');
    if (!emptyView || !listView || !cardGrid) return;

    if (list.length === 0) {
      emptyView.style.display = '';
      listView.style.display  = 'none';
    } else {
      emptyView.style.display = 'none';
      listView.style.display  = '';
      cardGrid.innerHTML = '';
      list.forEach((ws, idx) => {
        const card = document.createElement('div');
        card.className = 'card ws-card';
        card.innerHTML = `
          <div class="card-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
            ${ws.name}
          </div>
          <div class="card-body">${ws.description || '<em>No description provided.</em>'}</div>
          <div class="ws-card-actions">
            <button class="btn btn-ghost ws-btn-delete" data-idx="${idx}" title="Delete Workspace">Delete</button>
          </div>`;
        cardGrid.appendChild(card);
      });
      /* Delete-Handler */
      cardGrid.querySelectorAll('.ws-btn-delete').forEach(btn => {
        btn.addEventListener('click', () => {
          const i = parseInt(btn.dataset.idx, 10);
          const ws = loadWorkspaces();
          ws.splice(i, 1);
          saveWorkspaces(ws);
          renderSidebarDesktop();
          renderWorkspacePage();
        });
      });
    }
  }

  /* ── Modal anzeigen / verbergen ── */
  function openModal() {
    const modal = document.getElementById('wsModal');
    if (!modal) return;
    document.getElementById('wsName').value        = '';
    document.getElementById('wsDescription').value = '';
    document.getElementById('wsNameError').textContent = '';
    modal.classList.add('ws-modal-visible');
    document.getElementById('wsName').focus();
  }

  function closeModal() {
    const modal = document.getElementById('wsModal');
    if (modal) modal.classList.remove('ws-modal-visible');
  }

  /* ── Workspace speichern ── */
  function saveNewWorkspace() {
    const nameInput = document.getElementById('wsName');
    const descInput = document.getElementById('wsDescription');
    const errEl     = document.getElementById('wsNameError');
    const name      = nameInput.value.trim();
    const desc      = descInput.value.trim();

    /* Validierung Name */
    if (!name) {
      errEl.textContent = 'Please enter a workspace name.';
      nameInput.focus();
      return;
    }
    if (!/^[a-zA-Z0-9]+$/.test(name)) {
      errEl.textContent = 'Only letters (a-z, A-Z) and digits (0-9) are allowed.';
      nameInput.focus();
      return;
    }

    /* Eindeutigkeit prüfen */
    const list = loadWorkspaces();
    if (list.some(ws => ws.name.toLowerCase() === name.toLowerCase())) {
      errEl.textContent = 'A workspace with this name already exists.';
      nameInput.focus();
      return;
    }

    list.push({ name, description: desc, created: new Date().toISOString() });
    saveWorkspaces(list);
    closeModal();
    renderSidebarDesktop();
    renderWorkspacePage();
  }

  /* ── Event-Listener für Workspace-Buttons ── */
  function initWorkspaceEvents() {
    /* Alle "Create Workspace"-Buttons */
    document.querySelectorAll('.ws-create-btn').forEach(btn => {
      btn.addEventListener('click', openModal);
    });

    /* Modal: Schließen */
    const btnCancel = document.getElementById('wsModalCancel');
    if (btnCancel) btnCancel.addEventListener('click', closeModal);

    const btnSave = document.getElementById('wsModalSave');
    if (btnSave) btnSave.addEventListener('click', saveNewWorkspace);

    /* Modal: Außerhalb klicken schließt */
    const modal = document.getElementById('wsModal');
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
    }

    /* Escape-Taste schließt Modal */
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  }

  /* ── Init ── */
  setSidebar(true, false);
  navigateTo(location.hash || '#dashboard');
  initWorkspaceEvents();
  renderSidebarDesktop();
  renderWorkspacePage();

})();
