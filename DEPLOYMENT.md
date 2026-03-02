# 🚀 Deployment Guide

Complete guide for deploying the Women Safety Platform to various hosting services.

## 📋 Pre-Deployment Checklist

- [ ] All dependencies installed
- [ ] Application tested locally
- [ ] Production build successful
- [ ] Environment variables configured
- [ ] No console errors in browser

## 🌐 Frontend Deployment

### Option 1: Netlify (Recommended - Easiest)

#### Method A: Drag & Drop

1. **Build the application:**
   ```bash
   cd client
   npm run build
   ```

2. **Deploy:**
   - Go to [Netlify Drop](https://app.netlify.com/drop)
   - Drag the `client/build` folder
   - Your site is live!

#### Method B: Git Integration

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Connect to Netlify:**
   - Go to [Netlify](https://app.netlify.com/)
   - Click "New site from Git"
   - Choose your repository
   - Build settings:
     - Base directory: `client`
     - Build command: `npm run build`
     - Publish directory: `client/build`
   - Click "Deploy site"

3. **Configure redirects:**
   The `netlify.toml` file is already included in the project root.

### Option 2: GitHub Pages

1. **Install gh-pages:**
   ```bash
   cd client
   npm install --save-dev gh-pages
   ```

2. **Update client/package.json:**
   ```json
   {
     "homepage": "https://yourusername.github.io/women-safety-platform",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

3. **Deploy:**
   ```bash
   npm run deploy
   ```

4. **Enable GitHub Pages:**
   - Go to repository Settings
   - Navigate to Pages
   - Source: gh-pages branch
   - Save

### Option 3: Vercel

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   cd client
   vercel
   ```

3. **Follow prompts:**
   - Set up and deploy: Yes
   - Which scope: Your account
   - Link to existing project: No
   - Project name: women-safety-platform
   - Directory: ./
   - Override settings: No

### Option 4: Firebase Hosting

1. **Install Firebase CLI:**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login and initialize:**
   ```bash
   firebase login
   cd client
   firebase init hosting
   ```

3. **Configuration:**
   - Public directory: `build`
   - Single-page app: Yes
   - Automatic builds: No

4. **Build and deploy:**
   ```bash
   npm run build
   firebase deploy
   ```

## 🖥️ Backend Deployment

### Option 1: Render (Recommended - Free Tier)

1. **Create account:** [Render](https://render.com/)

2. **New Web Service:**
   - Connect your repository
   - Name: women-safety-backend
   - Environment: Node
   - Build Command: `cd server && npm install`
   - Start Command: `cd server && npm start`

3. **Environment Variables:**
   - Add `PORT` (Render provides this automatically)
   - Add `NODE_ENV=production`

4. **Deploy:** Click "Create Web Service"

### Option 2: Railway

1. **Create account:** [Railway](https://railway.app/)

2. **New Project:**
   - Deploy from GitHub repo
   - Select your repository
   - Railway auto-detects Node.js

3. **Configure:**
   - Root directory: `server`
   - Start command: `npm start`

4. **Environment Variables:**
   - Add in Railway dashboard
   - `NODE_ENV=production`

### Option 3: Heroku

1. **Install Heroku CLI:**
   ```bash
   npm install -g heroku
   ```

2. **Login and create app:**
   ```bash
   heroku login
   heroku create women-safety-backend
   ```

3. **Add Procfile in server directory:**
   ```
   web: node server.js
   ```

4. **Deploy:**
   ```bash
   git subtree push --prefix server heroku main
   ```

### Option 4: AWS EC2 (Advanced)

1. **Launch EC2 instance** (Ubuntu)

2. **SSH into instance:**
   ```bash
   ssh -i your-key.pem ubuntu@your-instance-ip
   ```

3. **Install Node.js:**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

4. **Clone and setup:**
   ```bash
   git clone <your-repo>
   cd women-safety-platform/server
   npm install
   ```

5. **Install PM2:**
   ```bash
   sudo npm install -g pm2
   pm2 start server.js
   pm2 startup
   pm2 save
   ```

6. **Configure Nginx** (optional for reverse proxy)

## 🔗 Connecting Frontend to Backend

### Update API URLs

If deploying backend separately, update API calls in frontend:

1. **Create environment file:**
   ```bash
   # client/.env.production
   REACT_APP_API_URL=https://your-backend-url.com
   ```

2. **Update API calls** (if needed):
   ```javascript
   const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
   ```

## 🔒 Security Considerations

### Before Production:

1. **Environment Variables:**
   - Never commit `.env` files
   - Use platform-specific environment variable settings

2. **CORS Configuration:**
   ```javascript
   // server/server.js
   const corsOptions = {
     origin: 'https://your-frontend-domain.com',
     optionsSuccessStatus: 200
   };
   app.use(cors(corsOptions));
   ```

3. **Rate Limiting:**
   ```bash
   npm install express-rate-limit
   ```

4. **Helmet for Security Headers:**
   ```bash
   npm install helmet
   ```

## 📊 Post-Deployment

### Testing

1. **Test all features:**
   - [ ] Navigation works
   - [ ] SOS button triggers modal
   - [ ] Location sharing simulation
   - [ ] Helpline numbers clickable
   - [ ] All pages load correctly

2. **Mobile testing:**
   - [ ] Responsive on mobile devices
   - [ ] Touch interactions work
   - [ ] Buttons are accessible

3. **Performance:**
   - [ ] Page load time < 3 seconds
   - [ ] No console errors
   - [ ] Images load properly

### Monitoring

1. **Netlify Analytics** (if using Netlify)
2. **Google Analytics** (optional)
3. **Error tracking:** Sentry, LogRocket

## 🔄 Continuous Deployment

### GitHub Actions (Example)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Netlify

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install and Build
        run: |
          cd client
          npm install
          npm run build
      
      - name: Deploy to Netlify
        uses: netlify/actions/cli@master
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
        with:
          args: deploy --prod --dir=client/build
```

## 🆘 Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf node_modules package-lock.json
npm install
npm run build
```

### 404 on Refresh

- Ensure `netlify.toml` redirects are configured
- For other platforms, configure SPA fallback

### API Not Connecting

- Check CORS settings
- Verify API URL in frontend
- Check backend logs

## 📱 Custom Domain (Optional)

### Netlify:
1. Go to Domain settings
2. Add custom domain
3. Configure DNS records

### GitHub Pages:
1. Add CNAME file in `public` folder
2. Configure DNS with your provider

## ✅ Deployment Checklist

- [ ] Frontend deployed and accessible
- [ ] Backend deployed (if separate)
- [ ] All pages load correctly
- [ ] Mobile responsive
- [ ] No console errors
- [ ] API endpoints working
- [ ] Environment variables set
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active (HTTPS)
- [ ] Analytics configured (optional)

## 🎉 Success!

Your Women Safety Platform is now live and helping make the world safer!

---

**Need Help?** Open an issue in the repository or check the main README.md
