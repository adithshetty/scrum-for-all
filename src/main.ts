// index.ts
import express, { Application } from 'express';
import userRoutes from './routes/itemRoutes'; // Import your routes

const app: Application = express(); // Still use Application here
const PORT = 3000;

app.use(express.json());

// Tell the main app to use your user routes for any path starting with /users
app.use('/users', userRoutes);

// You need .listen(), which is why you need the Application interface
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});