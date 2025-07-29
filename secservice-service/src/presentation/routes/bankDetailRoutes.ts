import { Router } from 'express';
import { BankDetailController } from '../controllers/BankDetailController';
import { authMiddleware } from '../middlewares/auth';
import { validateRequest, createBankDetailSchema, updateBankDetailSchema } from '../middlewares/validation';

export const createBankDetailRoutes = (bankDetailController: BankDetailController): Router => {
  const router = Router();

  router.use(authMiddleware);

  router.post('/', validateRequest(createBankDetailSchema), bankDetailController.create);
  router.get('/', bankDetailController.getAll);
  router.put('/:id', validateRequest(updateBankDetailSchema), bankDetailController.update);
  router.delete('/:id', bankDetailController.delete);

  return router;
};