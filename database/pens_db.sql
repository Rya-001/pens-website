-- ========================================
-- PT.PENS Database Schema
-- Created: December 2024
-- ========================================

-- Create database
CREATE DATABASE IF NOT EXISTS pens_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE pens_db;

-- ========================================
-- Table: admin_users
-- ========================================
CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role ENUM('admin', 'editor', 'viewer') DEFAULT 'editor',
    avatar VARCHAR(255) DEFAULT NULL,
    is_active TINYINT(1) DEFAULT 1,
    last_login DATETIME DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Insert default admin user (password: admin123)
INSERT INTO admin_users (username, email, password, full_name, role, is_active) VALUES
('admin', 'admin@ptpens.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Administrator', 'admin', 1);

-- ========================================
-- Table: categories
-- ========================================
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    icon VARCHAR(50) DEFAULT NULL,
    type ENUM('product', 'news', 'document') DEFAULT 'product',
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Insert default categories
INSERT INTO categories (name, slug, description, type) VALUES
('Agriculture', 'agriculture', 'Agricultural products and exports', 'product'),
('Textile', 'textile', 'Textile and fabric products', 'product'),
('Handicraft', 'handicraft', 'Traditional handicraft products', 'product'),
('Food & Beverage', 'food', 'Food and beverage products', 'product'),
('Electronics', 'electronics', 'Electronic products', 'product'),
('Company News', 'company-news', 'Official company announcements', 'news'),
('Industry Updates', 'industry-updates', 'Industry trends and updates', 'news'),
('Events', 'events', 'Company events and exhibitions', 'news'),
('Contracts', 'contracts', 'Contract documents', 'document'),
('Invoices', 'invoices', 'Invoice documents', 'document'),
('Reports', 'reports', 'Report documents', 'document'),
('Certificates', 'certificates', 'Certificate documents', 'document'),
('Others', 'others', 'Other documents', 'document');

-- ========================================
-- Table: products
-- ========================================
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    category_id INT DEFAULT NULL,
    category VARCHAR(50) DEFAULT NULL,
    description TEXT,
    image VARCHAR(500) DEFAULT NULL,
    price DECIMAL(15, 2) DEFAULT 0.00,
    unit VARCHAR(50) DEFAULT 'piece',
    export_countries JSON DEFAULT NULL,
    specifications JSON DEFAULT NULL,
    status ENUM('active', 'inactive', 'draft') DEFAULT 'active',
    featured TINYINT(1) DEFAULT 0,
    view_count INT DEFAULT 0,
    created_by INT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES admin_users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- Insert sample products
INSERT INTO products (name, slug, category, description, image, price, unit, export_countries, status, featured) VALUES
('Kopi Arabika Jawa Timur', 'kopi-arabika-jawa-timur', 'food', 'Kopi arabika kualitas premium dari perkebunan di Malang, dengan cita rasa kompleks dan aroma yang khas.', 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', 45000.00, 'kg', '["Japan", "USA", "Germany", "Australia"]', 'active', 1),
('Batik Tulis Madura', 'batik-tulis-madura', 'textile', 'Batik tulis tradisional dengan motif khas Madura, dibuat secara manual oleh pengrajin berpengalaman.', 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', 350000.00, 'piece', '["USA", "France", "UK", "Netherlands"]', 'active', 1),
('Kerajinan Perak Tulungagung', 'kerajinan-perak-tulungagung', 'handicraft', 'Kerajinan perak berkualitas tinggi dari Tulungagung, dengan desain elegan dan pengerjaan detail.', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', 250000.00, 'piece', '["Japan", "Singapore", "USA", "Germany"]', 'active', 1),
('Mangga Arumanis', 'mangga-arumanis', 'agriculture', 'Mangga arumanis kualitas ekspor dari Probolinggo, dengan rasa manis dan tekstur yang lembut.', 'https://images.unsplash.com/photo-1553279768-865429fa0078?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', 35000.00, 'kg', '["China", "Hong Kong", "Singapore", "Malaysia"]', 'active', 0),
('Rempah-rempah Organik', 'rempah-rempah-organik', 'food', 'Rempah-rempah organik dari petani lokal Jawa Timur, termasuk kunyit, jahe, dan temulawak.', 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', 28000.00, 'kg', '["USA", "Germany", "Netherlands", "UK"]', 'active', 0),
('Keramik Dinoyo Malang', 'keramik-dinoyo-malang', 'handicraft', 'Keramik artistik dengan desain tradisional dan modern, dari sentra keramik Dinoyo Malang.', 'https://images.unsplash.com/photo-1574732011388-8e9d1ef55d93?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', 120000.00, 'set', '["USA", "Australia", "Japan", "France"]', 'active', 0),
('Gula Aren Organik', 'gula-aren-organik', 'food', 'Gula aren organik dari Blitar, diproses secara tradisional tanpa bahan kimia tambahan.', 'https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', 32000.00, 'kg', '["USA", "Japan", "Singapore", "Malaysia"]', 'active', 0),
('Tenun Lurik Kediri', 'tenun-lurik-kediri', 'textile', 'Kain tenun lurik tradisional dari Kediri, dengan motif garis-garis yang khas dan warna alami.', 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', 180000.00, 'meter', '["Japan", "France", "USA", "UK"]', 'active', 1);

-- ========================================
-- Table: news
-- ========================================
CREATE TABLE IF NOT EXISTS news (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    excerpt TEXT,
    content LONGTEXT,
    image VARCHAR(500) DEFAULT NULL,
    category_id INT DEFAULT NULL,
    category VARCHAR(50) DEFAULT NULL,
    author_id INT DEFAULT NULL,
    author VARCHAR(100) DEFAULT NULL,
    publish_date DATE DEFAULT NULL,
    status ENUM('published', 'draft', 'archived') DEFAULT 'draft',
    featured TINYINT(1) DEFAULT 0,
    view_count INT DEFAULT 0,
    tags JSON DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    FOREIGN KEY (author_id) REFERENCES admin_users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- Insert sample news
INSERT INTO news (title, slug, excerpt, content, image, category, author, publish_date, status, featured) VALUES
('PT.PENS Menandatangani Kerjasama Ekspor dengan Jepang', 'pt-pens-kerjasama-ekspor-jepang', 'PT.PENS resmi menandatangani perjanjian kerjasama strategis dengan mitra bisnis dari Jepang untuk ekspor produk kerajinan.', 'PT.PENS dengan bangga mengumumkan penandatanganan perjanjian kerjasama strategis dengan Nihon Trade Corporation dari Jepang. Kerjasama ini mencakup ekspor berbagai produk kerajinan tradisional Indonesia ke pasar Jepang.\n\nPerjanjian ini diharapkan dapat meningkatkan volume ekspor hingga 40% dalam dua tahun ke depan.', 'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'company-news', 'Admin', '2024-12-15', 'published', 1),
('Pameran Produk Ekspor di Trade Expo Indonesia 2024', 'pameran-trade-expo-indonesia-2024', 'PT.PENS berpartisipasi aktif dalam Trade Expo Indonesia 2024 yang diselenggarakan di ICE BSD.', 'PT.PENS akan berpartisipasi dalam Trade Expo Indonesia 2024 yang akan diselenggarakan pada tanggal 16-20 Oktober 2024 di Indonesia Convention Exhibition (ICE) BSD City.\n\nKami akan memamerkan berbagai produk unggulan ekspor dari Jawa Timur, termasuk tekstil, kerajinan, dan produk makanan olahan.', 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'events', 'Admin', '2024-12-10', 'published', 0),
('Pelatihan Ekspor untuk UKM Jawa Timur', 'pelatihan-ekspor-ukm-jawa-timur', 'PT.PENS mengadakan pelatihan ekspor gratis untuk pelaku UKM di Jawa Timur.', 'Dalam rangka mendukung perkembangan UKM di Jawa Timur, PT.PENS mengadakan program pelatihan ekspor gratis yang mencakup:\n\n- Prosedur ekspor dan dokumentasi\n- Standar kualitas internasional\n- Pengemasan produk ekspor\n- Strategi pemasaran global', 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'industry-updates', 'Admin', '2024-12-05', 'published', 0);

-- ========================================
-- Table: documents
-- ========================================
CREATE TABLE IF NOT EXISTS documents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    file_path VARCHAR(500) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_type VARCHAR(50) DEFAULT NULL,
    file_size INT DEFAULT 0,
    category_id INT DEFAULT NULL,
    category VARCHAR(50) DEFAULT NULL,
    uploaded_by INT DEFAULT NULL,
    status ENUM('active', 'archived') DEFAULT 'active',
    download_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    FOREIGN KEY (uploaded_by) REFERENCES admin_users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- Insert sample documents
INSERT INTO documents (name, description, file_path, file_name, file_type, file_size, category, status) VALUES
('Company Profile 2024', 'Official company profile document', 'uploads/documents/company-profile-2024.pdf', 'company-profile-2024.pdf', 'pdf', 2500000, 'reports', 'active'),
('Export License', 'Current export license certificate', 'uploads/documents/export-license.pdf', 'export-license.pdf', 'pdf', 500000, 'certificates', 'active'),
('Annual Report 2023', 'Annual financial and operations report', 'uploads/documents/annual-report-2023.pdf', 'annual-report-2023.pdf', 'pdf', 5000000, 'reports', 'active');

-- ========================================
-- Table: activities
-- ========================================
CREATE TABLE IF NOT EXISTS activities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT DEFAULT NULL,
    user_name VARCHAR(100) DEFAULT NULL,
    action ENUM('create', 'update', 'delete', 'login', 'logout', 'view') NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id INT DEFAULT NULL,
    entity_name VARCHAR(255) DEFAULT NULL,
    description TEXT,
    ip_address VARCHAR(45) DEFAULT NULL,
    user_agent VARCHAR(500) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES admin_users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- Insert sample activities
INSERT INTO activities (user_name, action, entity_type, entity_id, entity_name, description) VALUES
('Admin', 'create', 'product', 1, 'Kopi Arabika Jawa Timur', 'Created product: Kopi Arabika Jawa Timur'),
('Admin', 'create', 'product', 2, 'Batik Tulis Madura', 'Created product: Batik Tulis Madura'),
('Admin', 'create', 'news', 1, 'PT.PENS Menandatangani Kerjasama Ekspor dengan Jepang', 'Created news article'),
('Admin', 'update', 'product', 1, 'Kopi Arabika Jawa Timur', 'Updated product details'),
('Admin', 'login', 'auth', NULL, NULL, 'Admin logged in');

-- ========================================
-- Table: settings
-- ========================================
CREATE TABLE IF NOT EXISTS settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value TEXT,
    setting_type ENUM('string', 'number', 'boolean', 'json') DEFAULT 'string',
    description VARCHAR(255) DEFAULT NULL,
    is_public TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Insert default settings
INSERT INTO settings (setting_key, setting_value, setting_type, description, is_public) VALUES
('site_name', 'PT.PENS', 'string', 'Website name', 1),
('site_description', 'Indonesian Export Company', 'string', 'Website description', 1),
('site_email', 'info@ptpens.com', 'string', 'Contact email', 1),
('site_phone', '+62 31 5994251', 'string', 'Contact phone', 1),
('site_address', 'Jl. Raya ITS, Sukolilo, Surabaya 60111', 'string', 'Office address', 1),
('maintenance_mode', '0', 'boolean', 'Enable maintenance mode', 0),
('max_upload_size', '10485760', 'number', 'Maximum file upload size in bytes', 0),
('allowed_file_types', '["pdf","doc","docx","xls","xlsx","jpg","jpeg","png","gif"]', 'json', 'Allowed file types for upload', 0);

-- ========================================
-- Table: members (for member area)
-- ========================================
CREATE TABLE IF NOT EXISTS members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    company_name VARCHAR(255) DEFAULT NULL,
    phone VARCHAR(20) DEFAULT NULL,
    address TEXT,
    country VARCHAR(100) DEFAULT NULL,
    status ENUM('pending', 'active', 'suspended') DEFAULT 'pending',
    verification_token VARCHAR(255) DEFAULT NULL,
    is_verified TINYINT(1) DEFAULT 0,
    last_login DATETIME DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Insert sample members (passwords are hashed versions of 'password123')
INSERT INTO members (email, password, full_name, company_name, phone, country, status, is_verified) VALUES
('john.doe@example.com', '$2y$10$HfzIhGCCaxqyaIdGgjAR6eyS4uB88Mfx4RZ/g/W4.2/MBIW3S.Hiu', 'John Doe', 'PT. Global Trade Indonesia', '+6281234567890', 'Indonesia', 'active', 1),
('jane.smith@example.com', '$2y$10$HfzIhGCCaxqyaIdGgjAR6eyS4uB88Mfx4RZ/g/W4.2/MBIW3S.Hiu', 'Jane Smith', 'CV. Export Nusantara', '+6282345678901', 'Indonesia', 'active', 1),
('ahmad.yusuf@example.com', '$2y$10$HfzIhGCCaxqyaIdGgjAR6eyS4uB88Mfx4RZ/g/W4.2/MBIW3S.Hiu', 'Ahmad Yusuf', 'UD. Rempah Jaya', '+6283456789012', 'Indonesia', 'active', 1),
('sarah.johnson@example.com', '$2y$10$HfzIhGCCaxqyaIdGgjAR6eyS4uB88Mfx4RZ/g/W4.2/MBIW3S.Hiu', 'Sarah Johnson', 'Spice International Ltd', '+6284567890123', 'Singapore', 'pending', 0),
('test@example.com', '$2y$10$HfzIhGCCaxqyaIdGgjAR6eyS4uB88Mfx4RZ/g/W4.2/MBIW3S.Hiu', 'Test User', 'Test Company', '+6285678901234', 'Indonesia', 'active', 1);

-- ========================================

-- Indexes for better performance
-- ========================================
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_featured ON products(featured);
CREATE INDEX idx_news_status ON news(status);
CREATE INDEX idx_news_publish_date ON news(publish_date);
CREATE INDEX idx_news_featured ON news(featured);
CREATE INDEX idx_documents_category ON documents(category);
CREATE INDEX idx_activities_action ON activities(action);
CREATE INDEX idx_activities_entity_type ON activities(entity_type);
CREATE INDEX idx_activities_created_at ON activities(created_at);

-- ========================================
-- Views for common queries
-- ========================================

-- View: Active products with category info
CREATE OR REPLACE VIEW v_active_products AS
SELECT p.*, c.name as category_name
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
WHERE p.status = 'active';

-- View: Published news
CREATE OR REPLACE VIEW v_published_news AS
SELECT n.*, c.name as category_name
FROM news n
LEFT JOIN categories c ON n.category_id = c.id
WHERE n.status = 'published'
ORDER BY n.publish_date DESC;

-- View: Recent activities
CREATE OR REPLACE VIEW v_recent_activities AS
SELECT a.*, u.full_name as user_full_name
FROM activities a
LEFT JOIN admin_users u ON a.user_id = u.id
ORDER BY a.created_at DESC
LIMIT 50;

-- ========================================
-- End of Schema
-- ========================================
