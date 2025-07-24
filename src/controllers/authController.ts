import { Request, Response } from "express";
import { UserModel, IUser } from "../models/user.model"; // Adjust path as needed
import jwt from "jsonwebtoken";

/**
 * Generates a JWT for a given user ID.
 * @param userId The ID of the user to sign the token for.
 * @returns The generated JSON Web Token.
 */
const generateToken = (user: IUser): string => {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    console.error("JWT_SECRET is not defined in environment variables.");
    throw new Error("Server configuration error.");
  }
  return jwt.sign({ id: user._id, name: user.name, email: user.email }, JWT_SECRET, {
    expiresIn: "1d", // Token expires in 1 day
  });
};

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    // 1. Validate input
    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ message: "Please provide email, password, and name." });
    }

    // 2. Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with this email already exists." });
    }

    // 3. Create and save the new user
    // The password will be hashed by the pre-save hook in the user model.
    const newUser = new UserModel({
      email,
      hashedPassword: password, // Pass the plain password here
      name,
    });
    await newUser.save();

    // 5. Send response
    res.status(201).json({
      message: "User registered successfully.",
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server error during registration." });
  }
};

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate a user and get a token
 * @access  Public
 */
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // 1. Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password." });
    }

    // 2. Find user by email
    const user: IUser | null = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." }); // Use a generic message
    }

    // 3. Compare passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." }); // Use a generic message
    }

    // 4. Generate a token
    const token = generateToken(user);

    // 5. Send response
    res.status(200).json({
      message: "Logged in successfully.",
      token,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error during login." });
  }
};
