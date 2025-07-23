// userRoutes.ts
import { Router, Request, Response } from 'express';

const router = Router(); // Note: We use Router() here, not Application

// Handle GET request for all users
router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Getting all users' });
});

// Handle POST request to create a user
router.post('/', (req: Request, res: Response) => {
  res.json({ message: 'Creating a new user' });
});

// Handle PUT request to update a user
router.put('/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    res.json({ message: `Updating user with id: ${id}` });
});


export default router;