import { RequestHandler, Router } from 'express';
import { check } from 'express-validator';
import { validateFields } from '../helpers/validateFields';
import { register } from '../controllers/auth';
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

/* router.post(
  '/',
  [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password no debe venir vacío').not().isEmpty(),
    validateFields,
  ],
  loginUsuario
);
 */
// router.get('/renew', validarJWT, revalidarToken);

export default router;
