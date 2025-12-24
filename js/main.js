// Main JavaScript for PT.PENS Website

document.addEventListener('DOMContentLoaded', function () {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Initialize navigation
    initializeNavigation();

    // Initialize WhatsApp functionality
    initializeWhatsApp();

    // Initialize number animation
    animateNumbers();

    // Initialize product inquiry
    initializeProductInquiry();

    // Initialize language switcher
    initializeLanguageSwitcher();

    // Initialize Service Modal
    initializeServiceModal();

    // Load products from database
    loadProductsFromDatabase();

    // Load news from database
    loadNewsFromDatabase();
});

// Load products dynamically from database
async function loadProductsFromDatabase() {
    const productsGrid = document.getElementById('productsGrid');
    const loadingProducts = document.getElementById('loadingProducts');

    if (!productsGrid) return; // Not on a page with products grid

    console.log('Loading products from database...');

    try {
        // Fetch all active products from PHP API
        const response = await fetch('api/products.php?status=active');
        const result = await response.json();

        console.log('API Response:', result);

        if (result.success && result.data) {
            const products = Array.isArray(result.data) ? result.data : (result.data.items || []);

            // Hide loading indicator
            if (loadingProducts) loadingProducts.style.display = 'none';

            if (products.length === 0) {
                productsGrid.innerHTML = '<p class="no-products">Belum ada produk tersedia.</p>';
                return;
            }

            // Render products
            let productsHTML = '';
            products.forEach(product => {
                productsHTML += renderProductCard(product);
            });

            productsGrid.innerHTML = productsHTML;

            // Re-initialize product inquiry buttons for dynamically loaded products
            initializeProductInquiry();

        } else {
            throw new Error('Failed to load products from database');
        }
    } catch (error) {
        console.error('Error loading products:', error);
        if (loadingProducts) {
            loadingProducts.innerHTML = `
                <i class="fas fa-exclamation-triangle" style="color: #e74c3c;"></i>
                <p>Gagal memuat produk. <br><small>Pastikan database sudah diimpor.</small></p>
            `;
        }
    }
}

// Render a single product card
function renderProductCard(product) {
    const productName = product.name || 'Produk';
    const productDesc = product.description || '';
    const productImage = product.image || 'images/kayumanis-jawa.png';
    const productCategory = product.category || '';
    const productTag = product.featured ? 'FEATURED' : (productCategory.toUpperCase() || 'PRODUK');

    // Create WhatsApp link
    const waMessage = encodeURIComponent(`Halo, saya tertarik dengan ${productName}`);
    const waLink = `https://wa.me/6281515272829?text=${waMessage}`;

    // Create email link
    const emailSubject = encodeURIComponent(`Quotation Request: ${productName}`);
    const emailLink = `mailto:pegiatekspornusantara@gmail.com?subject=${emailSubject}`;

    return `
        <div class="product-card">
            <div class="product-image">
                <img src="${productImage}" alt="${productName}" onerror="this.src='images/default-product.png'">
                <div class="product-tag">${productTag}</div>
            </div>
            <div class="product-content">
                <h3 class="product-name">${productName}</h3>
                <p class="product-desc">${productDesc}</p>

                <div class="product-details">
                    <div class="detail-item">
                        <span class="detail-label">Kategori</span>
                        <span class="detail-value">${formatCategory(product.category)}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Unit</span>
                        <span class="detail-value">${product.unit || '-'}</span>
                    </div>
                </div>

                <div class="product-specs">
                    <span class="spec"><i class="fas fa-certificate"></i> Export Grade</span>
                    <span class="spec"><i class="fas fa-check-circle"></i> Verified</span>
                </div>

                <div class="product-actions">
                    <button class="btn-quote" onclick="location.href='${emailLink}'">
                        <i class="fas fa-file-invoice"></i> Minta Penawaran
                    </button>
                    <a href="${waLink}" class="whatsapp-inquiry" target="_blank" data-product="${productName}">
                        <i class="fab fa-whatsapp"></i> Chat WhatsApp
                    </a>
                </div>
            </div>
        </div>
    `;
}

// Format category for display
function formatCategory(category) {
    if (!category) return '-';
    const categories = {
        'agriculture': 'Agriculture',
        'textile': 'Textile',
        'handicraft': 'Handicraft',
        'food': 'Food & Beverage',
        'electronics': 'Electronics',
        'spices': 'Rempah-rempah',
        'beauty': 'Beauty & Skincare',
        'luxury': 'Luxury Products'
    };
    return categories[category] || category.charAt(0).toUpperCase() + category.slice(1);
}

// Load news dynamically from database
async function loadNewsFromDatabase() {
    const newsGrid = document.getElementById('newsGrid');
    const loadingNews = document.getElementById('loadingNews');

    if (!newsGrid) return; // Not on a page with news grid

    console.log('Loading news from database...');

    try {
        // Fetch published news from PHP API
        const response = await fetch('api/news.php?status=published&limit=6');
        const result = await response.json();

        console.log('News API Response:', result);

        if (result.success && result.data) {
            const news = Array.isArray(result.data) ? result.data : (result.data.items || []);

            // Hide loading indicator
            if (loadingNews) loadingNews.style.display = 'none';

            if (news.length === 0) {
                newsGrid.innerHTML = '<p class="no-products">Belum ada berita tersedia.</p>';
                return;
            }

            // Render news
            let newsHTML = '';
            news.forEach(article => {
                newsHTML += renderNewsCard(article);
            });

            newsGrid.innerHTML = newsHTML;

        } else {
            throw new Error('Failed to load news from database');
        }
    } catch (error) {
        console.error('Error loading news:', error);
        if (loadingNews) {
            loadingNews.innerHTML = `
                <i class="fas fa-exclamation-triangle" style="color: #e74c3c;"></i>
                <p>Gagal memuat berita. <br><small>Pastikan database sudah diimpor.</small></p>
            `;
        }
    }
}

// Render a single news card
function renderNewsCard(article) {
    const title = article.title || 'Berita';
    const excerpt = article.excerpt || article.content?.substring(0, 200) || '';
    const image = article.image || 'images/kayumanis-jawa.png';
    const category = article.category || 'NEWS';
    const publishDate = article.publish_date || article.date || new Date().toISOString();

    // Parse date
    const dateObj = new Date(publishDate);
    const day = dateObj.getDate().toString().padStart(2, '0');
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MEI', 'JUN', 'JUL', 'AGT', 'SEP', 'OKT', 'NOV', 'DES'];
    const month = months[dateObj.getMonth()];

    // Create WhatsApp link
    const waMessage = encodeURIComponent(`Halo, saya ingin tahu lebih lanjut tentang: ${title}`);
    const waLink = `https://wa.me/6281515272829?text=${waMessage}`;

    return `
        <div class="news-card">
            <div class="news-image">
                <img src="${image}" alt="${title}" onerror="this.src='https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600'">
                <div class="news-date">
                    <span class="day">${day}</span>
                    <span class="month">${month}</span>
                </div>
            </div>
            <div class="news-content">
                <div class="news-category">${category.toUpperCase()}</div>
                <h3 class="news-title">${title}</h3>
                <p class="news-excerpt">${excerpt}</p>
                <a href="${waLink}" class="news-link" target="_blank">BACA SELENGKAPNYA →</a>
            </div>
        </div>
    `;
}

// Initialize navigation
function initializeNavigation() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function () {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');

                // Update active link
                document.querySelectorAll('.nav-link').forEach(item => {
                    item.classList.remove('active');
                });
                this.classList.add('active');
            });
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            if (href === '#') return;

            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', function () {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Initialize WhatsApp functionality
function initializeWhatsApp() {
    const whatsappFloat = document.getElementById('whatsappFloat');
    const whatsappModal = document.getElementById('whatsappModal');
    const closeModal = document.querySelector('.close-modal');
    const footerWhatsapp = document.getElementById('footerWhatsapp');

    // Open modal when clicking WhatsApp float button
    if (whatsappFloat) {
        whatsappFloat.addEventListener('click', function () {
            if (whatsappModal) {
                whatsappModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    }

    // Open modal from footer button
    if (footerWhatsapp) {
        footerWhatsapp.addEventListener('click', function () {
            if (whatsappModal) {
                whatsappModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    }

    // Close modal
    if (closeModal) {
        closeModal.addEventListener('click', function () {
            if (whatsappModal) {
                whatsappModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Close modal when clicking outside
    if (whatsappModal) {
        whatsappModal.addEventListener('click', function (e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Handle WhatsApp option clicks
    const whatsappOptions = document.querySelectorAll('.whatsapp-option');
    whatsappOptions.forEach(option => {
        option.addEventListener('click', function () {
            const phoneNumber = this.getAttribute('data-number');
            const department = this.getAttribute('data-department');

            // Default message
            const message = `Halo, saya ingin konsultasi mengenai ${department} dari PT.PENS`;

            // Open WhatsApp
            window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');

            // Close modal
            if (whatsappModal) {
                whatsappModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && whatsappModal.classList.contains('active')) {
            whatsappModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Animate counting numbers
function animateNumbers() {
    const counters = document.querySelectorAll('.stat-number[data-count]');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        // Start animation when element is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(counter);
    });
}

// Initialize product inquiry buttons
function initializeProductInquiry() {
    const inquiryButtons = document.querySelectorAll('.whatsapp-inquiry');

    inquiryButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productName = this.getAttribute('data-product');

            // Show WhatsApp modal with pre-filled message
            const whatsappModal = document.getElementById('whatsappModal');
            if (whatsappModal) {
                whatsappModal.classList.add('active');
                document.body.style.overflow = 'hidden';

                // Update modal title to show product
                const modalTitle = whatsappModal.querySelector('h3');
                if (modalTitle) {
                    modalTitle.innerHTML = `<i class="fab fa-whatsapp"></i> Konsultasi ${productName}`;
                }

                // Update WhatsApp options with product info
                const whatsappOptions = whatsappModal.querySelectorAll('.whatsapp-option');
                whatsappOptions.forEach(option => {
                    const department = option.getAttribute('data-department');
                    const phoneNumber = option.getAttribute('data-number');

                    // Update click handler for this specific product
                    option.onclick = function () {
                        const message = `Halo, saya ingin konsultasi mengenai produk ${productName} dari PT.PENS (Departemen: ${department})`;
                        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');

                        // Close modal
                        whatsappModal.classList.remove('active');
                        document.body.style.overflow = 'auto';
                    };
                });
            }
        });
    });
}

// Initialize language switcher
function initializeLanguageSwitcher() {
    const idLangBtn = document.getElementById('id-lang');
    const enLangBtn = document.getElementById('en-lang');

    if (idLangBtn && enLangBtn) {
        // Set initial language
        let currentLang = localStorage.getItem('preferredLang') || 'id';
        updateLanguageButtons(currentLang);

        // Indonesian language button click
        idLangBtn.addEventListener('click', function () {
            localStorage.setItem('preferredLang', 'id');
            updateLanguageButtons('id');
            updateServiceModalLang('id');
        });

        // English language button click
        enLangBtn.addEventListener('click', function () {
            localStorage.setItem('preferredLang', 'en');
            updateLanguageButtons('en');
            updateServiceModalLang('en');
        });
    }
}

function updateLanguageButtons(lang) {
    const idLangBtn = document.getElementById('id-lang');
    const enLangBtn = document.getElementById('en-lang');

    if (lang === 'id') {
        idLangBtn.classList.add('active');
        enLangBtn.classList.remove('active');
    } else {
        enLangBtn.classList.add('active');
        idLangBtn.classList.remove('active');
    }
}

// Service Modal Logic
const serviceDetails = {
    consultation: {
        id: {
            title: '<i class="fas fa-comments-dollar"></i> Konsultasi Ekspor',
            benTitle1: "Manfaat bagi Peserta:",
            benTitle2: "Keunggulan PENS:",
            list1: `
                <li>Mendapatkan wawasan langsung dari praktisi ekspor yang memahami tren pasar dan tantangan global.</li>
                <li>Meminimalisir risiko kesalahan dalam proses ekspor (seperti Kode HS, target pasar yang salah, dll).</li>
                <li>Mendapatkan rekomendasi pasar dan pembeli potensial yang relevan dengan produk Anda.</li>
            `,
            list2: `
                <li>Didukung oleh mentor ekspor tersertifikasi nasional & internasional.</li>
                <li>Menggunakan data pasar terbaru dari lembaga resmi (Kemendag, ITC, Trade Map).</li>
                <li>Pendekatan personal, bukan template umum — disesuaikan dengan kapasitas bisnis setiap UMKM.</li>
            `
        },
        en: {
            title: '<i class="fas fa-comments-dollar"></i> Export Consultation',
            benTitle1: "Benefits for Participants:",
            benTitle2: "Benefits of PENS:",
            list1: `
                <li>Gain direct insight from export practitioners who understand global market trends and challenges.</li>
                <li>Minimize the risk of missteps in the export process (e.g., incorrect HS Code, inappropriate target market, etc.).</li>
                <li>Receive recommendations for markets and potential buyers relevant to your product.</li>
            `,
            list2: `
                <li>Supported by nationally and internationally certified export mentors.</li>
                <li>Use the latest market data from official institutions (Ministry of Trade, ITC, Trade Map).</li>
                <li>Personalized approach, not a general template—tailored to the business capacity of each MSME.</li>
            `
        }
    },
    curation: {
        id: {
            title: '<i class="fas fa-box-open"></i> Kurasi Produk',
            benTitle1: "Manfaat bagi Peserta:",
            benTitle2: "Keunggulan EPS (PENS):",
            list1: `
                <li>Produk jadi lebih kompetitif di pasar global karena memenuhi standar kualitas dan kemasan internasional.</li>
                <li>Mendapatkan umpan balik objektif dan profesional dari tim ahli ekspor dan pembeli luar negeri.</li>
                <li>Hemat waktu dengan segera mengidentifikasi aspek yang perlu diperbaiki.</li>
            `,
            list2: `
                <li>Kurasi dilakukan oleh tim lintas disiplin (desain produk, kemasan, ekspor).</li>
                <li>Akses ke jaringan pembeli dan pameran internasional untuk validasi produk.</li>
                <li>PENS menyediakan template dan panduan praktis untuk revisi kemasan, label, dan spesifikasi.</li>
            `
        },
        en: {
            title: '<i class="fas fa-box-open"></i> Product Curation',
            benTitle1: "Benefits for Participants:",
            benTitle2: "EPS Advantages:",
            list1: `
                <li>The finished product is more competitive in the global market because it meets international quality and packaging standards.</li>
                <li>Receive objective and professional feedback from a team of export experts and foreign buyers.</li>
                <li>Save time by immediately identifying aspects that need improvement.</li>
            `,
            list2: `
                <li>Curation is carried out by a cross-disciplinary team (product design, packaging, export).</li>
                <li>Access to a network of buyers and international exhibitions for product validation.</li>
                <li>EPS provides templates and practical guides for revising packaging, labels, and specifications.</li>
            `
        }
    },
    legality: {
        id: {
            title: '<i class="fas fa-file-contract"></i> Pendampingan Legalitas',
            benTitle1: "Manfaat bagi Peserta:",
            benTitle2: "Keunggulan PENS:",
            list1: `
                <li>Membantu pelaku usaha memahami dan mematuhi semua aspek hukum ekspor tanpa kebingungan.</li>
                <li>Proses pengurusan dokumen lebih cepat, efisien, dan sesuai regulasi.</li>
                <li>Meningkatkan kepercayaan pembeli internasional terhadap legalitas usaha.</li>
            `,
            list2: `
                <li>PENS memiliki jejaring resmi dengan instansi pemerintah dan asosiasi ekspor.</li>
                <li>Tim pendamping paham proses OSS, perizinan kementerian, dan sertifikasi negara tujuan.</li>
                <li>Disediakan checklist lengkap legalitas ekspor dan panduan praktis step-by-step.</li>
            `
        },
        en: {
            title: '<i class="fas fa-file-contract"></i> Legality/Permitting Assistance',
            benTitle1: "Benefits for Participants:",
            benTitle2: "PENS Advantages:",
            list1: `
                <li>Helps business owners understand and comply with all aspects of export law without confusion.</li>
                <li>The document processing process is faster, more efficient, and more compliant with regulations.</li>
                <li>Increases international buyers' confidence in business legality.</li>
            `,
            list2: `
                <li>PENS has an official network with government agencies and export associations.</li>
                <li>The assistance team understands the OSS process, ministry permits, and destination country certification.</li>
                <li>A complete export legality checklist and practical, step-by-step guide are provided.</li>
            `
        }
    },
    financing: {
        id: {
            title: '<i class="fas fa-hand-holding-usd"></i> Bantuan Pendanaan',
            benTitle1: "Manfaat bagi Peserta:",
            benTitle2: "Keunggulan PENS:",
            list1: `
                <li>Membuka akses ke skema pembiayaan ekspor yang sebelumnya sulit dijangkau UMKM.</li>
                <li>Membantu perencanaan keuangan ekspor yang sehat dan mengurangi beban modal awal.</li>
                <li>Meningkatkan kredibilitas bisnis di mata lembaga keuangan.</li>
            `,
            list2: `
                <li>Bekerja sama dengan LPEI (Eximbank), bank BUMN, dan lembaga fintech pembiayaan ekspor.</li>
                <li>Tim membantu penyusunan proposal pembiayaan yang profesional.</li>
                <li>Pendampingan tidak hanya sampai pengajuan, tapi hingga pencairan dan monitoring penggunaan dana.</li>
            `
        },
        en: {
            title: '<i class="fas fa-hand-holding-usd"></i> Export Financing Assistance',
            benTitle1: "Benefits for Participants:",
            benTitle2: "EPES Advantages:",
            list1: `
                <li>Opens access to export financing schemes previously unaffordable for MSMEs.</li>
                <li>Assists in sound export financial planning and reduces initial capital burden.</li>
                <li>Increases business credibility in the eyes of financial institutions.</li>
            `,
            list2: `
                <li>Works with LPEI (Eximbank), state-owned banks, and export financing fintech institutions.</li>
                <li>The team assists in the preparation of professional financing proposals.</li>
                <li>Assistance extends beyond the application stage to the disbursement and monitoring of fund usage.</li>
            `
        }
    },
    shipping: {
        id: {
            title: '<i class="fas fa-truck-loading"></i> Bantuan Pengiriman',
            benTitle1: "Manfaat bagi Peserta:",
            benTitle2: "Keunggulan PENS:",
            list1: `
                <li>Memastikan barang sampai ke pembeli dengan aman, efisien, dan tepat waktu.</li>
                <li>Menghindari kesalahan dokumen yang dapat menyebabkan barang tertahan di pelabuhan.</li>
                <li>Hemat biaya dengan strategi logistik yang optimal (pengiriman, asuransi, rute, dll).</li>
            `,
            list2: `
                <li>Kemitraan dengan freight forwarder terpercaya dan perusahaan logistik ekspor.</li>
                <li>Menyediakan dukungan one-on-one, termasuk pelacakan pengiriman.</li>
                <li>Tersedia simulasi biaya pengiriman dan panduan negosiasi kontrak logistik internasional.</li>
            `
        },
        en: {
            title: '<i class="fas fa-truck-loading"></i> Shipping Assistance',
            benTitle1: "Benefits for Participants:",
            benTitle2: "PENS Advantages:",
            list1: `
                <li>Ensures goods reach buyers safely, efficiently, and on schedule.</li>
                <li>Avoid document errors that could cause goods to be held at the port.</li>
                <li>Save costs with optimal logistics strategies (freight, insurance, routes, etc.).</li>
            `,
            list2: `
                <li>Partnerships with trusted freight forwarders and export logistics companies.</li>
                <li>Provides one-on-one support, including shipment tracking.</li>
                <li>Shipping cost simulations and guidance on negotiating international logistics contracts are available.</li>
            `
        }
    },
    certification: {
        id: {
            title: '<i class="fas fa-user-graduate"></i> Sertifikasi Profesi Ekspor',
            benTitle1: "Manfaat bagi Peserta:",
            benTitle2: "Keunggulan EPS (PENS):",
            list1: `
                <li>Mendapatkan pengakuan kompetensi resmi dari Badan Nasional Sertifikasi Profesi (BNSP).</li>
                <li>Meningkatkan kepercayaan dari pembeli, mitra, dan lembaga pembiayaan.</li>
                <li>Membuka peluang karier dan jejaring di sektor ekspor internasional.</li>
            `,
            list2: `
                <li>EPS adalah mitra Lembaga Sertifikasi Profesi (LSP) BNSP dengan asesor berpengalaman.</li>
                <li>Kurikulum berbasis Standar Kompetensi Kerja Nasional Indonesia (SKKNI) bidang ekspor.</li>
                <li>Peserta mendapatkan akses berkelanjutan ke komunitas alumni PENS untuk jejaring bisnis ekspor.</li>
            `
        },
        en: {
            title: '<i class="fas fa-user-graduate"></i> Export Professional Certification',
            benTitle1: "Benefits for Participants:",
            benTitle2: "EPES Advantages:",
            list1: `
                <li>Receive official competency recognition from the National Professional Certification Agency (BNSP).</li>
                <li>Increase trust from buyers, partners, and financing institutions.</li>
                <li>Open career and networking opportunities in the international export sector.</li>
            `,
            list2: `
                <li>EPES is a Professional Certification Agency (LSP) partner of BNSP with experienced assessors.</li>
                <li>The curriculum is based on the Indonesian National Work Competency Standards (SKKNI) for export.</li>
                <li>Participants gain continued access to the PENS alumni community for export business networking.</li>
            `
        }
    },
    regulatory: {
        id: {
            title: '<i class="fas fa-balance-scale"></i> Kepatuhan Regulasi',
            benTitle1: "Sumber Regulasi Utama:",
            benTitle2: "Manfaat bagi Eksportir:",
            list1: `
                <li><strong>Kementerian Perdagangan Republik Indonesia - Portal EXIM:</strong><br>
                Portal Informasi Mekanisme Ekspor Impor (EXIM) merupakan platform yang menyediakan berbagai regulasi dan persyaratan teknis terkait kegiatan ekspor dan impor. Melalui sistem ini, pengguna dapat dengan mudah menentukan negara tujuan ekspor berdasarkan skema Free Trade Agreement (FTA), Preferential Trade Agreement (PTA), dan Comprehensive Economic Partnership (CEPA) sehingga proses perdagangan menjadi lebih efektif dan menguntungkan.<br>
                <a href="https://exim.kemendag.go.id/" target="_blank" style="color: var(--secondary-color);">→ Akses Portal EXIM Kemendag</a>
                </li>
                <li><strong>Peraturan Pemerintah Nomor 29 Tahun 2021 tentang Penyelenggaraan Bidang Perdagangan:</strong><br>
                Peraturan Pemerintah Nomor 29 Tahun 2021 mengatur ketentuan utama terkait ekspor–impor, label berbahasa Indonesia, standardisasi, distribusi barang, sarana perdagangan, pengembangan ekspor, metrologi legal, serta pengawasan perdagangan. PP ini menghadirkan sejumlah pengaturan baru, termasuk penggunaan neraca komoditas untuk penerbitan persetujuan ekspor dan impor, serta peningkatan Service Level Agreement (SLA) dengan penerapan fiktif positif, di mana perizinan berusaha akan diterbitkan otomatis melalui sistem terintegrasi apabila permohonan lengkap namun belum diproses dalam batas waktu yang ditetapkan.<br>
                <a href="https://peraturan.bpk.go.id/Details/161870/pp-no-29-tahun-2021" target="_blank" style="color: var(--secondary-color);">→ Baca PP No. 29/2021</a>
                </li>
                <li><strong>Peraturan Menteri Perdagangan Nomor 36 Tahun 2023 tentang Kebijakan dan Pengaturan Impor:</strong><br>
                Permendag Nomor 36 Tahun 2023 mengatur berbagai ketentuan terkait aktivitas impor, mulai dari persyaratan impor, perizinan usaha, verifikasi teknis, hingga penetapan tempat pemasukan barang. Regulasi ini juga mencakup tata kelola pemasukan dan pengeluaran barang di kawasan perdagangan bebas, kawasan ekonomi khusus, dan tempat penimbunan berikat. Selain itu, peraturan ini mengatur fasilitas impor untuk tujuan ekspor, impor sementara, impor kembali, impor barang komplementer, keperluan uji pasar, hingga layanan purna jual. Ketentuan mengenai alur proses, kewajiban importir, sanksi, serta mekanisme pengawasan juga tercakup di dalamnya.<br>
                <a href="https://peraturan.bpk.go.id/Details/296854/permendag-no-36-tahun-2023" target="_blank" style="color: var(--secondary-color);">→ Baca Permendag No. 36/2023</a>
                </li>
                <li><strong>Direktorat Jenderal Perdagangan Luar Negeri (Kemendag):</strong><br>
                Halaman ekspor-impor yang menyediakan sistem perizinan online dan info regulasi.<br>
                <a href="https://ditjendaglu.kemendag.go.id/?page=exim" target="_blank" style="color: var(--secondary-color);">→ Akses Ditjen Daglu</a>
                </li>
            `,
            list2: `
                <li>Akses terpusat ke semua regulasi dan portal pemerintah yang relevan.</li>
                <li>Memastikan kepatuhan penuh terhadap peraturan ekspor-impor Indonesia.</li>
                <li>Mengurangi risiko penolakan atau penundaan di bea cukai.</li>
                <li>Informasi selalu update sesuai regulasi terbaru dari pemerintah.</li>
                <li>Panduan lengkap untuk memanfaatkan FTA, PTA, dan CEPA.</li>
            `
        },
        en: {
            title: '<i class="fas fa-balance-scale"></i> Regulatory Compliance',
            benTitle1: "Main Regulatory Sources:",
            benTitle2: "Benefits for Exporters:",
            list1: `
                <li><strong>Ministry of Trade of the Republic of Indonesia - EXIM Portal:</strong><br>
                The Export Import Mechanism Information Portal (EXIM) is a platform that provides various regulations and technical requirements related to export and import activities. Through this system, users can easily determine export destination countries based on Free Trade Agreement (FTA), Preferential Trade Agreement (PTA), and Comprehensive Economic Partnership (CEPA) schemes, making the trade process more effective and profitable.<br>
                <a href="https://exim.kemendag.go.id/" target="_blank" style="color: var(--secondary-color);">→ Access EXIM Portal</a>
                </li>
                <li><strong>Government Regulation Number 29 of 2021 on Trade Sector Implementation:</strong><br>
                Government Regulation Number 29 of 2021 regulates the main provisions related to export-import, Indonesian language labels, standardization, goods distribution, trade facilities, export development, legal metrology, and trade supervision. This regulation introduces several new arrangements, including the use of commodity balances for issuing export and import approvals, as well as improving Service Level Agreements (SLA) with the application of positive fiction, where business licenses will be issued automatically through an integrated system if the application is complete but has not been processed within the specified time limit.<br>
                <a href="https://peraturan.bpk.go.id/Details/161870/pp-no-29-tahun-2021" target="_blank" style="color: var(--secondary-color);">→ Read PP No. 29/2021</a>
                </li>
                <li><strong>Minister of Trade Regulation Number 36 of 2023 on Import Policies and Regulations:</strong><br>
                Permendag Number 36 of 2023 regulates various provisions related to import activities, ranging from import requirements, business licensing, technical verification, to the determination of places for goods entry. This regulation also covers the governance of goods entry and exit in free trade zones, special economic zones, and bonded storage areas. In addition, this regulation regulates import facilities for export purposes, temporary imports, re-imports, complementary goods imports, market testing needs, to after-sales services. Provisions regarding process flows, importer obligations, sanctions, and supervision mechanisms are also included.<br>
                <a href="https://peraturan.bpk.go.id/Details/296854/permendag-no-36-tahun-2023" target="_blank" style="color: var(--secondary-color);">→ Read Permendag No. 36/2023</a>
                </li>
                <li><strong>Directorate General of Foreign Trade (Ministry of Trade):</strong><br>
                Export-import page that provides online licensing systems and regulatory information.<br>
                <a href="https://ditjendaglu.kemendag.go.id/?page=exim" target="_blank" style="color: var(--secondary-color);">→ Access Ditjen Daglu</a>
                </li>
            `,
            list2: `
                <li>Centralized access to all relevant government regulations and portals.</li>
                <li>Ensures full compliance with Indonesian export-import regulations.</li>
                <li>Reduces risk of rejection or delays at customs.</li>
                <li>Information always updated according to the latest government regulations.</li>
                <li>Complete guide to utilizing FTA, PTA, and CEPA.</li>
            `
        }
    }
};

let activeServiceId = null;

function initializeServiceModal() {
    const serviceModal = document.getElementById('serviceModal');
    const closeBtn = document.getElementById('closeServiceModal');
    const detailButtons = document.querySelectorAll('.service-detail-btn');

    detailButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            activeServiceId = this.getAttribute('data-service');
            if (activeServiceId && serviceDetails[activeServiceId]) {
                const currentLang = localStorage.getItem('preferredLang') || 'id';
                updateServiceModalContent(activeServiceId, currentLang);

                if (serviceModal) {
                    serviceModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            }
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', function () {
            if (serviceModal) {
                serviceModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Close when clicking outside
    if (serviceModal) {
        serviceModal.addEventListener('click', function (e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Close on Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && serviceModal && serviceModal.classList.contains('active')) {
            serviceModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

function updateServiceModalLang(lang) {
    if (activeServiceId) {
        updateServiceModalContent(activeServiceId, lang);
    }
}

function updateServiceModalContent(serviceId, lang) {
    const data = serviceDetails[serviceId][lang];
    if (!data) return;

    const title = document.getElementById('modalServiceTitle');
    const benTitle1 = document.getElementById('modalBenefitTitle1');
    const benTitle2 = document.getElementById('modalBenefitTitle2');
    const list1 = document.getElementById('modalBenefitList1');
    const list2 = document.getElementById('modalBenefitList2');

    if (title) title.innerHTML = data.title;
    if (benTitle1) benTitle1.textContent = data.benTitle1;
    if (benTitle2) benTitle2.textContent = data.benTitle2;
    if (list1) list1.innerHTML = data.list1;
    if (list2) list2.innerHTML = data.list2;
}


