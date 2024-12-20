import { RequestHandler, Router } from 'express';
import { validateJwt } from '../middlewares/validate-jwt';
import { createExercise } from '../controllers/exercise';
import { check } from 'express-validator';
// import { getCostFromApi, getDiaryCost } from '../controllers/operations';

const router: Router = Router();

router.post(
  '/',
  [
    validateJwt as RequestHandler,
    check('name', 'El name es obligatorio').isEmail(),
  ],
  createExercise
);

export default router;
