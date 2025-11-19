# MealMagic Backend Deployment Guide

## Deploying to Vercel

### Steps:

1. **Push your code to GitHub** (if not already done)

2. **Import Project in Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your repository
   - **Important:** Set the **Root Directory** to `backend`

3. **Configure Build Settings:**
   - Framework Preset: Other
   - Build Command: (leave empty)
   - Output Directory: (leave empty)
   - Install Command: `npm install`

4. **Deploy:**
   - Click "Deploy"
   - Wait for deployment to complete

5. **Access Your API:**
   - Root URL: `https://your-project.vercel.app/` → Swagger UI
   - API Endpoints: `https://your-project.vercel.app/api/meals`, etc.
   - Swagger JSON: `https://your-project.vercel.app/swagger.json`

### Why This Works:

- Created `/api/index.js` which is the Vercel serverless function entry point
- Updated `vercel.json` to route all requests to this single function
- Swagger UI is now served as part of the serverless function
- All static assets load from CDN

### Local Development:

\`\`\`bash
cd backend
npm install
node server.js
\`\`\`

Access at: `http://localhost:5000/api-docs`

### Troubleshooting:

If Swagger UI still doesn't show:
1. Clear Vercel cache and redeploy
2. Check Vercel logs for errors
3. Verify the Root Directory is set to `backend`
4. Make sure all dependencies are in `package.json`
