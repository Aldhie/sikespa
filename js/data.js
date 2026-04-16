// ============================================================
// DATA SIMULASI — SiKespa Papua
// Semua data adalah simulasi untuk keperluan prototype
// ============================================================

const SIKESPA_DATA = {

  // ---- META ----
  updated: 'Kamis, 16 April 2026 · 06.00 WIT',
  user: {
    name: 'dr. Yusuf Hamdan, MPH',
    role: 'Kepala Dinkes Provinsi Papua',
    initials: 'YH'
  },

  // ---- KABUPATEN (29 kab/kota) ----
  kabupaten: [
    { id: 'jayapura-kota',      name: 'Kota Jayapura',       rs: 5, puskesmas: 24, status: 'normal',   bor: 72 },
    { id: 'jayapura-kab',       name: 'Kab. Jayapura',       rs: 2, puskesmas: 18, status: 'normal',   bor: 61 },
    { id: 'merauke',            name: 'Merauke',             rs: 3, puskesmas: 22, status: 'warning',  bor: 84 },
    { id: 'mimika',             name: 'Mimika',              rs: 3, puskesmas: 16, status: 'warning',  bor: 88 },
    { id: 'biak-numfor',        name: 'Biak Numfor',         rs: 2, puskesmas: 14, status: 'normal',   bor: 58 },
    { id: 'nabire',             name: 'Nabire',              rs: 2, puskesmas: 12, status: 'critical', bor: 93 },
    { id: 'pegunungan-bintang', name: 'Pegunungan Bintang',  rs: 1, puskesmas: 8,  status: 'critical', bor: 96 },
    { id: 'jayawijaya',         name: 'Jayawijaya',          rs: 2, puskesmas: 17, status: 'warning',  bor: 81 },
    { id: 'sarmi',              name: 'Sarmi',               rs: 1, puskesmas: 9,  status: 'normal',   bor: 44 },
    { id: 'keerom',             name: 'Keerom',              rs: 1, puskesmas: 10, status: 'normal',   bor: 52 },
    { id: 'waropen',            name: 'Waropen',             rs: 1, puskesmas: 7,  status: 'normal',   bor: 48 },
    { id: 'supiori',            name: 'Supiori',             rs: 1, puskesmas: 5,  status: 'warning',  bor: 79 },
    { id: 'mamberamo-raya',     name: 'Mamberamo Raya',      rs: 1, puskesmas: 6,  status: 'critical', bor: 91 },
    { id: 'yalimo',             name: 'Yalimo',              rs: 1, puskesmas: 7,  status: 'warning',  bor: 77 },
    { id: 'lanny-jaya',         name: 'Lanny Jaya',          rs: 1, puskesmas: 9,  status: 'warning',  bor: 82 },
    { id: 'asmat',              name: 'Asmat',               rs: 1, puskesmas: 10, status: 'critical', bor: 94 },
    { id: 'mappi',              name: 'Mappi',               rs: 1, puskesmas: 8,  status: 'warning',  bor: 76 },
    { id: 'boven-digoel',       name: 'Boven Digoel',        rs: 1, puskesmas: 9,  status: 'normal',   bor: 55 },
    { id: 'intan-jaya',         name: 'Intan Jaya',          rs: 1, puskesmas: 6,  status: 'critical', bor: 97 },
    { id: 'puncak-jaya',        name: 'Puncak Jaya',         rs: 1, puskesmas: 8,  status: 'critical', bor: 95 },
    { id: 'tolikara',           name: 'Tolikara',            rs: 1, puskesmas: 9,  status: 'warning',  bor: 80 },
    { id: 'puncak',             name: 'Puncak',              rs: 1, puskesmas: 7,  status: 'warning',  bor: 83 },
    { id: 'nduga',              name: 'Nduga',               rs: 1, puskesmas: 5,  status: 'critical', bor: 90 },
    { id: 'yahukimo',           name: 'Yahukimo',            rs: 1, puskesmas: 12, status: 'warning',  bor: 78 },
    { id: 'dogiyai',            name: 'Dogiyai',             rs: 1, puskesmas: 8,  status: 'normal',   bor: 62 },
    { id: 'deiyai',             name: 'Deiyai',              rs: 1, puskesmas: 6,  status: 'normal',   bor: 57 },
    { id: 'paniai',             name: 'Paniai',              rs: 1, puskesmas: 10, status: 'warning',  bor: 75 },
    { id: 'mamberamo-tengah',   name: 'Mamberamo Tengah',    rs: 1, puskesmas: 5,  status: 'warning',  bor: 74 },
    { id: 'kepulauan-yapen',    name: 'Kepulauan Yapen',     rs: 1, puskesmas: 11, status: 'normal',   bor: 66 },
  ],

  // ---- KPI PROVINSI ----
  kpi: [
    { id: 'kasus-baru',    icon: '🦠', color: 'danger',  value: '1.847', trend: '▲ 12%', trendDir: 'up',      label: 'Kasus Baru Minggu Ini',    sub: 'vs 1.648 minggu lalu',        page: 'surveilans' },
    { id: 'outbreak',      icon: '🚨', color: 'danger',  value: '4',     trend: '▲ 1',   trendDir: 'up',      label: 'Outbreak Aktif',            sub: 'Malaria & DBD',               page: 'surveilans' },
    { id: 'bor-kritis',    icon: '🏥', color: 'warning', value: '6',     trend: '▲ 2',   trendDir: 'up',      label: 'Kab. BOR Kritis (>85%)',    sub: 'Perlu tindakan segera',       page: 'fasilitas' },
    { id: 'obat-kritis',   icon: '💊', color: 'warning', value: '9',     trend: '▼ 3',   trendDir: 'down',    label: 'Item Obat Hampir Habis',    sub: 'Stok < 7 hari',              page: 'obat' },
    { id: 'imunisasi',     icon: '💉', color: 'info',    value: '68%',   trend: '▲ 3%',  trendDir: 'good-up', label: 'Cakupan Imunisasi',        sub: 'Target nasional: 80%',        page: 'imunisasi' },
    { id: 'aki',           icon: '👶', color: 'success', value: '312',   trend: '▼ 8%',  trendDir: 'down',    label: 'AKI per 100.000 Lahir',     sub: 'Turun dari 339 tahun lalu',   page: 'kia' },
    { id: 'rujukan',       icon: '🚑', color: 'primary', value: '47',    trend: '▲ 5',   trendDir: 'up',      label: 'Rujukan Aktif Hari Ini',    sub: '12 menunggu konfirmasi',      page: 'rujukan' },
    { id: 'stunting',      icon: '🥦', color: 'gold',    value: '34.2%', trend: '▼ 1.1%', trendDir: 'down',    label: 'Prevalensi Stunting',      sub: 'Target 2026: 25%',            page: 'gizi' },
  ],

  // ---- ALERT FEED ----
  alerts: [
    { level: 'critical', title: 'OUTBREAK MALARIA — Pegunungan Bintang',  desc: 'Lonjakan 156% dalam 7 hari. 89 kasus konfirmasi, 3 kematian. Stok ACT tersisa 4 hari.',      time: '18 menit lalu',  kabupaten: 'Peg. Bintang' },
    { level: 'critical', title: 'BOR 97% — RS Intan Jaya',                desc: 'Kapasitas hampir penuh. 2 pasien kritis menunggu rujukan ke Jayapura.',                        time: '42 menit lalu',  kabupaten: 'Intan Jaya'   },
    { level: 'critical', title: 'GIZI BURUK — Nduga',                     desc: '14 balita gizi buruk dilaporkan bulan ini. Akses ke 3 kampung terisolir pasca longsor.',      time: '1 jam lalu',     kabupaten: 'Nduga'        },
    { level: 'warning',  title: 'Stok OAT TB Hampir Habis — Mimika',      desc: 'Sisa stok untuk 6 hari. 34 pasien TB aktif terancam putus pengobatan.',                       time: '1 jam lalu',     kabupaten: 'Mimika'       },
    { level: 'warning',  title: 'Kasus DBD Meningkat — Merauke',          desc: 'Kenaikan 43% dibanding minggu lalu. 22 kasus baru, 1 kematian anak.',                         time: '2 jam lalu',     kabupaten: 'Merauke'      },
    { level: 'warning',  title: 'Nakes Tidak Hadir — Mamberamo Raya',     desc: '3 dari 6 Puskesmas tidak ada dokter minggu ini karena cuaca ekstrem.',                        time: '3 jam lalu',     kabupaten: 'Mamberamo'    },
    { level: 'info',     title: 'Distribusi Vaksin Polio Selesai',           desc: 'Pengiriman vaksin polio ke 8 kabupaten telah terkonfirmasi diterima.',                        time: '5 jam lalu',     kabupaten: 'Provinsi'     },
    { level: 'success',  title: 'Target ANC Tercapai — Nabire',            desc: 'Cakupan kunjungan ibu hamil K4 mencapai 87%, melampaui target 80%.',                          time: '8 jam lalu',     kabupaten: 'Nabire'       },
  ],

  // ---- TREN PENYAKIT (12 minggu terakhir) ----
  trenPenyakit: {
    labels: ['M-12','M-11','M-10','M-9','M-8','M-7','M-6','M-5','M-4','M-3','M-2','M-1'],
    datasets: [
      { label: 'Malaria',   data: [420,398,445,512,489,523,498,541,567,610,643,712], color: '#c0392b' },
      { label: 'TBC',       data: [180,175,182,178,190,185,188,192,195,198,201,204], color: '#e67e22' },
      { label: 'DBD',       data: [45,52,38,67,89,102,78,93,115,128,142,167],        color: '#8e44ad' },
      { label: 'Diare',     data: [210,224,198,231,245,218,207,239,252,228,241,258], color: '#2980b9' },
      { label: 'Pneumonia', data: [88,92,85,97,103,91,88,95,101,108,112,119],        color: '#27ae60' },
    ]
  },

  // ---- BOR PER KABUPATEN (top 10 tertinggi) ----
  borData: {
    labels: ['Intan Jaya','Peg. Bintang','Punc. Jaya','Asmat','Nabire','Mamberamo','Nduga','Mimika','Merauke','Puncak'],
    values: [97, 96, 95, 94, 93, 91, 90, 88, 84, 83],
    threshold: 85,
  },

  // ---- STATUS KABUPATEN (untuk donut chart) ----
  statusKabupaten: {
    normal:   { count: 9,  label: 'Normal' },
    warning:  { count: 12, label: 'Perhatian' },
    critical: { count: 8,  label: 'Kritis' },
  },

  // ---- SURVEILANS PER KABUPATEN ----
  surveilans: [
    { kabupaten: 'Pegunungan Bintang', malaria: 89,  tbc: 12, dbd: 3,  diare: 34,  pneumonia: 18, total: 156, status: 'critical' },
    { kabupaten: 'Intan Jaya',         malaria: 67,  tbc: 8,  dbd: 1,  diare: 28,  pneumonia: 22, total: 126, status: 'critical' },
    { kabupaten: 'Asmat',              malaria: 54,  tbc: 15, dbd: 2,  diare: 41,  pneumonia: 14, total: 126, status: 'critical' },
    { kabupaten: 'Mamberamo Raya',     malaria: 52,  tbc: 6,  dbd: 1,  diare: 22,  pneumonia: 19, total: 100, status: 'critical' },
    { kabupaten: 'Nduga',              malaria: 48,  tbc: 4,  dbd: 0,  diare: 29,  pneumonia: 21, total: 102, status: 'critical' },
    { kabupaten: 'Nabire',             malaria: 48,  tbc: 11, dbd: 8,  diare: 32,  pneumonia: 17, total: 116, status: 'warning'  },
    { kabupaten: 'Mimika',             malaria: 38,  tbc: 24, dbd: 12, diare: 27,  pneumonia: 9,  total: 110, status: 'warning'  },
    { kabupaten: 'Merauke',            malaria: 29,  tbc: 9,  dbd: 22, diare: 38,  pneumonia: 11, total: 109, status: 'warning'  },
    { kabupaten: 'Jayawijaya',         malaria: 41,  tbc: 18, dbd: 4,  diare: 29,  pneumonia: 13, total: 105, status: 'warning'  },
    { kabupaten: 'Kota Jayapura',      malaria: 18,  tbc: 22, dbd: 15, diare: 19,  pneumonia: 8,  total: 82,  status: 'normal'   },
    { kabupaten: 'Biak Numfor',        malaria: 22,  tbc: 14, dbd: 6,  diare: 24,  pneumonia: 7,  total: 73,  status: 'normal'   },
    { kabupaten: 'Kab. Jayapura',      malaria: 16,  tbc: 11, dbd: 9,  diare: 21,  pneumonia: 6,  total: 63,  status: 'normal'   },
  ],

  // ---- STOK OBAT ESENSIAL ----
  stokObat: [
    { nama: 'Artemisinin (ACT)',      satuan: 'blister', stok: 420,   min: 500,  kabupaten: 'Peg. Bintang', status: 'kritis'  },
    { nama: 'OAT TB Kategori 1',      satuan: 'paket',   stok: 89,    min: 120,  kabupaten: 'Mimika',       status: 'kritis'  },
    { nama: 'Rapid Test Malaria',     satuan: 'kit',     stok: 340,   min: 600,  kabupaten: 'Mamberamo',    status: 'kritis'  },
    { nama: 'Insulin Reguler',        satuan: 'vial',    stok: 95,    min: 200,  kabupaten: 'Nabire',       status: 'kritis'  },
    { nama: 'Vaksin Campak-Rubella',  satuan: 'vial',    stok: 680,   min: 1000, kabupaten: 'Asmat',        status: 'kurang'  },
    { nama: 'Salbutamol Inhaler',     satuan: 'pcs',     stok: 180,   min: 300,  kabupaten: 'Jayawijaya',   status: 'kurang'  },
    { nama: 'Epinefrin 1mg/mL',       satuan: 'ampul',   stok: 48,    min: 80,   kabupaten: 'Intan Jaya',   status: 'kurang'  },
    { nama: 'Amoxicillin 500mg',      satuan: 'kapsul',  stok: 12400, min: 8000, kabupaten: 'Provinsi',     status: 'aman'    },
    { nama: 'ORS / Oralit',           satuan: 'sachet',  stok: 8900,  min: 5000, kabupaten: 'Provinsi',     status: 'aman'    },
    { nama: 'Infus RL 500ml',         satuan: 'kolf',    stok: 2100,  min: 1500, kabupaten: 'Provinsi',     status: 'aman'    },
    { nama: 'Vitamin A 100.000 IU',   satuan: 'kapsul',  stok: 4200,  min: 3000, kabupaten: 'Provinsi',     status: 'aman'    },
    { nama: 'Tablet Fe (Ibu Hamil)',  satuan: 'tablet',  stok: 9800,  min: 8000, kabupaten: 'Provinsi',     status: 'aman'    },
    { nama: 'ARV (Tenofovir)',         satuan: 'tablet',  stok: 2400,  min: 2000, kabupaten: 'Mimika',       status: 'aman'    },
  ],

  // ---- IMUNISASI PER ANTIGEN ----
  imunisasi: [
    { antigen: 'BCG',             cakupan: 71, target: 80, status: 'kurang' },
    { antigen: 'DPT-HB-Hib 1',   cakupan: 68, target: 80, status: 'kurang' },
    { antigen: 'DPT-HB-Hib 3',   cakupan: 62, target: 80, status: 'kurang' },
    { antigen: 'Polio Oral 4',    cakupan: 65, target: 80, status: 'kurang' },
    { antigen: 'Campak-Rubella',  cakupan: 58, target: 80, status: 'kritis' },
    { antigen: 'IPV',             cakupan: 55, target: 80, status: 'kritis' },
    { antigen: 'Hepatitis B-0',   cakupan: 74, target: 80, status: 'kurang' },
    { antigen: 'Vitamin A',       cakupan: 81, target: 80, status: 'aman'   },
  ],

  // ---- GIZI PER KABUPATEN ----
  gizi: [
    { kabupaten: 'Nduga',              stunting: 51.2, wasting: 18.4, underweight: 38.1, status: 'critical' },
    { kabupaten: 'Asmat',              stunting: 48.7, wasting: 16.2, underweight: 35.4, status: 'critical' },
    { kabupaten: 'Pegunungan Bintang', stunting: 46.1, wasting: 15.8, underweight: 33.2, status: 'critical' },
    { kabupaten: 'Mamberamo Raya',     stunting: 43.8, wasting: 14.1, underweight: 30.9, status: 'critical' },
    { kabupaten: 'Intan Jaya',         stunting: 41.2, wasting: 13.7, underweight: 29.4, status: 'critical' },
    { kabupaten: 'Yahukimo',           stunting: 39.4, wasting: 12.3, underweight: 27.8, status: 'warning'  },
    { kabupaten: 'Jayawijaya',         stunting: 37.1, wasting: 11.2, underweight: 25.6, status: 'warning'  },
    { kabupaten: 'Merauke',            stunting: 28.4, wasting: 8.1,  underweight: 19.2, status: 'warning'  },
    { kabupaten: 'Kota Jayapura',      stunting: 18.2, wasting: 4.3,  underweight: 11.7, status: 'normal'   },
    { kabupaten: 'Biak Numfor',        stunting: 21.4, wasting: 5.1,  underweight: 13.2, status: 'normal'   },
  ],

  // ---- RUJUKAN ----
  rujukan: [
    { id: 'RJK-2026-0412', pasien: 'Tn. M.Y', asal: 'PKM Oksibil',       tujuan: 'RSUD Jayapura', penyakit: 'Malaria Berat',   status: 'dalam-perjalanan', waktu: '2 jam lalu' },
    { id: 'RJK-2026-0411', pasien: 'Ny. S.K', asal: 'RS Intan Jaya',     tujuan: 'RSUD Jayapura', penyakit: 'Perdarahan Post Partum', status: 'menunggu', waktu: '3 jam lalu' },
    { id: 'RJK-2026-0410', pasien: 'An. D.W', asal: 'PKM Asmat',         tujuan: 'RS Merauke',    penyakit: 'Pneumonia Berat', status: 'menunggu',        waktu: '4 jam lalu' },
    { id: 'RJK-2026-0409', pasien: 'Tn. R.H', asal: 'PKM Nabire Utara',  tujuan: 'RSUD Nabire',   penyakit: 'Kecelakaan',      status: 'selesai',         waktu: '6 jam lalu' },
    { id: 'RJK-2026-0408', pasien: 'Ny. F.M', asal: 'RS Mimika',         tujuan: 'RSUD Jayapura', penyakit: 'Jantung Koroner', status: 'selesai',         waktu: '8 jam lalu' },
  ],

  // ---- NAKES PER KABUPATEN ----
  nakes: [
    { kabupaten: 'Kota Jayapura',  dokter: 142, bidan: 218, perawat: 312, nakes_total: 672, kebutuhan: 700 },
    { kabupaten: 'Mimika',         dokter: 48,  bidan: 94,  perawat: 132, nakes_total: 274, kebutuhan: 320 },
    { kabupaten: 'Merauke',        dokter: 52,  bidan: 88,  perawat: 124, nakes_total: 264, kebutuhan: 300 },
    { kabupaten: 'Jayawijaya',     dokter: 22,  bidan: 48,  perawat: 68,  nakes_total: 138, kebutuhan: 200 },
    { kabupaten: 'Nabire',         dokter: 18,  bidan: 42,  perawat: 61,  nakes_total: 121, kebutuhan: 160 },
    { kabupaten: 'Intan Jaya',     dokter: 4,   bidan: 12,  perawat: 18,  nakes_total: 34,  kebutuhan: 80  },
    { kabupaten: 'Pegunungan Bintang', dokter: 3, bidan: 9, perawat: 14,  nakes_total: 26,  kebutuhan: 70  },
    { kabupaten: 'Mamberamo Raya', dokter: 2,   bidan: 7,   perawat: 11,  nakes_total: 20,  kebutuhan: 60  },
    { kabupaten: 'Nduga',          dokter: 2,   bidan: 6,   perawat: 9,   nakes_total: 17,  kebutuhan: 55  },
    { kabupaten: 'Asmat',          dokter: 5,   bidan: 14,  perawat: 22,  nakes_total: 41,  kebutuhan: 90  },
  ],

  // ---- KIA ----
  kia: {
    stunting:        { value: 34.2, target: 14.0, unit: '%',     label: 'Prevalensi Stunting' },
    akiProvinsi:     { value: 312,  target: 183,  unit: '/100rb', label: 'Angka Kematian Ibu' },
    akbProvinsi:     { value: 28,   target: 16,   unit: '/1000',  label: 'Angka Kematian Bayi' },
    cakupanAnc:      { value: 71,   target: 90,   unit: '%',     label: 'Cakupan ANC (K4)' },
    cakupanImun:     { value: 68,   target: 80,   unit: '%',     label: 'Cakupan Imunisasi Dasar' },
    persalinanNakes: { value: 62,   target: 90,   unit: '%',     label: 'Persalinan oleh Nakes' },
  },

  // ---- HELPER ----
  statusLabel: { normal: 'Normal', warning: 'Perhatian', critical: 'Kritis' },
  statusBadge: { normal: 'badge-success', warning: 'badge-warning', critical: 'badge-danger' },
  stokBadge:   { aman: 'badge-success', kurang: 'badge-warning', kritis: 'badge-danger' },

};
