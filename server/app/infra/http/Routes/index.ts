import express from 'express';
import { sessionsRouter } from './sessions.routes';
import { usersRouter } from './users.routes'
import { groupRouter } from './groups.routes'
import { categoryRouter } from './categories.routes';


const router = express.Router();

router.use('/users', usersRouter)
router.use('/groups', groupRouter)
router.use('/categories', categoryRouter)

router.use('/sessions', sessionsRouter)

export { router };