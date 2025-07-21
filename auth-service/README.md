# Auth Service - Google Authentication

A Node.js microservice for Google authentication with MVC architecture.

## Features

- Google OAuth 2.0 authentication
- Regular email/password authentication
- JWT token management
- User registration and login
- Account linking (Google + local)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables in `.env`:
```
PORT=3001
MONGODB_URI=mongodb://localhost:27017/auth-service
JWT_SECRET=your-jwt-secret-key
JWT_REFRESH_SECRET=your-refresh-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FRONTEND_URL=http://localhost:3000
```

3. Start the service:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/google` - Google authentication
- `POST /api/auth/login` - Regular login
- `POST /api/auth/register` - User registration
- `GET /api/auth/profile` - Get user profile (protected)

### Google Auth Request Body
```json
{
  "credential": "google-jwt-token"
}
```

### Regular Auth Request Body
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "User Name"
}
```

## Response Format
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "name": "User Name",
    "profileImage": "image-url",
    "isEmailVerified": true,
    "authProvider": "google"
  },
  "tokens": {
    "accessToken": "jwt-access-token",
    "refreshToken": "jwt-refresh-token"
  }
}
```