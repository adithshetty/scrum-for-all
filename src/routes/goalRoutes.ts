import { Router } from "express";
import { protect } from '../core/authMiddleware';
import { createGoal, getGoals } from '../controllers/goalController';

const router = Router();

router.post('/', protect, createGoal);
router.get('/', protect, getGoals);

export default router;
