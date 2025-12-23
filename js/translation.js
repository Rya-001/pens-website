document.addEventListener("DOMContentLoaded", () => {
  const idBtn = document.getElementById("id-lang");
  const enBtn = document.getElementById("en-lang");

  const elements = {
    nav: document.querySelectorAll(".nav-link"),
    heroTitle1: document.querySelector(".hero-title-line:nth-child(1)"),
    heroTitle2: document.querySelector(".hero-title-line.highlight"),
    heroSubtitle: document.querySelector(".hero-subtitle"),
    heroBtnProduct: document.querySelector(".btn-primary"),
    heroBtnMember: document.querySelector(".btn-secondary"),

    sectionTitles: document.querySelectorAll(".section-title"),
    sectionSubtitles: document.querySelectorAll(".section-subtitle"),

    productNames: document.querySelectorAll(".product-name"),
    productDescs: document.querySelectorAll(".product-desc"),
    productTags: document.querySelectorAll(".product-tag"),
    productDetailLabels: document.querySelectorAll(".detail-label"),
    productDetailValues: document.querySelectorAll(".detail-value"),
    productSpecs: document.querySelectorAll(".product-specs .spec"),
    quoteBtns: document.querySelectorAll(".btn-quote"),
    consultBtns: document.querySelectorAll(".whatsapp-inquiry"),

    serviceTitles: document.querySelectorAll(".service-title"),
    serviceDescs: document.querySelectorAll(".service-desc"),
    serviceFeatures: document.querySelectorAll(".service-feature span"),
    serviceDetailBtns: document.querySelectorAll(".service-detail-btn"),

    valueTitles: document.querySelectorAll(".value-title"),
    valueDescs: document.querySelectorAll(".value-desc"),

    newsLinks: document.querySelectorAll(".news-link"),
    newsMonths: document.querySelectorAll(".news-date .month"),
    newsCategories: document.querySelectorAll(".news-category"),
    newsTitles: document.querySelectorAll(".news-title"),
    newsExcerpts: document.querySelectorAll(".news-excerpt"),

    viewAllProductsBtn: document.querySelector("#products .section-footer .btn-secondary"),
    viewAllNewsBtn: document.querySelector("#news .section-footer .btn-secondary"),

    footerWhatsappBtn: document.getElementById("footerWhatsapp"),

    sloganText: document.querySelector(".slogan-text"),

    profileSubtitle: document.querySelector(".profile-text h3"),
    profileOverview: document.querySelectorAll(".profile-overview"),

    profileSubtitle2: document.querySelector(".profile-subtitle-2"),
    profileBackground: document.querySelectorAll(".profile-background"),

    profileSubtitle3: document.querySelector(".profile-subtitle-3"),
    profileVision: document.querySelector(".profile-vision"),

    profileSubtitle4: document.querySelector(".profile-subtitle-4"),
    profileMission: document.querySelectorAll(".profile-mission li span"),

    profileSubtitle5: document.querySelector(".profile-subtitle-5"),
    profileAdvantageTitles: document.querySelectorAll(".advantage-title"),
    profileAdvantageDescs: document.querySelectorAll(".advantage-desc"),

    profileSubtitle6: document.querySelector(".profile-subtitle-6"),
    profileCoreValueTitles: document.querySelectorAll(".core-value-title"),
    profileCoreValueDescs: document.querySelectorAll(".core-value-desc"),

    profileSubtitle7: document.querySelector(".profile-subtitle-7"),
    profileObjectives: document.querySelectorAll(".profile-objectives li span"),

    profileSubtitle8: document.querySelector(".profile-subtitle-8"),
    founderNames: document.querySelectorAll(".founder-name"),
    founderPositions: document.querySelectorAll(".founder-position"),
    founderBios: document.querySelectorAll(".founder-bio"),

    memberSubtitle: document.querySelector(".member-subtitle"),
    memberFeatureTitles: document.querySelectorAll(".member-features .feature h4"),
    memberFeatureDescs: document.querySelectorAll(".member-features .feature p"),
    memberLoginBtn: document.querySelector(".member-login-btn"),
    memberRegisterBtn: document.querySelector(".member-register-btn"),
    memberOverlayTitle: document.querySelector(".image-overlay h4"),
    memberOverlayDesc: document.querySelector(".image-overlay p"),

    // Member Page Specific Elements
    memberTabs: document.querySelectorAll(".member-tab"),
    memberFormTitles: document.querySelectorAll(".form-title"),
    memberFormLabels: document.querySelectorAll(".form-label"),
    memberFormInputs: document.querySelectorAll(".form-input"), // Placeholders need to be handled
    memberFormChecks: document.querySelectorAll(".form-check label"),
    memberFormLinks: document.querySelectorAll(".form-footer a, .forgot-password a, .switch-to-register, .switch-to-login, .back-to-home"),
    memberForgotPasswordLink: document.querySelector("#forgotPasswordLink"),

    memberSubmitBtns: document.querySelectorAll(".form-submit"),
    memberSectionFooterTexts: document.querySelectorAll(".form-footer p"),
    memberBenefitsTitle: document.querySelector(".member-benefits h4"),
    memberBenefitsList: document.querySelectorAll(".member-benefits li"),
    memberSuccessTitle: document.querySelector("#successMessage h3"),
    memberSuccessText: document.querySelector("#successMessage p"),

    certTitles: document.querySelectorAll(".cert-card h3"),
    certDescs: document.querySelectorAll(".cert-card p"),

    footerTagline: document.querySelector(".footer-tagline"),
    footerDesc: document.querySelector(".footer-desc"),
    footerNavTitle: document.querySelector(".footer-links h3"),
    footerInfoTitle: document.querySelector(".footer-contact h3"),
  };

  const translations = {
    id: {
      nav: ["BERANDA", "PRODUK", "LAYANAN", "SERTIFIKASI", "BERITA", "PROFIL"],
      heroTitle1: "",
      heroTitle2: "Mendukung Pertumbuhan Ekspor Nasional",
      heroSubtitle:
        "Aktif bergerak di sektor ekspor untuk mendukung produk lokal Indonesia menembus pasar global melalui pendampingan ekspor yang profesional.",
      heroBtnProduct: "LIHAT PRODUK",
      heroBtnMember: "DAFTAR MEMBER",

      sectionTitles: [
        "NILAI TAMBAH KAMI",
        "PRODUK KAMI",
        "LAYANAN KAMI",
        "SERTIFIKASI KAMI",
        "BERITA & UPDATE",
        "PROFIL LEMBAGA PENS",
        "AKUN MEMBER",
      ],
      sectionSubtitles: [
        "Mengapa memilih PENS sebagai mitra ekspor Anda",
        "Rempah-rempah berkualitas ekspor dengan standar internasional",
        "Solusi lengkap untuk ekspor rempah Anda",
        "Standar kualitas yang menjamin kepercayaan global",
        "Informasi terkini tentang pasar rempah dan regulasi ekspor",
        "Pegiat Ekspor Nusantara",
        "Daftar sebagai member untuk akses eksklusif",
      ],

      profileSubtitle: "Gambaran Umum",
      profileOverview: [
        "Pegiat Ekspor Nusantara (PENS) adalah lembaga pendukung dan promosi ekspor yang berfokus pada pemberdayaan bisnis Indonesia untuk menembus pasar internasional secara berkelanjutan.",
        "PENS berfungsi sebagai jembatan strategis antara pelaku usaha (terutama UMKM) dan ekosistem ekspor nasional serta global—termasuk pemerintah, lembaga keuangan, pembeli, dan mitra logistik.",
        "Melalui pendekatan pemberdayaan ekspor yang menyeluruh (end-to-end), PENS tidak hanya memberikan pelatihan dan konsultasi, tetapi juga dukungan praktis mulai dari tahap produk siap ekspor hingga barang tiba di pasar tujuan."
      ],

      profileSubtitle2: "Latar Belakang Pendirian PENS",
      profileBackground: [
        "PENS lahir dari kebutuhan nyata di lapangan: banyak wirausaha daerah potensial memiliki produk berkualitas, namun terhambat oleh pengetahuan ekspor, legalitas, pembiayaan, dan jaringan pembeli internasional.",
        "Melihat hal ini, para praktisi ekspor, konsultan perdagangan, dan pembina UMKM berkolaborasi membentuk wadah profesional bernama Pegiat Ekspor Nusantara (PENS) — untuk menciptakan ekosistem ekspor yang inklusif dan berdaya saing global."
      ],

      profileSubtitle3: "Visi",
      profileVision: '"Menjadi lembaga pendampingan ekspor terdepan di Indonesia yang mencetak eksportir tangguh, berdaya saing global, dan berkelanjutan."',

      profileSubtitle4: "Misi",
      profileMission: [
        "Memberdayakan UMKM dan pelaku usaha lokal untuk memahami dan menjalankan proses ekspor secara mandiri dan profesional.",
        "Membangun ekosistem ekspor yang terintegrasi melalui sinergi antara pelaku usaha, instansi pemerintah, perbankan, dan pembeli internasional.",
        "Meningkatkan kompetensi SDM ekspor nasional melalui pelatihan, sertifikasi profesi, dan pendampingan lapangan.",
        "Mendukung percepatan pertumbuhan ekonomi nasional dengan peningkatan volume dan kualitas ekspor produk unggulan daerah.",
        "Menjadi pusat informasi dan konsultasi ekspor yang kredibel dan berbasis data pasar global terkini."
      ],

      profileSubtitle5: "Keunggulan PENS",
      profileAdvantageTitles: [
        "Pendekatan Terintegrasi (End-to-End)",
        "Tim Profesional & Praktisi Ekspor Aktif",
        "Jaringan Nasional & Internasional",
        "Fokus pada UMKM & Produk Unggulan Daerah",
        "Berbasis Data & Teknologi",
        "Pendampingan Personal & Berkelanjutan",
        "Program Sertifikasi Kompetensi Ekspor"
      ],
      profileAdvantageDescs: [
        "PENS melayani secara utuh mulai konsultasi, kurasi, legalitas, pembiayaan, pengiriman, hingga sertifikasi profesi.",
        "Didukung oleh para praktisi perdagangan internasional, ekspor-impor, dan asesor sertifikasi BNSP yang berpengalaman.",
        "Terkoneksi dengan berbagai mitra strategis seperti Kementerian Perdagangan, Bea Cukai, LPEI, perbankan ekspor, dan pembeli luar negeri.",
        "PENS memprioritaskan bisnis daerah agar produk lokal bisa naik kelas ke pasar global.",
        "Menggunakan analisis pasar, trade map, dan perangkat digital untuk memetakan peluang ekspor yang relevan.",
        "Setiap peserta didampingi oleh mentor tetap, memastikan progres nyata dari tahap awal hingga pengiriman.",
        "PENS menyediakan jalur sertifikasi profesi resmi (BNSP) bagi SDM ekspor, memastikan standar kompetensi nasional."
      ],

      profileSubtitle6: "Nilai Inti PENS",
      profileCoreValueTitles: [
        "Profesionalisme",
        "Pemberdayaan",
        "Jejaring",
        "Keberlanjutan",
        "Integritas"
      ],
      profileCoreValueDescs: [
        "Memberikan layanan berdasarkan keahlian dan pengalaman nyata di sektor ekspor.",
        "Mendorong kemandirian bisnis untuk menembus pasar global.",
        "Membentuk kolaborasi luas dengan pemangku kepentingan nasional dan internasional.",
        "Mendorong ekspor berkelanjutan dan menciptakan dampak ekonomi bagi komunitas lokal.",
        "Menjunjung tinggi kejujuran, transparansi, dan tanggung jawab dalam setiap proses pendampingan."
      ],

      profileSubtitle7: "Tujuan Strategis PENS",
      profileObjectives: [
        "Meningkatkan jumlah eksportir baru dari kalangan UMKM.",
        "Mendorong pertumbuhan nilai ekspor produk lokal melalui pendampingan berkelanjutan.",
        "Menjadi mitra pemerintah dan swasta dalam pengembangan kapasitas ekspor nasional.",
        "Menjadi pusat pendidikan dan sertifikasi ekspor yang diakui secara nasional."
      ],

      profileSubtitle8: "TIM KAMI",
      founderNames: [
        "Erwin Gunawan Hutapea",
        "Adik Dwi Putranto",
        "Dr. Ir. Drajat Irawan, SE, SH, MT, MLSI",
        "KRT. Ari Prabowo, ST., CF.NLP.",
        "Dr. Endy Alim Abdi Nusa S.IP., M.M.",
        "Dr. Iwan S.Hut., MM."
      ],
      founderPositions: [
        "Founder & CEO",
        "Co-Founder & COO",
        "Co-Founder & CFO",
        "Co-Founder & CTO",
        "Co-Founder & CMO",
        "Co-Founder & CSO"
      ],
      founderBios: [
        "Praktisi ekspor dengan pengalaman 15+ tahun di bidang perdagangan internasional. Memiliki sertifikasi BNSP dan telah mendampingi ratusan UMKM menembus pasar global.",
        "Ahli manajemen operasional dengan spesialisasi supply chain dan logistik internasional. Berpengalaman mengelola ekspor ke 20+ negara di Asia, Eropa, dan Amerika.",
        "Konsultan keuangan dan pembiayaan ekspor dengan track record membantu UMKM mendapatkan akses permodalan dari berbagai lembaga keuangan nasional dan internasional.",
        "Ahli teknologi dan transformasi digital dengan pengalaman dalam mengembangkan sistem ekspor berbasis teknologi untuk meningkatkan efisiensi dan daya saing global.",
        "Pakar strategi pemasaran internasional dengan keahlian dalam membangun brand awareness dan penetrasi pasar global untuk produk-produk unggulan Indonesia.",
        "Ahli strategi bisnis dan pengembangan kemitraan strategis dengan jaringan luas di berbagai negara untuk membuka peluang ekspor bagi pelaku usaha Indonesia."
      ],

      valueTitles: [
        "Pendekatan Terintegrasi",
        "Berbasis Praktik",
        "Berorientasi Hasil",
        "Jejaring Luas",
      ],
      valueDescs: [
        "Seluruh layanan saling terhubung—mulai dari produk, legalitas, pembiayaan, hingga pengiriman.",
        "PENS melibatkan eksportir aktif yang berpengalaman di lapangan, bukan sekadar konsultan teoritis.",
        "Setiap layanan diukur dari pencapaian nyata (produk siap ekspor, deal pembeli, atau dokumen selesai).",
        "Kolaborasi erat dengan pemerintah, asosiasi ekspor, dan jaringan pembeli global.",
      ],

      productNames: [
        "Cengkeh Organik",
        "Kayu Manis Jawa",
        "Pala Bubuk Organik",
        "Skintific Skincare",
        "G2G Skincare (Glad2Glow)",
        "Chanel (Parfum & Kosmetik)",
      ],
      productDescs: [
        "Cengkeh berkualitas tinggi dari perkebunan organik dengan kadar minyak atsiri optimal untuk industri farmasi dan makanan.",
        "Kayu manis asli Jawa dengan aroma kuat dan kadar cinnamaldehyde tinggi, ideal untuk industri farmasi dan minuman.",
        "Pala bubuk halus dengan tingkat kehalusan 80 mesh, tanpa bahan pengawet untuk industri makanan premium.",
        "Brand skincare populer kategori kecantikan dengan sertifikasi BPOM untuk pasar ekspor distributor.",
        "Brand skincare populer Indonesia untuk skin barrier, jerawat, dan kulit kusam dengan bahan aktif Ceramide, Centella, dan Niacinamide.",
        "Showcase kosmetik dan parfum mewah. Ekspor berbasis permintaan khusus (Non-retail).",
      ],
      productTags: ["REMPAH", "REMPAH", "REMPAH", "BEAUTY", "BEAUTY", "LUXURY"],
      productDetailLabels: [
        "Asal", "Kapasitas", "MOQ", "Dokumen",
        "Asal", "Kapasitas", "MOQ", "Dokumen",
        "Asal", "Kapasitas", "MOQ", "Dokumen",
        "Kategori", "Sertifikasi", "MOQ", "Export",
        "Kategori", "Sertifikasi", "MOQ", "Export",
        "Kategori", "Sistem", "Pasar", "Status"
      ],
      productDetailValues: [
        "Jawa Timur, Indonesia", "50 Ton/Bulan", "1 Drum (25kg)", "COO, Phytosanitary, Organic",
        "Jawa, Indonesia", "30 Ton/Bulan", "1 Drum (20kg)", "COO, Phytosanitary",
        "Indonesia", "10 Ton/Bulan", "1kg & Bulk", "COO, Organic Cert",
        "Beauty & Skincare", "BPOM", "Bulk / Distributor", "Authorized Distributor",
        "Beauty & Skincare", "BPOM, Halal", "Bulk / Distributor", "Authorized Distributor",
        "Luxury Cosmetics", "Request-Based", "Non-Retail Export", "Showcase Only"
      ],
      productSpecs: [
        "Lal Pari", "Organic Certified", "High Essential Oil",
        "Grade A", "Javanese Cassia", "Natural Aroma",
        "80 Mesh", "Organic", "Premium Food",
        "BPOM", "Popular Brand", "Bulk Export",
        "Viral Brand", "BPOM", "Active Ingredients",
        "Authentic", "Special Request", "Global Export"
      ],
      quoteBtn: "Minta Penawaran",
      consult: "Chat WhatsApp",
      consultBtn: "KONSULTASI PRODUK",

      serviceTitles: [
        "Konsultasi Ekspor",
        "Kurasi Produk",
        "Bantuan Legalitas",
        "Bantuan Pendanaan",
        "Bantuan Pengiriman",
        "Sertifikasi Profesi",
        "Kepatuhan Regulasi",
      ],
      serviceDescs: [
        "Layanan ini membantu bisnis memahami potensi ekspor produk, regulasi yang berlaku, dan strategi penetrasi pasar luar negeri.",
        "Kurasi produk bertujuan memastikan produk memenuhi standar internasional dari segi kualitas, kemasan, dan daya saing harga.",
        "Membantu pelaku usaha mengurus dokumen dan legalitas ekspor seperti NIB, izin usaha, HS Code, dan perizinan negara tujuan.",
        "Menyediakan solusi pembiayaan bagi bisnis yang membutuhkan modal kerja untuk kegiatan ekspor melalui lembaga keuangan atau kredit ekspor.",
        "Layanan ini membantu proses logistik ekspor, mulai dari pemilihan metode pengiriman, negosiasi dengan freight forwarder, hingga pengurusan dokumen pengiriman (Bill of Lading, Packing List, Invoice, dsb).",
        "Layanan ini bertujuan meningkatkan kapasitas SDM ekspor dengan memberikan pelatihan dan sertifikasi profesi dari lembaga resmi (seperti BNSP). Peserta akan mendapatkan pengakuan kompetensi ekspor.",
        "Akses lengkap ke portal dan regulasi pemerintah Indonesia terkait ekspor-impor, standardisasi, dan persyaratan teknis untuk memastikan kepatuhan penuh dalam setiap transaksi perdagangan internasional.",
      ],
      serviceFeatures: [
        "Registrasi & Identifikasi", "Analisis Potensi Pasar", "Sesi Konsultasi Ekspert", "Rekomendasi & Follow-up",
        "Pengumpulan Data Produk", "Evaluasi Kelayakan", "Rekomendasi Perbaikan", "Revalidasi Produk",
        "Inventaris Dokumen", "Identifikasi Izin", "Pendampingan Proses", "Verifikasi & Selesai",
        "Analisis Kebutuhan", "Pemilihan Skema", "Bantuan Administrasi", "Monitoring & Evaluasi",
        "Penentuan Rute", "Mitra Logistik", "Dokumen Ekspor", "Monitoring Pengiriman",
        "Registrasi Peserta", "Pelatihan & Materi", "Uji Kompetensi", "Penerbitan Sertifikat",
        "Portal EXIM Kemendag", "PP No. 29/2021", "Permendag No. 36/2023", "Ditjen Daglu"
      ],

      newsLink: "BACA SELENGKAPNYA →",
      newsMonths: ["DES", "DES", "DES", "DES", "DES"],
      newsCategories: ["REGULASI", "PELUANG EKSPOR", "UMKM", "IMPOR", "PASAR INTERNASIONAL"],
      newsTitles: [
        "Perubahan Regulasi Ekspor Jawa Timur 2024: Peluang Baru bagi Eksportir",
        "Permintaan Rempah Jawa Timur Meningkat 35% di Pasar Timur Tengah",
        "Program Akselerasi Ekspor UMKM Jawa Timur: 150 Pelaku Usaha Siap Go Global",
        "Jawa Timur Buka Jalur Impor Bahan Baku Industri: Efisiensi Biaya hingga 30%",
        "Produk Jawa Timur Tembus Pasar Eropa: Nilai Transaksi Capai €12 Juta"
      ],
      newsExcerpts: [
        `<strong>Surabaya, 12 Desember 2024</strong> — Pemerintah Provinsi Jawa Timur resmi menerapkan regulasi ekspor terbaru yang mempermudah proses perizinan bagi pelaku usaha lokal. Peraturan ini mencakup penyederhanaan dokumen ekspor, percepatan penerbitan Certificate of Origin (COO), dan digitalisasi layanan melalui sistem OSS (Online Single Submission).<br><br>Kebijakan ini diharapkan dapat meningkatkan daya saing produk Jawa Timur di pasar global, khususnya untuk komoditas unggulan seperti rempah-rempah, furniture, dan produk kerajinan. Eksportir kini dapat mengurus seluruh dokumen ekspor dalam waktu maksimal 3 hari kerja.<br><br><em>Butuh bantuan memahami regulasi ekspor terbaru? Konsultasikan dengan tim ahli kami untuk memastikan bisnis Anda tetap compliant dan siap ekspor.</em>`,
        `<strong>Malang, 10 Desember 2024</strong> — Data Dinas Perdagangan Jawa Timur menunjukkan lonjakan permintaan rempah-rempah dari negara-negara Timur Tengah mencapai 35% pada kuartal IV 2024. Produk unggulan seperti cengkeh, kayu manis, dan pala dari Jawa Timur semakin diminati karena kualitas premium dan sertifikasi halal.<br><br>Negara tujuan utama meliputi Arab Saudi, Uni Emirat Arab, dan Qatar. Peluang ini terbuka lebar bagi eksportir yang mampu memenuhi standar kualitas internasional dan volume pengiriman konsisten. Pemerintah daerah juga memberikan insentif khusus berupa subsidi logistik hingga 20% untuk eksportir baru.<br><br><em>Tertarik memanfaatkan peluang ekspor ke Timur Tengah? Hubungi kami untuk pendampingan ekspor dari A hingga Z.</em>`,
        `<strong>Surabaya, 8 Desember 2024</strong> — Pemerintah Provinsi Jawa Timur meluncurkan program akselerasi ekspor khusus UMKM dengan target memberdayakan 150 pelaku usaha pada tahun 2024. Program ini mencakup pelatihan ekspor, pendampingan legalitas, kurasi produk, hingga matchmaking dengan buyer internasional.<br><br>Peserta program akan mendapatkan akses ke platform e-commerce global, sertifikasi produk gratis, dan bantuan pembiayaan ekspor melalui skema kredit lunak. Fokus komoditas meliputi produk makanan olahan, kerajinan tangan, furniture, dan tekstil. Hingga kini, 45 UMKM telah berhasil melakukan transaksi ekspor perdana dengan nilai total mencapai Rp 8,5 miliar.<br><br><em>UMKM Anda ingin ikut program ekspor? Daftar sekarang dan dapatkan pendampingan gratis dari mentor bersertifikat!</em>`,
        `<strong>Gresik, 5 Desember 2024</strong> — Pelabuhan Tanjung Perak Surabaya kini menjadi pintu masuk utama impor bahan baku industri untuk wilayah Jawa Timur dan sekitarnya. Pemerintah daerah bekerja sama dengan Bea Cukai menyediakan layanan fast-track clearance untuk importir terdaftar, mengurangi waktu proses hingga 50%.<br><br>Kebijakan ini sangat menguntungkan industri manufaktur, farmasi, dan food & beverage yang membutuhkan bahan baku impor berkualitas tinggi. Dengan jalur impor yang lebih efisien, pelaku usaha dapat menghemat biaya logistik hingga 30% dan meningkatkan produktivitas. Layanan konsultasi impor juga tersedia untuk membantu pengusaha memahami regulasi dan dokumen yang diperlukan.<br><br><em>Butuh bantuan mengurus impor bahan baku? Tim kami siap membantu proses impor Anda dari awal hingga barang tiba di gudang.</em>`,
        `<strong>Surabaya, 2 Desember 2024</strong> — Eksportir Jawa Timur mencatatkan prestasi gemilang dengan nilai transaksi ekspor ke pasar Eropa mencapai €12 juta pada semester II 2024. Produk unggulan yang paling diminati adalah rempah organik, furniture kayu jati, dan produk skincare halal.<br><br>Kesuksesan ini didukung oleh partisipasi aktif dalam trade mission dan pameran internasional seperti Anuga (Jerman) dan SIAL Paris (Prancis). Buyer Eropa sangat menghargai kualitas produk Indonesia yang memenuhi standar EU Organic, Fair Trade, dan sustainability. Pemerintah Jawa Timur berkomitmen terus membuka akses pasar baru di kawasan Eropa Timur dan Skandinavia.<br><br><em>Ingin produk Anda masuk pasar Eropa? Dapatkan panduan lengkap dan koneksi buyer dari kami!</em>`
      ],
      newsLinkTexts: [
        "KONSULTASI SEKARANG →",
        "PELAJARI LEBIH LANJUT →",
        "DAFTAR PROGRAM →",
        "KONSULTASI IMPOR →",
        "HUBUNGI KAMI →"
      ],
      viewAllProductsBtn: "LIHAT SEMUA PRODUK",
      viewAllNewsBtn: "LIHAT SEMUA BERITA",

      footerWhatsapp: "KONSULTASI WHATSAPP",

      slogan: '"Dari Nusantara ke Dunia — Bersama PENS, Ekspor Jadi Nyata."',

      memberSubtitle: "Daftar sebagai member untuk akses eksklusif",
      memberFeatureTitles: [
        "Katalog Lengkap",
        "Permintaan Penawaran",
        "Tracking Pengiriman",
        "Market Insights"
      ],
      memberFeatureDescs: [
        "Akses katalog produk lengkap dengan spesifikasi detail",
        "Ajukan permintaan penawaran khusus untuk member",
        "Lacak status pengiriman pesanan Anda secara real-time",
        "Akses analisis pasar dan update harga terkini"
      ],
      memberLoginBtn: "LOGIN MEMBER",
      memberRegisterBtn: "DAFTAR MEMBER BARU",
      memberOverlayTitle: "Portal Member Eksklusif",
      memberOverlayDesc: "Kelola semua kebutuhan ekspor Anda di satu tempat",

      // Member Page Translations
      memberTabs: ["LOGIN MEMBER", "DAFTAR BARU"],
      memberFormTitles: ["Login ke Akun Anda", "Daftar Member Baru", "Reset Password"],
      memberFormLabels: [
        "Email atau Username", "Password", // Login form
        "Nama Lengkap", "Nama Perusahaan", "Email", "Nomor Telepon", "Password", "Konfirmasi Password", "Negara", "Jenis Bisnis", // Register form
        "Email atau Username", "Password", // Login form
        "Nama Lengkap", "Nama Perusahaan", "Email", "Nomor Telepon", "Password", "Konfirmasi Password", "Negara", "Jenis Bisnis", // Register form
        "Email Terdaftar" // Reset form
      ],
      memberForgotPassword: "Lupa Password?",
      memberPlaceholders: [
        "masukan email atau username", "masukan password", // Login
        "masukan nama lengkap", "masukan nama perusahaan", "masukan email", "masukan nomor telepon", "buat password (minimal 8 karakter)", "ulangi password", // Register inputs
        "masukan email yang terdaftar" // Reset input
      ],
      memberSelectOptions: {
        country: "Pilih negara",
        businessType: "Pilih jenis bisnis"
      },
      memberFormChecks: [
        "Ingat saya",
        "Saya setuju dengan Syarat & Ketentuan dan Kebijakan Privasi",
        "Saya ingin menerima update produk dan promosi via email"
      ],
      memberSubmitBtns: [
        "LOGIN", "DAFTAR SEKARANG", "LOGIN SEKARANG", "KIRIM LINK RESET"
      ],
      memberSectionFooterTexts: [
        "Belum punya akun? Daftar disini",
        "Sudah punya akun? Login disini",
        "Ingat password? Login disini",
        "Belum punya akun? Daftar disini"
      ],
      memberBenefitsTitle: "Keuntungan Menjadi Member:",
      memberBenefitsList: [
        "Akses katalog produk lengkap dengan spesifikasi detail",
        "Permintaan penawaran khusus untuk member",
        "Tracking pengiriman pesanan secara real-time",
        "Analisis pasar dan update harga terkini",
        "Konsultasi ekspor gratis dengan tim ahli",
        "Akses ke webinar dan training ekspor"
      ],
      memberSuccessTitle: "Pendaftaran Berhasil!",
      memberSuccessText: "Akun Anda telah berhasil dibuat. Silakan cek email Anda untuk verifikasi akun sebelum login.",

      serviceDetailBtn: "Lihat Detail Keunggulan",

      certTitles: [
        "Sertifikasi Organik",
        "Sertifikasi Halal",
        "ISO 9001:2015",
        "FDA Registered"
      ],
      certDescs: [
        "Sertifikasi organik dari lembaga terakreditasi internasional untuk semua produk kami.",
        "Sertifikat halal MUI dan lembaga halal internasional untuk pasar global.",
        "Sistem manajemen mutu bersertifikat internasional untuk proses bisnis kami.",
        "Terdaftar di Food and Drug Administration USA untuk ekspor ke Amerika."
      ],

      footerTagline: "Mendukung Pertumbuhan Ekspor Nasional",
      footerDesc:
        "Aktif bergerak di sektor ekspor untuk mendukung produk lokal Indonesia menembus pasar global melalui pendampingan ekspor yang profesional.",
      footerNavTitle: "NAVIGASI",
      footerInfoTitle: "INFORMASI",
    },

    en: {
      nav: ["HOME", "PRODUCTS", "SERVICES", "CERTIFICATIONS", "NEWS", "PROFILE"],
      heroTitle1: "",
      heroTitle2: "Supporting National Export Growth",
      heroSubtitle:
        "Actively engaged in the export sector to support local Indonesian products in penetrating the global market through professional export assistance.",
      heroBtnProduct: "VIEW PRODUCTS",
      heroBtnMember: "JOIN MEMBER",

      sectionTitles: [
        "OUR ADDED VALUE",
        "OUR PRODUCTS",
        "OUR SERVICES",
        "OUR CERTIFICATIONS",
        "NEWS & UPDATES",
        "PROFILE OF THE PENS INSTITUTION",
        "MEMBER ACCOUNT",
      ],
      sectionSubtitles: [
        "Why choose PENS as your export partner",
        "Export-quality spices with international standards",
        "Complete solutions for your spice exports",
        "Quality standards trusted worldwide",
        "Latest updates on spice markets and export regulations",
        "Nusantara Export Activists",
        "Register as a member for exclusive access",
      ],

      profileSubtitle: "General Overview",
      profileOverview: [
        "Pegiat Ekspor Nusantara (PENS) is an export support and promotion agency focused on empowering Indonesian businesses to sustainably penetrate international markets.",
        "PENS serves as a strategic bridge between businesses (especially MSMEs) and the national and global export ecosystem—including the government, financial institutions, buyers, and logistics partners.",
        "Through an end-to-end export empowerment approach, PENS provides not only training and consultation, but also practical support from the export-ready product stage until the goods arrive at their destination market."
      ],

      profileSubtitle2: "Background to the Establishment of PENS",
      profileBackground: [
        "PENS was born out of a real need in the field: many potential regional entrepreneurs possess quality products, but are hampered by export knowledge, legality, financing, and international buyer networks.",
        "Seeing this, export practitioners, trade consultants, and MSME mentors collaborated to form a professional organization called Pegiat Ekspor Nusantara (PENS) — to create an inclusive and globally competitive export ecosystem."
      ],

      profileSubtitle3: "Vision",
      profileVision: '"To become a leading export assistance agency in Indonesia, producing resilient, globally competitive, and sustainable exporters."',

      profileSubtitle4: "Mission",
      profileMission: [
        "Empowering MSMEs and local businesses to understand and carry out the export process independently and professionally.",
        "Building an integrated export ecosystem through synergy between businesses, government agencies, banks, and international buyers.",
        "Improving the competence of national export human resources through training, professional certification, and field mentoring.",
        "Supporting the acceleration of national economic growth by increasing the volume and quality of exports of superior regional products.",
        "Becoming a credible export information and consultation center based on the latest global market data."
      ],

      profileSubtitle5: "PENS Advantages",
      profileAdvantageTitles: [
        "Integrated (End-to-End) Approach",
        "Professional Team & Active Export Practitioners",
        "National & International Network",
        "Focus on MSMEs & Regionally Prominent Products",
        "Data & Technology-Driven",
        "Personal & Ongoing Mentoring",
        "Export Competency Certification Program"
      ],
      profileAdvantageDescs: [
        "PENS provides comprehensive services ranging from consultation, curation, legality, financing, shipping, to professional certification.",
        "Supported by experienced practitioners in international trade, export-import, and BNSP certification.",
        "Connected with various strategic partners such as the Ministry of Trade, Customs, Excise, LPEI (Indonesian Institute of Excise), export banks, and foreign buyers.",
        "PENS prioritizes regional businesses so that local products can advance to the global market.",
        "Using market analysis, trade maps, and digital tools to identify relevant export opportunities.",
        "Each participant is accompanied by a permanent mentor, ensuring tangible progress from the initial stage to delivery.",
        "PENS provides an official professional certification pathway (BNSP) for export-related human resources, ensuring national competency standards."
      ],

      profileSubtitle6: "PENS Core Values",
      profileCoreValueTitles: [
        "Professionalism",
        "Empowerment",
        "Networking",
        "Sustainability",
        "Integrity"
      ],
      profileCoreValueDescs: [
        "Providing services based on expertise and real-world experience in the export sector.",
        "Encouraging business independence to penetrate the global market.",
        "Forming extensive collaboration with national and international stakeholders.",
        "Encouraging sustainable exports and creating economic impact for local communities.",
        "Upholding honesty, transparency, and responsibility in every mentoring process."
      ],

      profileSubtitle7: "PENS Strategic Objectives",
      profileObjectives: [
        "Increase the number of new exporters from the MSME sector.",
        "Encourage the growth of local product export value through ongoing mentoring.",
        "Become a partner of the government and the private sector in developing national export capacity.",
        "Become an officially recognized national center for export education and certification."
      ],

      profileSubtitle8: "OUR TEAM",
      founderNames: [
        "Erwin Gunawan Hutapea",
        "Adik Dwi Putranto",
        "Dr. Ir. Drajat Irawan, SE, SH, MT, MLSI",
        "KRT. Ari Prabowo, ST., CF.NLP.",
        "Dr. Endy Alim Abdi Nusa S.IP., M.M.",
        "Dr. Iwan S.Hut., MM."
      ],
      founderPositions: [
        "Founder & CEO",
        "Co-Founder & COO",
        "Co-Founder & CFO",
        "Co-Founder & CTO",
        "Co-Founder & CMO",
        "Co-Founder & CSO"
      ],
      founderBios: [
        "Export practitioner with 15+ years of experience in international trade. Holds BNSP certification and has mentored hundreds of MSMEs to penetrate global markets.",
        "Operational management expert specializing in supply chain and international logistics. Experienced in managing exports to 20+ countries across Asia, Europe, and America.",
        "Financial and export financing consultant with a track record of helping MSMEs gain access to capital from various national and international financial institutions.",
        "Technology and digital transformation expert with experience in developing technology-based export systems to improve efficiency and global competitiveness.",
        "International marketing strategy expert with expertise in building brand awareness and global market penetration for Indonesia's superior products.",
        "Business strategy expert and strategic partnership development with extensive networks across various countries to open export opportunities for Indonesian businesses."
      ],

      valueTitles: [
        "Integrated Approach",
        "Practice-Based",
        "Result-Oriented",
        "Extensive Network",
      ],
      valueDescs: [
        "All services are interconnected—from products, legality, financing, to shipping.",
        "PENS engages active exporters experienced in the field, not just theoretical consultants.",
        "Each service is measured by tangible achievements (export-ready products, buyer deals, or completed documents).",
        "Close collaboration with governments, export associations, and global buyers.",
      ],

      productNames: [
        "Organic Cloves",
        "Javanese Cinnamon",
        "Organic Nutmeg Powder",
        "Skintific Skincare",
        "G2G Skincare (Glad2Glow)",
        "Chanel (Perfume & Cosmetics)",
      ],
      productDescs: [
        "High-quality cloves from organic plantations with optimal essential oil content for pharmaceutical and food industries.",
        "Authentic Javanese cinnamon with strong aroma and high cinnamaldehyde content.",
        "Fine nutmeg powder, 80 mesh, without preservatives for the premium food industry.",
        "Popular skincare brand in beauty category with BPOM certification for distributor export market.",
        "Popular Indonesian skincare brand (Glad2Glow) for skin barrier, acne, and dull skin with active ingredients Ceramide, Centella, and Niacinamide.",
        "Luxury showcase only. Request-based export for non-retail markets.",
      ],
      productTags: ["SPICES", "SPICES", "SPICES", "BEAUTY", "BEAUTY", "LUXURY"],
      productDetailLabels: [
        "Origin", "Capacity", "MOQ", "Documents",
        "Origin", "Capacity", "MOQ", "Documents",
        "Origin", "Capacity", "MOQ", "Documents",
        "Category", "Certification", "MOQ", "Export",
        "Category", "Certification", "MOQ", "Export",
        "Category", "System", "Market", "Status"
      ],
      productDetailValues: [
        "East Java, Indonesia", "50 Tons/Month", "1 Drum (25kg)", "COO, Phytosanitary, Organic",
        "Java, Indonesia", "30 Tons/Month", "1 Drum (20kg)", "COO, Phytosanitary",
        "Indonesia", "10 Tons/Month", "1kg & Bulk", "COO, Organic Cert",
        "Beauty & Skincare", "BPOM", "Bulk / Distributor", "Authorized Distributor",
        "Beauty & Skincare", "BPOM, Halal", "Bulk / Distributor", "Authorized Distributor",
        "Luxury Cosmetics", "Request-Based", "Non-Retail Export", "Showcase Only"
      ],
      productSpecs: [
        "Lal Pari", "Organic Certified", "High Essential Oil",
        "Grade A", "Javanese Cassia", "Natural Aroma",
        "80 Mesh", "Organic", "Premium Food",
        "BPOM", "Popular Brand", "Bulk Export",
        "Viral Brand", "BPOM", "Active Ingredients",
        "Authentic", "Special Request", "Global Export"
      ],
      quoteBtn: "Request Quotation",
      consult: "WhatsApp Chat",
      consultBtn: "PRODUCT INQUIRY",

      serviceTitles: [
        "Export Consultation",
        "Product Curation",
        "Legality Assistance",
        "Export Financing Assistance",
        "Shipping Assistance",
        "Professional Certification",
        "Regulatory Compliance",
      ],
      serviceDescs: [
        "This service helps businesses understand their product's export potential, applicable regulations, and foreign market penetration strategies.",
        "Product curation aims to ensure products meet international standards in terms of quality, packaging, and price competitiveness.",
        "Assisting business owners in processing documents and legal requirements for export, such as NIB, business permits, HS Codes, and destination country permits.",
        "Provides financing solutions for businesses requiring working capital for export activities, either through financial institutions, government export financing, or export credit schemes.",
        "This service assists with the export logistics process, from selecting a shipping method and negotiating with freight forwarders to preparing shipping documents (Bill of Lading, Packing List, Invoice, etc.).",
        "This service aims to increase the capacity of export human resources by providing training and professional certification from official institutions (e.g., BNSP). Participants will gain a comprehensive understanding of the export process and receive competency recognition.",
        "Complete access to Indonesian government portals and regulations related to export-import, standardization, and technical requirements to ensure full compliance in every international trade transaction.",
      ],
      serviceFeatures: [
        "Registration & Identification", "Market Potential Analysis", "Expert Consultation Session", "Recommendation & Follow-up",
        "Product Data Collection", "Feasibility Evaluation", "Improvement Recommendation", "Product Revalidation",
        "Document Inventory", "Permit Identification", "Process Assistance", "Verification & Completion",
        "Needs Analysis", "Scheme Selection", "Administrative Assistance", "Monitoring & Evaluation",
        "Route Determination", "Logistics Partners", "Export Documents", "Delivery Monitoring",
        "Participant Registration", "Training & Materials", "Competency Test", "Certificate Issuance",
        "Ministry of Trade EXIM Portal", "GR No. 29/2021", "MoT Reg No. 36/2023", "DG of Foreign Trade"
      ],

      newsLink: "READ MORE →",
      newsMonths: ["DEC", "DEC", "DEC", "DEC", "DEC"],
      newsCategories: ["REGULATIONS", "EXPORT OPPORTUNITIES", "MSMEs", "IMPORTS", "INTERNATIONAL MARKETS"],
      newsTitles: [
        "East Java Export Regulation Changes 2024: New Opportunities for Exporters",
        "East Java Spice Demand Increases 35% in Middle Eastern Markets",
        "East Java MSME Export Acceleration Program: 150 Businesses Ready to Go Global",
        "East Java Opens Industrial Raw Material Import Routes: Cost Efficiency up to 30%",
        "East Java Products Penetrate European Markets: Transaction Value Reaches €12 Million"
      ],
      newsExcerpts: [
        `<strong>Surabaya, December 12, 2024</strong> — The East Java Provincial Government has officially implemented new export regulations that simplify the licensing process for local businesses. These regulations include streamlining export documents, accelerating the issuance of Certificates of Origin (COO), and digitizing services through the OSS (Online Single Submission) system.<br><br>This policy is expected to increase the competitiveness of East Java products in global markets, especially for leading commodities such as spices, furniture, and handicraft products. Exporters can now process all export documents within a maximum of 3 working days.<br><br><em>Need help understanding the latest export regulations? Consult with our expert team to ensure your business remains compliant and export-ready.</em>`,
        `<strong>Malang, December 10, 2024</strong> — Data from the East Java Trade Office shows a surge in spice demand from Middle Eastern countries reaching 35% in Q4 2024. Premium products such as cloves, cinnamon, and nutmeg from East Java are increasingly sought after due to their premium quality and halal certification.<br><br>Main destination countries include Saudi Arabia, United Arab Emirates, and Qatar. This opportunity is wide open for exporters who can meet international quality standards and consistent shipping volumes. The local government also provides special incentives in the form of logistics subsidies of up to 20% for new exporters.<br><br><em>Interested in taking advantage of export opportunities to the Middle East? Contact us for export assistance from A to Z.</em>`,
        `<strong>Surabaya, December 8, 2024</strong> — The East Java Provincial Government launched a special MSME export acceleration program targeting 150 businesses in 2024. This program includes export training, legality assistance, product curation, and matchmaking with international buyers.<br><br>Program participants will gain access to global e-commerce platforms, free product certification, and export financing assistance through soft loan schemes. Focus commodities include processed food products, handicrafts, furniture, and textiles. To date, 45 MSMEs have successfully completed their first export transactions with a total value of IDR 8.5 billion.<br><br><em>Want your MSME to join the export program? Register now and get free mentoring from certified mentors!</em>`,
        `<strong>Gresik, December 5, 2024</strong> — Tanjung Perak Port Surabaya is now the main entry point for industrial raw material imports for East Java and surrounding areas. The local government in collaboration with Customs provides fast-track clearance services for registered importers, reducing processing time by up to 50%.<br><br>This policy greatly benefits manufacturing, pharmaceutical, and food & beverage industries that require high-quality imported raw materials. With more efficient import routes, businesses can save logistics costs by up to 30% and increase productivity. Import consultation services are also available to help entrepreneurs understand the regulations and required documents.<br><br><em>Need help managing raw material imports? Our team is ready to assist your import process from start to finish until goods arrive at the warehouse.</em>`,
        `<strong>Surabaya, December 2, 2024</strong> — East Java exporters recorded brilliant achievements with export transaction values to European markets reaching €12 million in the second semester of 2024. The most sought-after flagship products are organic spices, teak wood furniture, and halal skincare products.<br><br>This success is supported by active participation in trade missions and international exhibitions such as Anuga (Germany) and SIAL Paris (France). European buyers highly appreciate the quality of Indonesian products that meet EU Organic, Fair Trade, and sustainability standards. The East Java Government is committed to continuing to open new market access in Eastern Europe and Scandinavia.<br><br><em>Want your products to enter the European market? Get complete guidance and buyer connections from us!</em>`
      ],
      newsLinkTexts: [
        "CONSULT NOW →",
        "LEARN MORE →",
        "REGISTER PROGRAM →",
        "IMPORT CONSULTATION →",
        "CONTACT US →"
      ],
      viewAllProductsBtn: "VIEW ALL PRODUCTS",
      viewAllNewsBtn: "VIEW ALL NEWS",

      footerWhatsapp: "WHATSAPP CONSULTATION",

      slogan: '"From the Archipelago to the World — With PENS, Exports Become a Reality."',

      memberSubtitle: "Register as a member for exclusive access",
      memberFeatureTitles: [
        "Complete Catalog",
        "Request for Quotation",
        "Shipment Tracking",
        "Market Insights"
      ],
      memberFeatureDescs: [
        "Access complete product catalog with detailed specifications",
        "Submit special quotation requests for members",
        "Track your order shipment status in real-time",
        "Access market analysis and latest price updates"
      ],
      memberLoginBtn: "MEMBER LOGIN",
      memberRegisterBtn: "REGISTER NEW MEMBER",
      memberOverlayTitle: "Exclusive Member Portal",
      memberOverlayDesc: "Manage all your export needs in one place",

      // Member Page Translations
      memberTabs: ["MEMBER LOGIN", "REGISTER"],
      memberFormTitles: ["Login to Your Account", "Register New Member", "Reset Password"],
      memberFormLabels: [
        "Email or Username", "Password", // Login form
        "Full Name", "Company Name", "Email", "Phone Number", "Password", "Confirm Password", "Country", "Business Type", // Register form
        "Email or Username", "Password", // Login form
        "Full Name", "Company Name", "Email", "Phone Number", "Password", "Confirm Password", "Country", "Business Type", // Register form
        "Registered Email" // Reset form
      ],
      memberForgotPassword: "Forgot Password?",
      memberPlaceholders: [
        "enter email or username", "enter password", // Login
        "enter full name", "enter company name", "enter email", "enter phone number", "create password (min 8 chars)", "repeat password", // Register inputs
        "enter registered email" // Reset input
      ],
      memberSelectOptions: {
        country: "Select country",
        businessType: "Select business type"
      },
      memberFormChecks: [
        "Remember me",
        "I agree to the Terms & Conditions and Privacy Policy",
        "I want to receive product updates and promotions via email"
      ],
      memberSubmitBtns: [
        "LOGIN", "REGISTER NOW", "LOGIN NOW", "SEND RESET LINK"
      ],
      memberSectionFooterTexts: [
        "Don't have an account? Register here",
        "Already have an account? Login here",
        "Remember password? Login here",
        "Don't have an account? Register here"
      ],
      memberBenefitsTitle: "Member Benefits:",
      memberBenefitsList: [
        "Access complete product catalog with detailed specifications",
        "Special quotation requests for members",
        "Real-time order shipment tracking",
        "Market analysis and latest price updates",
        "Free export consultation with expert team",
        "Access to export webinars and training"
      ],
      memberSuccessTitle: "Registration Successful!",
      memberSuccessText: "Your account has been created successfully. Please check your email to verify your account before logging in.",

      serviceDetailBtn: "View Details",

      certTitles: [
        "Organic Certification",
        "Halal Certification",
        "ISO 9001:2015",
        "FDA Registered"
      ],
      certDescs: [
        "Organic certification from internationally accredited institutions for all our products.",
        "Halal certificate from MUI and international halal institutions for the global market.",
        "Internationally certified quality management system for our business processes.",
        "Registered with the Food and Drug Administration USA for export to America."
      ],

      footerTagline: "Supporting National Export Growth",
      footerDesc:
        "Actively engaged in the export sector to support local Indonesian products in penetrating the global market through professional export assistance.",
      footerNavTitle: "NAVIGATION",
      footerInfoTitle: "INFORMATION",
    },
  };

  function setLanguage(lang) {
    elements.nav.forEach((el, i) => (el.textContent = translations[lang].nav[i]));
    if (elements.heroTitle1) elements.heroTitle1.textContent = translations[lang].heroTitle1;
    if (elements.heroTitle2) elements.heroTitle2.textContent = translations[lang].heroTitle2;
    if (elements.heroSubtitle) elements.heroSubtitle.textContent = translations[lang].heroSubtitle;
    if (elements.heroBtnProduct) elements.heroBtnProduct.innerHTML = `<i class="fas fa-boxes"></i> ${translations[lang].heroBtnProduct}`;
    if (elements.heroBtnMember) elements.heroBtnMember.innerHTML = `<i class="fas fa-user"></i> ${translations[lang].heroBtnMember}`;

    elements.sectionTitles.forEach(
      (el, i) => (el.textContent = translations[lang].sectionTitles[i])
    );
    elements.sectionSubtitles.forEach(
      (el, i) => (el.textContent = translations[lang].sectionSubtitles[i])
    );

    elements.productNames.forEach(
      (el, i) => (el.textContent = translations[lang].productNames[i])
    );
    elements.productDescs.forEach(
      (el, i) => (el.textContent = translations[lang].productDescs[i])
    );
    elements.productTags.forEach(
      (el, i) => (el.textContent = translations[lang].productTags[i])
    );
    elements.productDetailLabels.forEach(
      (el, i) => (el.textContent = translations[lang].productDetailLabels[i])
    );
    elements.productDetailValues.forEach(
      (el, i) => (el.textContent = translations[lang].productDetailValues[i])
    );
    elements.productSpecs.forEach(
      (el, i) => (el.textContent = translations[lang].productSpecs[i])
    );
    elements.quoteBtns.forEach(
      (el) => (el.innerHTML = `<i class="fas fa-file-invoice"></i> ${translations[lang].quoteBtn}`)
    );
    elements.consultBtns.forEach(
      (el) => (el.innerHTML = `<i class="fab fa-whatsapp"></i> ${translations[lang].consult}`)
    );

    elements.serviceTitles.forEach(
      (el, i) => (el.textContent = translations[lang].serviceTitles[i])
    );
    elements.serviceDescs.forEach(
      (el, i) => (el.textContent = translations[lang].serviceDescs[i])
    );
    elements.serviceFeatures.forEach(
      (el, i) => (el.textContent = translations[lang].serviceFeatures[i])
    );
    elements.serviceDetailBtns.forEach(
      (el) => (el.innerHTML = `${translations[lang].serviceDetailBtn} <i class="fas fa-arrow-right"></i>`)
    );

    elements.valueTitles.forEach(
      (el, i) => (el.textContent = translations[lang].valueTitles[i])
    );
    elements.valueDescs.forEach(
      (el, i) => (el.textContent = translations[lang].valueDescs[i])
    );

    elements.newsMonths.forEach(
      (el, i) => (el.textContent = translations[lang].newsMonths[i])
    );

    elements.newsCategories.forEach(
      (el, i) => (el.textContent = translations[lang].newsCategories[i])
    );

    elements.newsTitles.forEach(
      (el, i) => (el.textContent = translations[lang].newsTitles[i])
    );

    elements.newsExcerpts.forEach(
      (el, i) => (el.innerHTML = translations[lang].newsExcerpts[i])
    );

    elements.newsLinks.forEach(
      (el, i) => (el.textContent = translations[lang].newsLinkTexts[i])
    );

    if (elements.viewAllProductsBtn) {
      elements.viewAllProductsBtn.innerHTML = `<i class="fas fa-list"></i> ${translations[lang].viewAllProductsBtn}`;
    }

    if (elements.viewAllNewsBtn) {
      elements.viewAllNewsBtn.innerHTML = `<i class="fas fa-newspaper"></i> ${translations[lang].viewAllNewsBtn}`;
    }

    if (elements.footerWhatsappBtn) {
      elements.footerWhatsappBtn.innerHTML = `<i class="fab fa-whatsapp"></i> ${translations[lang].footerWhatsapp}`;
    }

    if (elements.sloganText) {
      elements.sloganText.textContent = translations[lang].slogan;
    }

    if (elements.profileSubtitle) {
      elements.profileSubtitle.textContent = translations[lang].profileSubtitle;
    }

    elements.profileOverview.forEach(
      (el, i) => (el.textContent = translations[lang].profileOverview[i])
    );

    if (elements.profileSubtitle2) {
      elements.profileSubtitle2.textContent = translations[lang].profileSubtitle2;
    }

    elements.profileBackground.forEach(
      (el, i) => (el.textContent = translations[lang].profileBackground[i])
    );

    if (elements.profileSubtitle3) {
      elements.profileSubtitle3.textContent = translations[lang].profileSubtitle3;
    }

    if (elements.profileVision) {
      elements.profileVision.textContent = translations[lang].profileVision;
    }

    if (elements.profileSubtitle4) {
      elements.profileSubtitle4.textContent = translations[lang].profileSubtitle4;
    }

    elements.profileMission.forEach(
      (el, i) => (el.textContent = translations[lang].profileMission[i])
    );

    if (elements.profileSubtitle5) {
      elements.profileSubtitle5.textContent = translations[lang].profileSubtitle5;
    }

    elements.profileAdvantageTitles.forEach(
      (el, i) => (el.textContent = translations[lang].profileAdvantageTitles[i])
    );

    elements.profileAdvantageDescs.forEach(
      (el, i) => (el.textContent = translations[lang].profileAdvantageDescs[i])
    );

    if (elements.profileSubtitle6) {
      elements.profileSubtitle6.textContent = translations[lang].profileSubtitle6;
    }

    elements.profileCoreValueTitles.forEach(
      (el, i) => (el.textContent = translations[lang].profileCoreValueTitles[i])
    );

    elements.profileCoreValueDescs.forEach(
      (el, i) => (el.textContent = translations[lang].profileCoreValueDescs[i])
    );

    if (elements.profileSubtitle7) {
      elements.profileSubtitle7.textContent = translations[lang].profileSubtitle7;
    }

    elements.profileObjectives.forEach(
      (el, i) => (el.textContent = translations[lang].profileObjectives[i])
    );

    if (elements.profileSubtitle8) {
      elements.profileSubtitle8.textContent = translations[lang].profileSubtitle8;
    }

    elements.founderNames.forEach(
      (el, i) => (el.textContent = translations[lang].founderNames[i])
    );

    elements.founderPositions.forEach(
      (el, i) => (el.textContent = translations[lang].founderPositions[i])
    );

    elements.founderBios.forEach(
      (el, i) => (el.textContent = translations[lang].founderBios[i])
    );

    if (elements.memberSubtitle) {
      elements.memberSubtitle.textContent = translations[lang].memberSubtitle;
    }
    elements.memberFeatureTitles.forEach((el, i) => (el.textContent = translations[lang].memberFeatureTitles[i]));
    elements.memberFeatureDescs.forEach((el, i) => (el.textContent = translations[lang].memberFeatureDescs[i]));
    if (elements.memberLoginBtn) {
      elements.memberLoginBtn.innerHTML = `<i class="fas fa-sign-in-alt"></i> ${translations[lang].memberLoginBtn}`;
    }
    if (elements.memberRegisterBtn) {
      elements.memberRegisterBtn.innerHTML = `<i class="fas fa-user-plus"></i> ${translations[lang].memberRegisterBtn}`;
    }
    if (elements.memberOverlayTitle) {
      elements.memberOverlayTitle.textContent = translations[lang].memberOverlayTitle;
    }
    if (elements.memberOverlayDesc) {
      elements.memberOverlayDesc.textContent = translations[lang].memberOverlayDesc;
    }

    // Apply Member Page Translations
    elements.memberTabs.forEach((el, i) => {
      if (translations[lang].memberTabs[i]) el.textContent = translations[lang].memberTabs[i];
    });

    elements.memberFormTitles.forEach((el, i) => {
      if (translations[lang].memberFormTitles[i]) el.textContent = translations[lang].memberFormTitles[i];
    });

    elements.memberFormLabels.forEach((el, i) => {
      if (translations[lang].memberFormLabels[i]) el.textContent = translations[lang].memberFormLabels[i];
    });

    elements.memberFormInputs.forEach((el, i) => {
      if (translations[lang].memberPlaceholders[i]) {
        el.placeholder = translations[lang].memberPlaceholders[i];
      }
      // Handle select options default text
      if (el.tagName === 'SELECT') {
        if (el.id === 'country') el.options[0].text = translations[lang].memberSelectOptions.country;
        if (el.id === 'businessType') el.options[0].text = translations[lang].memberSelectOptions.businessType;
      }
    });

    elements.memberFormChecks.forEach((el, i) => {
      // For the terms checkbox, we need to preserve the links
      if (i === 1) { // Index 1 is the terms checkbox
        const termsText = translations[lang].memberFormChecks[i];
        // This is a bit tricky to keep the HTML structure, simplified approach:
        if (lang === 'id') {
          el.innerHTML = `Saya setuju dengan <a href="#" id="termsLink">Syarat & Ketentuan</a> dan <a href="#" id="privacyLink">Kebijakan Privasi</a>`;
        } else {
          el.innerHTML = `I agree to the <a href="#" id="termsLink">Terms & Conditions</a> and <a href="#" id="privacyLink">Privacy Policy</a>`;
        }
      } else if (translations[lang].memberFormChecks[i]) {
        el.textContent = translations[lang].memberFormChecks[i];
      }
    });

    elements.memberSubmitBtns.forEach((el, i) => {
      if (translations[lang].memberSubmitBtns[i]) {
        // Keep the icon
        const icon = el.querySelector('i');
        const iconHtml = icon ? icon.outerHTML + ' ' : '';
        el.innerHTML = iconHtml + translations[lang].memberSubmitBtns[i];
      }
    });

    elements.memberSectionFooterTexts.forEach((el, i) => {
      if (translations[lang].memberSectionFooterTexts[i]) {
        const text = translations[lang].memberSectionFooterTexts[i];
        let linkText = "";
        let linkClass = "";

        if (text.includes("Daftar disini") || text.includes("Register here")) {
          linkText = lang === 'id' ? "Daftar disini" : "Register here";
          linkClass = "switch-to-register";
        } else if (text.includes("Login disini") || text.includes("Login here")) {
          linkText = lang === 'id' ? "Login disini" : "Login here";
          linkClass = "switch-to-login";
        }

        if (linkText) {
          const prefix = text.replace(linkText, "");
          el.innerHTML = `${prefix}<a href="#" class="${linkClass}">${linkText}</a>`;
        } else {
          el.textContent = text;
        }
      }
    });

    if (elements.memberForgotPasswordLink) {
      elements.memberForgotPasswordLink.textContent = translations[lang].memberForgotPassword;
    }

    if (elements.memberBenefitsTitle) {
      elements.memberBenefitsTitle.textContent = translations[lang].memberBenefitsTitle;
    }

    elements.memberBenefitsList.forEach((el, i) => {
      if (translations[lang].memberBenefitsList[i]) {
        const icon = el.querySelector('i');
        const iconHtml = icon ? icon.outerHTML + ' ' : '';
        el.innerHTML = iconHtml + translations[lang].memberBenefitsList[i];
      }
    });

    if (elements.memberSuccessTitle) elements.memberSuccessTitle.textContent = translations[lang].memberSuccessTitle;
    if (elements.memberSuccessText) elements.memberSuccessText.textContent = translations[lang].memberSuccessText;

    elements.serviceDetailBtns.forEach(
      (el) => (el.innerHTML = `${translations[lang].serviceDetailBtn} <i class="fas fa-arrow-right"></i>`)
    );

    elements.certTitles.forEach(
      (el, i) => (el.textContent = translations[lang].certTitles[i])
    );

    elements.certDescs.forEach(
      (el, i) => (el.textContent = translations[lang].certDescs[i])
    );

    if (elements.footerTagline) {
      elements.footerTagline.textContent = translations[lang].footerTagline;
    }

    if (elements.footerDesc) {
      elements.footerDesc.textContent = translations[lang].footerDesc;
    }
    if (elements.footerNavTitle) {
      elements.footerNavTitle.textContent = translations[lang].footerNavTitle;
    }
    if (elements.footerInfoTitle) {
      elements.footerInfoTitle.textContent = translations[lang].footerInfoTitle;
    }

    idBtn.classList.toggle("active", lang === "id");
    enBtn.classList.toggle("active", lang === "en");
  }

  idBtn.addEventListener("click", () => setLanguage("id"));
  enBtn.addEventListener("click", () => setLanguage("en"));
});
