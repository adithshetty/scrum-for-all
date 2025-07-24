import { Router } from 'express';
import { createEpic, getAllEpics } from '../controllers/epicController';
import { protect } from '../core/authMiddleware';

const router = Router();

// Define the routes and link them to the controller functions
router.post('/', protect, createEpic);
router.get('/', protect, getAllEpics);

export default router;
