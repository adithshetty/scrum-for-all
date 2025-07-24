import { Router } from 'express';
import { createSprint, getAllSprints } from '../controllers/sprintController';
import { protect } from '../core/authMiddleware';

const router = Router();

// Define the routes and link them to the controller functions
router.post('/', protect, createSprint);
router.get('/', protect, getAllSprints);

export default router;
