import { Request, Response } from 'express';
import { GoalModel } from '../models/goal.model';

/**
 * Create a new goal
 * @route POST /api/goals
 * @param req - Express request object
 * @param res - Express response object
 */
export const createGoal = async (req: Request, res: Response) => {
  try {
    const { title, description, targetDate } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required.' });
    }

    const newGoal = new GoalModel({
      title,
      description,
      targetDate,
      userId: req.user?._id
    });

    await newGoal.save();

    res.status(201).json(newGoal);

  } catch (error: Error | any) {
    res.status(500).json({ message: 'Server error creating goal.', error: error.message });
  }
};

/**
 * Get all goals for the authenticated user
 * @route GET /api/goals
 * @param req - Express request object
 * @param res - Express response object
 */
export const getGoals = async (req: Request, res: Response) => {
  try {
    const goals = await GoalModel.find({ userId: req.user?._id });
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching goals.' });
  }
};