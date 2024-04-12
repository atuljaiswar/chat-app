import express from 'express';
import protectedRoute from '../middleware/protectedRoute';
import getUsers from '../controllers/getUsers';

const router = express.Router();

router.get('/', protectedRoute, getUsers);

export default router;
