import express from 'express';

import peopleRouter from './people';
import tasks from './tasks';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Root API response',
  });
});

router.use('/people', peopleRouter);

router.use('/tasks', tasks);

export default router;
