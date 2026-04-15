// ============================================================
// DATA SIMULASI — SiKespa Papua
// Semua data adalah simulasi untuk keperluan prototype
// ============================================================

const SIKESPA_DATA = {

  // ---- META ----
  updated: 'Rabu, 16 April 2026 · 06.00 WIT',
  user: { name: 'dr. Yusuf Hamdan, MPH', role: 'Kepala Dinkes Provinsi Papua', initials: 'YH' },

  // ---- KABUPATEN ----
  kabupaten: [
    { id: 'jayapura-kota', name: 'Kota Jayapura',       rs: 5, puskesmas: 24, status: 'normal',   bor: 72 },
    { id: 'jayapura-kab',  name: 'Kab. Jayapura',       rs: 2, puskesmas: 18, status: 'normal',   bor: 61 },
    { id: 'merauke',       name: 'Merauke',              rs: 3, puskesmas: 22, status: 'warning',  bor: 84 },
    { id: 'mimika',        name: 'Mimika',               rs: 3, puskesmas: 16, status: 'warning',  bor: 88 },
    { id: 'biak-numfor',   name: 'Biak Numfor',          rs: 2, puskesmas: 14, status: 'normal',   bor: 58 },
    { id: 'nabire',        name: 'Nabire',               rs: 2, puskesmas: 12, status: 'critical', bor: 93 },
    { id: 'pegunungan-bintang', name: 'Pegunungan Bintang', rs: 1, puskesmas: 8, status: 'critical', bor: 96 },
    { id: 'jayawijaya',    name: 'Jayawijaya',           rs: 2, puskesmas: 17, status: 'warning',  bor: 81 },
    { id: 'sarmi',         name: 'Sarmi',                rs: 1, puskesmas: 9,  status: 'normal',   bor: 44 },
    { id: 'keerom',        name: 'Keerom',               rs: 1, puskesmas: 10, status: 'normal',   bor: 52 },
    { id: 'waropen',       name: 'Waropen',              rs: 1, puskesmas: 7,  status: 'normal',   bor: 48 },
    { id: 'supiori',       name: 'Supiori',              rs: 1, puskesmas: 5,  status: 'warning',  bor: 79 },
    { id: 'mamberamo-raya',name: 'Mamberamo Raya',       rs: 1, puskesmas: 6,  status: 'critical', bor: 91 },
    { id: 'yalimo',        name: 'Yalimo',               rs: 1, puskesmas: 7,  status: 'warning',  bor: 77 },
    { id: 'lanny-jaya',    name: 'Lanny Jaya',           rs: 1, puskesmas: 9,  status: 'warning',  bor: 82 },
    { id: 'asmat',         name: 'Asmat',                rs: 1, puskesmas: 10, status: 'critical', bor: 94 },
    { id: 'mappi',         name: 'Mappi',                rs: 1, puskesmas: 8,  status: 'warning',  bor: 76 },
    { id: 'boven-digoel',  name: 'Boven Digoel',         rs: 1, puskesmas: 9,  status: 'normal',   bor: 55 },
    { id: 'intan-jaya',    name: 'Intan Jaya',           rs: 1, puskesmas: 6,  status: 'critical', bor: 97 },
    { id: 'puncak-jaya',   name: 'Puncak Jaya',          rs: 1, puskesmas: 8,  status: 'critical', bor: 95 },
  ],

  // ---- KPI PROVINSI ----
  kpi: {
    kasusBaru:       { value: 1847, trend: '+12%', trendDir: 'up',   label: 'Kasus Baru Minggu Ini',    sub: 'vs 1.648 minggu lalu' },
    outbreakAktif:   { value: 4,    trend: '+1',   trendDir: 'up',   label: 'Outbreak Aktif',           sub: 'Malaria & DBD' },
    borKritis:       { value: 6,    trend: '+2',   trendDir: 'up',   label: 'Kab. BOR Kritis (>85%)',   sub: 'Perlu tindakan segera' },
    obatKritis:      { value: 9,    trend: '-3',   trendDir: 'down', label: 'Item Obat Hampir Habis',   sub: 'Stok < 7 hari' },
    imunisasiCakupan:{ value: 68,   trend: '+3%',  trendDir: 'up',   label: 'Cakupan Imunisasi (%)',   sub: 'Target nasional: 80%' },
    akiProvinsi:     { value: 312,  trend: '-8%',  trendDir: 'down', label: 'AKI per 100.000 Lahir',   sub: 'Turun dari 339 tahun lalu' },
  },

  // ---- ALERT FEED ----
  alerts: [
    { level: 'critical', title: 'OUTBREAK MALARIA — Pegunungan Bintang', desc: 'Lonjakan 156% dalam 7 hari. 89 kasus konfirmasi, 3 kematian. Stok ACT tersisa 4 hari.', time: '18 menit lalu', kabupaten: 'Peg. Bintang' },
    { level: 'critical', title: 'BOR 97% — RS Intan Jaya',               desc: 'Kapasitas hampir penuh. 2 pasien kritis menunggu rujukan ke Jayapura.', time: '42 menit lalu', kabupaten: 'Intan Jaya' },
    { level: 'warning',  title: 'Stok OAT TB Hampir Habis — Mimika',     desc: 'Sisa stok untuk 6 hari. 34 pasien TB aktif terancam putus pengobatan.', time: '1 jam lalu', kabupaten: 'Mimika' },
    { level: 'warning',  title: 'Kasus DBD Meningkat — Merauke',         desc: 'Kenaikan 43% dibanding minggu lalu. 22 kasus baru, 1 kematian anak.', time: '2 jam lalu', kabupaten: 'Merauke' },
    { level: 'warning',  title: 'Nakes Tidak Hadir — Mamberamo Raya',    desc: '3 dari 6 Puskesmas tidak ada dokter minggu ini karena cuaca ekstrem.', time: '3 jam lalu', kabupaten: 'Mamberamo' },
    { level: 'info',     title: 'Distribusi Vaksin Polio Selesai',        desc: 'Pengiriman vaksin polio ke 8 kabupaten telah terkonfirmasi diterima.', time: '5 jam lalu', kabupaten: 'Provinsi' },
    { level: 'success',  title: 'Target ANC Tercapai — Nabire',           desc: 'Cakupan kunjungan ibu hamil K4 mencapai 87%, melampaui target 80%.', time: '8 jam lalu', kabupaten: 'Nabire' },
  ],

  // ---- TREN PENYAKIT (12 minggu terakhir) ----
  trenPenyakit: {
    labels: ['M-12','M-11','M-10','M-9','M-8','M-7','M-6','M-5','M-4','M-3','M-2','M-1'],
    datasets: [
      { label: 'Malaria',    data: [420,398,445,512,489,523,498,541,567,610,643,712], color: '#c0392b' },
      { label: 'TBC',        data: [180,175,182,178,190,185,188,192,195,198,201,204], color: '#e67e22' },
      { label: 'DBD',        data: [45,52,38,67,89,102,78,93,115,128,142,167],        color: '#8e44ad' },
      { label: 'Diare',      data: [210,224,198,231,245,218,207,239,252,228,241,258], color: '#2980b9' },
      { label: 'Pneumonia',  data: [88,92,85,97,103,91,88,95,101,108,112,119],        color: '#27ae60' },
    ]
  },

  // ---- BOR PER KABUPATEN ----
  borData: {
    labels: ['Intan Jaya','Punc. Jaya','Asmat','Peg. Bintang','Mamberamo','Nabire','Mimika','Merauke','Jayawijaya','Lanny Jaya'],
    values: [97, 95, 94, 96, 91, 93, 88, 84, 81, 82],
    threshold: 85,
  },

  // ---- STOK OBAT ESENSIAL ----
  stokObat: [
    { nama: 'Artemisinin (ACT)',       satuan: 'blister', stok: 420,   min: 500,  status: 'kritis',  kabupaten: 'Peg. Bintang' },
    { nama: 'OAT TB Kategori 1',       satuan: 'paket',   stok: 89,    min: 120,  status: 'kritis',  kabupaten: 'Mimika' },
    { nama: 'Amoxicillin 500mg',       satuan: 'kapsul',  stok: 12400, min: 8000, status: 'aman',    kabupaten: 'Provinsi' },
    { nama: 'Vaksin Campak-Rubella',   satuan: 'vial',    stok: 680,   min: 1000, status: 'kurang',  kabupaten: 'Asmat' },
    { nama: 'ORS / Oralit',            satuan: 'sachet',  stok: 8900,  min: 5000, status: 'aman',    kabupaten: 'Provinsi' },
    { nama: 'Rapid Test Malaria',      satuan: 'kit',     stok: 340,   min: 600,  status: 'kritis',  kabupaten: 'Mamberamo' },
    { nama: 'Infus RL 500ml',          satuan: 'kolf',    stok: 2100,  min: 1500, status: 'aman',    kabupaten: 'Provinsi' },
    { nama: 'Vitamin A 100.000 IU',    satuan: 'kapsul',  stok: 4200,  min: 3000, status: 'aman',    kabupaten: 'Provinsi' },
    { nama: 'Tablet Fe (Ibu Hamil)',   satuan: 'tablet',  stok: 9800,  min: 8000, status: 'aman',    kabupaten: 'Provinsi' },
    { nama: 'Salbutamol Inhaler',      satuan: 'pcs',     stok: 180,   min: 300,  status: 'kurang',  kabupaten: 'Jayawijaya' },
    { nama: 'Insulin Reguler',         satuan: 'vial',    stok: 95,    min: 200,  status: 'kritis',  kabupaten: 'Nabire' },
    { nama: 'ARV (Tenofovir)',         satuan: 'tablet',  stok: 2400,  min: 2000, status: 'aman',    kabupaten: 'Mimika' },
  ],

  // ---- SURVEILANS KABUPATEN ----
  surveilans: [
    { kabupaten: 'Pegunungan Bintang', malaria: 89,  tbc: 12, dbd: 3,  diare: 34,  pneumonia: 18, total: 156, status: 'critical' },
    { kabupaten: 'Intan Jaya',         malaria: 67,  tbc: 8,  dbd: 1,  diare: 28,  pneumonia: 22, total: 126, status: 'critical' },
    { kabupaten: 'Asmat',              malaria: 54,  tbc: 15, dbd: 2,  diare: 41,  pneumonia: 14, total: 126, status: 'critical' },
    { kabupaten: 'Nabire',             malaria: 48,  tbc: 11, dbd: 8,  diare: 32,  pneumonia: 17, total: 116, status: 'warning'  },
    { kabupaten: 'Mimika',             malaria: 38,  tbc: 24, dbd: 12, diare: 27,  pneumonia: 9,  total: 110, status: 'warning'  },
    { kabupaten: 'Merauke',            malaria: 29,  tbc: 9,  dbd: 22, diare: 38,  pneumonia: 11, total: 109, status: 'warning'  },
    { kabupaten: 'Jayawijaya',         malaria: 41,  tbc: 18, dbd: 4,  diare: 29,  pneumonia: 13, total: 105, status: 'warning'  },
    { kabupaten: 'Mamberamo Raya',     malaria: 52,  tbc: 6,  dbd: 1,  diare: 22,  pneumonia: 19, total: 100, status: 'critical' },
    { kabupaten: 'Kota Jayapura',      malaria: 18,  tbc: 22, dbd: 15, diare: 19,  pneumonia: 8,  total: 82,  status: 'normal'   },
    { kabupaten: 'Biak Numfor',        malaria: 22,  tbc: 14, dbd: 6,  diare: 24,  pneumonia: 7,  total: 73,  status: 'normal'   },
  ],

  // ---- KIA (Kesehatan Ibu & Anak) ----
  kia: {
    stunting:    { value: 34.2, target: 14.0, unit: '%', label: 'Prevalensi Stunting' },
    akiProvinsi: { value: 312,  target: 183,  unit: '/100rb', label: 'Angka Kematian Ibu' },
    akbProvinsi: { value: 28,   target: 16,   unit: '/1000',  label: 'Angka Kematian Bayi' },
    cakupanAnc:  { value: 71,   target: 90,   unit: '%', label: 'Cakupan ANC (K4)' },
    cakupanImun: { value: 68,   target: 80,   unit: '%', label: 'Cakupan Imunisasi Dasar' },
    persalinanNakes: { value: 62, target: 90, unit: '%', label: 'Persalinan oleh Nakes' },
  },
};
