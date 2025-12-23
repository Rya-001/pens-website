-- ========================================
-- PT.PENS Database Update Script
-- Add products matching the website homepage
-- Run this AFTER importing pens_db.sql
-- ========================================

USE pens_db;

-- Add new categories for skincare
INSERT IGNORE INTO categories (name, slug, description, type) VALUES
('Beauty & Skincare', 'beauty', 'Beauty and skincare products', 'product'),
('Luxury', 'luxury', 'Luxury brand products', 'product'),
('Spices', 'spices', 'Spices and herbs', 'product');

-- Clear existing products and add new ones matching the website
DELETE FROM products;

-- Insert products matching the homepage exactly
INSERT INTO products (name, slug, category, description, image, price, unit, export_countries, status, featured) VALUES
-- Spices Section
('Cengkeh Organik', 'cengkeh-organik', 'spices', 'Cengkeh berkualitas tinggi dari perkebunan organik dengan kadar minyak atsiri optimal untuk industri farmasi dan makanan. Asal: Jawa Timur, Indonesia. Grade A, MOQ: 1 Drum (25kg).', 'images/cengkeh-organik.png', 0.00, 'drum', '["USA", "Europe", "Japan", "Middle East"]', 'active', 1),

('Kayu Manis Jawa', 'kayu-manis-jawa', 'spices', 'Kayu manis asli Jawa dengan aroma kuat dan kadar cinnamaldehyde tinggi, ideal untuk industri farmasi dan minuman. Asal: Jawa, Indonesia. Grade A, MOQ: 1 Drum (20kg).', 'images/kayumanis-jawa.png', 0.00, 'drum', '["USA", "Europe", "Middle East", "Australia"]', 'active', 1),

('Pala Bubuk Organik', 'pala-bubuk-organik', 'spices', 'Pala bubuk halus dengan tingkat kehalusan 80 mesh, tanpa bahan pengawet untuk industri makanan premium. Asal: Indonesia. Organic Certified, MOQ: 1kg & Bulk.', 'images/pala-bubuk-organik.png', 0.00, 'kg', '["USA", "Europe", "Japan", "Australia"]', 'active', 1),

-- Skincare Section
('Skintific Skincare', 'skintific-skincare', 'beauty', 'Brand skincare populer kategori kecantikan dengan sertifikasi BPOM untuk pasar ekspor distributor. BPOM Certified, Popular Brand, Bulk Export.', 'images/skintific.png', 0.00, 'unit', '["Southeast Asia", "Middle East", "Africa"]', 'active', 1),

('G2G Skincare (Glad2Glow)', 'g2g-skincare', 'beauty', 'Brand skincare populer Indonesia untuk skin barrier, jerawat, dan kulit kusam dengan bahan aktif Ceramide, Centella, dan Niacinamide. BPOM Certified.', 'images/g2g.png', 0.00, 'unit', '["Southeast Asia", "Middle East", "Africa"]', 'active', 1),

('Chanel (Parfum & Kosmetik)', 'chanel-perfume', 'luxury', 'Showcase kosmetik dan parfum mewah. Ekspor berbasis permintaan khusus (Non-retail). Authentic, Special Request, Global Export.', 'images/chanel.png', 0.00, 'unit', '["Global"]', 'active', 1),

-- Original products from DB (optional)
('Kopi Arabika Jawa Timur', 'kopi-arabika-jawa-timur', 'food', 'Kopi arabika kualitas premium dari perkebunan di Malang, dengan cita rasa kompleks dan aroma yang khas.', 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', 45000.00, 'kg', '["Japan", "USA", "Germany", "Australia"]', 'active', 0),

('Batik Tulis Madura', 'batik-tulis-madura', 'textile', 'Batik tulis tradisional dengan motif khas Madura, dibuat secara manual oleh pengrajin berpengalaman.', 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', 350000.00, 'piece', '["USA", "France", "UK", "Netherlands"]', 'active', 0);

-- Verify products were inserted
SELECT * FROM products;
