# PT.PENS Admin Dashboard

## Overview

A comprehensive admin dashboard for managing PT.PENS website content, including products, news articles, documents, and activity tracking.

## Features

### 1. **Dashboard Overview**
- Real-time statistics cards showing:
  - Total Products
  - Published News Articles
  - Total Documents
  - Activities Today
- Recent activity feed
- Quick stats visualization chart
- Responsive grid layout

### 2. **Product Management**
- **View Products**: Table view with product details (ID, image, name, category, price, status)
- **Add Products**: Modal form to create new products
- **Edit Products**: Update existing product information
- **Delete Products**: Remove products with confirmation
- **Categories**: Agriculture, Textile, Handicraft, Food & Beverage, Electronics
- **Status Management**: Active/Inactive products

### 3. **News Management**
- **View News**: Card-based grid layout
- **Add Articles**: Create new news articles with rich content
- **Edit Articles**: Update existing articles
- **Delete Articles**: Remove articles with confirmation
- **Status**: Published/Draft articles
- **Fields**: Title, excerpt, content, featured image, author, publish date

### 4. **Document Management**
- **Upload Documents**: Drag-and-drop file upload interface
- **Categorize Documents**: Contracts, Invoices, Reports, Certificates, Others
- **View Documents**: Grid view with document icons
- **Download Documents**: Download stored documents
- **Delete Documents**: Remove documents with confirmation
- **Category Filtering**: Filter documents by category
- **Document Metadata**: Name, size, upload date, type

### 5. **Activity Log**
- **Real-time Tracking**: All CRUD operations are logged
- **Activity Types**: Create, Update, Delete
- **Timeline View**: Chronological activity timeline
- **Filtering**: Filter by activity type and date
- **Activity Details**: Title, description, timestamp, user

## File Structure

```
project gw/
├── admin.html              # Main admin dashboard page
├── css/
│   └── admin.css          # Admin dashboard styles
├── js/
│   └── admin.js           # Admin dashboard functionality
└── backend/
    ├── routes/
    │   └── api.js         # API routes for admin operations
    └── data/
        ├── products.json  # Products data
        ├── news.json      # News articles data
        ├── documents.json # Documents metadata
        └── activities.json # Activity log data
```

## Getting Started

### 1. Access the Admin Dashboard

Open the admin dashboard in your browser:
```
file:///c:/xampp/htdocs/project gw/admin.html
```

Or if using a local server:
```
http://localhost/project gw/admin.html
```

### 2. Navigation

The sidebar contains navigation links to:
- **Dashboard**: Overview and statistics
- **Products**: Manage products
- **News**: Manage news articles
- **Documents**: Manage documents
- **Activity Log**: View all activities

### 3. Using the Dashboard

#### Adding a Product:
1. Click "Products" in the sidebar
2. Click "Add New Product" button
3. Fill in the form:
   - Product Name
   - Category
   - Price (USD)
   - Description
   - Image URL
   - Status (Active/Inactive)
4. Click "Save Product"

#### Adding a News Article:
1. Click "News" in the sidebar
2. Click "Add New Article" button
3. Fill in the form:
   - Article Title
   - Excerpt
   - Content
   - Featured Image URL
   - Author
   - Publish Date
   - Status (Published/Draft)
4. Click "Save Article"

#### Uploading a Document:
1. Click "Documents" in the sidebar
2. Click "Upload Document" button
3. Fill in the form:
   - Document Name
   - Category
   - File Upload (drag & drop or click to browse)
   - Description (optional)
4. Click "Upload Document"

#### Viewing Activity Log:
1. Click "Activity Log" in the sidebar
2. Use filters to narrow down activities:
   - Filter by type (All, Created, Updated, Deleted)
   - Filter by date
3. View chronological timeline of all activities

## API Endpoints

### Products
- `GET /api/admin/products` - Get all products
- `POST /api/admin/products` - Create new product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product

### News
- `GET /api/admin/news` - Get all news articles
- `POST /api/admin/news` - Create new article
- `PUT /api/admin/news/:id` - Update article
- `DELETE /api/admin/news/:id` - Delete article

### Documents
- `GET /api/admin/documents` - Get all documents
- `POST /api/admin/documents` - Upload document
- `DELETE /api/admin/documents/:id` - Delete document

### Activities
- `GET /api/admin/activities` - Get all activities
- `POST /api/admin/activities` - Log new activity

### Stats
- `GET /api/admin/stats` - Get dashboard statistics

## Design Features

### Modern UI/UX
- **Dark Theme**: Professional dark color scheme
- **Glassmorphism**: Modern glass-like effects
- **Smooth Animations**: Micro-interactions and transitions
- **Gradient Accents**: Vibrant gradient colors
- **Responsive Design**: Works on desktop, tablet, and mobile

### Color Palette
- **Primary**: Indigo (#6366f1)
- **Secondary**: Purple (#8b5cf6)
- **Success**: Green (#10b981)
- **Warning**: Orange (#f59e0b)
- **Danger**: Red (#ef4444)
- **Info**: Blue (#3b82f6)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800

## Technical Details

### Technologies Used
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with custom properties
- **JavaScript (ES6+)**: Modern JavaScript features
- **Chart.js**: Data visualization
- **Font Awesome**: Icon library
- **Node.js/Express**: Backend API (optional)

### Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge

### Performance
- Optimized animations
- Efficient DOM manipulation
- Lazy loading where applicable
- Minimal dependencies

## Security Considerations

### Current Implementation
- Simple authentication check (localStorage)
- Client-side validation
- Mock data for demonstration

### Production Recommendations
1. **Authentication**: Implement proper JWT-based authentication
2. **Authorization**: Role-based access control (RBAC)
3. **API Security**: Add API authentication and rate limiting
4. **Input Validation**: Server-side validation for all inputs
5. **File Upload**: Implement secure file upload with virus scanning
6. **HTTPS**: Use HTTPS in production
7. **CSRF Protection**: Add CSRF tokens
8. **XSS Prevention**: Sanitize all user inputs

## Future Enhancements

### Planned Features
1. **User Management**: Add/edit/delete admin users
2. **Role Management**: Different permission levels
3. **Advanced Analytics**: Charts and reports
4. **Export Data**: Export to CSV/Excel
5. **Bulk Operations**: Bulk edit/delete
6. **Search & Filter**: Advanced search functionality
7. **Image Upload**: Direct image upload instead of URLs
8. **Rich Text Editor**: WYSIWYG editor for content
9. **Email Notifications**: Email alerts for activities
10. **Audit Trail**: Detailed audit logging

### Integration Possibilities
- **Database**: MySQL, PostgreSQL, MongoDB
- **Cloud Storage**: AWS S3, Google Cloud Storage
- **CDN**: CloudFlare, AWS CloudFront
- **Email Service**: SendGrid, Mailgun
- **Analytics**: Google Analytics integration

## Troubleshooting

### Common Issues

**Issue**: Dashboard not loading
- **Solution**: Check if all files are in the correct directories
- **Solution**: Open browser console to check for errors

**Issue**: Data not persisting
- **Solution**: Ensure backend server is running
- **Solution**: Check file permissions for data directory

**Issue**: Modals not opening
- **Solution**: Check browser console for JavaScript errors
- **Solution**: Ensure all scripts are loaded

**Issue**: Images not displaying
- **Solution**: Verify image URLs are valid
- **Solution**: Check CORS settings if using external images

## Support

For issues or questions:
1. Check the browser console for errors
2. Verify all files are in the correct locations
3. Ensure backend server is running (if using API)
4. Check file permissions

## License

This admin dashboard is part of the PT.PENS website project.

## Credits

- **Design**: Modern admin dashboard design patterns
- **Icons**: Font Awesome
- **Charts**: Chart.js
- **Fonts**: Google Fonts (Inter)

---

**Version**: 1.0.0  
**Last Updated**: December 18, 2025  
**Author**: PT.PENS Development Team
