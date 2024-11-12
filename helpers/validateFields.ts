import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

// TODO: Comprobar como hacerlo para que no salte error de typescript sin necesidad de castear
export const validateFields = (
  req: Request,
  res: Response,
  next: NextFunction
): void | Response => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }

  next();
};
