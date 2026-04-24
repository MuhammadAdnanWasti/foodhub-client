# CodeRabbit Food - Frontend Setup Guide

## ✅ What's Been Completed

### 1. **Professional Navbar Component** (`src/components/shared/Navbar.tsx`)
- Responsive design (desktop & mobile)
- Dynamic user authentication display
- Shows logged-in user info with avatar
- Logout functionality
- Automatically hides on login/register pages
- Navigation links to Home, About Us, Restaurants
- Mobile hamburger menu

### 2. **Authentication Service** (`src/services/authService.ts`)
- Centralized API communication
- Methods for register, login, and getCurrentUser
- Token and user data management
- localStorage integration

### 3. **Updated Pages**

#### **Home Page** (`src/app/page.tsx`)
- Integrated Navbar component
- Hero section with CTA
- Feature showcase
- Call-to-action sections

#### **About Us Page** (`src/app/about-us/page.tsx`)
- Integrated Navbar component
- Company story and values
- Statistics section
- Service features showcase

#### **Login Page** (`src/app/login/page.tsx`)
- Form validation with react-hook-form + zod
- API integration with error handling
- Auto-redirect to home on success
- Show/hide password toggle
- Remember me checkbox

#### **Register Page** (`src/app/register/page.tsx`)
- Comprehensive form validation
- Phone number validation (10 digits)
- Password confirmation matching
- Terms and conditions checkbox
- API integration with error handling
- Auto-redirect to home on success

### 4. **Environment Configuration** (`.env.local`)
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## 🚀 Getting Started

### Prerequisites
Your backend server should be running on `http://localhost:5000`

### Step 1: Update Backend URL (if needed)
If your backend runs on a different port or URL, update `.env.local`:
```
NEXT_PUBLIC_API_URL=http://your-backend-url:port
```

### Step 2: Start the Frontend
```bash
cd food-frontend
npm run dev
```

The app will be available at `http://localhost:3000`

### Step 3: Test the Authentication Flow
1. Go to `http://localhost:3000/register`
2. Fill in the registration form with:
   - Full Name
   - Email
   - Phone (10 digits)
   - Password (8+ characters)
   - Confirm Password
   - Accept Terms & Conditions
3. Click "Create Account"
4. You should be redirected to home page with your user info in navbar

### Step 4: Test Login
1. Go to `http://localhost:3000/login`
2. Enter your email and password
3. Click "Sign In"
4. You should be redirected to home page

### Step 5: Test Logout
1. Click the logout button (red X icon) in the navbar
2. You'll be redirected to login page

## 📋 API Endpoints Used

Your backend is expected to have these endpoints:

### POST `/api/auth/register`
**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "jwt-token-here",
    "user": {
      "id": "user-id",
      "email": "john@example.com",
      "name": "John Doe",
      "role": "CUSTOMER",
      "status": "ACTIVE"
    }
  }
}
```

### POST `/api/auth/login`
**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:** (Same as register)

### GET `/api/auth/me`
**Headers:**
```
Authorization: Bearer jwt-token-here
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user-id",
      "email": "john@example.com",
      "name": "John Doe",
      "role": "CUSTOMER",
      "status": "ACTIVE"
    }
  }
}
```

## 🔐 How Authentication Works

1. **Registration/Login**: User submits credentials → Frontend calls API → Backend validates and returns JWT token
2. **Token Storage**: Token stored in localStorage along with user data
3. **Navbar Display**: Navbar checks localStorage on mount to display user info
4. **Logout**: Clears localStorage and redirects to login page

## 🛠️ Common Issues & Solutions

### Issue: "Cannot find module '@/services/authService'"
**Solution:** Make sure the path alias is configured in `tsconfig.json` (should be: `"@/*": ["./src/*"]`)

### Issue: 404 errors on API calls
**Solution:** Verify your backend is running and `.env.local` has the correct API URL

### Issue: CORS errors
**Solution:** Your backend needs to have CORS enabled for `http://localhost:3000`

## 📦 Key Dependencies
- react-hook-form: Form state management
- zod: Schema validation
- shadcn/ui: UI components
- next: Framework
- lucide-react: Icons

## ✨ Features
✅ Form validation (client-side)
✅ Error handling and display
✅ Auto-redirect after auth
✅ Persistent login (localStorage)
✅ User profile display in navbar
✅ Responsive design
✅ Professional UI with Tailwind CSS
✅ Type-safe with TypeScript

## 📝 Notes
- No changes were made to the backend code
- All API integration is handled on the frontend
- User data is stored in localStorage (suitable for client-side usage)
- For production, consider using more secure storage methods
- CORS must be configured on backend to accept requests from frontend origin
