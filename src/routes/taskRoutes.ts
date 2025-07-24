import { Router } from 'express';
import { createTask, getAllTasks } from '../controllers/taskController';
import { protect } from '../core/authMiddleware';

const router = Router();

// Define the routes and link them to the controller functions
router.post('/', protect, createTask);
router.get('/', protect, getAllTasks);

export default router;
