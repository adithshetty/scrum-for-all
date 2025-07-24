import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './routes/authRoutes';
import goalRoutes from './routes/goalRoutes';
import userStoryRoutes from './routes/userStoryRoutes';
import sprintRoutes from './routes/sprintRoutes';
import taskRoutes from './routes/taskRoutes';
import epicRoutes from './routes/epicRoutes';

// --- Create Express App ---
const app: Application = express();

// --- Core Middleware ---

// Enable Cross-Origin Resource Sharing for all origins
app.use(cors());

// Add various security HTTP headers
app.use(helmet());

// Enable parsing of JSON request bodies
app.use(express.json());

// Enable parsing of URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));


// --- API Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/user-stories', userStoryRoutes);
app.use('/api/sprints', sprintRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/epics', epicRoutes);


// --- Health Check Route ---
// A simple route to verify that the server is running.
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'UP',
    message: 'Server is running successfully.',
    timestamp: new Date().toISOString(),
  });
});

export default app;