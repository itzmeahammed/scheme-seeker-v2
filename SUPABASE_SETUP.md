# SchemeSeeker - Supabase Integration Setup

## Overview
The backend functionality has been removed and the application now uses Supabase for authentication and data management directly from the frontend.

## Changes Made

### 1. Removed Backend Components
- Deleted the entire `backend/` directory
- Removed backend-related dependencies from `package.json`:
  - `express`
  - `cors`
  - `bcryptjs`
  - `jsonwebtoken`
  - `sqlite3`
  - `concurrently`

### 2. Added Supabase Integration
- Added `@supabase/supabase-js` dependency
- Created `src/lib/supabase.ts` for Supabase configuration and auth helpers
- Created `src/contexts/AuthContext.tsx` for session management
- Updated `Login.tsx` and `Signup.tsx` components to use Supabase authentication

### 3. Updated Scripts
- Changed `dev` script from `concurrently "npm:frontend:dev" "npm:backend"` to `vite`
- Removed `frontend:dev` and `backend` scripts

## Setup Instructions

### 1. Create a Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new account or sign in
3. Create a new project
4. Wait for the project to be set up

### 2. Get Your Supabase Credentials
1. In your Supabase dashboard, go to Settings > API
2. Copy your Project URL and anon public key

### 3. Configure Environment Variables
1. Create a `.env.local` file in the root directory
2. Add your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_project_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 4. Set Up Authentication in Supabase
1. In your Supabase dashboard, go to Authentication > Settings
2. Configure your site URL (e.g., `http://localhost:5173` for development)
3. Enable email confirmation if desired
4. Configure any additional auth providers if needed

### 5. Install Dependencies and Run
```bash
npm install
npm run dev
```

## Authentication Features

### Current Implementation
- **Email/Password Authentication**: Users can sign up and log in with email and password
- **User Metadata**: Additional user information is stored in Supabase user metadata
- **Session Management**: Automatic session handling with the AuthContext

### Available Auth Methods
The Supabase integration supports:
- Email/Password authentication
- Email verification
- Password reset functionality
- Session persistence

## File Structure Changes

### New Files
- `src/lib/supabase.ts` - Supabase client and auth helpers
- `src/contexts/AuthContext.tsx` - React context for auth state management
- `env.example` - Environment variables template
- `SUPABASE_SETUP.md` - This setup guide

### Modified Files
- `package.json` - Updated dependencies and scripts
- `src/components/Auth/Login.tsx` - Now uses Supabase auth
- `src/components/Auth/Signup.tsx` - Now uses Supabase auth

### Removed Files
- `backend/` directory (entire backend removed)

## Next Steps

1. Set up your Supabase project and add the environment variables
2. Test the authentication flow
3. Consider setting up database tables for user profiles and scheme data
4. Implement additional Supabase features like real-time subscriptions if needed

## Notes

- The application now runs purely as a frontend application
- All authentication is handled by Supabase
- User profile data is stored in Supabase user metadata
- The demo credentials in the login form will no longer work - users need to create actual accounts
