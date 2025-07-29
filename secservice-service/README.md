# SecService - Security Microservice

A TypeScript microservice built with Clean Architecture principles for user authentication and bank details management.

## Architecture

This service follows Clean Architecture with the following layers:

- **Domain**: Entities, value objects, and interfaces
- **Application**: Use cases and business logic
- **Infrastructure**: Database models and repository implementations
- **Presentation**: Controllers, routes, and middlewares
- **Shared**: Common utilities, types, and constants
- **Config**: Environment configuration and database setup

## Features

- JWT-based authentication
- User registration and login
- User profile management
- Bank details CRUD operations
- Password hashing with bcrypt
- Request validation with Joi
- Clean error handling
- TypeScript with strict typing

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Bank Details
- `POST /api/bank-details` - Create bank detail (protected)
- `GET /api/bank-details` - Get user's bank details (protected)
- `PUT /api/bank-details/:id` - Update bank detail (protected)
- `DELETE /api/bank-details/:id` - Delete bank detail (protected)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy environment variables:
   ```bash
   cp .env.example .env
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   npm start
   ```

## Docker

```bash
docker build -t secservice .
docker run -p 3004:3004 secservice
```

## Environment Variables

- `PORT` - Server port (default: 3004)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret
- `JWT_EXPIRES_IN` - JWT expiration time
- `NODE_ENV` - Environment (development/production)