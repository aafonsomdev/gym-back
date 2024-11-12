import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const validateJwt = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //x-token headers
  const token = req.header('authorization')?.split(' ')?.[1];
  console.log({ token });

  if (!token) {
    return res.status(401).json({
      ok: true,
      msg: 'No hay token en la petición',
    });
  }

  try {
    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);

    req.body.uid = uid;
    req.body.name = name;
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      ok: false,
      msg: 'Token no válido',
    });
  }

  next();
};
