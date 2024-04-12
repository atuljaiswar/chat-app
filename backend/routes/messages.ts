import express from 'express';
import sendMessage from '../controllers/sendMessage';
import protectedRoute from '../middleware/protectedRoute';
import getMessage from '../controllers/getMessage';

const router = express.Router();

router.get('/:id', protectedRoute, getMessage);
router.post('/send/:id', protectedRoute, sendMessage);

export default router;
