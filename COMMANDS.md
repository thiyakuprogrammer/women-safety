# 🚀 Quick Command Reference

All the commands you need to run the Women Safety Platform with MySQL database.

## 📦 Installation

```bash
# Install all dependencies (frontend + backend)
npm run install-all

# Or install separately
cd client && npm install
cd ../server && npm install
```

## 🗄️ Database Setup

```bash
# Initialize database (creates tables and sample data)
cd server
node config/initDatabase.js
```

## ▶️ Running the Application

### Option 1: Run Both Together (Recommended)
```bash
# From project root
npm run dev
```

### Option 2: Run Separately

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
# Runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
# Runs on http://localhost:3000
```

## 🔍 Testing

### Test Backend API
```bash
# Health check
curl http://localhost:5000/api/health

# Get emergency services
curl http://localhost:5000/api/emergency-services

# Get helplines
curl http://localhost:5000/api/helplines

# Get safe routes
curl http://localhost:5000/api/safe-routes
```

### Test Database Connection
```bash
mysql -u root -p
# Enter password: 12345

USE women_safety_db;
SHOW TABLES;
SELECT * FROM helplines;
SELECT * FROM emergency_services;
```

## 🏗️ Building for Production

```bash
# Build frontend
cd client
npm run build

# The build folder is ready to deploy
```

## 🗄️ Database Commands

### View All Tables
```sql
USE women_safety_db;
SHOW TABLES;
```

### View Data
```sql
-- View all helplines
SELECT * FROM helplines;

-- View all emergency services
SELECT * FROM emergency_services;

-- View recent SOS alerts
SELECT * FROM sos_alerts ORDER BY created_at DESC LIMIT 10;

-- View active location shares
SELECT * FROM location_shares WHERE active = true;

-- View unsafe area reports
SELECT * FROM unsafe_reports ORDER BY created_at DESC;
```

### Reset Database
```sql
-- Drop and recreate
DROP DATABASE women_safety_db;
```

Then run:
```bash
cd server
node config/initDatabase.js
```

## 🔧 MySQL Service Commands (Windows)

```bash
# Check if MySQL is running
net start | findstr MySQL

# Start MySQL
net start MySQL80

# Stop MySQL
net stop MySQL80

# Restart MySQL
net stop MySQL80 && net start MySQL80
```

## 📊 Monitoring

### Check Server Logs
```bash
# Backend logs show in terminal when running
cd server
npm run dev
```

### Check Database Activity
```sql
-- Show recent queries
SHOW PROCESSLIST;

-- Show database size
SELECT 
    table_schema AS 'Database',
    ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) AS 'Size (MB)'
FROM information_schema.tables
WHERE table_schema = 'women_safety_db'
GROUP BY table_schema;
```

## 🧹 Cleanup Commands

### Clear Node Modules
```bash
# Remove all node_modules
rm -rf node_modules client/node_modules server/node_modules

# Or on Windows
rmdir /s /q node_modules
rmdir /s /q client\node_modules
rmdir /s /q server\node_modules
```

### Clear npm Cache
```bash
npm cache clean --force
```

### Reinstall Everything
```bash
# Clear and reinstall
rm -rf node_modules client/node_modules server/node_modules
npm run install-all
```

## 🐛 Debugging Commands

### Check Port Usage
```bash
# Check if port 3000 is in use
netstat -ano | findstr :3000

# Check if port 5000 is in use
netstat -ano | findstr :5000

# Check if port 3306 is in use (MySQL)
netstat -ano | findstr :3306
```

### Kill Process on Port
```bash
# Kill process on port 3000
npx kill-port 3000

# Kill process on port 5000
npx kill-port 5000
```

## 📝 Environment Variables

### View Current Environment
```bash
cd server
cat .env

# Or on Windows
type .env
```

### Update Environment
```bash
# Edit the .env file
cd server
notepad .env

# Or use any text editor
code .env
```

## 🔄 Git Commands

```bash
# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit with MySQL integration"

# Add remote
git remote add origin <your-repo-url>

# Push
git push -u origin main
```

## 📦 Package Management

### Update Dependencies
```bash
# Check for outdated packages
npm outdated

# Update all packages
npm update

# Update specific package
npm update express
```

### Add New Package

**Backend:**
```bash
cd server
npm install package-name
```

**Frontend:**
```bash
cd client
npm install package-name
```

## 🚀 Deployment Commands

### Netlify
```bash
cd client
npm run build
netlify deploy --prod --dir=build
```

### Heroku (Backend)
```bash
cd server
heroku create women-safety-backend
git push heroku main
```

## 📊 Database Backup

### Backup Database
```bash
mysqldump -u root -p women_safety_db > backup.sql
```

### Restore Database
```bash
mysql -u root -p women_safety_db < backup.sql
```

## 🔍 Useful Queries

### Count Records
```sql
SELECT 
    'helplines' as table_name, COUNT(*) as count FROM helplines
UNION ALL
SELECT 
    'emergency_services', COUNT(*) FROM emergency_services
UNION ALL
SELECT 
    'sos_alerts', COUNT(*) FROM sos_alerts
UNION ALL
SELECT 
    'location_shares', COUNT(*) FROM location_shares
UNION ALL
SELECT 
    'unsafe_reports', COUNT(*) FROM unsafe_reports;
```

### Recent Activity
```sql
-- Recent SOS alerts
SELECT alert_id, message, status, created_at 
FROM sos_alerts 
ORDER BY created_at DESC 
LIMIT 5;

-- Active location shares
SELECT share_id, active, created_at, expires_at
FROM location_shares
WHERE active = true
ORDER BY created_at DESC;
```

## 🎯 Quick Start Checklist

- [ ] MySQL installed and running
- [ ] Dependencies installed (`npm run install-all`)
- [ ] Database initialized (`node config/initDatabase.js`)
- [ ] Backend running (`npm run dev` or `cd server && npm run dev`)
- [ ] Frontend running (opens automatically or go to http://localhost:3000)
- [ ] Test SOS feature
- [ ] Test location sharing
- [ ] Check database for stored data

## 🆘 Emergency Commands

### If Everything Breaks
```bash
# 1. Stop all servers (Ctrl+C in terminals)

# 2. Clear everything
rm -rf node_modules client/node_modules server/node_modules
npm cache clean --force

# 3. Reinstall
npm run install-all

# 4. Reset database
mysql -u root -p
DROP DATABASE women_safety_db;
exit

# 5. Reinitialize
cd server
node config/initDatabase.js

# 6. Restart
cd ..
npm run dev
```

---

**Keep this file handy for quick reference!** 📌
