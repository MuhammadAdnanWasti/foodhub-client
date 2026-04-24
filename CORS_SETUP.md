# Backend CORS Configuration Guide

## ⚠️ Important: CORS Setup Required

Your frontend runs on `http://localhost:3000` and backend on `http://localhost:5000`. For the frontend to communicate with the backend, CORS (Cross-Origin Resource Sharing) must be properly configured on the backend.

## ✅ How to Check if CORS is Already Enabled

1. Open browser DevTools (F12)
2. Go to Network tab
3. Try to login/register
4. Look for error messages mentioning CORS or "No 'Access-Control-Allow-Origin' header"

## 🔧 How to Enable CORS on Your Express Backend

If you see CORS errors, add this to your `src/app.ts` or main Express setup:

### Option 1: Using the `cors` Package (Recommended)

```bash
npm install cors
```

Then in your `app.ts`:

```typescript
import express from 'express';
import cors from 'cors';

const app = express();

// Enable CORS
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Your routes and other middleware
```

### Option 2: Manual CORS Headers

```typescript
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});
```

## 🔒 For Production

For production, update the CORS origin to your actual domain:

```typescript
cors({
  origin: ['https://yourdomain.com', 'https://www.yourdomain.com'],
  credentials: true,
})
```

## 🧪 Testing CORS Setup

1. Start your backend server
2. Go to `http://localhost:3000` in your browser
3. Try to register or login
4. Check DevTools Network tab for successful API calls (no CORS errors)

## 📝 Environment-Specific Setup

### Development
```typescript
const allowedOrigins = ['http://localhost:3000', 'http://127.0.0.1:3000'];
```

### Staging
```typescript
const allowedOrigins = ['https://staging.yourdomain.com'];
```

### Production
```typescript
const allowedOrigins = ['https://yourdomain.com', 'https://www.yourdomain.com'];
```

## ✨ Complete app.ts Example

```typescript
import express from 'express';
import cors from 'cors';
import { AuthRoutes } from './modules/Auth/auth.route';
// ... other imports

const app = express();

// CORS Configuration
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Other middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', AuthRoutes);
// ... other routes

// Error handling
app.listen(5000, () => {
  console.log('Server running on port 5000');
});

export default app;
```

## 🔑 Key CORS Headers Explained

| Header | Purpose |
|--------|---------|
| `Access-Control-Allow-Origin` | Specifies which origins can access the API |
| `Access-Control-Allow-Credentials` | Allow cookies/auth headers to be sent |
| `Access-Control-Allow-Methods` | Allowed HTTP methods (GET, POST, etc.) |
| `Access-Control-Allow-Headers` | Allowed request headers |

## ⚡ Quick Fix Checklist

- [ ] CORS library installed
- [ ] CORS middleware added to app.ts
- [ ] Origin includes localhost:3000
- [ ] Credentials set to true
- [ ] Authorization header allowed
- [ ] Backend restarted after changes
- [ ] No CORS errors in browser console

## 🚨 Common CORS Errors

### Error: "No 'Access-Control-Allow-Origin' header"
→ CORS not enabled or origin not whitelisted

### Error: "Credentials mode is 'include'"
→ Add `credentials: true` to CORS config

### Error: "Authorization header not allowed"
→ Add 'Authorization' to allowedHeaders

## ✅ Once CORS is Configured

Your frontend will be able to:
✅ Send registration requests
✅ Send login requests
✅ Access user info endpoints
✅ Include JWT tokens in requests
✅ Handle responses properly

---

**Note:** These changes are minimal and only affect your CORS configuration. Your existing authentication logic remains unchanged.
