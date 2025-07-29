import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { authMiddleware } from '../middlewares/auth';
import { validateRequest, registerSchema, loginSchema, updateUserSchema } from '../middlewares/validation';

export const createAuthRoutes = (authController: AuthController): Router => {
  const router = Router();

  router.post('/register', validateRequest(registerSchema), authController.register);
  router.post('/login', validateRequest(loginSchema), authController.login);
  router.get('/profile', authMiddleware, authController.getProfile);
  router.put('/profile', authMiddleware, validateRequest(updateUserSchema), authController.updateProfile);

  return router;
};