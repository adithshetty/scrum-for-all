import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserModel, IUser } from '../models/user.model'; // Adjust path as needed

// Extend the Express Request interface to include the 'user' property
// This provides type safety for req.user
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

/**
 * Middleware to protect routes that require authentication.
 * It checks for a valid JWT in the Authorization header.
 * If valid, it fetches the user from the database and attaches it to the request object.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function in the stack.
 */
export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  // 1. Check for the token in the Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 2. Extract the token from the header (format: "Bearer <TOKEN>")
      token = req.headers.authorization.split(' ')[1];

      // 3. Verify the token
      const JWT_SECRET = process.env.JWT_SECRET;
      if (!JWT_SECRET) {
        throw new Error('Server configuration error: JWT_SECRET not found.');
      }
      
      const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

      // 4. Find the user by ID from the token payload and attach to the request
      // We exclude the password field from the user object we attach.
      req.user = await UserModel.findById(decoded.id).select('-hashedPassword');

      if (!req.user) {
        return res.status(401).json({ message: 'Not authorized, user not found.' });
      }

      // 5. Proceed to the next middleware or route handler
      next();

    } catch (error) {
      console.error('Authentication Error:', error);
      return res.status(401).json({ message: 'Not authorized, token failed.' });
    }
  }

  // If no token is found in the header
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token.' });
  }
};
