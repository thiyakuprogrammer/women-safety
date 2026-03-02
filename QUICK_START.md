# 🚀 Quick Start Guide

## Get Started in 3 Minutes!

### 1️⃣ Install Dependencies (2 minutes)

Open your terminal in the project root directory and run:

```bash
npm run install-all
```

This will install all dependencies for both frontend and backend.

### 2️⃣ Start the Application (30 seconds)

#### Option A: Run Both Servers Together
```bash
npm run dev
```

#### Option B: Run Separately (if Option A doesn't work)

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```

### 3️⃣ Open in Browser (10 seconds)

The app will automatically open at:
```
http://localhost:3000
```

If it doesn't open automatically, just paste that URL in your browser.

## 🎉 That's It!

You should now see the SafeGuard Women Safety Platform running!

## 📱 Test the Features

1. **Home Page** - See the overview and quick access cards
2. **SOS Emergency** - Click the big red SOS button
3. **Safe Route** - Explore route options and share location
4. **Need Help** - Access helpline numbers
5. **About** - Learn about the platform

## ⚠️ Troubleshooting

### Port Already in Use?

If you see "Port 3000 is already in use":
- Close other applications using port 3000
- Or the app will prompt you to use a different port (press Y)

If you see "Port 5000 is already in use":
- Edit `server/.env` and change PORT to 5001
- Restart the server

### Dependencies Not Installing?

Make sure you have Node.js installed:
```bash
node --version
npm --version
```

If not installed, download from: https://nodejs.org/

### Still Having Issues?

1. Delete `node_modules` folders:
   ```bash
   rm -rf node_modules client/node_modules server/node_modules
   ```

2. Clear npm cache:
   ```bash
   npm cache clean --force
   ```

3. Reinstall:
   ```bash
   npm run install-all
   ```

## 🌐 Deploy to Netlify (Optional)

1. Build the frontend:
   ```bash
   cd client
   npm run build
   ```

2. Go to [Netlify](https://www.netlify.com/)

3. Drag and drop the `client/build` folder

4. Done! Your site is live!

## 💡 Tips

- The backend API runs on `http://localhost:5000`
- The frontend runs on `http://localhost:3000`
- All data is mock data for demonstration
- No database required
- No authentication required

## 📚 Need More Help?

Check the main [README.md](README.md) for detailed documentation.

---

**Happy Coding! 🛡️**
