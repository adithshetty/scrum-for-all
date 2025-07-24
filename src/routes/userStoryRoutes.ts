import { Router } from 'express';
import { createUserStory, getAllUserStories } from '../controllers/userStoryController';
import { protect } from '../core/authMiddleware';

const router = Router();

// Define the routes and link them to the controller functions
router.post('/', protect, createUserStory);
router.get('/', protect, getAllUserStories);

export default router;
