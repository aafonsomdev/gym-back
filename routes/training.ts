import { RequestHandler, Router } from 'express';

import exercise from './exercise';

const router: Router = Router();

router.use('/exercises', exercise);

export default router;
