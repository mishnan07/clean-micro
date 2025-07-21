# Auth Frontend - React Google Authentication

React frontend for Google authentication integration.

## Features

- Google OAuth 2.0 login/register
- Regular email/password authentication
- User profile display
- Protected routes
- JWT token management

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open http://localhost:3000

## Pages

- `/login` - Login page with Google auth
- `/register` - Registration page with Google auth
- `/profile` - User profile page (protected)

## Google Setup

Make sure your Google OAuth client is configured with:
- Authorized JavaScript origins: `http://localhost:3000`
- Authorized redirect URIs: `http://localhost:3000`

## Backend Integration

Connects to auth-service running on `http://localhost:3001`

## Usage

1. Start backend service: `cd auth-service && npm run dev`
2. Start frontend: `cd auth-frontend && npm start`
3. Visit http://localhost:3000
4. Login with Google or create account