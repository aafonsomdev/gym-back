import { RequestHandler, Router } from 'express';
import { validateJwt } from '../middlewares/validate-jwt';
import {
  createExercise,
  getAllExercises,
  updateExercise,
} from '../controllers/exercise';
import { check } from 'express-validator';
// import { getCostFromApi, getDiaryCost } from '../controllers/operations';

const router: Router = Router();

router.get('/', validateJwt as RequestHandler, getAllExercises);

router.post(
  '/',
  [
    validateJwt as RequestHandler,
    check('name', 'El name es obligatorio').isEmpty(),
  ],
  createExercise
);

router.put(
  '/:id',
  [
    validateJwt as RequestHandler,
    check('name', 'El name es obligatorio').isEmpty(),
  ],
  updateExercise
);

export default router;
