# CMS Login Fix — 5 Minute Setup

## Why it broke
The CMS was trying to authenticate through Netlify (api.netlify.com) 
but the site is on Cloudflare Pages. We now use our own Cloudflare Worker.

---

## Step 1 — Create GitHub OAuth App

1. Go to: https://github.com/settings/developers
2. Click "New OAuth App"
3. Fill in:
   - **Application name**: Babycakes CMS
   - **Homepage URL**: https://babycakes.pages.dev
   - **Authorization callback URL**: https://babycakes-cms-oauth.thamswork.workers.dev/api/callback
4. Click "Register application"
5. Copy the **Client ID**
6. Click "Generate a new client secret" → copy the **Client Secret**

---

## Step 2 — Deploy the OAuth Worker

Open Terminal, run these commands one by one:

```bash
# Install Wrangler (Cloudflare CLI) — skip if already installed
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Go to worker folder
cd ~/babycakes/cloudflare-oauth-worker

# Add your GitHub OAuth secrets
wrangler secret put GITHUB_CLIENT_ID
# Paste your Client ID when prompted

wrangler secret put GITHUB_CLIENT_SECRET  
# Paste your Client Secret when prompted

# Deploy the worker
wrangler deploy
```

The worker deploys to:
https://babycakes-cms-oauth.thamswork.workers.dev

---

## Step 3 — Test the CMS

1. Go to: https://babycakes.pages.dev/admin
2. Click "Login with GitHub"
3. Authorize the app on GitHub
4. You're in — CMS should load fully

---

## Adding photos (once logged in)

### Bi-Weekly Flavors
1. CMS → Bi-Weekly Flavors → click a flavor
2. Upload photo in the "Photo" field
3. Click Publish → deploys in ~60 seconds

### Founder photos (Nile & Tess)
1. CMS → Site Settings → Brand Photos
2. Upload Nile portrait, Tess portrait
3. Save

### Hero homepage photo
1. CMS → Site Settings → Brand Photos → "Hero / Homepage photo"
2. Upload wide food photo
3. Save

### Update LINE link
1. CMS → Site Settings → Order Links
2. Paste real LINE deep link in "Main Order LINE link"
3. Save

---

## Photo path reference
All uploaded photos go to: /public/photos/
Served at: https://babycakes.pages.dev/photos/filename.jpg

To reference in code: src="/photos/filename.jpg"
