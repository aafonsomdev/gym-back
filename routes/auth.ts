import { RequestHandler, Router } from 'express';
import { check } from 'express-validator';
import { validateFields } from '../middlewares/validate-fields';
import { login, refreshToken, register } from '../controllers/auth';
import { validateJwt } from '../middlewares/validate-jwt';
// import { getCostFromApi, getDiaryCost } from '../controllers/operations';

const router: Router = Router();

router.post(
  '/register',
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de ser de 6 caracteres').isLength({
      min: 6,
    }),
    validateFields as RequestHandler,
  ],
  register
);

router.post(
  '/',
  [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password no debe venir vacío').not().isEmpty(),
    validateFields as RequestHandler,
  ],
  login
);

router.get('/refresh', validateJwt as RequestHandler, refreshToken);

export default router;
