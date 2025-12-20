# PT.PENS - Database Setup Guide

## Overview

This guide explains how to set up the MySQL database for the PT.PENS website using phpMyAdmin in XAMPP.

## Prerequisites

- XAMPP installed with Apache and MySQL
- Access to phpMyAdmin (http://localhost/phpmyadmin)

## Quick Setup

### Step 1: Start XAMPP
1. Open XAMPP Control Panel
2. Start **Apache** service
3. Start **MySQL** service

### Step 2: Create Database
1. Open http://localhost/phpmyadmin
2. Click **"Import"** tab at the top
3. Click **"Choose File"** and select `database/pens_db.sql`
4. Click **"Go"** to execute the SQL

### Step 3: Verify Setup
1. Open http://localhost/pens/setup.html
2. Click **"Test Database Connection"**
3. If successful, you'll see connection status

## Database Structure

### Tables Created

| Table | Description |
|-------|-------------|
| `admin_users` | Admin panel users and authentication |
| `categories` | Product, news, and document categories |
| `products` | Export products catalog |
| `news` | News articles and announcements |
| `documents` | Uploaded documents and files |
| `activities` | Activity log for audit trail |
| `settings` | Application settings |
| `members` | Member registration (for future use) |

### Default Credentials

- **Username:** `admin`
- **Email:** `admin@ptpens.com`
- **Password:** `admin123`

## API Endpoints

All API endpoints are located in the `/api` directory:

| Endpoint | Methods | Description |
|----------|---------|-------------|
| `/api/products.php` | GET, POST, PUT, DELETE | Product management |
| `/api/news.php` | GET, POST, PUT, DELETE | News management |
| `/api/documents.php` | GET, POST, PUT, DELETE | Document management |
| `/api/activities.php` | GET | Activity log |
| `/api/stats.php` | GET | Dashboard statistics |
| `/api/auth.php` | GET, POST | Authentication |

### API Usage Examples

#### Get All Products
```bash
GET http://localhost/pens/api/products.php
```

#### Get Single Product
```bash
GET http://localhost/pens/api/products.php?id=1
```

#### Create Product
```bash
POST http://localhost/pens/api/products.php
Content-Type: application/json

{
  "name": "Product Name",
  "category": "food",
  "description": "Product description",
  "price": 50000,
  "image": "https://example.com/image.jpg"
}
```

#### Update Product
```bash
PUT http://localhost/pens/api/products.php?id=1
Content-Type: application/json

{
  "name": "Updated Product Name",
  "price": 60000
}
```

#### Delete Product
```bash
DELETE http://localhost/pens/api/products.php?id=1
```

## Configuration

Database settings are in `/api/config/database.php`:

```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'pens_db');
define('DB_USER', 'root');
define('DB_PASS', '');
```

Modify these values if your MySQL configuration is different.

## File Structure

```
pens/
├── api/
│   ├── config/
│   │   └── database.php      # Database configuration
│   ├── products.php          # Products API
│   ├── news.php              # News API
│   ├── documents.php         # Documents API
│   ├── activities.php        # Activities API
│   ├── stats.php             # Dashboard stats API
│   └── auth.php              # Authentication API
├── database/
│   └── pens_db.sql           # Database schema and sample data
├── uploads/
│   └── documents/            # Uploaded files storage
└── setup.html                # Database setup wizard
```

## Troubleshooting

### Connection Failed Error
1. Make sure MySQL is running in XAMPP
2. Verify database `pens_db` exists in phpMyAdmin
3. Check database credentials in `api/config/database.php`

### Permission Errors
- Ensure `uploads/documents/` directory is writable
- On Windows, this should work by default

### Import Errors
- Make sure you're importing the complete SQL file
- Check phpMyAdmin's import size limit if file is large

## Security Notes

For production use:
1. Change default admin password
2. Update database password
3. Enable HTTPS
4. Add rate limiting to API
5. Implement CSRF protection

## Support

For issues or questions, check the project documentation or contact the administrator.
