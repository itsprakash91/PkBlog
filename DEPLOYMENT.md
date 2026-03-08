# PkBlog Deployment Guide

Deploy **Frontend** on **Vercel** and **Backend** on **Render**.

---

## 1. Backend on Render (Deploy First)

### Step 1: Push code to GitHub

Ensure your project is in a GitHub repo.

### Step 2: Create Web Service on Render

1. Go to [render.com](https://render.com) and sign in
2. Click **New +** → **Web Service**
3. Connect your GitHub repo
4. Configure:
   - **Name**: `pkblog-api` (or any name)
   - **Root Directory**: `Api`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

### Step 3: Environment Variables (Render Dashboard)

Add these in **Environment**:

| Key | Value | Required |
|-----|-------|----------|
| `PORT` | `10000` | ✅ (Render sets this; add if missing) |
| `MONGODB_CONN` | Your MongoDB Atlas connection string | ✅ |
| `JWT_SECRET` | A strong random string | ✅ |
| `FRONTEND_URL` | Your Vercel URL, e.g. `https://pkblog.vercel.app` | ✅ |
| `CLOUDINARY_APP_NAME` | Cloudinary cloud name | ✅ |
| `CLOUDINARY_API_KEY` | Cloudinary API key | ✅ |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | ✅ |
| `NODE_ENV` | `production` | Optional |

**CORS**: `FRONTEND_URL` must exactly match your frontend URL (with `https://`, no trailing slash).

**MongoDB Atlas**:  
- Add `0.0.0.0/0` in Network Access so Render can connect  
- Use connection string like: `mongodb+srv://user:pass@cluster.mongodb.net/mern_blog`

### Step 4: Deploy

Click **Create Web Service**. After deploy, copy your API URL, e.g.:

`https://pkblog-api.onrender.com`

---

## 2. Frontend on Vercel

### Step 1: Deploy from GitHub

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **Add New** → **Project**
3. Import your GitHub repo
4. Configure:
   - **Root Directory**: `Client` → Click **Edit** and set to `Client`
   - **Framework Preset**: Vite (auto-detected)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Step 2: Environment Variables (Vercel Dashboard)

Add in **Environment Variables**:

| Key | Value |
|-----|-------|
| `VITE_API_BASE_URL` | `https://pkblog-api.onrender.com/api` |

Use your actual Render API URL and append `/api` (all API routes are under `/api`).

### Step 3: Deploy

Click **Deploy**. After deployment, copy your frontend URL, e.g.:

`https://pkblog.vercel.app`

### Step 4: Update Backend CORS

Go back to Render → Your service → **Environment**  
Update `FRONTEND_URL` to your exact Vercel URL:

`https://pkblog.vercel.app`

Save. Render will redeploy with the new value.

---

## Important Notes

### Render Free Tier

- Service goes to sleep after ~15 minutes of no traffic
- First request after sleep can take ~30–50 seconds
- For always-on, use a paid plan

### Firebase (Google Login)

If you use Firebase/Google Auth:

1. Add your **production domain** to Firebase Console → Authentication → Settings → Authorized domains
2. Add: `pkblog.vercel.app` (and `onrender.com` if needed)

### Cookie / Credentials

`credentials: 'include'` is used for cookies. Ensure:

- `FRONTEND_URL` in backend matches your Vercel domain
- CORS is configured with `credentials: true` (already in your API)

---

## Quick Reference

| Service | URL Example |
|---------|-------------|
| Frontend (Vercel) | `https://pkblog.vercel.app` |
| Backend (Render) | `https://pkblog-api.onrender.com` |
| API Base URL | `https://pkblog-api.onrender.com/api` |
