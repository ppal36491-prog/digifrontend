# Setup Guide - MongoDB Backend & Admin Panel

## ⚡ Quick Start (5 minutes)

### Step 1: Start the Backend
```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Start server
npm run dev
```

You should see:
```
✓ MongoDB connected successfully
✓ Default admin created
🚀 Server running on http://localhost:5000
```

### Step 2: Access Admin Panel
Visit: `http://localhost:5173/admin`

**Login Credentials:**
- Email: `admin@123gmail.com`
- Password: `Digi@123!@#`

## 📋 What's Included

### Backend (Node.js + Express)
- ✅ MongoDB connection
- ✅ JWT authentication
- ✅ Page management API
- ✅ SEO data support
- ✅ Image upload (base64)
- ✅ Draft/Publish workflow

### Admin Panel UI
- ✅ Login page
- ✅ Page dashboard
- ✅ Create/Edit pages
- ✅ Image upload
- ✅ SEO keywords manager
- ✅ Route configuration
- ✅ Responsive design

## 🎯 How to Use

### Create a New SEO Page

1. **Login** to `/admin`
2. **Click** "New Page"
3. **Fill in:**
   - Page Title: e.g., "Web Development Services"
   - Page Name: e.g., "Web Development"
   - Route: e.g., "/web-development" or "/services/web-dev"
   - Content: Page description/details
   - Images: Upload multiple images
   - SEO Keywords: Add keywords (press Enter after each)
   - SEO Description: Brief description for search engines
   - SEO Title: Title for search results
4. **Choose:** Draft or Publish
5. **Click:** "Create Page"

### Access Published Pages

**Via API:**
```
GET /api/pages/public                    # Get all published pages
GET /api/pages/public/web-development   # Get specific page
```

### Update a Page

1. Click the **Edit** button on any page card
2. Make changes
3. Click **Update Page**

### Delete a Page

1. Click the **Delete** button (trash icon)
2. Confirm deletion

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.ts          # MongoDB setup
│   ├── models/
│   │   ├── Admin.ts              # Admin user schema
│   │   └── Page.ts               # Page schema
│   ├── middleware/
│   │   └── auth.ts               # JWT authentication
│   ├── routes/
│   │   ├── auth.ts               # Login/Register
│   │   └── pages.ts              # Page CRUD
│   └── server.ts                 # Main server file
├── package.json
├── tsconfig.json
├── .env.example
└── README.md

src/
├── components/
│   ├── AdminPanel.tsx            # Main admin component
│   ├── AdminLogin.tsx            # Login form
│   ├── AdminDashboard.tsx        # Page dashboard
│   └── PageForm.tsx              # Create/Edit page form
├── routes/
│   └── admin.tsx                 # /admin route
├── lib/
│   └── api.ts                    # API utilities
└── styles/
    └── admin.css                 # Admin panel styles
```

## 🔧 Configuration

### Update Environment Variables
Edit `backend/.env`:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
CORS_ORIGIN=http://localhost:5173
ADMIN_EMAIL=admin@123gmail.com
ADMIN_PASSWORD=Digi@123!@#
```

## 🚀 Deployment

### Production Build
```bash
# Backend
cd backend
npm install
npm run build

# Frontend
npm run build
```

### Environment Setup for Production
1. Update `.env` with production MongoDB URI
2. Set `CORS_ORIGIN` to your frontend domain
3. Change `JWT_SECRET` to a strong random key

## 🔐 Security Notes

- ✅ Passwords are hashed with bcrypt
- ✅ JWT tokens expire in 7 days
- ✅ All admin routes require authentication
- ✅ Images stored as base64 in database

## ⚙️ Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is in use
# Change PORT in .env if needed
npm run dev
```

### MongoDB connection fails
- Verify connection string in `.env`
- Check MongoDB Atlas network access settings
- Ensure username/password are correct

### Login not working
- Default admin created on first start
- Check backend console for errors
- Verify ADMIN_EMAIL in .env matches your login attempt

### Images not uploading
- Check image file size (max 50MB in .env)
- Verify MongoDB storage limits
- Check browser console for errors

## 📞 Support

For issues, check:
1. Backend console output
2. Browser console (F12)
3. Network tab in DevTools
4. Backend `.env` configuration

## ✨ Features Overview

### Admin Features
- 🔐 Secure login
- 📄 Create unlimited pages
- 🖼️ Multiple image upload
- 🔍 SEO optimization
- 📱 Responsive dashboard
- ✏️ Edit/Delete pages
- 📤 Draft/Publish workflow

### Page Features
- 🔗 Custom routes (`/page-name`)
- 📝 Page title and name
- 🖼️ Multiple images support
- 🔑 SEO keywords (unlimited)
- 📊 SEO title and description
- 📋 Rich content support
- 🚀 One-click publishing

---

**Ready to go!** Start the backend with `npm run dev` in the `/backend` folder, then visit `/admin` to create your first SEO page.
