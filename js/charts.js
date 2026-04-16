// ============================================================
// CHARTS.JS — Chart.js visualizations + DOM renderers for SIKESPA
// ============================================================

'use strict';

// ---- Shared colour palette ----
const C_RED    = 'var(--color-error)';
const C_ORANGE = 'var(--color-warning)';
const C_GREEN  = 'var(--color-success)';
const C_BLUE   = 'var(--color-blue)';
const C_TEAL   = 'var(--color-primary)';
const C_MUTED  = 'var(--color-text-muted)';

// ============================================================
// 1. TREN PENYAKIT (multi-line chart)
// ============================================================
let trenChart = null;
function renderTrenChart(selectedPenyakit = ['malaria']) {
  const ctx = document.getElementById('tren-chart');
  if (!ctx) return;

  const d = DATA.trenMingguan;
  const colorMap = {
    malaria:   '#e05050',
    tbc:       '#e0a020',
    dbd:       '#4090d0',
    diare:     '#40b060',
    pneumonia: '#9060c0',
  };
  const labelMap = {
    malaria: 'Malaria', tbc: 'TBC', dbd: 'DBD',
    diare: 'Diare', pneumonia: 'Pneumonia',
  };

  const datasets = selectedPenyakit.map(key => ({
    label: labelMap[key],
    data: d[key],
    borderColor: colorMap[key],
    backgroundColor: colorMap[key] + '22',
    borderWidth: 2,
    pointRadius: 3,
    pointHoverRadius: 5,
    tension: 0.35,
    fill: false,
  }));

  if (trenChart) trenChart.destroy();
  trenChart = new Chart(ctx, {
    type: 'line',
    data: { labels: d.labels, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { position: 'top', labels: { boxWidth: 12, font: { size: 12 } } },
        tooltip: { backgroundColor: 'var(--color-surface)', titleColor: 'var(--color-text)', bodyColor: 'var(--color-text-muted)', borderColor: 'var(--color-border)', borderWidth: 1 },
      },
      scales: {
        x: { grid: { color: 'var(--color-divider)' }, ticks: { color: 'var(--color-text-muted)', font: { size: 11 } } },
        y: { grid: { color: 'var(--color-divider)' }, ticks: { color: 'var(--color-text-muted)', font: { size: 11 } }, beginAtZero: false },
      },
    },
  });
}

// ---- Pill filter for tren ----
function renderTrenFilter() {
  const wrap = document.getElementById('tren-filter');
  if (!wrap) return;
  const penyakit = [
    { key: 'malaria',   label: 'Malaria' },
    { key: 'tbc',       label: 'TBC' },
    { key: 'dbd',       label: 'DBD' },
    { key: 'diare',     label: 'Diare' },
    { key: 'pneumonia', label: 'Pneumonia' },
  ];
  let selected = ['malaria'];
  wrap.innerHTML = penyakit.map(p => `
    <button class="pill ${selected.includes(p.key) ? 'active' : ''}" data-key="${p.key}">${p.label}</button>
  `).join('');
  wrap.querySelectorAll('.pill').forEach(btn => {
    btn.addEventListener('click', () => {
      const k = btn.dataset.key;
      if (selected.includes(k)) {
        if (selected.length === 1) return;
        selected = selected.filter(s => s !== k);
      } else {
        selected.push(k);
      }
      wrap.querySelectorAll('.pill').forEach(b =>
        b.classList.toggle('active', selected.includes(b.dataset.key))
      );
      renderTrenChart(selected);
    });
  });
  renderTrenChart(selected);
}

// ============================================================
// 2. BOR TREND (bar chart)
// ============================================================
let borTrenChart = null;
function renderBorTrenChart() {
  const ctx = document.getElementById('bor-tren-chart');
  if (!ctx) return;
  const d = DATA.borData;
  const colors = d.values.map(v => v >= d.threshold ? '#e05050cc' : v >= 75 ? '#e0a020cc' : '#40b060cc');

  if (borTrenChart) borTrenChart.destroy();
  borTrenChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: d.labels,
      datasets: [{
        label: 'Rata-rata BOR (%)',
        data: d.values,
        backgroundColor: colors,
        borderRadius: 4,
        borderSkipped: false,
      }, {
        label: `Ambang Kritis (${d.threshold}%)`,
        data: Array(d.labels.length).fill(d.threshold),
        type: 'line',
        borderColor: '#e0505080',
        borderWidth: 1.5,
        borderDash: [6, 3],
        pointRadius: 0,
        fill: false,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top', labels: { boxWidth: 12, font: { size: 12 } } },
        tooltip: { backgroundColor: 'var(--color-surface)', titleColor: 'var(--color-text)', bodyColor: 'var(--color-text-muted)', borderColor: 'var(--color-border)', borderWidth: 1 },
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: 'var(--color-text-muted)', font: { size: 11 } } },
        y: { grid: { color: 'var(--color-divider)' }, ticks: { color: 'var(--color-text-muted)', font: { size: 11 } }, min: 0, max: 100 },
      },
    },
  });
}

// ============================================================
// 3. IMUNISASI RADAR (radar chart per kabupaten)
// ============================================================
let imuRadarChart = null;
function renderImunisasiRadar(idx = 0) {
  const ctx = document.getElementById('imunisasi-radar');
  if (!ctx) return;
  const row = DATA.imunisasi[idx];
  if (!row) return;

  if (imuRadarChart) imuRadarChart.destroy();
  imuRadarChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['BCG', 'Polio', 'DPT', 'Campak', 'HB0'],
      datasets: [{
        label: row.kabupaten,
        data: [row.bcg, row.polio, row.dpt, row.campak, row.hb0],
        backgroundColor: C_TEAL + '33',
        borderColor: C_TEAL,
        pointBackgroundColor: C_TEAL,
        borderWidth: 2,
      }, {
        label: 'Target (80%)',
        data: [80, 80, 80, 80, 80],
        backgroundColor: 'transparent',
        borderColor: C_ORANGE + '88',
        borderWidth: 1.5,
        borderDash: [5, 3],
        pointRadius: 0,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          min: 0, max: 100,
          ticks: { stepSize: 25, backdropColor: 'transparent', color: 'var(--color-text-muted)', font: { size: 10 } },
          grid: { color: 'var(--color-divider)' },
          pointLabels: { color: 'var(--color-text)', font: { size: 11 } },
        },
      },
      plugins: {
        legend: { position: 'top', labels: { boxWidth: 12, font: { size: 12 } } },
        tooltip: { backgroundColor: 'var(--color-surface)', titleColor: 'var(--color-text)', bodyColor: 'var(--color-text-muted)', borderColor: 'var(--color-border)', borderWidth: 1 },
      },
    },
  });
}

// ---- Dropdown for radar ----
function renderImunisasiRadarDropdown() {
  const sel = document.getElementById('imunisasi-radar-select');
  if (!sel) return;
  sel.innerHTML = DATA.imunisasi.map((row, i) =>
    `<option value="${i}">${row.kabupaten}</option>`
  ).join('');
  sel.addEventListener('change', e => renderImunisasiRadar(+e.target.value));
  renderImunisasiRadar(0);
}

// ============================================================
// 4. GIZI SCATTER
// ============================================================
let giziChart = null;
function renderGiziChart() {
  const ctx = document.getElementById('gizi-scatter');
  if (!ctx) return;
  const colorFn = s => s === 'critical' ? C_RED : s === 'warning' ? C_ORANGE : C_GREEN;

  if (giziChart) giziChart.destroy();
  giziChart = new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [{
        label: 'Kabupaten',
        data: DATA.gizi.map(g => ({ x: g.stunting, y: g.wasting, label: g.kabupaten })),
        backgroundColor: DATA.gizi.map(g => colorFn(g.status) + 'bb'),
        pointRadius: 7,
        pointHoverRadius: 9,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'var(--color-surface)', titleColor: 'var(--color-text)', bodyColor: 'var(--color-text-muted)', borderColor: 'var(--color-border)', borderWidth: 1,
          callbacks: {
            title: items => items[0].raw.label,
            label: item => `Stunting: ${item.raw.x}% | Wasting: ${item.raw.y}%`,
          },
        },
      },
      scales: {
        x: { title: { display: true, text: 'Stunting (%)', color: 'var(--color-text-muted)', font: { size: 11 } }, grid: { color: 'var(--color-divider)' }, ticks: { color: 'var(--color-text-muted)', font: { size: 11 } } },
        y: { title: { display: true, text: 'Wasting (%)', color: 'var(--color-text-muted)', font: { size: 11 } }, grid: { color: 'var(--color-divider)' }, ticks: { color: 'var(--color-text-muted)', font: { size: 11 } } },
      },
    },
  });
}

// ============================================================
// 5. NAKES HORIZONTAL BAR
// ============================================================
let nakesChart = null;
function renderNakesChart() {
  const ctx = document.getElementById('nakes-chart');
  if (!ctx) return;
  const rows = DATA.nakes.slice().sort((a, b) => (a.dokter + a.perawat + a.bidan) - (b.dokter + b.perawat + b.bidan));

  if (nakesChart) nakesChart.destroy();
  nakesChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: rows.map(r => r.kabupaten),
      datasets: [
        { label: 'Dokter',  data: rows.map(r => r.dokter),  backgroundColor: '#4090d0cc', borderRadius: 2 },
        { label: 'Perawat', data: rows.map(r => r.perawat), backgroundColor: '#40b060cc', borderRadius: 2 },
        { label: 'Bidan',   data: rows.map(r => r.bidan),   backgroundColor: '#e0a020cc', borderRadius: 2 },
      ],
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top', labels: { boxWidth: 12, font: { size: 12 } } },
        tooltip: { backgroundColor: 'var(--color-surface)', titleColor: 'var(--color-text)', bodyColor: 'var(--color-text-muted)', borderColor: 'var(--color-border)', borderWidth: 1 },
      },
      scales: {
        x: { stacked: true, grid: { color: 'var(--color-divider)' }, ticks: { color: 'var(--color-text-muted)', font: { size: 11 } } },
        y: { stacked: true, grid: { display: false }, ticks: { color: 'var(--color-text-muted)', font: { size: 11 } } },
      },
    },
  });
}

// ============================================================
// 6. LAPORAN DOUGHNUT
// ============================================================
let laporanChart = null;
function renderLaporanChart() {
  const ctx = document.getElementById('laporan-chart');
  if (!ctx) return;
  const d = DATA.laporan;

  if (laporanChart) laporanChart.destroy();
  laporanChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Tepat Waktu', 'Terlambat', 'Belum Lapor'],
      datasets: [{
        data: [d.terkirim - d.terlambat, d.terlambat, d.belumLapor],
        backgroundColor: ['#40b060cc', '#e0a020cc', '#e05050cc'],
        borderWidth: 2,
        borderColor: 'var(--color-surface)',
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '65%',
      plugins: {
        legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 12 } } },
        tooltip: { backgroundColor: 'var(--color-surface)', titleColor: 'var(--color-text)', bodyColor: 'var(--color-text-muted)', borderColor: 'var(--color-border)', borderWidth: 1 },
      },
    },
  });
}

// ============================================================
// 7. SURVEILANS TABLE renderer
// ============================================================
function renderSurveilansTable(filter = '') {
  const tbody = document.getElementById('surveilans-tbody');
  if (!tbody) return;
  const rows = filter
    ? DATA.surveilans.filter(r => r.status === filter)
    : DATA.surveilans;
  tbody.innerHTML = rows.map(r => `
    <tr>
      <td>${r.kabupaten}</td>
      <td class="num">${r.malaria}</td>
      <td class="num">${r.tbc}</td>
      <td class="num">${r.dbd}</td>
      <td class="num">${r.diare}</td>
      <td class="num">${r.pneumonia}</td>
      <td class="num"><strong>${r.total}</strong></td>
      <td><span class="badge badge-${r.status}">${r.status === 'critical' ? 'Kritis' : r.status === 'warning' ? 'Waspada' : 'Normal'}</span></td>
    </tr>
  `).join('');
}

// ============================================================
// 8. STOK OBAT TABLE renderer
// ============================================================
function renderStokObat(filter = 'semua') {
  const tbody = document.getElementById('stok-tbody');
  if (!tbody) return;
  const rows = filter === 'semua'
    ? DATA.stokObat
    : DATA.stokObat.filter(r => r.status === filter);
  tbody.innerHTML = rows.map(r => {
    const pct = Math.round((r.stok / r.minimum) * 100);
    const barColor = r.status === 'critical' ? C_RED : r.status === 'warning' ? C_ORANGE : C_GREEN;
    const fillPct = Math.min(100, pct);
    return `
    <tr>
      <td>${r.kabupaten}</td>
      <td>${r.obat}</td>
      <td class="num" style="font-variant-numeric:tabular-nums">${r.stok} ${r.satuan}</td>
      <td class="num" style="font-variant-numeric:tabular-nums">${r.minimum} ${r.satuan}</td>
      <td style="min-width:100px">
        <div style="height:6px;background:var(--color-divider);border-radius:9999px;overflow:hidden">
          <div style="height:100%;width:${fillPct}%;background:${barColor};border-radius:9999px"></div>
        </div>
        <span style="font-size:var(--text-xs);color:var(--color-text-muted);font-variant-numeric:tabular-nums">${pct}%</span>
      </td>
      <td><span class="badge badge-${r.status}">${r.status === 'critical' ? 'Kritis' : r.status === 'warning' ? 'Waspada' : 'Normal'}</span></td>
    </tr>`;
  }).join('');
}

// ============================================================
// 9. BOR TABLE renderer
// ============================================================
function renderBORTable() {
  const tbody = document.getElementById('bor-tbody');
  if (!tbody) return;
  tbody.innerHTML = DATA.bor.map(r => {
    const barColor = r.status === 'critical' ? C_RED : r.status === 'warning' ? C_ORANGE : C_GREEN;
    return `
    <tr>
      <td>${r.rs}</td>
      <td>${r.kabupaten}</td>
      <td class="num">${r.kapasitas}</td>
      <td class="num">${r.terisi}</td>
      <td style="min-width:100px">
        <div style="height:6px;background:var(--color-divider);border-radius:9999px;overflow:hidden">
          <div style="height:100%;width:${r.bor}%;background:${barColor};border-radius:9999px"></div>
        </div>
        <span style="font-size:var(--text-xs);color:var(--color-text-muted);font-variant-numeric:tabular-nums">${r.bor}%</span>
      </td>
      <td class="num">${r.icu.terisi}/${r.icu.kapasitas}</td>
      <td><span class="badge badge-${r.status}">${r.status === 'critical' ? 'Kritis' : r.status === 'warning' ? 'Waspada' : 'Normal'}</span></td>
    </tr>`;
  }).join('');
}

// ============================================================
// 10. RUJUKAN TABLE renderer
// ============================================================
function renderRujukan() {
  const tbody = document.getElementById('rujukan-tbody');
  if (!tbody) return;
  const statusMap = {
    'dalam-perjalanan': { label: 'Dalam Perjalanan', color: 'var(--color-blue)' },
    'tiba':             { label: 'Tiba di RS Tujuan', color: 'var(--color-success)' },
    'selesai':          { label: 'Selesai',            color: 'var(--color-text-muted)' },
  };
  tbody.innerHTML = DATA.rujukan.map(r => {
    const s = statusMap[r.status] || { label: r.status, color: 'inherit' };
    return `
    <tr>
      <td style="font-size:var(--text-xs);font-variant-numeric:tabular-nums;color:var(--color-text-muted)">${r.id}</td>
      <td>${r.pasien}</td>
      <td>${r.asal}</td>
      <td>${r.tujuan}</td>
      <td>${r.diagnosa}</td>
      <td>${r.transport}</td>
      <td><span style="color:${s.color};font-size:var(--text-xs);font-weight:600">${s.label}</span></td>
      <td style="font-size:var(--text-xs);color:var(--color-text-muted)">${r.waktu}</td>
    </tr>`;
  }).join('');
}

// ============================================================
// 11. IMUNISASI TABLE renderer
// ============================================================
function renderImunisasiTable() {
  const tbody = document.getElementById('imunisasi-tbody');
  if (!tbody) return;
  tbody.innerHTML = DATA.imunisasi.map(r => {
    const cols = ['bcg','polio','dpt','campak','hb0'].map(k => {
      const v = r[k];
      const color = v >= 80 ? 'var(--color-success)' : v >= 60 ? 'var(--color-warning)' : 'var(--color-error)';
      return `<td class="num" style="color:${color};font-variant-numeric:tabular-nums">${v}%</td>`;
    }).join('');
    return `<tr><td>${r.kabupaten}</td>${cols}<td><span class="badge badge-${r.status}">${r.status === 'critical' ? 'Kritis' : r.status === 'warning' ? 'Waspada' : 'Normal'}</span></td></tr>`;
  }).join('');
}

// ============================================================
// 12. GIZI TABLE renderer
// ============================================================
function renderGiziTable() {
  const tbody = document.getElementById('gizi-tbody');
  if (!tbody) return;
  tbody.innerHTML = DATA.gizi.map(r => {
    const col = (v, warn, crit) => {
      const color = v >= crit ? 'var(--color-error)' : v >= warn ? 'var(--color-warning)' : 'var(--color-success)';
      return `<td class="num" style="color:${color};font-variant-numeric:tabular-nums">${v}%</td>`;
    };
    return `<tr>
      <td>${r.kabupaten}</td>
      ${col(r.stunting, 30, 40)}
      ${col(r.wasting, 15, 25)}
      ${col(r.underweight, 20, 30)}
      <td><span class="badge badge-${r.status}">${r.status === 'critical' ? 'Kritis' : r.status === 'warning' ? 'Waspada' : 'Normal'}</span></td>
    </tr>`;
  }).join('');
}

// ============================================================
// 13. NAKES TABLE renderer
// ============================================================
function renderNakesTable() {
  const tbody = document.getElementById('nakes-tbody');
  if (!tbody) return;
  tbody.innerHTML = DATA.nakes.map(r => {
    const total = r.dokter + r.perawat + r.bidan + r.farmasi;
    return `<tr>
      <td>${r.kabupaten}</td>
      <td class="num">${r.dokter}</td>
      <td class="num">${r.perawat}</td>
      <td class="num">${r.bidan}</td>
      <td class="num">${r.farmasi}</td>
      <td class="num"><strong>${total}</strong></td>
      <td><span class="badge badge-${r.status}">${r.status === 'critical' ? 'Kritis' : r.status === 'warning' ? 'Waspada' : 'Normal'}</span></td>
    </tr>`;
  }).join('');
}

// ============================================================
// 14. KIA SUMMARY mini-cards
// ============================================================
function renderKIASummary() {
  const wrap = document.getElementById('kia-summary');
  if (!wrap) return;
  const items = [
    { key: 'aki',        icon: '⚠️' },
    { key: 'akb',        icon: '⚠️' },
    { key: 'anc4',       icon: '📈' },
    { key: 'persalinan', icon: '📈' },
    { key: 'kn2',        icon: '📈' },
    { key: 'kb',         icon: '📈' },
  ];
  const kia = DATA.kia;
  wrap.innerHTML = items.map(({ key }) => {
    const item = kia[key];
    if (!item) return '';
    const ok = item.higherIsBetter ? item.value >= item.target : item.value <= item.target;
    const color = ok ? 'var(--color-success)' : 'var(--color-error)';
    const arrow = item.higherIsBetter
      ? (item.value >= item.target ? '↑' : '↓')
      : (item.value <= item.target ? '↓' : '↑');
    const arrowColor = ok ? 'var(--color-success)' : 'var(--color-error)';
    return `
      <div style="background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:var(--space-4);">
        <div style="font-size:var(--text-xs);color:var(--color-text-muted);margin-bottom:var(--space-1)">${item.label}</div>
        <div style="font-size:var(--text-xl);font-weight:700;color:${color};font-variant-numeric:tabular-nums">${item.value}<span style="font-size:var(--text-sm);font-weight:400">${item.unit}</span></div>
        <div style="font-size:var(--text-xs);color:var(--color-text-muted)">Target: ${item.target}${item.unit} <span style="color:${arrowColor};font-weight:700">${arrow}</span></div>
      </div>`;
  }).join('');
}

// ============================================================
// 15. LAPORAN DETAIL TABLE renderer
// ============================================================
function renderLaporanDetail() {
  const tbody = document.getElementById('laporan-tbody');
  if (!tbody) return;
  const statusMap = {
    tepat:     { label: 'Tepat Waktu', cls: 'normal' },
    terlambat: { label: 'Terlambat',   cls: 'warning' },
    belum:     { label: 'Belum Lapor', cls: 'critical' },
  };
  tbody.innerHTML = DATA.laporan.rincian.map(r => {
    const s = statusMap[r.status];
    return `<tr>
      <td>${r.kabupaten}</td>
      <td><span class="badge badge-${s.cls}">${s.label}</span></td>
      <td style="font-size:var(--text-xs);color:var(--color-text-muted)">${r.tanggal}</td>
    </tr>`;
  }).join('');
}

// ============================================================
// 16. PETA (SVG-based bubble map)
// ============================================================
function renderPeta() {
  const wrap = document.getElementById('peta-wrap');
  if (!wrap) return;

  const colorMap = { critical: '#e05050', warning: '#e0a020', normal: '#40b060' };
  const W = wrap.clientWidth || 600;
  const H = Math.round(W * 0.65);

  const bubbles = DATA.peta.map(p => {
    const cx = Math.round(p.x * W / 100);
    const cy = Math.round(p.y * H / 100);
    const r  = Math.max(8, Math.min(22, Math.round(p.kasus / 8)));
    const c  = colorMap[p.status];
    return `
      <g class="peta-bubble" style="cursor:pointer" role="button" tabindex="0" aria-label="${p.label}: ${p.kasus} kasus">
        <circle cx="${cx}" cy="${cy}" r="${r}" fill="${c}" fill-opacity="0.25" stroke="${c}" stroke-width="1.5"/>
        <circle cx="${cx}" cy="${cy}" r="3" fill="${c}"/>
        <text x="${cx}" y="${cy - r - 4}" text-anchor="middle"
              font-size="10" fill="var(--color-text-muted)" font-family="inherit">${p.label}</text>
      </g>`;
  }).join('');

  wrap.innerHTML = `
    <svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"
         style="background:var(--color-surface-offset);border-radius:var(--radius-lg);display:block">
      <rect width="${W}" height="${H}" fill="var(--color-surface-offset)" rx="12"/>
      <text x="12" y="20" font-size="11" fill="var(--color-text-muted)" font-family="inherit">Papua Province — Bubble size = total kasus</text>
      ${bubbles}
    </svg>
    <div style="display:flex;gap:var(--space-4);margin-top:var(--space-3);flex-wrap:wrap">
      ${[['critical','#e05050','Kritis'],['warning','#e0a020','Waspada'],['normal','#40b060','Normal']].map(([,c,l]) =>
        `<span style="display:flex;align-items:center;gap:var(--space-1);font-size:var(--text-xs);color:var(--color-text-muted)">
          <span style="width:10px;height:10px;border-radius:50%;background:${c};display:inline-block"></span>${l}
        </span>`).join('')}
    </div>`;
}

// ============================================================
// 17. KIA PROGRESS BARS (in charts.js — rendered into #kia-progress)
// ============================================================
function renderKIAProgress() {
  const wrap = document.getElementById('kia-progress');
  if (!wrap) return;

  const items = [
    { key: 'aki',        higherIsBetter: false },
    { key: 'akb',        higherIsBetter: false },
    { key: 'anc4',       higherIsBetter: true  },
    { key: 'persalinan', higherIsBetter: true  },
    { key: 'kn2',        higherIsBetter: true  },
    { key: 'kb',         higherIsBetter: true  },
  ];
  const kia = DATA.kia;

  wrap.innerHTML = items.map(({ key, higherIsBetter }) => {
    const item  = kia[key];
    if (!item) return '';
    const pct   = Math.min(100, Math.round((item.value / item.target) * 100));
    const ok    = higherIsBetter ? item.value >= item.target : item.value <= item.target;
    const warn  = higherIsBetter ? pct >= 75 : pct <= 130;
    const color = ok ? C_GREEN : warn ? C_ORANGE : C_RED;
    const fill  = higherIsBetter
      ? Math.min(100, pct)
      : item.value <= item.target
        ? 100
        : Math.min(100, Math.round((item.target / item.value) * 100));
    return `
      <div style="margin-bottom:var(--space-4)">
        <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:var(--space-1)">
          <span style="font-size:var(--text-sm);font-weight:600;color:var(--color-text)">${item.label}</span>
          <span style="font-size:var(--text-xs);color:var(--color-text-muted);font-variant-numeric:tabular-nums">${item.value}${item.unit} / target ${item.target}${item.unit}</span>
        </div>
        <div style="height:8px;background:var(--surface-offset);border-radius:9999px;overflow:hidden">
          <div style="height:100%;width:${fill}%;background:${color};border-radius:9999px;transition:width 0.8s ease"></div>
        </div>
      </div>`;
  }).join('');
}
