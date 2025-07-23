import http from 'http';
import dotenv from 'dotenv';
import app from './app'; // Import the configured Express app
import { connectDB } from './core/mongoConnect'; // Import the DB connection function

// --- Load Environment Variables ---
// Load variables from the .env file into process.env
dotenv.config();

// --- Server Configuration ---
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Create an HTTP server using the Express app
const server = http.createServer(app);

/**
 * Starts the application server.
 * This function initializes the database connection and then starts
 * the HTTP server to listen for incoming requests.
 */
const startServer = async () => {
  try {
    // 1. Connect to the database
    // The application will exit if the database connection fails.
    await connectDB(MONGO_URI as string);

    // 2. Start the HTTP server
    server.listen(PORT, () => {
      console.log(`🚀 Server is listening on port ${PORT}`);
      console.log(`🔗 Access at http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('❌ Failed to start the server');
    if (error instanceof Error) {
        console.error(error.message);
    }
    process.exit(1);
  }
};

// --- Run the Server ---
startServer();