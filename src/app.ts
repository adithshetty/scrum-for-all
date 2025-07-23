import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';

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
// All API routes will be mounted here under the '/api' prefix.
// Example: app.use('/api/v1/users', userRoutes);
//          app.use('/api/v1/goals', goalRoutes);


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