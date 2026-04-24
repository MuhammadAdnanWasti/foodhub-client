# API Integration Quick Reference

## 🔗 Backend Connection

**API Base URL**: http://localhost:5000 (configurable in `.env.local`)

## 🔐 Authentication Endpoints

### 1. **User Registration**
```
POST /api/auth/register

Request:
{
  "name": "John Doe",
  "email": "john@example.com", 
  "password": "password123",
  "phone": "1234567890"
}

Response:
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "uuid-string",
      "email": "john@example.com",
      "name": "John Doe",
      "role": "CUSTOMER",
      "status": "ACTIVE"
    }
  }
}
```

### 2. **User Login**
```
POST /api/auth/login

Request:
{
  "email": "john@example.com",
  "password": "password123"
}

Response: (Same as register)
```

### 3. **Get Current User**
```
GET /api/auth/me
Header: Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": { ... user data ... }
}
```

## 📂 Frontend File Structure

```
src/
├── components/
│   ├── shared/
│   │   └── Navbar.tsx          (New: Professional navbar)
│   └── ui/                     (shadcn components)
├── services/
│   └── authService.ts          (New: API integration layer)
├── app/
│   ├── page.tsx                (Updated: Added Navbar)
│   ├── login/
│   │   └── page.tsx            (Updated: API integration)
│   ├── register/
│   │   └── page.tsx            (Updated: API integration)
│   └── about-us/
│       └── page.tsx            (Updated: Added Navbar)
└── .env.local                  (New: Environment config)
```

## 🔄 Data Flow

### Registration Flow
```
User → Register Form 
  → authService.register() 
  → API: POST /api/auth/register 
  → Save Token & User to localStorage 
  → Redirect to Home
  → Navbar displays user info
```

### Login Flow
```
User → Login Form 
  → authService.login() 
  → API: POST /api/auth/login 
  → Save Token & User to localStorage 
  → Redirect to Home
  → Navbar displays user info
```

### Logout Flow
```
User → Click Logout Button 
  → Remove Token & User from localStorage 
  → Redirect to Login
```

## 📋 What Each File Does

### `authService.ts`
- Handles all API communication for authentication
- Manages JWT token storage
- Provides methods: register(), login(), getToken(), saveToken(), etc.

### `Navbar.tsx`
- Displays navigation and user info
- Shows logged-in user's name and role
- Handles logout functionality
- Automatically hidden on login/register pages

### Login/Register Pages
- Form validation with react-hook-form + zod
- Error display for API failures
- API integration for authentication
- Auto-redirect on success

## ✅ Checklist Before Running

- [ ] Backend server running on http://localhost:5000
- [ ] Backend has CORS configured for http://localhost:3000
- [ ] `.env.local` file exists with correct API_URL
- [ ] All dependencies installed (`npm install`)
- [ ] No TypeScript errors (`npm run build`)

## 🚀 Quick Start Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| 404 on API calls | Check backend is running, verify .env.local URL |
| CORS errors | Enable CORS on backend for localhost:3000 |
| Token not saving | Check localStorage in browser DevTools |
| User not showing in navbar | Clear localStorage, try logging in again |
| Form validation fails | Check phone must be 10 digits, password 8+ chars |

## 🔑 Key Features Implemented

✅ Form validation (client-side with zod)
✅ API error handling with user-friendly messages
✅ JWT token-based authentication
✅ Persistent login with localStorage
✅ User profile in navbar
✅ Logout functionality
✅ Responsive design
✅ Type-safe with TypeScript
✅ No backend modifications required

## 📞 Support

If you encounter issues:
1. Check browser console for errors (F12)
2. Verify backend is running (check terminal)
3. Test API directly with Postman/Thunder Client
4. Check CORS headers in Network tab
