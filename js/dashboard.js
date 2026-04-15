// ============================================================
// DASHBOARD.JS — Sidebar, Topbar, KPI Cards, Alert Feed
// ============================================================

// ---- SIDEBAR NAV CONFIG ----
const NAV_ITEMS = [
  {
    section: 'Monitoring',
    items: [
      { id: 'dashboard',    label: 'Dashboard Utama',    icon: 'layout-dashboard',  badge: null },
      { id: 'surveilans',   label: 'Surveilans Penyakit',icon: 'activity',           badge: '4' },
      { id: 'fasilitas',    label: 'Kapasitas Faskes',   icon: 'building-2',         badge: '6' },
      { id: 'obat',         label: 'Stok Obat & Logistik',icon: 'pill',              badge: '9' },
      { id: 'rujukan',      label: 'Sistem Rujukan',     icon: 'ambulance',          badge: null },
    ]
  },
  {
    section: 'Kesehatan',
    items: [
      { id: 'kia',          label: 'Kesehatan Ibu & Anak', icon: 'baby',             badge: null },
      { id: 'gizi',         label: 'Status Gizi',          icon: 'salad',            badge: null },
      { id: 'imunisasi',    label: 'Imunisasi',            icon: 'syringe',          badge: null },
    ]
  },
  {
    section: 'Laporan',
    items: [
      { id: 'laporan',      label: 'Laporan & Analitik',  icon: 'bar-chart-2',       badge: null },
      { id: 'peta',         label: 'Peta Kesehatan',      icon: 'map',               badge: null },
    ]
  },
];

// ---- RENDER SIDEBAR ----
function renderSidebar() {
  const nav = document.getElementById('sidebar-nav');
  if (!nav) return;

  let html = '';
  NAV_ITEMS.forEach(section => {
    html += `<div class="nav-section">
      <div class="nav-section-label">${section.section}</div>`;
    section.items.forEach(item => {
      const badge = item.badge ? `<span class="nav-badge">${item.badge}</span>` : '';
      html += `
        <div class="nav-item" data-page="${item.id}" onclick="navigateTo('${item.id}')">
          <span class="nav-item-icon"><i data-lucide="${item.icon}" width="18" height="18"></i></span>
          <span class="nav-item-label">${item.label}</span>
          ${badge}
        </div>`;
    });
    html += `</div>`;
  });

  nav.innerHTML = html;
  lucide.createIcons();
}

// ---- SIDEBAR COLLAPSE ----
function initSidebarToggle() {
  const sidebar  = document.getElementById('sidebar');
  const toggleBtn = document.getElementById('sidebar-toggle');
  const overlay  = document.getElementById('sidebar-overlay');
  if (!sidebar) return;

  // Desktop toggle
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
    });
  }

  // Mobile hamburger
  const mobileBtn = document.getElementById('mobile-menu-btn');
  if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
      overlay && overlay.classList.toggle('active');
    });
  }

  // Close on overlay click
  if (overlay) {
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('mobile-open');
      overlay.classList.remove('active');
    });
  }
}

// ---- TOPBAR ----
function renderTopbar(pageLabel) {
  const breadcrumb = document.getElementById('topbar-breadcrumb');
  if (breadcrumb) {
    breadcrumb.innerHTML = `
      <span>SiKespa</span>
      <span class="sep">/</span>
      <span class="current">${pageLabel}</span>
    `;
  }
  const dateEl = document.getElementById('topbar-date');
  if (dateEl) dateEl.textContent = SIKESPA_DATA.updated;
}

// ---- NAVIGATION ----
function navigateTo(pageId) {
  // Update nav active state
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.page === pageId);
  });

  // Show/hide sub-pages
  document.querySelectorAll('.sub-page').forEach(el => {
    el.classList.toggle('active', el.id === 'sp-' + pageId);
  });

  // Update breadcrumb
  const allItems = NAV_ITEMS.flatMap(s => s.items);
  const found = allItems.find(i => i.id === pageId);
  if (found) renderTopbar(found.label);

  // Close mobile sidebar
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (window.innerWidth < 640) {
    sidebar && sidebar.classList.remove('mobile-open');
    overlay && overlay.classList.remove('active');
  }

  // Scroll top
  const content = document.getElementById('content-area');
  if (content) content.scrollTop = 0;
}

// ---- KPI CARDS ----
const KPI_ICONS = [
  { key: 'kasusBaru',        icon: 'trending-up',    variant: 'danger'  },
  { key: 'outbreakAktif',    icon: 'alert-triangle', variant: 'danger'  },
  { key: 'borKritis',        icon: 'bed',            variant: 'warning' },
  { key: 'obatKritis',       icon: 'pill',           variant: 'warning' },
  { key: 'imunisasiCakupan', icon: 'syringe',        variant: 'primary' },
  { key: 'akiProvinsi',      icon: 'heart-pulse',    variant: 'info'    },
];

function renderKPI() {
  const grid = document.getElementById('kpi-grid');
  if (!grid) return;

  const d = SIKESPA_DATA.kpi;
  let html = '';

  KPI_ICONS.forEach(({ key, icon, variant }) => {
    const kpi = d[key];
    const isUp = kpi.trendDir === 'up';
    // For AKI and obat kritis going down is good
    const isGoodDown = (key === 'akiProvinsi' || key === 'obatKritis') && !isUp;
    const trendClass = isGoodDown ? 'down' : (isUp ? 'up' : 'down');
    const trendIcon  = isUp ? '▲' : '▼';
    const unit = key === 'imunisasiCakupan' ? '%' : (key === 'akiProvinsi' ? '' : '');

    html += `
      <div class="kpi-card ${variant}" onclick="navigateTo('${key === 'kasusBaru' || key === 'outbreakAktif' ? 'surveilans' : key === 'borKritis' ? 'fasilitas' : key === 'obatKritis' ? 'obat' : key === 'imunisasiCakupan' ? 'imunisasi' : 'kia'}')">
        <div class="kpi-header">
          <div class="kpi-icon"><i data-lucide="${icon}" width="20" height="20"></i></div>
          <span class="kpi-trend ${trendClass}">${trendIcon} ${kpi.trend}</span>
        </div>
        <div class="kpi-value">${kpi.value.toLocaleString('id-ID')}${unit}</div>
        <div class="kpi-label">${kpi.label}</div>
        <div class="kpi-sub">${kpi.sub}</div>
      </div>`;
  });

  grid.innerHTML = html;
  lucide.createIcons();
}

// ---- ALERT FEED ----
function renderAlerts() {
  const list = document.getElementById('alert-list');
  if (!list) return;

  list.innerHTML = SIKESPA_DATA.alerts.map(a => `
    <div class="alert-item ${a.level}">
      <div class="alert-dot"></div>
      <div class="alert-content">
        <div class="alert-title">${a.title}</div>
        <div class="alert-desc">${a.desc}</div>
        <div class="alert-meta">
          <span class="alert-time">${a.time}</span>
          <span class="alert-kabupaten">${a.kabupaten}</span>
        </div>
      </div>
    </div>
  `).join('');
}

// ---- SURVEILANS TABLE ----
function renderSurveilansTable() {
  const tbody = document.getElementById('surveilans-tbody');
  if (!tbody) return;

  const statusBadge = s => ({
    critical: '<span class="badge badge-danger">Kritis</span>',
    warning:  '<span class="badge badge-warning">Waspada</span>',
    normal:   '<span class="badge badge-success">Normal</span>',
  })[s] || '';

  tbody.innerHTML = SIKESPA_DATA.surveilans.map(r => `
    <tr>
      <td><strong>${r.kabupaten}</strong></td>
      <td class="num">${r.malaria}</td>
      <td class="num">${r.tbc}</td>
      <td class="num">${r.dbd}</td>
      <td class="num">${r.diare}</td>
      <td class="num">${r.pneumonia}</td>
      <td class="num"><strong>${r.total}</strong></td>
      <td>${statusBadge(r.status)}</td>
    </tr>
  `).join('');
}

// ---- STOK OBAT TABLE ----
function renderStokObat() {
  const tbody = document.getElementById('obat-tbody');
  if (!tbody) return;

  tbody.innerHTML = SIKESPA_DATA.stokObat.map(o => {
    const pct = Math.min(100, Math.round((o.stok / o.min) * 100));
    const barClass = o.status === 'kritis' ? 'danger' : o.status === 'kurang' ? 'warning' : 'success';
    const badge = o.status === 'kritis'
      ? '<span class="badge badge-danger">Kritis</span>'
      : o.status === 'kurang'
        ? '<span class="badge badge-warning">Kurang</span>'
        : '<span class="badge badge-success">Aman</span>';

    return `<tr>
      <td><strong>${o.nama}</strong></td>
      <td>${o.kabupaten}</td>
      <td class="num">${o.stok.toLocaleString('id-ID')} ${o.satuan}</td>
      <td class="num">${o.min.toLocaleString('id-ID')}</td>
      <td>
        <div style="display:flex;align-items:center;gap:8px">
          <div class="progress-bar" style="width:100px">
            <div class="progress-fill ${barClass}" style="width:${pct}%"></div>
          </div>
          <span style="font-size:0.7rem;color:var(--text-muted)">${pct}%</span>
        </div>
      </td>
      <td>${badge}</td>
    </tr>`;
  }).join('');
}

// ---- BOR TABLE ----
function renderBORTable() {
  const tbody = document.getElementById('bor-tbody');
  if (!tbody) return;

  tbody.innerHTML = SIKESPA_DATA.kabupaten
    .sort((a,b) => b.bor - a.bor)
    .map(k => {
      const barClass = k.bor >= 85 ? 'danger' : k.bor >= 70 ? 'warning' : 'success';
      const badge = k.status === 'critical'
        ? '<span class="badge badge-danger">Kritis</span>'
        : k.status === 'warning'
          ? '<span class="badge badge-warning">Waspada</span>'
          : '<span class="badge badge-success">Normal</span>';
      return `<tr>
        <td><strong>${k.name}</strong></td>
        <td class="num">${k.rs}</td>
        <td class="num">${k.puskesmas}</td>
        <td>
          <div style="display:flex;align-items:center;gap:8px">
            <div class="progress-bar" style="width:100px">
              <div class="progress-fill ${barClass}" style="width:${k.bor}%"></div>
            </div>
            <span style="font-variant-numeric:tabular-nums;font-size:0.75rem;font-weight:600">${k.bor}%</span>
          </div>
        </td>
        <td>${badge}</td>
      </tr>`;
    }).join('');
}

// ---- INIT ----
function initDashboard() {
  renderSidebar();
  initSidebarToggle();
  renderTopbar('Dashboard Utama');
  renderKPI();
  renderAlerts();
  renderSurveilansTable();
  renderStokObat();
  renderBORTable();

  // Set first nav item active
  navigateTo('dashboard');

  // Theme toggle
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const html = document.documentElement;
      const isDark = html.getAttribute('data-theme') === 'dark';
      html.setAttribute('data-theme', isDark ? 'light' : 'dark');
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Init dashboard after login
  window.showDashboard = function() {
    document.getElementById('page-login').classList.remove('active');
    document.getElementById('page-dashboard').classList.add('active');
    initDashboard();
  };
});
