// ============================================================
// CHARTS.JS — Chart.js visualizations
// Depends on: data.js, Chart.js CDN
// ============================================================

// ---- CHART REGISTRY ----
const CHARTS = {};

// ---- FONT CONSTANTS ----
const FONT_BODY    = "'Inter', sans-serif";
const FONT_DISPLAY = "'Plus Jakarta Sans', sans-serif";

// ---- THEME ----
function getTheme() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  return {
    isDark,
    text:      isDark ? '#9aabb8' : '#4a5568',
    textMuted: isDark ? '#6a7f8e' : '#718096',
    grid:      isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)',
    bg:        isDark ? '#1a2535' : '#ffffff',
    border:    isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.10)',
    surface:   isDark ? '#111c2d' : '#f7f9fc',
  };
}

function baseTooltip(t) {
  return {
    backgroundColor: t.bg,
    borderColor:     t.border,
    borderWidth:     1,
    titleColor:      t.text,
    bodyColor:       t.textMuted,
    padding:         12,
    titleFont: { family: FONT_DISPLAY, weight: '600', size: 12 },
    bodyFont:  { family: FONT_BODY, size: 11 },
    boxPadding: 4,
  };
}

function baseAxis(t, extra = {}) {
  return {
    grid:   { color: t.grid, drawBorder: false },
    ticks:  { color: t.text, font: { family: FONT_BODY, size: 11 } },
    border: { display: false },
    ...extra,
  };
}

function baseLegend(t) {
  return {
    labels: {
      color: t.text,
      font:  { family: FONT_BODY, size: 11 },
      boxWidth: 12, boxHeight: 12,
      padding: 16,
      usePointStyle: true, pointStyle: 'circle',
    }
  };
}

function destroyChart(key) {
  if (CHARTS[key]) { CHARTS[key].destroy(); delete CHARTS[key]; }
}

// ---- COLOR PALETTE ----
const C_RED    = '#c0392b';
const C_ORANGE = '#b85c00';
const C_GREEN  = '#2d7d46';
const C_BLUE   = '#1a6b9e';
const C_PURPLE = '#6b3fa0';
const C_GOLD   = '#9a7b00';
const C_TEAL   = '#006b6b';
const C_PINK   = '#a0304a';

function borColor(v)  { return v >= 85 ? C_RED : v >= 70 ? C_ORANGE : C_GREEN; }
function stokColor(s) { return s === 'kritis' ? C_RED : s === 'kurang' ? C_ORANGE : C_GREEN; }

// helper: canvas guard
function getCanvas(id) {
  const el = document.getElementById(id);
  if (!el) return null;
  return el;
}

// ============================================================
// 1. TREN PENYAKIT — dashboard (chart-tren)
// ============================================================
function renderChartTren() {
  const canvas = getCanvas('chart-tren');
  if (!canvas) return;
  destroyChart('tren');
  const d = SIKESPA_DATA.trenPenyakit;
  const t = getTheme();
  CHARTS.tren = new Chart(canvas, {
    type: 'line',
    data: {
      labels: d.labels,
      datasets: d.datasets.map(ds => ({
        label: ds.label, data: ds.data,
        borderColor: ds.color, backgroundColor: ds.color + '18',
        borderWidth: 2, pointRadius: 3, pointHoverRadius: 6,
        pointBackgroundColor: ds.color, tension: 0.4, fill: false,
      }))
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { position: 'top', align: 'start', ...baseLegend(t) },
        tooltip: { ...baseTooltip(t),
          callbacks: { label: ctx => ` ${ctx.dataset.label}: ${ctx.parsed.y.toLocaleString('id-ID')} kasus` }
        }
      },
      scales: {
        x: baseAxis(t),
        y: { ...baseAxis(t), beginAtZero: true,
             ticks: { color: t.text, font: { family: FONT_BODY, size: 11 },
                      callback: v => v.toLocaleString('id-ID') } }
      }
    }
  });
}

// ============================================================
// 2. TREN PENYAKIT — surveilans page (chart-tren-surveilans)
// ============================================================
function renderChartTrenSurveilans() {
  const canvas = getCanvas('chart-tren-surveilans');
  if (!canvas) return;
  destroyChart('trenSurveilans');
  const d = SIKESPA_DATA.trenPenyakit;
  const t = getTheme();
  CHARTS.trenSurveilans = new Chart(canvas, {
    type: 'line',
    data: {
      labels: d.labels,
      datasets: d.datasets.map(ds => ({
        label: ds.label, data: ds.data,
        borderColor: ds.color, backgroundColor: ds.color + '15',
        borderWidth: 2.5, pointRadius: 4, pointHoverRadius: 7,
        pointBackgroundColor: ds.color, tension: 0.4, fill: true,
      }))
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { position: 'top', align: 'start', ...baseLegend(t) },
        tooltip: { ...baseTooltip(t),
          callbacks: { label: ctx => ` ${ctx.dataset.label}: ${ctx.parsed.y.toLocaleString('id-ID')} kasus` }
        }
      },
      scales: {
        x: baseAxis(t),
        y: { ...baseAxis(t), beginAtZero: true,
             ticks: { color: t.text, font: { family: FONT_BODY, size: 11 },
                      callback: v => v.toLocaleString('id-ID') } }
      }
    }
  });
}

// ============================================================
// 3. DISTRIBUSI PENYAKIT — Donut (chart-distribusi-penyakit)
// ============================================================
function renderChartDistribusiPenyakit() {
  const canvas = getCanvas('chart-distribusi-penyakit');
  if (!canvas) return;
  destroyChart('distribusiPenyakit');
  const surv = SIKESPA_DATA.surveilans;
  const t = getTheme();
  const totals = {
    Malaria:   surv.reduce((s, r) => s + r.malaria, 0),
    TBC:       surv.reduce((s, r) => s + r.tbc, 0),
    DBD:       surv.reduce((s, r) => s + r.dbd, 0),
    Diare:     surv.reduce((s, r) => s + r.diare, 0),
    Pneumonia: surv.reduce((s, r) => s + r.pneumonia, 0),
  };
  CHARTS.distribusiPenyakit = new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels: Object.keys(totals),
      datasets: [{
        data: Object.values(totals),
        backgroundColor: [C_RED, C_BLUE, C_ORANGE, C_TEAL, C_PURPLE],
        borderColor: t.bg, borderWidth: 3, hoverOffset: 6,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: '62%',
      plugins: {
        legend: { position: 'bottom', ...baseLegend(t) },
        tooltip: { ...baseTooltip(t),
          callbacks: { label: ctx => ` ${ctx.label}: ${ctx.parsed.toLocaleString('id-ID')} kasus` }
        }
      }
    }
  });
}

// ============================================================
// 4. BOR — dashboard (chart-bor)
// ============================================================
function renderChartBOR() {
  const canvas = getCanvas('chart-bor');
  if (!canvas) return;
  destroyChart('bor');
  const d = SIKESPA_DATA.borData;
  const t = getTheme();
  CHARTS.bor = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: d.labels,
      datasets: [
        { label: 'BOR (%)', data: d.values,
          backgroundColor: d.values.map(borColor),
          borderRadius: 4, borderSkipped: false },
        { label: 'Ambang Kritis (85%)', data: d.labels.map(() => d.threshold),
          type: 'line', borderColor: C_RED, borderWidth: 1.5,
          borderDash: [5, 4], pointRadius: 0, fill: false, order: 0 }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top', align: 'start', ...baseLegend(t),
          labels: { ...baseLegend(t).labels, filter: item => item.datasetIndex === 1 } },
        tooltip: { ...baseTooltip(t),
          callbacks: { label: ctx => ctx.datasetIndex === 0 ? ` BOR: ${ctx.parsed.y}%` : ` Kritis: ${ctx.parsed.y}%` } }
      },
      scales: {
        x: { ...baseAxis(t), grid: { display: false },
             ticks: { color: t.text, font: { family: FONT_BODY, size: 10 }, maxRotation: 30 } },
        y: { ...baseAxis(t), min: 0, max: 100,
             ticks: { color: t.text, font: { family: FONT_BODY, size: 11 }, callback: v => v + '%' } }
      }
    }
  });
}

// ============================================================
// 5. BOR DETAIL — fasilitas page (chart-bor-detail)
// ============================================================
function renderChartBORDetail() {
  const canvas = getCanvas('chart-bor-detail');
  if (!canvas) return;
  destroyChart('borDetail');
  const kabs = [...SIKESPA_DATA.kabupaten].sort((a, b) => b.bor - a.bor);
  const t = getTheme();
  CHARTS.borDetail = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: kabs.map(k => k.name),
      datasets: [
        { label: 'BOR (%)', data: kabs.map(k => k.bor),
          backgroundColor: kabs.map(k => borColor(k.bor)),
          borderRadius: 4, borderSkipped: false },
        { label: 'Ambang Kritis (85%)', data: kabs.map(() => 85),
          type: 'line', borderColor: C_RED, borderWidth: 1.5,
          borderDash: [5, 4], pointRadius: 0, fill: false, order: 0 }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top', align: 'start', ...baseLegend(t),
          labels: { ...baseLegend(t).labels, filter: i => i.datasetIndex === 1 } },
        tooltip: { ...baseTooltip(t),
          callbacks: { label: ctx => ctx.datasetIndex === 0 ? ` BOR: ${ctx.parsed.y}%` : null } }
      },
      scales: {
        x: { ...baseAxis(t), grid: { display: false },
             ticks: { color: t.text, font: { family: FONT_BODY, size: 10 }, maxRotation: 35 } },
        y: { ...baseAxis(t), min: 0, max: 100,
             ticks: { color: t.text, font: { family: FONT_BODY, size: 11 }, callback: v => v + '%' } }
      }
    }
  });
}

// ============================================================
// 6. STATUS KABUPATEN — dashboard (chart-status-kab)
// ============================================================
function renderChartStatusKab() {
  const canvas = getCanvas('chart-status-kab');
  if (!canvas) return;
  destroyChart('statusKab');
  const kabs = SIKESPA_DATA.kabupaten;
  const t = getTheme();
  const counts = {
    normal:   kabs.filter(k => k.status === 'normal').length,
    warning:  kabs.filter(k => k.status === 'warning').length,
    critical: kabs.filter(k => k.status === 'critical').length,
  };
  CHARTS.statusKab = new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels: ['Normal', 'Waspada', 'Kritis'],
      datasets: [{ data: [counts.normal, counts.warning, counts.critical],
        backgroundColor: [C_GREEN, C_ORANGE, C_RED],
        borderColor: t.bg, borderWidth: 3, hoverOffset: 6 }]
    },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: '68%',
      plugins: {
        legend: { position: 'bottom', ...baseLegend(t) },
        tooltip: { ...baseTooltip(t),
          callbacks: { label: ctx => ` ${ctx.label}: ${ctx.parsed} kabupaten` } }
      }
    }
  });
}

// ============================================================
// 7. STATUS KABUPATEN DETAIL — fasilitas (chart-status-kab-detail)
// ============================================================
function renderChartStatusKabDetail() {
  const canvas = getCanvas('chart-status-kab-detail');
  if (!canvas) return;
  destroyChart('statusKabDetail');
  const kabs = SIKESPA_DATA.kabupaten;
  const t = getTheme();
  const counts = {
    normal:   kabs.filter(k => k.status === 'normal').length,
    warning:  kabs.filter(k => k.status === 'warning').length,
    critical: kabs.filter(k => k.status === 'critical').length,
  };
  CHARTS.statusKabDetail = new Chart(canvas, {
    type: 'pie',
    data: {
      labels: [
        `Normal (${counts.normal})`,
        `Waspada (${counts.warning})`,
        `Kritis (${counts.critical})`,
      ],
      datasets: [{ data: [counts.normal, counts.warning, counts.critical],
        backgroundColor: [C_GREEN, C_ORANGE, C_RED],
        borderColor: t.bg, borderWidth: 3, hoverOffset: 8 }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom', ...baseLegend(t) },
        tooltip: { ...baseTooltip(t),
          callbacks: { label: ctx => ` ${ctx.label} kabupaten` } }
      }
    }
  });
}

// ============================================================
// 8. KIA TREN — line (chart-kia-tren)
// ============================================================
function renderChartKIATren() {
  const canvas = getCanvas('chart-kia-tren');
  if (!canvas) return;
  destroyChart('kiaTren');
  const t = getTheme();
  const years = ['2022', '2023', '2024', '2025', '2026'];
  CHARTS.kiaTren = new Chart(canvas, {
    type: 'line',
    data: {
      labels: years,
      datasets: [
        {
          label: 'AKI (per 100.000 KH)',
          data: [312, 298, 284, 271, 265],
          borderColor: C_RED, backgroundColor: C_RED + '18',
          borderWidth: 2.5, pointRadius: 5, pointHoverRadius: 8,
          pointBackgroundColor: C_RED, tension: 0.3, fill: false, yAxisID: 'y',
        },
        {
          label: 'AKB (per 1.000 KH)',
          data: [38, 35, 32, 29, 28],
          borderColor: C_ORANGE, backgroundColor: C_ORANGE + '18',
          borderWidth: 2.5, pointRadius: 5, pointHoverRadius: 8,
          pointBackgroundColor: C_ORANGE, tension: 0.3, fill: false, yAxisID: 'y2',
        },
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { position: 'top', align: 'start', ...baseLegend(t) },
        tooltip: { ...baseTooltip(t) }
      },
      scales: {
        x: baseAxis(t),
        y: { ...baseAxis(t), position: 'left',
             title: { display: true, text: 'AKI', color: t.textMuted, font: { size: 10 } },
             ticks: { color: t.text, font: { family: FONT_BODY, size: 11 } } },
        y2: { ...baseAxis(t), position: 'right',
              title: { display: true, text: 'AKB', color: t.textMuted, font: { size: 10 } },
              grid: { display: false },
              ticks: { color: t.text, font: { family: FONT_BODY, size: 11 } } },
      }
    }
  });
}

// ============================================================
// 9. ANC K4 PER KABUPATEN — bar (chart-anc-kab)
// ============================================================
function renderChartANCKab() {
  const canvas = getCanvas('chart-anc-kab');
  if (!canvas) return;
  destroyChart('ancKab');
  const t = getTheme();
  // Derive from kabupaten data — use bor as proxy seed, regenerate deterministically
  const kabs = SIKESPA_DATA.kabupaten;
  const ancData = kabs.map((k, i) => {
    // deterministic pseudo-spread: 42-82%
    return Math.min(95, Math.max(38, 42 + ((k.bor * 17 + i * 7) % 40)));
  });
  CHARTS.ancKab = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: kabs.map(k => k.name),
      datasets: [
        { label: 'Cakupan ANC K4 (%)',
          data: ancData,
          backgroundColor: ancData.map(v => v >= 70 ? C_GREEN : v >= 50 ? C_ORANGE : C_RED),
          borderRadius: 4, borderSkipped: false },
        { label: 'Target (80%)', data: kabs.map(() => 80),
          type: 'line', borderColor: C_BLUE, borderWidth: 1.5,
          borderDash: [5, 4], pointRadius: 0, fill: false, order: 0 }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top', align: 'start', ...baseLegend(t),
          labels: { ...baseLegend(t).labels, filter: i => i.datasetIndex === 1 } },
        tooltip: { ...baseTooltip(t),
          callbacks: { label: ctx => ctx.datasetIndex === 0 ? ` ANC K4: ${ctx.parsed.y}%` : null } }
      },
      scales: {
        x: { ...baseAxis(t), grid: { display: false },
             ticks: { color: t.text, font: { family: FONT_BODY, size: 10 }, maxRotation: 35 } },
        y: { ...baseAxis(t), min: 0, max: 100,
             ticks: { color: t.text, font: { family: FONT_BODY, size: 11 }, callback: v => v + '%' } }
      }
    }
  });
}

// ============================================================
// 10. IMUNISASI — horizontal bar (chart-imunisasi)
// ============================================================
function renderChartImunisasi() {
  const canvas = getCanvas('chart-imunisasi');
  if (!canvas) return;
  destroyChart('imunisasi');
  const d = SIKESPA_DATA.imunisasi;
  const t = getTheme();
  CHARTS.imunisasi = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: d.map(i => i.antigen),
      datasets: [
        { label: 'Cakupan (%)', data: d.map(i => i.cakupan),
          backgroundColor: d.map(i => stokColor(i.status)),
          borderRadius: 4, borderSkipped: false, barPercentage: 0.6 },
        { label: 'Target (80%)', data: d.map(() => 80),
          type: 'line', borderColor: C_BLUE, borderWidth: 1.5,
          borderDash: [5, 4], pointRadius: 0, fill: false, order: 0 }
      ]
    },
    options: {
      indexAxis: 'y',
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top', align: 'start', ...baseLegend(t),
          labels: { ...baseLegend(t).labels, filter: i => i.datasetIndex === 1 } },
        tooltip: { ...baseTooltip(t),
          callbacks: { label: ctx => ctx.datasetIndex === 0 ? ` Cakupan: ${ctx.parsed.x}%` : ` Target: ${ctx.parsed.x}%` } }
      },
      scales: {
        x: { ...baseAxis(t), min: 0, max: 100,
             ticks: { color: t.text, font: { family: FONT_BODY, size: 11 }, callback: v => v + '%' } },
        y: { ...baseAxis(t), grid: { display: false },
             ticks: { color: t.text, font: { family: FONT_BODY, size: 11 } } }
      }
    }
  });
}

// ============================================================
// 11. IMUNISASI STATUS — Doughnut (chart-imunisasi-status)
// ============================================================
function renderChartImunisasiStatus() {
  const canvas = getCanvas('chart-imunisasi-status');
  if (!canvas) return;
  destroyChart('imunisasiStatus');
  const d = SIKESPA_DATA.imunisasi;
  const t = getTheme();
  const counts = {
    aman:   d.filter(i => i.status === 'aman').length,
    kurang: d.filter(i => i.status === 'kurang').length,
    kritis: d.filter(i => i.status === 'kritis').length,
  };
  CHARTS.imunisasiStatus = new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels: ['Mencapai Target', 'Kurang', 'Kritis'],
      datasets: [{ data: [counts.aman, counts.kurang, counts.kritis],
        backgroundColor: [C_GREEN, C_ORANGE, C_RED],
        borderColor: t.bg, borderWidth: 3, hoverOffset: 6 }]
    },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: '65%',
      plugins: {
        legend: { position: 'bottom', ...baseLegend(t) },
        tooltip: { ...baseTooltip(t),
          callbacks: { label: ctx => ` ${ctx.label}: ${ctx.parsed} antigen` } }
      }
    }
  });
}

// ============================================================
// 12. GIZI — Grouped Horizontal Bar (chart-gizi)
// ============================================================
function renderChartGizi() {
  const canvas = getCanvas('chart-gizi');
  if (!canvas) return;
  destroyChart('gizi');
  const d = SIKESPA_DATA.gizi;
  const t = getTheme();
  CHARTS.gizi = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: d.map(g => g.kabupaten),
      datasets: [
        { label: 'Stunting (%)', data: d.map(g => g.stunting),
          backgroundColor: C_RED + 'cc', borderRadius: 3, borderSkipped: false },
        { label: 'Wasting (%)', data: d.map(g => g.wasting),
          backgroundColor: C_ORANGE + 'cc', borderRadius: 3, borderSkipped: false },
        { label: 'Underweight (%)', data: d.map(g => g.underweight),
          backgroundColor: C_GOLD + 'cc', borderRadius: 3, borderSkipped: false },
      ]
    },
    options: {
      indexAxis: 'y',
      responsive: true, maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { position: 'top', align: 'start', ...baseLegend(t) },
        tooltip: { ...baseTooltip(t),
          callbacks: { label: ctx => ` ${ctx.dataset.label}: ${ctx.parsed.x}%` } }
      },
      scales: {
        x: { ...baseAxis(t), min: 0, max: 65,
             ticks: { color: t.text, font: { family: FONT_BODY, size: 11 }, callback: v => v + '%' } },
        y: { ...baseAxis(t), grid: { display: false },
             ticks: { color: t.text, font: { family: FONT_BODY, size: 10 } } }
      }
    }
  });
}

// ============================================================
// 13. GIZI DONUT — distribusi status (chart-gizi-donut)
// ============================================================
function renderChartGiziDonut() {
  const canvas = getCanvas('chart-gizi-donut');
  if (!canvas) return;
  destroyChart('giziDonut');
  const d = SIKESPA_DATA.gizi;
  const t = getTheme();
  const counts = {
    critical: d.filter(g => g.status === 'critical').length,
    warning:  d.filter(g => g.status === 'warning').length,
    normal:   d.filter(g => g.status === 'normal').length,
  };
  CHARTS.giziDonut = new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels: ['Kritis (Stunting >40%)', 'Waspada (30-40%)', 'Normal (<30%)'],
      datasets: [{ data: [counts.critical, counts.warning, counts.normal],
        backgroundColor: [C_RED, C_ORANGE, C_GREEN],
        borderColor: t.bg, borderWidth: 3, hoverOffset: 6 }]
    },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: '65%',
      plugins: {
        legend: { position: 'bottom', ...baseLegend(t) },
        tooltip: { ...baseTooltip(t),
          callbacks: { label: ctx => ` ${ctx.label}: ${ctx.parsed} kab` } }
      }
    }
  });
}

// ============================================================
// 14. NAKES BAR — stacked bar per kab (chart-nakes)
// ============================================================
function renderChartNakes() {
  const canvas = getCanvas('chart-nakes');
  if (!canvas) return;
  destroyChart('nakes');
  const d = SIKESPA_DATA.nakes;
  const t = getTheme();
  CHARTS.nakes = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: d.map(n => n.kabupaten),
      datasets: [
        { label: 'Dokter',  data: d.map(n => n.dokter),
          backgroundColor: C_BLUE + 'dd', borderRadius: 2, stack: 'nakes' },
        { label: 'Bidan',   data: d.map(n => n.bidan),
          backgroundColor: C_TEAL + 'dd', borderRadius: 2, stack: 'nakes' },
        { label: 'Perawat', data: d.map(n => n.perawat),
          backgroundColor: C_PURPLE + 'dd', borderRadius: 2, stack: 'nakes' },
        { label: 'Kebutuhan', data: d.map(n => n.kebutuhan),
          type: 'line', borderColor: C_RED, borderWidth: 1.5,
          borderDash: [5, 4], pointRadius: 3, pointBackgroundColor: C_RED,
          fill: false, order: 0 }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { position: 'top', align: 'start', ...baseLegend(t) },
        tooltip: { ...baseTooltip(t),
          callbacks: { label: ctx => ` ${ctx.dataset.label}: ${ctx.parsed.y.toLocaleString('id-ID')}` } }
      },
      scales: {
        x: { ...baseAxis(t), grid: { display: false }, stacked: true,
             ticks: { color: t.text, font: { family: FONT_BODY, size: 10 }, maxRotation: 35 } },
        y: { ...baseAxis(t), stacked: false,
             ticks: { color: t.text, font: { family: FONT_BODY, size: 11 },
                      callback: v => v.toLocaleString('id-ID') } }
      }
    }
  });
}

// ============================================================
// 15. NAKES KOMPOSISI — Donut (chart-nakes-komposisi)
// ============================================================
function renderChartNakesKomposisi() {
  const canvas = getCanvas('chart-nakes-komposisi');
  if (!canvas) return;
  destroyChart('nakesKomposisi');
  const d = SIKESPA_DATA.nakes;
  const t = getTheme();
  const total = {
    dokter:  d.reduce((s, n) => s + n.dokter, 0),
    bidan:   d.reduce((s, n) => s + n.bidan, 0),
    perawat: d.reduce((s, n) => s + n.perawat, 0),
  };
  CHARTS.nakesKomposisi = new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels: [
        `Dokter (${total.dokter.toLocaleString('id-ID')})`,
        `Bidan (${total.bidan.toLocaleString('id-ID')})`,
        `Perawat (${total.perawat.toLocaleString('id-ID')})`,
      ],
      datasets: [{ data: [total.dokter, total.bidan, total.perawat],
        backgroundColor: [C_BLUE, C_TEAL, C_PURPLE],
        borderColor: t.bg, borderWidth: 3, hoverOffset: 6 }]
    },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: '65%',
      plugins: {
        legend: { position: 'bottom', ...baseLegend(t) },
        tooltip: { ...baseTooltip(t),
          callbacks: { label: ctx => ` ${ctx.label} orang` } }
      }
    }
  });
}

// ============================================================
// 16. LAPORAN RADAR — radar per indikator (chart-laporan-radar)
// ============================================================
function renderChartLaporanRadar() {
  const canvas = getCanvas('chart-laporan-radar');
  if (!canvas) return;
  destroyChart('laporanRadar');
  const t = getTheme();
  // Top 5 kabupaten by total kasus
  const top5 = [...SIKESPA_DATA.surveilans]
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);
  // Normalize each metric 0-100
  const maxBor  = Math.max(...SIKESPA_DATA.kabupaten.map(k => k.bor));
  const maxKasus = Math.max(...SIKESPA_DATA.surveilans.map(r => r.total));
  const colors = [C_BLUE, C_TEAL, C_ORANGE, C_PURPLE, C_PINK];

  const datasets = top5.map((row, i) => {
    const kab = SIKESPA_DATA.kabupaten.find(k => k.name === row.kabupaten);
    const bor     = kab ? kab.bor : 50;
    const kasus   = maxKasus > 0 ? Math.round((row.total / maxKasus) * 100) : 0;
    const nakesRow = SIKESPA_DATA.nakes.find(n => n.kabupaten === row.kabupaten);
    const nakesPct = nakesRow ? Math.round((nakesRow.nakes_total / nakesRow.kebutuhan) * 100) : 50;
    const giziRow  = SIKESPA_DATA.gizi.find(g => g.kabupaten === row.kabupaten);
    const giziScore = giziRow ? Math.max(0, 100 - giziRow.stunting * 2) : 50;
    // ANC proxy
    const ancScore = Math.min(100, Math.max(30, 42 + ((bor * 17 + i * 7) % 40)));
    return {
      label: row.kabupaten,
      data: [kasus, bor, Math.min(100, nakesPct), giziScore, ancScore],
      backgroundColor: colors[i] + '22',
      borderColor: colors[i],
      borderWidth: 2,
      pointBackgroundColor: colors[i],
      pointRadius: 4,
      pointHoverRadius: 7,
    };
  });

  CHARTS.laporanRadar = new Chart(canvas, {
    type: 'radar',
    data: {
      labels: ['Beban Kasus', 'BOR Faskes', 'Pemenuhan Nakes', 'Skor Gizi', 'Cakupan ANC'],
      datasets,
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom', ...baseLegend(t) },
        tooltip: { ...baseTooltip(t),
          callbacks: { label: ctx => ` ${ctx.dataset.label}: ${ctx.parsed.r}` } }
      },
      scales: {
        r: {
          min: 0, max: 100,
          ticks: { stepSize: 25, color: t.textMuted,
            font: { family: FONT_BODY, size: 10 }, backdropColor: 'transparent' },
          grid: { color: t.grid },
          angleLines: { color: t.grid },
          pointLabels: { color: t.text, font: { family: FONT_BODY, size: 11 } }
        }
      }
    }
  });
}

// ============================================================
// 17. KIA PROGRESS — HTML bars (no canvas)
// ============================================================
function renderKIAProgress() {
  const wrap = document.getElementById('kia-progress');
  if (!wrap) return;
  const kia = SIKESPA_DATA.kia;
  const items = [
    { key: 'cakupanAnc',      higherIsBetter: true  },
    { key: 'cakupanImun',     higherIsBetter: true  },
    { key: 'persalinanNakes', higherIsBetter: true  },
    { key: 'stunting',        higherIsBetter: false },
    { key: 'akiProvinsi',     higherIsBetter: false },
    { key: 'akbProvinsi',     higherIsBetter: false },
  ];
  wrap.innerHTML = items.map(({ key, higherIsBetter }) => {
    const item  = kia[key];
    if (!item) return '';
    const pct   = Math.min(100, Math.round((item.value / item.target) * 100));
    const ok    = higherIsBetter ? item.value >= item.target : item.value <= item.target;
    const warn  = higherIsBetter ? pct >= 75 : pct <= 130;
    const color = ok ? C_GREEN : warn ? C_ORANGE : C_RED;
    const fill  = higherIsBetter ? Math.min(100, pct)
                                 : Math.min(100, Math.round((item.target / Math.max(item.value, 0.1)) * 100));
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

// ============================================================
// INIT — called after login
// ============================================================
function initCharts() {
  renderChartTren();
  renderChartBOR();
  renderChartStatusKab();
  // Surveilans page
  renderChartTrenSurveilans();
  renderChartDistribusiPenyakit();
  // Fasilitas page
  renderChartBORDetail();
  renderChartStatusKabDetail();
  // KIA page
  renderChartKIATren();
  renderChartANCKab();
  renderKIAProgress();
  // Imunisasi page
  renderChartImunisasi();
  renderChartImunisasiStatus();
  // Gizi page
  renderChartGizi();
  renderChartGiziDonut();
  // Nakes page
  renderChartNakes();
  renderChartNakesKomposisi();
  // Laporan page
  renderChartLaporanRadar();
}

// ============================================================
// RE-RENDER ALL — called on theme toggle
// ============================================================
function reRenderAllCharts() {
  setTimeout(() => {
    renderChartTren();
    renderChartBOR();
    renderChartStatusKab();
    renderChartTrenSurveilans();
    renderChartDistribusiPenyakit();
    renderChartBORDetail();
    renderChartStatusKabDetail();
    renderChartKIATren();
    renderChartANCKab();
    renderKIAProgress();
    renderChartImunisasi();
    renderChartImunisasiStatus();
    renderChartGizi();
    renderChartGiziDonut();
    renderChartNakes();
    renderChartNakesKomposisi();
    renderChartLaporanRadar();
  }, 60);
}

window.initCharts        = initCharts;
window.reRenderAllCharts = reRenderAllCharts;
