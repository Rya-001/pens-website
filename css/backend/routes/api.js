// API Routes for PT.PENS Website
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Mock data file path
const productsPath = path.join(__dirname, '../data/products.json');

// Get all products
router.get('/products', (req, res) => {
    try {
        const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
        res.json(productsData);
    } catch (error) {
        console.error('Error reading products data:', error);
        res.status(500).json({ error: 'Failed to load products' });
    }
});

// Get products by category
router.get('/products/category/:category', (req, res) => {
    try {
        const category = req.params.category;
        const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

        const filteredProducts = productsData.filter(
            product => product.category === category
        );

        res.json(filteredProducts);
    } catch (error) {
        console.error('Error filtering products:', error);
        res.status(500).json({ error: 'Failed to filter products' });
    }
});

// Get product by ID
router.get('/products/:id', (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

        const product = productsData.find(p => p.id === productId);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        console.error('Error finding product:', error);
        res.status(500).json({ error: 'Failed to find product' });
    }
});

// Handle contact form submission
router.post('/contact', (req, res) => {
    try {
        const { name, email, company, message } = req.body;

        // In a real application, you would save this to a database
        // For now, we'll just log it and send a response
        console.log('Contact form submission:', { name, email, company, message });

        // Simulate processing delay
        setTimeout(() => {
            res.json({
                success: true,
                message: 'Thank you for your message. We will contact you soon.'
            });
        }, 1000);

    } catch (error) {
        console.error('Error processing contact form:', error);
        res.status(500).json({ error: 'Failed to process contact form' });
    }
});

// Handle newsletter subscription
router.post('/newsletter', (req, res) => {
    try {
        const { email } = req.body;

        // In a real application, you would save this to a database
        console.log('Newsletter subscription:', email);

        res.json({
            success: true,
            message: 'Thank you for subscribing to our newsletter!'
        });

    } catch (error) {
        console.error('Error processing newsletter subscription:', error);
        res.status(500).json({ error: 'Failed to process subscription' });
    }
});

// Get export statistics
router.get('/statistics', (req, res) => {
    try {
        // Mock statistics data
        const statistics = {
            sectors: [
                { name: 'Agriculture', value: 45 },
                { name: 'Textile', value: 32 },
                { name: 'Handicraft', value: 28 },
                { name: 'Food', value: 38 },
                { name: 'Electronics', value: 22 },
                { name: 'Others', value: 15 }
            ],
            countries: [
                { name: 'United States', percentage: 32 },
                { name: 'Japan', percentage: 22 },
                { name: 'Germany', percentage: 15 },
                { name: 'Australia', percentage: 12 },
                { name: 'Singapore', percentage: 10 },
                { name: 'Others', percentage: 9 }
            ],
            growth: 12.5 // Percentage growth compared to last year
        };

        res.json(statistics);
    } catch (error) {
        console.error('Error getting statistics:', error);
        res.status(500).json({ error: 'Failed to load statistics' });
    }
});

// Get latest news
router.get('/news', (req, res) => {
    try {
        // Mock news data
        const news = [
            {
                id: 1,
                date: 'March 15, 2023',
                title: 'Agricultural Product Export Opportunities to European Market Increase by 25%',
                excerpt: 'Demand for organic agricultural products from Indonesia in the European market showed a significant increase in the first quarter of 2023.',
                image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
            },
            {
                id: 2,
                date: 'March 10, 2023',
                title: 'Changes in Textile Export Regulations to the United States',
                excerpt: 'The US government announced changes to textile import policies that will affect Indonesian exporters starting June 2023.',
                image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
            },
            {
                id: 3,
                date: 'March 5, 2023',
                title: 'PT.PENS Exports 100 Tons of Arabica Coffee to Japan',
                excerpt: 'Successfully shipped 100 tons of premium quality Arabica coffee from East Java to leading distributors in Japan.',
                image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
            }
        ];

        res.json(news);
    } catch (error) {
        console.error('Error getting news:', error);
        res.status(500).json({ error: 'Failed to load news' });
    }
});

// ========================================
// Admin API Routes
// ========================================

// Admin Products CRUD
router.get('/admin/products', (req, res) => {
    try {
        const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
        res.json(productsData);
    } catch (error) {
        console.error('Error loading products:', error);
        res.status(500).json({ error: 'Failed to load products' });
    }
});

router.post('/admin/products', (req, res) => {
    try {
        const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
        const newProduct = {
            id: productsData.length > 0 ? Math.max(...productsData.map(p => p.id)) + 1 : 1,
            ...req.body,
            createdAt: new Date().toISOString()
        };

        productsData.push(newProduct);
        fs.writeFileSync(productsPath, JSON.stringify(productsData, null, 2));

        res.status(201).json({ success: true, product: newProduct });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Failed to create product' });
    }
});

router.put('/admin/products/:id', (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
        const index = productsData.findIndex(p => p.id === productId);

        if (index === -1) {
            return res.status(404).json({ error: 'Product not found' });
        }

        productsData[index] = {
            ...productsData[index],
            ...req.body,
            updatedAt: new Date().toISOString()
        };

        fs.writeFileSync(productsPath, JSON.stringify(productsData, null, 2));
        res.json({ success: true, product: productsData[index] });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Failed to update product' });
    }
});

router.delete('/admin/products/:id', (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        let productsData = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
        const filteredProducts = productsData.filter(p => p.id !== productId);

        if (filteredProducts.length === productsData.length) {
            return res.status(404).json({ error: 'Product not found' });
        }

        fs.writeFileSync(productsPath, JSON.stringify(filteredProducts, null, 2));
        res.json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Failed to delete product' });
    }
});

// Admin News CRUD
const newsPath = path.join(__dirname, '../data/news.json');

router.get('/admin/news', (req, res) => {
    try {
        if (!fs.existsSync(newsPath)) {
            fs.writeFileSync(newsPath, JSON.stringify([], null, 2));
        }
        const newsData = JSON.parse(fs.readFileSync(newsPath, 'utf8'));
        res.json(newsData);
    } catch (error) {
        console.error('Error loading news:', error);
        res.status(500).json({ error: 'Failed to load news' });
    }
});

router.post('/admin/news', (req, res) => {
    try {
        if (!fs.existsSync(newsPath)) {
            fs.writeFileSync(newsPath, JSON.stringify([], null, 2));
        }
        const newsData = JSON.parse(fs.readFileSync(newsPath, 'utf8'));
        const newArticle = {
            id: newsData.length > 0 ? Math.max(...newsData.map(n => n.id)) + 1 : 1,
            ...req.body,
            createdAt: new Date().toISOString()
        };

        newsData.push(newArticle);
        fs.writeFileSync(newsPath, JSON.stringify(newsData, null, 2));

        res.status(201).json({ success: true, article: newArticle });
    } catch (error) {
        console.error('Error creating news:', error);
        res.status(500).json({ error: 'Failed to create news' });
    }
});

router.put('/admin/news/:id', (req, res) => {
    try {
        const newsId = parseInt(req.params.id);
        const newsData = JSON.parse(fs.readFileSync(newsPath, 'utf8'));
        const index = newsData.findIndex(n => n.id === newsId);

        if (index === -1) {
            return res.status(404).json({ error: 'News article not found' });
        }

        newsData[index] = {
            ...newsData[index],
            ...req.body,
            updatedAt: new Date().toISOString()
        };

        fs.writeFileSync(newsPath, JSON.stringify(newsData, null, 2));
        res.json({ success: true, article: newsData[index] });
    } catch (error) {
        console.error('Error updating news:', error);
        res.status(500).json({ error: 'Failed to update news' });
    }
});

router.delete('/admin/news/:id', (req, res) => {
    try {
        const newsId = parseInt(req.params.id);
        let newsData = JSON.parse(fs.readFileSync(newsPath, 'utf8'));
        const filteredNews = newsData.filter(n => n.id !== newsId);

        if (filteredNews.length === newsData.length) {
            return res.status(404).json({ error: 'News article not found' });
        }

        fs.writeFileSync(newsPath, JSON.stringify(filteredNews, null, 2));
        res.json({ success: true, message: 'News article deleted successfully' });
    } catch (error) {
        console.error('Error deleting news:', error);
        res.status(500).json({ error: 'Failed to delete news' });
    }
});

// Admin Documents CRUD
const documentsPath = path.join(__dirname, '../data/documents.json');

router.get('/admin/documents', (req, res) => {
    try {
        if (!fs.existsSync(documentsPath)) {
            fs.writeFileSync(documentsPath, JSON.stringify([], null, 2));
        }
        const documentsData = JSON.parse(fs.readFileSync(documentsPath, 'utf8'));
        res.json(documentsData);
    } catch (error) {
        console.error('Error loading documents:', error);
        res.status(500).json({ error: 'Failed to load documents' });
    }
});

router.post('/admin/documents', (req, res) => {
    try {
        if (!fs.existsSync(documentsPath)) {
            fs.writeFileSync(documentsPath, JSON.stringify([], null, 2));
        }
        const documentsData = JSON.parse(fs.readFileSync(documentsPath, 'utf8'));
        const newDocument = {
            id: documentsData.length > 0 ? Math.max(...documentsData.map(d => d.id)) + 1 : 1,
            ...req.body,
            uploadDate: new Date().toISOString()
        };

        documentsData.push(newDocument);
        fs.writeFileSync(documentsPath, JSON.stringify(documentsData, null, 2));

        res.status(201).json({ success: true, document: newDocument });
    } catch (error) {
        console.error('Error uploading document:', error);
        res.status(500).json({ error: 'Failed to upload document' });
    }
});

router.delete('/admin/documents/:id', (req, res) => {
    try {
        const documentId = parseInt(req.params.id);
        let documentsData = JSON.parse(fs.readFileSync(documentsPath, 'utf8'));
        const filteredDocuments = documentsData.filter(d => d.id !== documentId);

        if (filteredDocuments.length === documentsData.length) {
            return res.status(404).json({ error: 'Document not found' });
        }

        fs.writeFileSync(documentsPath, JSON.stringify(filteredDocuments, null, 2));
        res.json({ success: true, message: 'Document deleted successfully' });
    } catch (error) {
        console.error('Error deleting document:', error);
        res.status(500).json({ error: 'Failed to delete document' });
    }
});

// Admin Activity Log
const activitiesPath = path.join(__dirname, '../data/activities.json');

router.get('/admin/activities', (req, res) => {
    try {
        if (!fs.existsSync(activitiesPath)) {
            fs.writeFileSync(activitiesPath, JSON.stringify([], null, 2));
        }
        const activitiesData = JSON.parse(fs.readFileSync(activitiesPath, 'utf8'));
        res.json(activitiesData);
    } catch (error) {
        console.error('Error loading activities:', error);
        res.status(500).json({ error: 'Failed to load activities' });
    }
});

router.post('/admin/activities', (req, res) => {
    try {
        if (!fs.existsSync(activitiesPath)) {
            fs.writeFileSync(activitiesPath, JSON.stringify([], null, 2));
        }
        const activitiesData = JSON.parse(fs.readFileSync(activitiesPath, 'utf8'));
        const newActivity = {
            id: activitiesData.length > 0 ? Math.max(...activitiesData.map(a => a.id)) + 1 : 1,
            ...req.body,
            timestamp: new Date().toISOString()
        };

        activitiesData.unshift(newActivity); // Add to beginning

        // Keep only last 100 activities
        if (activitiesData.length > 100) {
            activitiesData.splice(100);
        }

        fs.writeFileSync(activitiesPath, JSON.stringify(activitiesData, null, 2));
        res.status(201).json({ success: true, activity: newActivity });
    } catch (error) {
        console.error('Error logging activity:', error);
        res.status(500).json({ error: 'Failed to log activity' });
    }
});

// Admin Dashboard Stats
router.get('/admin/stats', (req, res) => {
    try {
        const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

        let newsData = [];
        if (fs.existsSync(newsPath)) {
            newsData = JSON.parse(fs.readFileSync(newsPath, 'utf8'));
        }

        let documentsData = [];
        if (fs.existsSync(documentsPath)) {
            documentsData = JSON.parse(fs.readFileSync(documentsPath, 'utf8'));
        }

        let activitiesData = [];
        if (fs.existsSync(activitiesPath)) {
            activitiesData = JSON.parse(fs.readFileSync(activitiesPath, 'utf8'));
        }

        const today = new Date().toISOString().split('T')[0];
        const activitiesToday = activitiesData.filter(a =>
            a.timestamp && a.timestamp.split('T')[0] === today
        ).length;

        const stats = {
            totalProducts: productsData.length,
            totalNews: newsData.filter(n => n.status === 'published').length,
            totalDocuments: documentsData.length,
            activitiesToday: activitiesToday
        };

        res.json(stats);
    } catch (error) {
        console.error('Error getting stats:', error);
        res.status(500).json({ error: 'Failed to load stats' });
    }
});

module.exports = router;