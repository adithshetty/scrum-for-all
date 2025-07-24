import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/authController';

const router = Router();

// Define the routes and link them to the controller functions
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
