// ============================================================
// DASHBOARD.JS — DOM Rendering, Navigation, Filter, Init
// Depends on: data.js, charts.js
// ============================================================

// ---- NAV CONFIG ----
const NAV_ITEMS = [
  {
    section: 'Monitoring',
    items: [
      { id: 'dashboard',  label: 'Dashboard Utama',     icon: 'layout-dashboard' },
      { id: 'surveilans', label: 'Surveilans Penyakit', icon: 'activity',        badge: '4' },
      { id: 'fasilitas',  label: 'Kapasitas Faskes',    icon: 'building-2',      badge: '6' },
      { id: 'obat',       label: 'Stok Obat & Logistik',icon: 'pill',            badge: '9' },
      { id: 'rujukan',    label: 'Sistem Rujukan',      icon: 'ambulance' },
    ]
  },
  {
    section: 'Kesehatan',
    items: [
      { id: 'kia',        label: 'Kesehatan Ibu & Anak',icon: 'baby' },
      { id: 'gizi',       label: 'Status Gizi',         icon: 'salad' },
      { id: 'imunisasi',  label: 'Imunisasi',           icon: 'syringe' },
      { id: 'nakes',      label: 'Tenaga Kesehatan',    icon: 'stethoscope' },
    ]
  },
  {
    section: 'Laporan',
    items: [
      { id: 'laporan',    label: 'Laporan & Analitik',  icon: 'bar-chart-2' },
      { id: 'peta',       label: 'Peta Kesehatan',      icon: 'map' },
    ]
  },
];

// ---- BADGE HELPERS ----
const statusBadge = s => ({ critical: 'badge-danger', warning: 'badge-warning', normal: 'badge-success' })[s] || 'badge-info';
const statusLabel = s => ({ critical: 'Kritis', warning: 'Waspada', normal: 'Normal' })[s] || s;
const stokBadge   = s => ({ kritis: 'badge-danger', kurang: 'badge-warning', aman: 'badge-success' })[s] || 'badge-info';
const stokLabel   = s => ({ kritis: 'Kritis', kurang: 'Kurang', aman: 'Aman' })[s] || s;

function badge(cls, txt) { return `<span class="badge ${cls}">${txt}</span>`; }

// ============================================================
// SIDEBAR
// ============================================================
function renderSidebar() {
  const nav = document.getElementById('sidebar-nav');
  if (!nav) return;
  let html = '';
  NAV_ITEMS.forEach(sec => {
    html += `<div class="nav-section"><div class="nav-section-label">${sec.section}</div>`;
    sec.items.forEach(item => {
      const b = item.badge ? `<span class="nav-badge">${item.badge}</span>` : '';
      html += `<div class="nav-item" data-page="${item.id}" onclick="navigateTo('${item.id}')">
        <span class="nav-item-icon"><i data-lucide="${item.icon}" width="18" height="18"></i></span>
        <span class="nav-item-label">${item.label}</span>${b}
      </div>`;
    });
    html += `</div>`;
  });
  nav.innerHTML = html;
  lucide.createIcons();
}

function initSidebarToggle() {
  const sidebar   = document.getElementById('sidebar');
  const toggleBtn = document.getElementById('sidebar-toggle');
  const overlay   = document.getElementById('sidebar-overlay');
  const mobileBtn = document.getElementById('mobile-menu-btn');
  if (!sidebar) return;

  toggleBtn && toggleBtn.addEventListener('click', () => sidebar.classList.toggle('collapsed'));
  mobileBtn && mobileBtn.addEventListener('click', () => {
    sidebar.classList.toggle('mobile-open');
    overlay && overlay.classList.toggle('active');
  });
  overlay && overlay.addEventListener('click', () => {
    sidebar.classList.remove('mobile-open');
    overlay.classList.remove('active');
  });
}

// ============================================================
// TOPBAR
// ============================================================
function renderTopbar(label) {
  const bc = document.getElementById('topbar-breadcrumb');
  if (bc) bc.innerHTML = `<span>SiKespa</span><span class="sep">/</span><span class="current">${label}</span>`;
  const dt = document.getElementById('topbar-date');
  if (dt) dt.textContent = SIKESPA_DATA.updated;
}

// ============================================================
// NAVIGATION
// ============================================================
function navigateTo(pageId) {
  document.querySelectorAll('.nav-item').forEach(el =>
    el.classList.toggle('active', el.dataset.page === pageId));
  document.querySelectorAll('.sub-page').forEach(el =>
    el.classList.toggle('active', el.id === 'sp-' + pageId));

  const found = NAV_ITEMS.flatMap(s => s.items).find(i => i.id === pageId);
  if (found) renderTopbar(found.label);

  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (window.innerWidth < 640) {
    sidebar && sidebar.classList.remove('mobile-open');
    overlay && overlay.classList.remove('active');
  }

  const content = document.getElementById('content-area');
  if (content) content.scrollTop = 0;

  // Lazy render charts on first visit to chart pages
  if (pageId === 'surveilans' && !CHARTS.tren)    renderChartTren();
  if (pageId === 'fasilitas'  && !CHARTS.bor)     { renderChartBOR(); renderChartStatusKab(); }
  if (pageId === 'imunisasi'  && !CHARTS.imunisasi) renderChartImunisasi();
  if (pageId === 'gizi'       && !CHARTS.gizi)    renderChartGizi();
  if (pageId === 'nakes'      && !CHARTS.nakes)   renderChartNakes();
}

// ============================================================
// KPI CARDS
// ============================================================
function renderKPI() {
  const grid = document.getElementById('kpi-grid');
  if (!grid) return;
  grid.innerHTML = SIKESPA_DATA.kpi.map(k => `
    <div class="kpi-card ${k.color}" onclick="navigateTo('${k.page}')" title="${k.label}">
      <div class="kpi-header">
        <div class="kpi-icon">${k.icon}</div>
        <span class="kpi-trend ${k.trendDir}">${k.trend}</span>
      </div>
      <div class="kpi-value">${k.value}</div>
      <div class="kpi-label">${k.label}</div>
      <div class="kpi-sub">${k.sub}</div>
    </div>`).join('');
}

// ============================================================
// ALERT FEED
// ============================================================
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
    </div>`).join('');
}

// ============================================================
// SURVEILANS TABLE + SEARCH
// ============================================================
function renderSurveilansTable(filter = '') {
  const tbody = document.getElementById('surveilans-tbody');
  if (!tbody) return;
  const rows = SIKESPA_DATA.surveilans
    .filter(r => r.kabupaten.toLowerCase().includes(filter.toLowerCase()));
  tbody.innerHTML = rows.length ? rows.map(r => `
    <tr>
      <td><strong>${r.kabupaten}</strong></td>
      <td class="col-num">${r.malaria}</td>
      <td class="col-num">${r.tbc}</td>
      <td class="col-num">${r.dbd}</td>
      <td class="col-num">${r.diare}</td>
      <td class="col-num">${r.pneumonia}</td>
      <td class="col-num"><strong>${r.total}</strong></td>
      <td>${badge(statusBadge(r.status), statusLabel(r.status))}</td>
    </tr>`).join('')
    : `<tr><td colspan="8" style="text-align:center;padding:var(--space-8);color:var(--color-text-muted)">Tidak ada data untuk “${filter}”</td></tr>`;
}

function initSurveilansSearch() {
  const input = document.getElementById('surveilans-search');
  if (input) input.addEventListener('input', e => renderSurveilansTable(e.target.value));
}

// ============================================================
// STOK OBAT TABLE + FILTER
// ============================================================
function renderStokObat(filter = 'semua') {
  const tbody = document.getElementById('obat-tbody');
  if (!tbody) return;
  const rows = SIKESPA_DATA.stokObat
    .filter(o => filter === 'semua' || o.status === filter)
    .sort((a, b) => {
      const order = { kritis: 0, kurang: 1, aman: 2 };
      return (order[a.status] ?? 3) - (order[b.status] ?? 3);
    });

  tbody.innerHTML = rows.map(o => {
    const pct = Math.min(100, Math.round((o.stok / o.min) * 100));
    const barVar = o.status === 'kritis' ? 'danger' : o.status === 'kurang' ? 'warning' : 'success';
    return `<tr>
      <td><strong>${o.nama}</strong></td>
      <td>${o.kabupaten}</td>
      <td class="col-num">${o.stok.toLocaleString('id-ID')} <small>${o.satuan}</small></td>
      <td class="col-num">${o.min.toLocaleString('id-ID')}</td>
      <td>
        <div style="display:flex;align-items:center;gap:var(--space-2)">
          <div class="progress-bar" style="flex:1;max-width:90px">
            <div class="progress-fill ${barVar}" style="width:${pct}%"></div>
          </div>
          <span style="font-variant-numeric:tabular-nums;font-size:var(--text-xs);font-weight:600">${pct}%</span>
        </div>
      </td>
      <td>${badge(stokBadge(o.status), stokLabel(o.status))}</td>
    </tr>`;
  }).join('');
}

function initObatFilter() {
  document.querySelectorAll('[data-obat-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-obat-filter]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderStokObat(btn.dataset.obatFilter);
    });
  });
}

// ============================================================
// BOR TABLE
// ============================================================
function renderBORTable() {
  const tbody = document.getElementById('bor-tbody');
  if (!tbody) return;
  tbody.innerHTML = [...SIKESPA_DATA.kabupaten]
    .sort((a, b) => b.bor - a.bor)
    .map(k => {
      const barVar = k.bor >= 85 ? 'danger' : k.bor >= 70 ? 'warning' : 'success';
      return `<tr>
        <td><strong>${k.name}</strong></td>
        <td class="col-num">${k.rs}</td>
        <td class="col-num">${k.puskesmas}</td>
        <td>
          <div style="display:flex;align-items:center;gap:var(--space-2)">
            <div class="progress-bar" style="flex:1;max-width:90px">
              <div class="progress-fill ${barVar}" style="width:${k.bor}%"></div>
            </div>
            <span style="font-variant-numeric:tabular-nums;font-size:var(--text-xs);font-weight:700">${k.bor}%</span>
          </div>
        </td>
        <td>${badge(statusBadge(k.status), statusLabel(k.status))}</td>
      </tr>`;
    }).join('');
}

// ============================================================
// RUJUKAN TABLE
// ============================================================
function renderRujukan() {
  const tbody = document.getElementById('rujukan-tbody');
  if (!tbody) return;

  const statusMap = {
    'dalam-perjalanan': { cls: 'badge-info',    label: 'Dalam Perjalanan' },
    'menunggu':         { cls: 'badge-warning', label: 'Menunggu' },
    'selesai':          { cls: 'badge-success', label: 'Selesai' },
  };

  tbody.innerHTML = SIKESPA_DATA.rujukan.map(r => {
    const s = statusMap[r.status] || { cls: 'badge-info', label: r.status };
    return `<tr>
      <td><span style="font-variant-numeric:tabular-nums;font-size:var(--text-xs);color:var(--color-text-muted)">${r.id}</span></td>
      <td><strong>${r.pasien}</strong></td>
      <td>${r.asal}</td>
      <td>${r.tujuan}</td>
      <td>${r.penyakit}</td>
      <td>${badge(s.cls, s.label)}</td>
      <td style="font-size:var(--text-xs);color:var(--color-text-muted)">${r.waktu}</td>
    </tr>`;
  }).join('');
}

// ============================================================
// IMUNISASI TABLE
// ============================================================
function renderImunisasiTable() {
  const tbody = document.getElementById('imunisasi-tbody');
  if (!tbody) return;
  tbody.innerHTML = SIKESPA_DATA.imunisasi.map(i => {
    const pct  = Math.min(100, Math.round((i.cakupan / i.target) * 100));
    const barVar = i.status === 'kritis' ? 'danger' : i.status === 'kurang' ? 'warning' : 'success';
    return `<tr>
      <td><strong>${i.antigen}</strong></td>
      <td class="col-num">${i.cakupan}%</td>
      <td class="col-num">${i.target}%</td>
      <td>
        <div style="display:flex;align-items:center;gap:var(--space-2)">
          <div class="progress-bar" style="flex:1;max-width:100px">
            <div class="progress-fill ${barVar}" style="width:${pct}%"></div>
          </div>
          <span style="font-variant-numeric:tabular-nums;font-size:var(--text-xs);font-weight:600">${pct}%</span>
        </div>
      </td>
      <td>${badge(stokBadge(i.status), stokLabel(i.status))}</td>
    </tr>`;
  }).join('');
}

// ============================================================
// GIZI TABLE
// ============================================================
function renderGiziTable() {
  const tbody = document.getElementById('gizi-tbody');
  if (!tbody) return;
  tbody.innerHTML = SIKESPA_DATA.gizi.map(g => `
    <tr>
      <td><strong>${g.kabupaten}</strong></td>
      <td class="col-num" style="font-weight:700;color:var(--color-${g.status === 'critical' ? 'notification' : g.status === 'warning' ? 'warning' : 'success'})">${g.stunting}%</td>
      <td class="col-num">${g.wasting}%</td>
      <td class="col-num">${g.underweight}%</td>
      <td>${badge(statusBadge(g.status), statusLabel(g.status))}</td>
    </tr>`).join('');
}

// ============================================================
// NAKES TABLE
// ============================================================
function renderNakesTable() {
  const tbody = document.getElementById('nakes-tbody');
  if (!tbody) return;
  tbody.innerHTML = SIKESPA_DATA.nakes.map(n => {
    const pct    = Math.round((n.nakes_total / n.kebutuhan) * 100);
    const barVar = pct >= 80 ? 'success' : pct >= 50 ? 'warning' : 'danger';
    const gap    = n.kebutuhan - n.nakes_total;
    return `<tr>
      <td><strong>${n.kabupaten}</strong></td>
      <td class="col-num">${n.dokter}</td>
      <td class="col-num">${n.bidan}</td>
      <td class="col-num">${n.perawat}</td>
      <td class="col-num"><strong>${n.nakes_total}</strong></td>
      <td class="col-num">${n.kebutuhan}</td>
      <td>
        <div style="display:flex;align-items:center;gap:var(--space-2)">
          <div class="progress-bar" style="flex:1;max-width:80px">
            <div class="progress-fill ${barVar}" style="width:${Math.min(100,pct)}%"></div>
          </div>
          <span style="font-variant-numeric:tabular-nums;font-size:var(--text-xs);font-weight:600">${pct}%</span>
        </div>
      </td>
      <td class="col-num" style="color:var(--color-${gap > 20 ? 'notification' : gap > 0 ? 'warning' : 'success'});font-weight:700">${gap > 0 ? '-'+gap : '✔'}</td>
    </tr>`;
  }).join('');
}

// ============================================================
// KIA SUMMARY CARDS
// ============================================================
function renderKIASummary() {
  const wrap = document.getElementById('kia-summary');
  if (!wrap) return;
  const kia = SIKESPA_DATA.kia;
  const items = [
    { key: 'akiProvinsi',     icon: '👶', higherIsBetter: false },
    { key: 'akbProvinsi',     icon: '🐶', higherIsBetter: false },
    { key: 'cakupanAnc',      icon: '💉', higherIsBetter: true  },
    { key: 'persalinanNakes', icon: '🏥', higherIsBetter: true  },
    { key: 'cakupanImun',     icon: '💩', higherIsBetter: true  },
    { key: 'stunting',        icon: '🥦', higherIsBetter: false },
  ];
  wrap.innerHTML = items.map(({ key, icon, higherIsBetter }) => {
    const d   = kia[key];
    const ok  = higherIsBetter ? d.value >= d.target : d.value <= d.target;
    const cls = ok ? 'success' : 'warning';
    return `<div class="kpi-card ${cls}" style="cursor:default">
      <div class="kpi-header">
        <div class="kpi-icon" style="font-size:1.2rem">${icon}</div>
        <span class="kpi-trend ${ok ? 'down' : 'up'}">${ok ? '✔ On Track' : '⚠ Off Track'}</span>
      </div>
      <div class="kpi-value" style="font-size:var(--text-xl)">${d.value}<small style="font-size:var(--text-sm);font-weight:400">${d.unit}</small></div>
      <div class="kpi-label">${d.label}</div>
      <div class="kpi-sub">Target: ${d.target}${d.unit}</div>
    </div>`;
  }).join('');
}

// ============================================================
// LAPORAN SUMMARY
// ============================================================
function renderLaporan() {
  const wrap = document.getElementById('laporan-summary');
  if (!wrap) return;
  const kab    = SIKESPA_DATA.kabupaten;
  const total  = kab.length;
  const kritis = kab.filter(k => k.status === 'critical').length;
  const warn   = kab.filter(k => k.status === 'warning').length;
  const ok     = kab.filter(k => k.status === 'normal').length;
  const totalRS = kab.reduce((s, k) => s + k.rs, 0);
  const totalPKM = kab.reduce((s, k) => s + k.puskesmas, 0);
  const totalKasus = SIKESPA_DATA.surveilans.reduce((s, r) => s + r.total, 0);
  const totalObatKritis = SIKESPA_DATA.stokObat.filter(o => o.status === 'kritis').length;

  wrap.innerHTML = `
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:var(--space-4);margin-bottom:var(--space-6)">
      ${[
        { label: 'Total Kabupaten/Kota', value: total,           icon: '🏗️', color: 'primary' },
        { label: 'Status Kritis',         value: kritis,          icon: '🚨', color: 'danger'  },
        { label: 'Status Waspada',        value: warn,            icon: '⚠️',  color: 'warning' },
        { label: 'Status Normal',         value: ok,              icon: '✅',  color: 'success' },
        { label: 'Total RS',              value: totalRS,         icon: '🏥', color: 'info'    },
        { label: 'Total Puskesmas',       value: totalPKM,        icon: '📍', color: 'info'    },
        { label: 'Total Kasus (minggu)',   value: totalKasus,      icon: '🦠', color: 'warning' },
        { label: 'Item Obat Kritis',      value: totalObatKritis, icon: '💊', color: 'danger'  },
      ].map(i => `<div class="kpi-card ${i.color}" style="cursor:default">
        <div class="kpi-header"><div class="kpi-icon" style="font-size:1.2rem">${i.icon}</div></div>
        <div class="kpi-value" style="font-size:var(--text-xl)">${i.value}</div>
        <div class="kpi-label">${i.label}</div>
      </div>`).join('')}
    </div>
    <div style="padding:var(--space-6);background:var(--color-surface);border-radius:var(--radius-lg);border:1px solid var(--color-border)">
      <div style="font-size:var(--text-sm);font-weight:600;margin-bottom:var(--space-3);color:var(--color-text-muted)">CATATAN SISTEM</div>
      <p style="font-size:var(--text-sm);line-height:1.7;color:var(--color-text)">
        Data diperbarui setiap hari pukul 06.00 WIT dari ${total} kabupaten/kota. 
        Sistem mendeteksi <strong>${kritis} kabupaten</strong> dalam status kritis yang membutuhkan perhatian segera.
        Total <strong>${totalObatKritis} item obat esensial</strong> berada di bawah stok minimum.
        Laporan lengkap dapat diunduh dalam format PDF atau Excel melalui tombol ekspor.
      </p>
      <div style="margin-top:var(--space-4);display:flex;gap:var(--space-3);flex-wrap:wrap">
        <button class="btn btn-primary btn-sm" onclick="alert('Fitur ekspor PDF akan segera tersedia.')">&#x1F4C4; Ekspor PDF</button>
        <button class="btn btn-outline btn-sm" onclick="alert('Fitur ekspor Excel akan segera tersedia.')">&#x1F4CA; Ekspor Excel</button>
      </div>
    </div>`;
}

// ============================================================
// THEME TOGGLE
// ============================================================
function initThemeToggle() {
  const btn  = document.getElementById('theme-toggle');
  const html = document.documentElement;
  if (!btn) return;

  function setTheme(dark) {
    html.setAttribute('data-theme', dark ? 'dark' : 'light');
    btn.innerHTML = dark
      ? '<i data-lucide="sun" width="18" height="18"></i>'
      : '<i data-lucide="moon" width="18" height="18"></i>';
    lucide.createIcons();
    if (typeof reRenderAllCharts === 'function') reRenderAllCharts();
  }

  const prefersDark = window.matchMedia('(prefers-color-scheme:dark)').matches;
  setTheme(prefersDark);

  btn.addEventListener('click', () => {
    const isDark = html.getAttribute('data-theme') === 'dark';
    setTheme(!isDark);
  });
}

// ============================================================
// PETA PLACEHOLDER
// ============================================================
function renderPeta() {
  const wrap = document.getElementById('peta-wrap');
  if (!wrap) return;
  wrap.innerHTML = `
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:400px;gap:var(--space-4);color:var(--color-text-muted)">
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>
      <div style="font-weight:600;font-size:var(--text-lg)">Peta GIS Interaktif</div>
      <div style="font-size:var(--text-sm);text-align:center;max-width:320px">Visualisasi peta Papua dengan layer data kesehatan per kabupaten. Integrasi Leaflet.js + data GeoJSON tersedia di versi berikutnya.</div>
    </div>`;
}

// ============================================================
// INIT
// ============================================================
function initDashboard() {
  renderSidebar();
  initSidebarToggle();
  renderTopbar('Dashboard Utama');
  renderKPI();
  renderAlerts();
  renderSurveilansTable();
  renderStokObat();
  renderBORTable();
  renderRujukan();
  renderImunisasiTable();
  renderGiziTable();
  renderNakesTable();
  renderKIASummary();
  renderKIAProgress();
  renderLaporan();
  renderPeta();

  initSurveilansSearch();
  initObatFilter();

  // Charts on dashboard page init
  setTimeout(() => {
    if (typeof initCharts === 'function') initCharts();
  }, 100);

  navigateTo('dashboard');
}

document.addEventListener('DOMContentLoaded', () => {
  window.showDashboard = function () {
    const login = document.getElementById('page-login');
    const dash  = document.getElementById('page-dashboard');
    if (login) login.classList.remove('active');
    if (dash)  dash.classList.add('active');
    initThemeToggle();
    initDashboard();
  };
});
