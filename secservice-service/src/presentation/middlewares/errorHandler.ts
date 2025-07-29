import { Request, Response, NextFunction } from 'express';

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', error);

  if (error.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      error: error.message
    });
  }

  if (error.name === 'MongoError' && (error as any).code === 11000) {
    return res.status(409).json({
      success: false,
      message: 'Resource already exists'
    });
  }

  res.status(500).json({
    success: false,
    message: error.message || 'Internal server error'
  });
};