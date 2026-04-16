// ============================================================
// CHARTS.JS — Chart.js visualizations
// Depends on: data.js, Chart.js CDN
// ============================================================

// ---- CHART REGISTRY ----
const CHARTS = {};

// ---- FONT CONSTANTS ----
const FONT_BODY    = "'Inter', sans-serif";
const FONT_DISPLAY = "'Plus Jakarta Sans', sans-serif";

// ---- SHARED CHART DEFAULTS ----
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
    bodyFont:  { family: FONT_BODY,    size: 11 },
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

// ---- COLOR HELPERS ----
const C_RED    = '#c0392b';
const C_ORANGE = '#b85c00';
const C_GREEN  = '#2d7d46';
const C_BLUE   = '#1a6b9e';
const C_PURPLE = '#6b3fa0';
const C_GOLD   = '#9a7b00';

function borColor(v)    { return v >= 85 ? C_RED : v >= 70 ? C_ORANGE : C_GREEN; }
function stokColor(s)   { return s === 'kritis' ? C_RED : s === 'kurang' ? C_ORANGE : C_GREEN; }
function gapColor(gap)  { return gap > 20 ? C_RED : gap > 5 ? C_ORANGE : C_GREEN; }

// ============================================================
// 1. TREN PENYAKIT — Line Chart
// ============================================================
function renderChartTren() {
  const canvas = document.getElementById('chart-tren');
  if (!canvas) return;
  destroyChart('tren');
  const d = SIKESPA_DATA.trenPenyakit;
  const t = getTheme();

  CHARTS.tren = new Chart(canvas, {
    type: 'line',
    data: {
      labels: d.labels,
      datasets: d.datasets.map(ds => ({
        label:              ds.label,
        data:               ds.data,
        borderColor:        ds.color,
        backgroundColor:    ds.color + '18',
        borderWidth:        2,
        pointRadius:        3,
        pointHoverRadius:   6,
        pointBackgroundColor: ds.color,
        tension:            0.4,
        fill:               false,
      }))
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend:  { position: 'top', align: 'start', ...baseLegend(t) },
        tooltip: {
          ...baseTooltip(t),
          callbacks: {
            label: ctx => ` ${ctx.dataset.label}: ${ctx.parsed.y.toLocaleString('id-ID')} kasus`
          }
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
// 2. BOR PER KABUPATEN — Bar + Threshold Line
// ============================================================
function renderChartBOR() {
  const canvas = document.getElementById('chart-bor');
  if (!canvas) return;
  destroyChart('bor');
  const d = SIKESPA_DATA.borData;
  const t = getTheme();

  CHARTS.bor = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: d.labels,
      datasets: [
        {
          label:           'BOR (%)',
          data:            d.values,
          backgroundColor: d.values.map(borColor),
          borderRadius:    4,
          borderSkipped:   false,
        },
        {
          label:       'Ambang Kritis (85%)',
          data:        d.labels.map(() => d.threshold),
          type:        'line',
          borderColor: C_RED,
          borderWidth: 1.5,
          borderDash:  [5, 4],
          pointRadius: 0,
          fill:        false,
          order:       0,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top', align: 'start',
          ...baseLegend(t),
          labels: {
            ...baseLegend(t).labels,
            filter: item => item.datasetIndex === 1,
          }
        },
        tooltip: {
          ...baseTooltip(t),
          callbacks: {
            label: ctx => ctx.datasetIndex === 0
              ? ` BOR: ${ctx.parsed.y}%`
              : ` Ambang kritis: ${ctx.parsed.y}%`
          }
        }
      },
      scales: {
        x: { ...baseAxis(t), grid: { display: false },
             ticks: { color: t.text, font: { family: FONT_BODY, size: 10 }, maxRotation: 30 } },
        y: { ...baseAxis(t), min: 0, max: 100,
             ticks: { color: t.text, font: { family: FONT_BODY, size: 11 },
                      callback: v => v + '%' } }
      }
    }
  });
}

// ============================================================
// 3. STATUS KABUPATEN — Doughnut
// ============================================================
function renderChartStatusKab() {
  const canvas = document.getElementById('chart-status-kab');
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
      labels:   ['Normal', 'Waspada', 'Kritis'],
      datasets: [{
        data:            [counts.normal, counts.warning, counts.critical],
        backgroundColor: [C_GREEN, C_ORANGE, C_RED],
        borderColor:     t.bg,
        borderWidth:     3,
        hoverOffset:     6,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '68%',
      plugins: {
        legend:  { position: 'bottom', ...baseLegend(t) },
        tooltip: {
          ...baseTooltip(t),
          callbacks: { label: ctx => ` ${ctx.label}: ${ctx.parsed} kabupaten` }
        }
      }
    }
  });
}

// ============================================================
// 4. IMUNISASI PER ANTIGEN — Horizontal Bar
// ============================================================
function renderChartImunisasi() {
  const canvas = document.getElementById('chart-imunisasi');
  if (!canvas) return;
  destroyChart('imunisasi');
  const d = SIKESPA_DATA.imunisasi;
  const t = getTheme();

  CHARTS.imunisasi = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: d.map(i => i.antigen),
      datasets: [
        {
          label:           'Cakupan (%)',
          data:            d.map(i => i.cakupan),
          backgroundColor: d.map(i => stokColor(i.status)),
          borderRadius:    4,
          borderSkipped:   false,
          barPercentage:   0.6,
        },
        {
          label:       'Target (80%)',
          data:        d.map(() => 80),
          type:        'line',
          borderColor: C_BLUE,
          borderWidth: 1.5,
          borderDash:  [5, 4],
          pointRadius: 0,
          fill:        false,
          order:       0,
        }
      ]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top', align: 'start',
          ...baseLegend(t),
          labels: { ...baseLegend(t).labels, filter: item => item.datasetIndex === 1 }
        },
        tooltip: {
          ...baseTooltip(t),
          callbacks: {
            label: ctx => ctx.datasetIndex === 0
              ? ` Cakupan: ${ctx.parsed.x}%`
              : ` Target: ${ctx.parsed.x}%`
          }
        }
      },
      scales: {
        x: { ...baseAxis(t), min: 0, max: 100,
             ticks: { color: t.text, font: { family: FONT_BODY, size: 11 },
                      callback: v => v + '%' } },
        y: { ...baseAxis(t), grid: { display: false },
             ticks: { color: t.text, font: { family: FONT_BODY, size: 11 } } }
      }
    }
  });
}

// ============================================================
// 5. GIZI PER KABUPATEN — Grouped Horizontal Bar
// ============================================================
function renderChartGizi() {
  const canvas = document.getElementById('chart-gizi');
  if (!canvas) return;
  destroyChart('gizi');
  const d = SIKESPA_DATA.gizi;
  const t = getTheme();

  CHARTS.gizi = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: d.map(g => g.kabupaten),
      datasets: [
        {
          label:           'Stunting (%)',
          data:            d.map(g => g.stunting),
          backgroundColor: C_RED + 'cc',
          borderRadius:    3,
          borderSkipped:   false,
        },
        {
          label:           'Wasting (%)',
          data:            d.map(g => g.wasting),
          backgroundColor: C_ORANGE + 'cc',
          borderRadius:    3,
          borderSkipped:   false,
        },
        {
          label:           'Underweight (%)',
          data:            d.map(g => g.underweight),
          backgroundColor: C_GOLD + 'cc',
          borderRadius:    3,
          borderSkipped:   false,
        },
      ]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { position: 'top', align: 'start', ...baseLegend(t) },
        tooltip: {
          ...baseTooltip(t),
          callbacks: {
            label: ctx => ` ${ctx.dataset.label}: ${ctx.parsed.x}%`
          }
        }
      },
      scales: {
        x: { ...baseAxis(t), min: 0, max: 60,
             ticks: { color: t.text, font: { family: FONT_BODY, size: 11 },
                      callback: v => v + '%' } },
        y: { ...baseAxis(t), grid: { display: false },
             ticks: { color: t.text, font: { family: FONT_BODY, size: 10 } } }
      }
    }
  });
}

// ============================================================
// 6. NAKES — Radar Chart (ketersediaan vs kebutuhan)
// ============================================================
function renderChartNakes() {
  const canvas = document.getElementById('chart-nakes');
  if (!canvas) return;
  destroyChart('nakes');
  const d = SIKESPA_DATA.nakes;
  const t = getTheme();

  // persen terpenuhi per kabupaten
  const persen = d.map(n => Math.round((n.nakes_total / n.kebutuhan) * 100));

  CHARTS.nakes = new Chart(canvas, {
    type: 'radar',
    data: {
      labels: d.map(n => n.kabupaten),
      datasets: [
        {
          label:           'Pemenuhan Nakes (%)',
          data:            persen,
          backgroundColor: C_BLUE + '22',
          borderColor:     C_BLUE,
          borderWidth:     2,
          pointBackgroundColor: persen.map(p => p >= 80 ? C_GREEN : p >= 50 ? C_ORANGE : C_RED),
          pointRadius:     5,
          pointHoverRadius: 8,
        },
        {
          label:           'Target 100%',
          data:            d.map(() => 100),
          backgroundColor: 'transparent',
          borderColor:     t.grid,
          borderWidth:     1,
          borderDash:      [4, 4],
          pointRadius:     0,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top', align: 'start', ...baseLegend(t) },
        tooltip: {
          ...baseTooltip(t),
          callbacks: {
            label: ctx => ctx.datasetIndex === 0
              ? ` Pemenuhan: ${ctx.parsed.r}%`
              : null
          }
        }
      },
      scales: {
        r: {
          min: 0, max: 110,
          ticks: {
            stepSize: 20,
            color:    t.textMuted,
            font:     { family: FONT_BODY, size: 10 },
            backdropColor: 'transparent',
            callback: v => v + '%',
          },
          grid:        { color: t.grid },
          angleLines:  { color: t.grid },
          pointLabels: {
            color: t.text,
            font:  { family: FONT_BODY, size: 10 },
          }
        }
      }
    }
  });
}

// ============================================================
// 7. KIA PROGRESS — Horizontal Progress Bars (Canvas-free)
// ============================================================
function renderKIAProgress() {
  const wrap = document.getElementById('kia-progress');
  if (!wrap) return;

  const kia = SIKESPA_DATA.kia;
  const items = [
    { key: 'cakupanAnc',       higherIsBetter: true  },
    { key: 'cakupanImun',      higherIsBetter: true  },
    { key: 'persalinanNakes',  higherIsBetter: true  },
    { key: 'stunting',         higherIsBetter: false },
    { key: 'akiProvinsi',      higherIsBetter: false },
    { key: 'akbProvinsi',      higherIsBetter: false },
  ];

  wrap.innerHTML = items.map(({ key, higherIsBetter }) => {
    const item  = kia[key];
    const pct   = Math.min(100, Math.round((item.value / item.target) * 100));
    const good  = higherIsBetter ? pct >= 100 : pct <= 100;
    const warn  = higherIsBetter ? pct >= 75  : pct <= 130;
    const color = good ? C_GREEN : warn ? C_ORANGE : C_RED;
    const fillPct = higherIsBetter ? Math.min(100, pct) : Math.min(100, Math.round((item.target / item.value) * 100));
    const label = `${item.value}${item.unit} / target ${item.target}${item.unit}`;

    return `
      <div class="kia-row" style="margin-bottom:var(--space-4)">
        <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:var(--space-1)">
          <span style="font-size:var(--text-sm);font-weight:600;color:var(--color-text)">${item.label}</span>
          <span style="font-size:var(--text-xs);color:var(--color-text-muted);font-variant-numeric:tabular-nums">${label}</span>
        </div>
        <div style="height:8px;background:var(--color-surface-offset);border-radius:var(--radius-full);overflow:hidden">
          <div style="height:100%;width:${fillPct}%;background:${color};border-radius:var(--radius-full);transition:width 0.8s ease"></div>
        </div>
      </div>`;
  }).join('');
}

// ============================================================
// INIT & RE-RENDER
// ============================================================
function initCharts() {
  renderChartTren();
  renderChartBOR();
  renderChartStatusKab();
  renderChartImunisasi();
  renderChartGizi();
  renderChartNakes();
  renderKIAProgress();
}

function reRenderAllCharts() {
  setTimeout(() => {
    renderChartTren();
    renderChartBOR();
    renderChartStatusKab();
    renderChartImunisasi();
    renderChartGizi();
    renderChartNakes();
    renderKIAProgress();
  }, 60);
}

window.initCharts       = initCharts;
window.reRenderAllCharts = reRenderAllCharts;
