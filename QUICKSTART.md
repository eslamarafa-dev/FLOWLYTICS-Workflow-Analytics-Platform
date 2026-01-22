# ⚡ Quick Start Guide

## 🚀 Get FLOWLYTICS running in 60 seconds

### Option 1: GitHub Pages (Easiest - No installation)

1. **Fork this repository** on GitHub
2. Go to **Settings** → **Pages**
3. Select **Source**: `main` branch, `/ (root)` folder
4. Click **Save**
5. Wait 2 minutes
6. Visit: `https://YOUR-USERNAME.github.io/flowlytics/`

✅ **Done! Your site is live.**

---

### Option 2: Local Development (Recommended)

#### Step 1: Download the project

```bash
# Clone the repository
git clone https://github.com/YOUR-USERNAME/flowlytics.git
cd flowlytics
```

#### Step 2: Start a local server

**Choose ONE method:**

```bash
# Method 1: Using npx serve (Recommended)
npx serve

# Method 2: Using Python 3
python -m http.server 3000

# Method 3: Using VS Code Live Server
# Right-click index.html → "Open with Live Server"
```

#### Step 3: Open in browser

```
http://localhost:3000
```

✅ **That's it! The app should load.**

---

## 🔍 Troubleshooting

### ❌ Issue: Blank page or errors in console

**Check:**
1. Open DevTools (F12) → Console tab
2. Look for errors

**Common fixes:**
- Make sure you're using a **local server** (not `file://`)
- Check that all files exist in `src/` folder
- Verify internet connection (for CDN resources)

### ❌ Issue: Styles not loading

**Check:**
- `src/styles.css` exists
- No typos in `<link>` tag in `index.html`

### ❌ Issue: React not working

**Check:**
- `src/react-app.jsx` exists
- Babel is loading before react-app.jsx
- Script tag has `type="text/babel"`

---

## 🎯 First Steps After Installation

1. **Toggle Dark/Light Mode** - Click sun/moon icon in header
2. **Switch Language** - Click EN/AR button
3. **Try Creating a Task** - Click "New Task" button
4. **Filter Tasks** - Use search and dropdowns
5. **Explore Dashboard** - View KPIs and charts

---

## 📚 Next Steps

- Read the full [README.md](README.md)
- Check [DEPLOYMENT.md](DEPLOYMENT.md) for GitHub Pages setup
- See [CONTRIBUTING.md](CONTRIBUTING.md) to contribute

---

## 💬 Need Help?

- [Open an Issue](https://github.com/YOUR-USERNAME/flowlytics/issues)
- Check the [Deployment Guide](DEPLOYMENT.md)

---

**Happy exploring! 🎉**
