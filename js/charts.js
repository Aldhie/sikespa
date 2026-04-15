// ============================================================
// CHARTS.JS — Chart.js visualizations
// Depends on: data.js, Chart.js CDN
// ============================================================

let chartTren = null;
let chartBOR  = null;

// ---- SHARED CHART DEFAULTS ----
function getChartDefaults() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  return {
    textColor:   isDark ? '#7a9ab8' : '#5a6a7e',
    gridColor:   isDark ? 'rgba(255,255,255,0.05)' : 'rgba(15,30,60,0.06)',
    bgColor:     isDark ? '#0f1f3a' : '#ffffff',
    borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(15,30,60,0.10)',
  };
}

// ---- TREN PENYAKIT (Line Chart) ----
function renderChartTren() {
  const canvas = document.getElementById('chart-tren');
  if (!canvas) return;

  if (chartTren) { chartTren.destroy(); chartTren = null; }

  const d = SIKESPA_DATA.trenPenyakit;
  const c = getChartDefaults();

  chartTren = new Chart(canvas, {
    type: 'line',
    data: {
      labels: d.labels,
      datasets: d.datasets.map(ds => ({
        label: ds.label,
        data: ds.data,
        borderColor: ds.color,
        backgroundColor: ds.color + '18',
        borderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 6,
        pointBackgroundColor: ds.color,
        tension: 0.4,
        fill: false,
      }))
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          position: 'top',
          align: 'start',
          labels: {
            color: c.textColor,
            font: { family: 'Inter', size: 11 },
            boxWidth: 12, boxHeight: 12,
            padding: 16,
            usePointStyle: true, pointStyle: 'circle',
          }
        },
        tooltip: {
          backgroundColor: c.bgColor,
          borderColor: c.borderColor,
          borderWidth: 1,
          titleColor: c.textColor,
          bodyColor: c.textColor,
          padding: 12,
          titleFont: { family: 'Plus Jakarta Sans', weight: '600', size: 12 },
          bodyFont: { family: 'Inter', size: 11 },
          callbacks: {
            label: ctx => ` ${ctx.dataset.label}: ${ctx.parsed.y.toLocaleString('id-ID')} kasus`
          }
        }
      },
      scales: {
        x: {
          grid: { color: c.gridColor, drawBorder: false },
          ticks: { color: c.textColor, font: { family: 'Inter', size: 11 } },
          border: { display: false },
        },
        y: {
          grid: { color: c.gridColor, drawBorder: false },
          ticks: {
            color: c.textColor,
            font: { family: 'Inter', size: 11 },
            callback: v => v.toLocaleString('id-ID'),
          },
          border: { display: false },
          beginAtZero: true,
        }
      }
    }
  });
}

// ---- BOR PER KABUPATEN (Horizontal Bar Chart) ----
function renderChartBOR() {
  const canvas = document.getElementById('chart-bor');
  if (!canvas) return;

  if (chartBOR) { chartBOR.destroy(); chartBOR = null; }

  const d = SIKESPA_DATA.borData;
  const c = getChartDefaults();
  const threshold = d.threshold;

  // Color bars: red if >= threshold, orange if >= 70, green otherwise
  const barColors = d.values.map(v =>
    v >= threshold ? '#c0392b' : v >= 70 ? '#b85c00' : '#2d7d46'
  );

  chartBOR = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: d.labels,
      datasets: [
        {
          label: 'BOR (%)',
          data: d.values,
          backgroundColor: barColors,
          borderRadius: 4,
          borderSkipped: false,
        },
        // Threshold reference line via dataset trick
        {
          label: 'Ambang Kritis (85%)',
          data: d.labels.map(() => threshold),
          type: 'line',
          borderColor: '#c0392b',
          borderWidth: 1.5,
          borderDash: [4, 4],
          pointRadius: 0,
          fill: false,
          order: 0,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          align: 'start',
          labels: {
            color: c.textColor,
            font: { family: 'Inter', size: 11 },
            boxWidth: 12, boxHeight: 12,
            padding: 16,
            filter: item => item.datasetIndex === 1, // only show threshold in legend
          }
        },
        tooltip: {
          backgroundColor: c.bgColor,
          borderColor: c.borderColor,
          borderWidth: 1,
          titleColor: c.textColor,
          bodyColor: c.textColor,
          padding: 12,
          titleFont: { family: 'Plus Jakarta Sans', weight: '600', size: 12 },
          bodyFont: { family: 'Inter', size: 11 },
          callbacks: {
            label: ctx => ctx.datasetIndex === 0
              ? ` BOR: ${ctx.parsed.y}%`
              : ` Ambang kritis: ${ctx.parsed.y}%`
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            color: c.textColor,
            font: { family: 'Inter', size: 10 },
            maxRotation: 30,
          },
          border: { display: false },
        },
        y: {
          grid: { color: c.gridColor, drawBorder: false },
          ticks: {
            color: c.textColor,
            font: { family: 'Inter', size: 11 },
            callback: v => v + '%',
          },
          border: { display: false },
          min: 0, max: 100,
        }
      }
    }
  });
}

// ---- DONUT CHART — Status Kabupaten ----
let chartStatusKab = null;
function renderChartStatusKab() {
  const canvas = document.getElementById('chart-status-kab');
  if (!canvas) return;

  if (chartStatusKab) { chartStatusKab.destroy(); chartStatusKab = null; }

  const kabs = SIKESPA_DATA.kabupaten;
  const counts = {
    normal:   kabs.filter(k => k.status === 'normal').length,
    warning:  kabs.filter(k => k.status === 'warning').length,
    critical: kabs.filter(k => k.status === 'critical').length,
  };
  const c = getChartDefaults();

  chartStatusKab = new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels: ['Normal', 'Waspada', 'Kritis'],
      datasets: [{
        data: [counts.normal, counts.warning, counts.critical],
        backgroundColor: ['#2d7d46', '#b85c00', '#c0392b'],
        borderColor: c.bgColor,
        borderWidth: 3,
        hoverOffset: 6,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '68%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: c.textColor,
            font: { family: 'Inter', size: 11 },
            padding: 16,
            usePointStyle: true, pointStyle: 'circle',
          }
        },
        tooltip: {
          backgroundColor: c.bgColor,
          borderColor: c.borderColor,
          borderWidth: 1,
          titleColor: c.textColor,
          bodyColor: c.textColor,
          padding: 12,
          callbacks: {
            label: ctx => ` ${ctx.label}: ${ctx.parsed} kabupaten`
          }
        }
      }
    }
  });
}

// ---- INIT ALL CHARTS ----
function initCharts() {
  renderChartTren();
  renderChartBOR();
  renderChartStatusKab();
}

// Re-render on theme change
const _origThemeToggle = window.onThemeChange;
function onThemeChange() {
  setTimeout(() => {
    renderChartTren();
    renderChartBOR();
    renderChartStatusKab();
  }, 50);
}

// Expose globally
window.initCharts    = initCharts;
window.onThemeChange = onThemeChange;
