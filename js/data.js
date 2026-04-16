// ============================================================
// DATA SIMULASI — SIKESPA (Papua)
// ============================================================

const DATA = {

  // ---- RINGKASAN KPI ----
  kpi: {
    kasusBaruMingguIni:  { value: 1247, delta: +8.3,  unit: 'kasus',   label: 'Kasus Baru Minggu Ini' },
    outbreakAktif:       { value: 3,    delta: +1,     unit: 'outbreak',label: 'Outbreak Aktif' },
    rsBorKritis:         { value: 4,    delta: -1,     unit: 'RS',      label: 'RS BOR > 80%' },
    stokObatKritis:      { value: 7,    delta: +2,     unit: 'kab',     label: 'Kab. Stok Obat Kritis' },
  },

  // ---- ALERTS ----
  alerts: [
    { id: 1, level: 'critical', kabupaten: 'Pegunungan Bintang', pesan: 'Kasus malaria naik 40% dalam 7 hari terakhir — ambang batas outbreak terlampaui.', waktu: '2 jam lalu' },
    { id: 2, level: 'critical', kabupaten: 'Intan Jaya',         pesan: 'Stok OAT TB akan habis dalam 5 hari. Sisa: 23 paket.', waktu: '4 jam lalu' },
    { id: 3, level: 'warning',  kabupaten: 'Asmat',              pesan: 'BOR RS Agats mencapai 87%. Kapasitas ICU penuh.', waktu: '6 jam lalu' },
    { id: 4, level: 'warning',  kabupaten: 'Mamberamo Raya',     pesan: 'Cakupan imunisasi campak bulan ini baru 41% — di bawah target 80%.', waktu: '8 jam lalu' },
    { id: 5, level: 'warning',  kabupaten: 'Nduga',              pesan: 'Laporan mingguan dari 3 Puskesmas terlambat > 7 hari.', waktu: '10 jam lalu' },
    { id: 6, level: 'info',     kabupaten: 'Jayapura',           pesan: 'Distribusi vaksin polio tahap 2 berhasil menjangkau 98% target sasaran.', waktu: '1 hari lalu' },
  ],

  // ---- TREN MINGGUAN (12 minggu terakhir) ----
  trenMingguan: {
    labels: ['W1','W2','W3','W4','W5','W6','W7','W8','W9','W10','W11','W12'],
    malaria:    [820, 850, 870, 910, 880, 860, 900, 940, 970, 1010, 1080, 1150],
    tbc:        [140, 138, 142, 145, 148, 150, 153, 149, 152, 156,  158,  161],
    dbd:        [ 28,  31,  27,  35,  40,  38,  42,  45,  39,  43,   47,   51],
    diare:      [310, 295, 320, 340, 315, 330, 355, 370, 360, 380,  395,  410],
    pneumonia:  [180, 175, 182, 190, 188, 195, 200, 198, 205, 210,  215,  220],
  },

  // ---- KAPASITAS RUMAH SAKIT ----
  borData: {
    labels: ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'],
    values: [61, 63, 65, 68, 72, 74, 71, 76, 78, 80, 75, 73],
    threshold: 85,
  },


  // ---- SURVEILANS PER KABUPATEN ----
  surveilans: [
    { kabupaten: 'Pegunungan Bintang', malaria: 89,  tbc: 12, dbd: 3,  diare: 34,  pneumonia: 18, total: 156, status: 'critical' },
    { kabupaten: 'Intan Jaya',         malaria: 67,  tbc: 8,  dbd: 1,  diare: 28,  pneumonia: 22, total: 126, status: 'critical' },
    { kabupaten: 'Asmat',              malaria: 54,  tbc: 15, dbd: 2,  diare: 41,  pneumonia: 14, total: 126, status: 'critical' },
    { kabupaten: 'Mamberamo Raya',     malaria: 52,  tbc: 6,  dbd: 1,  diare: 22,  pneumonia: 19, total: 100, status: 'critical' },
    { kabupaten: 'Nduga',              malaria: 48,  tbc: 4,  dbd: 0,  diare: 29,  pneumonia: 21, total: 102, status: 'critical' },
    { kabupaten: 'Nabire',             malaria: 48,  tbc: 11, dbd: 8,  diare: 32,  pneumonia: 17, total: 116, status: 'warning'  },
    { kabupaten: 'Paniai',             malaria: 43,  tbc: 9,  dbd: 5,  diare: 27,  pneumonia: 13, total:  97, status: 'warning'  },
    { kabupaten: 'Puncak Jaya',        malaria: 41,  tbc: 7,  dbd: 0,  diare: 31,  pneumonia: 25, total: 104, status: 'warning'  },
    { kabupaten: 'Waropen',            malaria: 36,  tbc: 5,  dbd: 4,  diare: 19,  pneumonia: 11, total:  75, status: 'warning'  },
    { kabupaten: 'Mappi',              malaria: 34,  tbc: 13, dbd: 2,  diare: 38,  pneumonia: 16, total: 103, status: 'warning'  },
    { kabupaten: 'Keerom',             malaria: 28,  tbc: 4,  dbd: 6,  diare: 15,  pneumonia:  9, total:  62, status: 'normal'   },
    { kabupaten: 'Biak Numfor',        malaria: 24,  tbc: 8,  dbd: 11, diare: 20,  pneumonia: 12, total:  75, status: 'normal'   },
    { kabupaten: 'Sarmi',              malaria: 21,  tbc: 3,  dbd: 3,  diare: 14,  pneumonia:  8, total:  49, status: 'normal'   },
    { kabupaten: 'Merauke',            malaria: 18,  tbc: 11, dbd: 14, diare: 22,  pneumonia: 10, total:  75, status: 'normal'   },
    { kabupaten: 'Jayapura',           malaria: 14,  tbc: 9,  dbd: 18, diare: 17,  pneumonia:  7, total:  65, status: 'normal'   },
  ],

  // ---- STOK OBAT ----
  stokObat: [
    { kabupaten: 'Intan Jaya',     obat: 'OAT TB (FDC)',      stok: 23,   minimum: 50,   satuan: 'paket',  status: 'critical' },
    { kabupaten: 'Pegunungan Bintang', obat: 'ACT Malaria',   stok: 41,   minimum: 100,  satuan: 'strip',  status: 'critical' },
    { kabupaten: 'Nduga',          obat: 'Vaksin Campak',     stok: 55,   minimum: 80,   satuan: 'vial',   status: 'critical' },
    { kabupaten: 'Asmat',          obat: 'Oralit',            stok: 120,  minimum: 200,  satuan: 'sachet', status: 'critical' },
    { kabupaten: 'Mamberamo Raya', obat: 'Amoksisilin 500mg', stok: 180,  minimum: 300,  satuan: 'tablet', status: 'critical' },
    { kabupaten: 'Nabire',         obat: 'Insulin',           stok: 95,   minimum: 120,  satuan: 'vial',   status: 'warning'  },
    { kabupaten: 'Waropen',        obat: 'Antihipertensi',    stok: 210,  minimum: 250,  satuan: 'tablet', status: 'warning'  },
    { kabupaten: 'Paniai',         obat: 'Zinc + Oralit',     stok: 165,  minimum: 180,  satuan: 'paket',  status: 'warning'  },
    { kabupaten: 'Keerom',         obat: 'ACT Malaria',       stok: 320,  minimum: 300,  satuan: 'strip',  status: 'normal'   },
    { kabupaten: 'Jayapura',       obat: 'OAT TB (FDC)',      stok: 480,  minimum: 200,  satuan: 'paket',  status: 'normal'   },
    { kabupaten: 'Merauke',        obat: 'Vaksin Campak',     stok: 290,  minimum: 200,  satuan: 'vial',   status: 'normal'   },
    { kabupaten: 'Biak Numfor',    obat: 'Amoksisilin 500mg', stok: 510,  minimum: 300,  satuan: 'tablet', status: 'normal'   },
  ],

  // ---- BOR PER RS ----
  bor: [
    { rs: 'RSUD Jayapura',          kabupaten: 'Jayapura',        kapasitas: 350, terisi: 298, bor: 85, icu: { kapasitas: 20, terisi: 18 }, status: 'critical' },
    { rs: 'RSUD Agats',             kabupaten: 'Asmat',           kapasitas: 80,  terisi: 70,  bor: 87, icu: { kapasitas: 6,  terisi: 6  }, status: 'critical' },
    { rs: 'RSUD Oksibil',           kabupaten: 'Pegunungan Bintang', kapasitas: 50, terisi: 43, bor: 86, icu: { kapasitas: 4, terisi: 4  }, status: 'critical' },
    { rs: 'RSUD Sugapa',            kabupaten: 'Intan Jaya',      kapasitas: 40,  terisi: 34,  bor: 85, icu: { kapasitas: 3,  terisi: 3  }, status: 'critical' },
    { rs: 'RSUD Nabire',            kabupaten: 'Nabire',          kapasitas: 120, terisi: 91,  bor: 76, icu: { kapasitas: 8,  terisi: 5  }, status: 'warning'  },
    { rs: 'RSUD Serui',             kabupaten: 'Waropen',         kapasitas: 75,  terisi: 54,  bor: 72, icu: { kapasitas: 5,  terisi: 3  }, status: 'warning'  },
    { rs: 'RSUD Enarotali',         kabupaten: 'Paniai',          kapasitas: 60,  terisi: 43,  bor: 72, icu: { kapasitas: 4,  terisi: 2  }, status: 'warning'  },
    { rs: 'RSUD Wamena',            kabupaten: 'Jayawijaya',      kapasitas: 150, terisi: 95,  bor: 63, icu: { kapasitas: 10, terisi: 4  }, status: 'normal'   },
    { rs: 'RSUD Merauke',           kabupaten: 'Merauke',         kapasitas: 200, terisi: 118, bor: 59, icu: { kapasitas: 12, terisi: 5  }, status: 'normal'   },
    { rs: 'RSUD Biak',              kabupaten: 'Biak Numfor',     kapasitas: 160, terisi: 88,  bor: 55, icu: { kapasitas: 10, terisi: 3  }, status: 'normal'   },
    { rs: 'RS Bhayangkara Jayapura',kabupaten: 'Jayapura',        kapasitas: 100, terisi: 52,  bor: 52, icu: { kapasitas: 8,  terisi: 2  }, status: 'normal'   },
    { rs: 'RSUD Keerom',            kabupaten: 'Keerom',          kapasitas: 60,  terisi: 28,  bor: 47, icu: { kapasitas: 4,  terisi: 1  }, status: 'normal'   },
  ],

  // ---- RUJUKAN ----
  rujukan: [
    { id: 'RJK-2024-1892', pasien: 'Tn. M (42 th)', asal: 'Puskesmas Oksibil',    tujuan: 'RSUD Wamena',   diagnosa: 'Malaria Berat',    status: 'dalam-perjalanan', waktu: '1 jam lalu',   transport: 'Pesawat' },
    { id: 'RJK-2024-1891', pasien: 'By. P (8 bl)',  asal: 'RSUD Agats',           tujuan: 'RSUD Jayapura', diagnosa: 'Gizi Buruk + Pneumonia', status: 'tiba',        waktu: '3 jam lalu',   transport: 'Pesawat' },
    { id: 'RJK-2024-1890', pasien: 'Ny. S (28 th)', asal: 'Puskesmas Sugapa',     tujuan: 'RSUD Nabire',   diagnosa: 'Persalinan Risiko Tinggi', status: 'tiba',      waktu: '5 jam lalu',   transport: 'Pesawat' },
    { id: 'RJK-2024-1889', pasien: 'Tn. K (55 th)', asal: 'RSUD Serui',           tujuan: 'RSUD Jayapura', diagnosa: 'Stroke Iskemik',   status: 'tiba',            waktu: '8 jam lalu',   transport: 'Ambulans' },
    { id: 'RJK-2024-1888', pasien: 'An. D (5 th)',  asal: 'Puskesmas Mamberamo',  tujuan: 'RSUD Nabire',   diagnosa: 'Diare Dehidrasi Berat', status: 'tiba',        waktu: '12 jam lalu',  transport: 'Pesawat' },
    { id: 'RJK-2024-1887', pasien: 'Ny. R (35 th)', asal: 'RSUD Enarotali',       tujuan: 'RSUD Jayapura', diagnosa: 'Pre-eklampsia Berat', status: 'selesai',      waktu: '1 hari lalu',  transport: 'Pesawat' },
  ],

  // ---- IMUNISASI ----
  imunisasi: [
    { kabupaten: 'Jayapura',           bcg: 95, polio: 93, dpt: 91, campak: 90, hb0: 88, status: 'normal'   },
    { kabupaten: 'Merauke',            bcg: 91, polio: 89, dpt: 87, campak: 85, hb0: 84, status: 'normal'   },
    { kabupaten: 'Biak Numfor',        bcg: 88, polio: 86, dpt: 84, campak: 82, hb0: 81, status: 'normal'   },
    { kabupaten: 'Nabire',             bcg: 82, polio: 80, dpt: 78, campak: 76, hb0: 75, status: 'warning'  },
    { kabupaten: 'Waropen',            bcg: 78, polio: 75, dpt: 72, campak: 70, hb0: 69, status: 'warning'  },
    { kabupaten: 'Paniai',             bcg: 72, polio: 68, dpt: 65, campak: 63, hb0: 61, status: 'warning'  },
    { kabupaten: 'Keerom',             bcg: 70, polio: 67, dpt: 64, campak: 61, hb0: 60, status: 'warning'  },
    { kabupaten: 'Asmat',              bcg: 62, polio: 58, dpt: 55, campak: 51, hb0: 49, status: 'critical' },
    { kabupaten: 'Intan Jaya',         bcg: 55, polio: 51, dpt: 48, campak: 44, hb0: 42, status: 'critical' },
    { kabupaten: 'Mamberamo Raya',     bcg: 51, polio: 47, dpt: 44, campak: 40, hb0: 38, status: 'critical' },
    { kabupaten: 'Pegunungan Bintang', bcg: 48, polio: 44, dpt: 41, campak: 37, hb0: 35, status: 'critical' },
    { kabupaten: 'Nduga',              bcg: 42, polio: 38, dpt: 35, campak: 31, hb0: 29, status: 'critical' },
  ],

  // ---- GIZI ----
  gizi: [
    { kabupaten: 'Jayapura',           stunting: 22, wasting: 8,  underweight: 14, status: 'normal'   },
    { kabupaten: 'Merauke',            stunting: 26, wasting: 10, underweight: 17, status: 'normal'   },
    { kabupaten: 'Biak Numfor',        stunting: 28, wasting: 11, underweight: 18, status: 'normal'   },
    { kabupaten: 'Nabire',             stunting: 31, wasting: 14, underweight: 21, status: 'warning'  },
    { kabupaten: 'Keerom',             stunting: 33, wasting: 15, underweight: 22, status: 'warning'  },
    { kabupaten: 'Paniai',             stunting: 36, wasting: 17, underweight: 25, status: 'warning'  },
    { kabupaten: 'Waropen',            stunting: 38, wasting: 18, underweight: 26, status: 'warning'  },
    { kabupaten: 'Asmat',              stunting: 42, wasting: 22, underweight: 31, status: 'critical' },
    { kabupaten: 'Intan Jaya',         stunting: 45, wasting: 25, underweight: 34, status: 'critical' },
    { kabupaten: 'Mamberamo Raya',     stunting: 47, wasting: 27, underweight: 36, status: 'critical' },
    { kabupaten: 'Nduga',              stunting: 51, wasting: 31, underweight: 40, status: 'critical' },
    { kabupaten: 'Pegunungan Bintang', stunting: 54, wasting: 33, underweight: 43, status: 'critical' },
  ],

  // ---- NAKES ----
  nakes: [
    { kabupaten: 'Jayapura',           dokter: 142, perawat: 380, bidan: 210, farmasi: 65, status: 'normal'   },
    { kabupaten: 'Merauke',            dokter: 58,  perawat: 160, bidan: 92,  farmasi: 28, status: 'normal'   },
    { kabupaten: 'Biak Numfor',        dokter: 41,  perawat: 118, bidan: 70,  farmasi: 22, status: 'normal'   },
    { kabupaten: 'Nabire',             dokter: 28,  perawat: 82,  bidan: 48,  farmasi: 15, status: 'normal'   },
    { kabupaten: 'Waropen',            dokter: 14,  perawat: 44,  bidan: 26,  farmasi: 8,  status: 'warning'  },
    { kabupaten: 'Paniai',             dokter: 12,  perawat: 38,  bidan: 22,  farmasi: 7,  status: 'warning'  },
    { kabupaten: 'Keerom',             dokter: 11,  perawat: 35,  bidan: 20,  farmasi: 6,  status: 'warning'  },
    { kabupaten: 'Asmat',              dokter: 8,   perawat: 28,  bidan: 16,  farmasi: 5,  status: 'warning'  },
    { kabupaten: 'Intan Jaya',         dokter: 5,   perawat: 18,  bidan: 10,  farmasi: 3,  status: 'critical' },
    { kabupaten: 'Mamberamo Raya',     dokter: 4,   perawat: 14,  bidan: 8,   farmasi: 2,  status: 'critical' },
    { kabupaten: 'Pegunungan Bintang', dokter: 3,   perawat: 11,  bidan: 6,   farmasi: 2,  status: 'critical' },
    { kabupaten: 'Nduga',              dokter: 2,   perawat: 8,   bidan: 4,   farmasi: 1,  status: 'critical' },
  ],

  // ---- KIA ----
  kia: {
    aki:       { label: 'Angka Kematian Ibu',      value: 312, target: 183,  unit: '/100rb lahir', higherIsBetter: false },
    akb:       { label: 'Angka Kematian Bayi',     value: 28,  target: 16,   unit: '/1000 lahir',  higherIsBetter: false },
    anc4:      { label: 'Cakupan ANC ≥4x',         value: 68,  target: 90,   unit: '%',            higherIsBetter: true  },
    persalinan:{ label: 'Persalinan Nakes',         value: 71,  target: 90,   unit: '%',            higherIsBetter: true  },
    kn2:       { label: 'Kunjungan Neonatal (KN2)', value: 62,  target: 85,   unit: '%',            higherIsBetter: true  },
    kb:        { label: 'Akseptor KB Aktif',        value: 55,  target: 70,   unit: '%',            higherIsBetter: true  },
  },

  // ---- PETA KABUPATEN ----
  peta: [
    { id: 'jayapura',            label: 'Jayapura',            x: 78, y: 22, status: 'normal',   kasus: 65  },
    { id: 'keerom',              label: 'Keerom',              x: 72, y: 30, status: 'normal',   kasus: 62  },
    { id: 'sarmi',               label: 'Sarmi',               x: 60, y: 18, status: 'normal',   kasus: 49  },
    { id: 'biak-numfor',         label: 'Biak Numfor',         x: 68, y: 10, status: 'normal',   kasus: 75  },
    { id: 'waropen',             label: 'Waropen',             x: 58, y: 28, status: 'warning',  kasus: 75  },
    { id: 'nabire',              label: 'Nabire',              x: 45, y: 30, status: 'warning',  kasus: 116 },
    { id: 'paniai',              label: 'Paniai',              x: 42, y: 38, status: 'warning',  kasus: 97  },
    { id: 'puncak-jaya',         label: 'Puncak Jaya',         x: 50, y: 40, status: 'warning',  kasus: 104 },
    { id: 'mappi',               label: 'Mappi',               x: 52, y: 60, status: 'warning',  kasus: 103 },
    { id: 'merauke',             label: 'Merauke',             x: 62, y: 72, status: 'normal',   kasus: 75  },
    { id: 'asmat',               label: 'Asmat',               x: 38, y: 58, status: 'critical', kasus: 126 },
    { id: 'mamberamo-raya',      label: 'Mamberamo Raya',      x: 50, y: 20, status: 'critical', kasus: 100 },
    { id: 'nduga',               label: 'Nduga',               x: 55, y: 48, status: 'critical', kasus: 102 },
    { id: 'intan-jaya',          label: 'Intan Jaya',          x: 40, y: 44, status: 'critical', kasus: 126 },
    { id: 'pegunungan-bintang',  label: 'Peg. Bintang',        x: 65, y: 50, status: 'critical', kasus: 156 },
  ],

  // ---- LAPORAN BULANAN ----
  laporan: {
    bulan: 'November 2024',
    terkirim: 24,
    total: 29,
    terlambat: 3,
    belumLapor: 2,
    rincian: [
      { kabupaten: 'Jayapura',            status: 'tepat',    tanggal: '1 Des 2024' },
      { kabupaten: 'Merauke',             status: 'tepat',    tanggal: '2 Des 2024' },
      { kabupaten: 'Biak Numfor',         status: 'tepat',    tanggal: '2 Des 2024' },
      { kabupaten: 'Nabire',              status: 'tepat',    tanggal: '3 Des 2024' },
      { kabupaten: 'Waropen',             status: 'tepat',    tanggal: '3 Des 2024' },
      { kabupaten: 'Keerom',              status: 'tepat',    tanggal: '4 Des 2024' },
      { kabupaten: 'Sarmi',               status: 'tepat',    tanggal: '4 Des 2024' },
      { kabupaten: 'Paniai',              status: 'terlambat',tanggal: '9 Des 2024' },
      { kabupaten: 'Puncak Jaya',         status: 'terlambat',tanggal: '11 Des 2024' },
      { kabupaten: 'Mappi',               status: 'terlambat',tanggal: '12 Des 2024' },
      { kabupaten: 'Asmat',               status: 'belum',    tanggal: '-' },
      { kabupaten: 'Nduga',               status: 'belum',    tanggal: '-' },
    ],
  },

};
