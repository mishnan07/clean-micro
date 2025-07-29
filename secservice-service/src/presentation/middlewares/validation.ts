import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export const validateRequest = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.details.map(detail => detail.message)
      });
    }
    next();
  };
};

export const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required()
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

export const updateUserSchema = Joi.object({
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional()
});

export const createBankDetailSchema = Joi.object({
  bankName: Joi.string().required(),
  accountNumber: Joi.string().required(),
  routingNumber: Joi.string().required(),
  accountType: Joi.string().valid('checking', 'savings').required()
});

export const updateBankDetailSchema = Joi.object({
  bankName: Joi.string().optional(),
  accountNumber: Joi.string().optional(),
  routingNumber: Joi.string().optional(),
  accountType: Joi.string().valid('checking', 'savings').optional()
});