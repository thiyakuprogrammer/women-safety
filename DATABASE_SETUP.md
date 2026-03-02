# 🗄️ Database Setup Guide

Complete guide for setting up MySQL database connection for the Women Safety Platform.

## 📋 Prerequisites

- MySQL Server installed and running
- Node.js and npm installed
- MySQL credentials ready

## 🔧 Database Configuration

### Your Current Configuration:
```
Host: 127.0.0.1
Port: 3306
Username: root
Password: 12345
Database: women_safety_db
```

## 🚀 Quick Setup (3 Steps)

### Step 1: Install Dependencies

```bash
# Install server dependencies (includes mysql2)
cd server
npm install
```

### Step 2: Verify MySQL is Running

**Windows:**
```bash
# Check if MySQL service is running
net start | findstr MySQL

# If not running, start it
net start MySQL80
```

**Alternative - Check via MySQL Workbench or Command Line:**
```bash
mysql -u root -p
# Enter password: 12345
# If you can connect, MySQL is running!
```

### Step 3: Initialize Database

```bash
# From the server directory
cd server
node config/initDatabase.js
```

This will:
- ✅ Create the database `women_safety_db`
- ✅ Create all required tables
- ✅ Insert sample data
- ✅ Verify the connection

## 📊 Database Schema

The following tables will be created:

### 1. emergency_services
```sql
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- name (VARCHAR 255)
- type (VARCHAR 100)
- phone (VARCHAR 20)
- latitude (DECIMAL 10,8)
- longitude (DECIMAL 11,8)
- distance (VARCHAR 50)
- available (BOOLEAN)
- created_at (TIMESTAMP)
```

### 2. helplines
```sql
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- name (VARCHAR 255)
- number (VARCHAR 20)
- category (VARCHAR 100)
- description (TEXT)
- available_24_7 (BOOLEAN)
- created_at (TIMESTAMP)
```

### 3. sos_alerts
```sql
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- alert_id (VARCHAR 100, UNIQUE)
- latitude (DECIMAL 10,8)
- longitude (DECIMAL 11,8)
- message (TEXT)
- status (VARCHAR 50)
- created_at (TIMESTAMP)
- resolved_at (TIMESTAMP)
```

### 4. location_shares
```sql
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- share_id (VARCHAR 100, UNIQUE)
- latitude (DECIMAL 10,8)
- longitude (DECIMAL 11,8)
- contacts (TEXT)
- active (BOOLEAN)
- created_at (TIMESTAMP)
- expires_at (TIMESTAMP)
```

### 5. unsafe_reports
```sql
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- report_id (VARCHAR 100, UNIQUE)
- latitude (DECIMAL 10,8)
- longitude (DECIMAL 11,8)
- description (TEXT)
- risk_level (VARCHAR 50)
- status (VARCHAR 50)
- created_at (TIMESTAMP)
```

## 🔄 Complete Installation Steps

### 1. Install All Dependencies

```bash
# From project root
npm run install-all
```

### 2. Configure Environment

The `.env` file has already been created in the `server` directory with your credentials:

```env
PORT=5000
NODE_ENV=development

DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=12345
DB_NAME=women_safety_db
```

### 3. Initialize Database

```bash
cd server
node config/initDatabase.js
```

Expected output:
```
Connected to MySQL server
✓ Database 'women_safety_db' created/verified
✓ Table emergency_services created/verified
✓ Table helplines created/verified
✓ Table sos_alerts created/verified
✓ Table location_shares created/verified
✓ Table unsafe_reports created/verified
✓ Sample emergency services inserted
✓ Sample helplines inserted

✓ Database initialization completed successfully!
```

### 4. Start the Application

```bash
# From project root
npm run dev
```

This will start:
- Backend server on http://localhost:5000
- Frontend on http://localhost:3000

## ✅ Verify Connection

### Test Backend API

Open your browser or use curl:

```bash
# Health check
curl http://localhost:5000/api/health

# Get emergency services
curl http://localhost:5000/api/emergency-services

# Get helplines
curl http://localhost:5000/api/helplines
```

### Check Database

```bash
mysql -u root -p
# Enter password: 12345

USE women_safety_db;
SHOW TABLES;
SELECT * FROM helplines;
SELECT * FROM emergency_services;
```

## 🔧 Troubleshooting

### Issue: "Access denied for user 'root'"

**Solution:**
1. Verify your MySQL password
2. Update `server/.env` with correct password
3. Try connecting via MySQL Workbench first

### Issue: "Can't connect to MySQL server"

**Solution:**
1. Check if MySQL is running:
   ```bash
   net start | findstr MySQL
   ```
2. Start MySQL service:
   ```bash
   net start MySQL80
   ```
3. Check port 3306 is not blocked

### Issue: "Database initialization failed"

**Solution:**
1. Check MySQL error logs
2. Verify user has CREATE DATABASE privileges:
   ```sql
   GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost';
   FLUSH PRIVILEGES;
   ```

### Issue: "ER_NOT_SUPPORTED_AUTH_MODE"

**Solution:**
```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '12345';
FLUSH PRIVILEGES;
```

### Issue: Frontend not connecting to backend

**Solution:**
1. Verify backend is running on port 5000
2. Check browser console for CORS errors
3. Ensure `client/package.json` has proxy configured:
   ```json
   "proxy": "http://localhost:5000"
   ```

## 📱 Frontend Integration

The frontend now uses real API calls:

### API Service (`client/src/services/api.js`)
- ✅ `getEmergencyServices()` - Fetch from database
- ✅ `getHelplines()` - Fetch from database
- ✅ `sendSOSAlert()` - Store in database
- ✅ `shareLocation()` - Store in database
- ✅ `reportUnsafeArea()` - Store in database

### Updated Pages:
- ✅ **SOS Page** - Fetches emergency services from DB
- ✅ **Need Help Page** - Fetches helplines from DB
- ✅ **Safe Route Page** - Stores location shares in DB

## 🔒 Security Notes

### For Development:
- ✅ `.env` file is gitignored
- ✅ Database credentials are in environment variables
- ✅ CORS is enabled for localhost

### For Production:
- [ ] Change default MySQL password
- [ ] Use environment variables on hosting platform
- [ ] Enable SSL for database connection
- [ ] Restrict CORS to specific domains
- [ ] Use connection pooling (already implemented)
- [ ] Add rate limiting
- [ ] Implement authentication

## 📊 Sample Data

The database is pre-populated with:

**Emergency Services (4 entries):**
- City Police Station
- General Hospital
- Fire Station
- Women Police Station

**Helplines (6 entries):**
- National Emergency (112)
- Women Helpline (1091)
- Police (100)
- Ambulance (102)
- Fire Service (101)
- Child Helpline (1098)

## 🔄 Reset Database

If you need to start fresh:

```sql
mysql -u root -p
# Enter password

DROP DATABASE women_safety_db;
```

Then run initialization again:
```bash
cd server
node config/initDatabase.js
```

## 📝 Testing the Integration

### 1. Test SOS Alert
1. Go to http://localhost:3000/sos
2. Click the SOS button
3. Confirm the alert
4. Check database:
   ```sql
   SELECT * FROM sos_alerts ORDER BY created_at DESC LIMIT 5;
   ```

### 2. Test Location Sharing
1. Go to http://localhost:3000/safe-route
2. Click "Share Location"
3. Confirm sharing
4. Check database:
   ```sql
   SELECT * FROM location_shares ORDER BY created_at DESC LIMIT 5;
   ```

### 3. Test Helplines
1. Go to http://localhost:3000/need-help
2. Verify helplines load from database
3. Check browser console for API calls

## 🎉 Success Indicators

You'll know everything is working when:

- ✅ Backend starts without errors
- ✅ "Database connected successfully" message appears
- ✅ Frontend loads without console errors
- ✅ Helplines display on Need Help page
- ✅ Emergency services show on SOS page
- ✅ SOS alerts are stored in database
- ✅ Location shares are stored in database

## 📚 Additional Resources

- [MySQL Documentation](https://dev.mysql.com/doc/)
- [mysql2 npm package](https://www.npmjs.com/package/mysql2)
- [Express.js Guide](https://expressjs.com/)

## 🆘 Need Help?

If you encounter issues:
1. Check the error messages carefully
2. Verify MySQL is running
3. Check database credentials in `.env`
4. Review the troubleshooting section above
5. Check server logs for detailed errors

---

**Your database is now connected and ready to use!** 🎉
