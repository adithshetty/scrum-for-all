import { Request, Response } from 'express';
import {SprintModel} from '../models/sprint.model';

// Controller to handle creating a new sprint
export const createSprint = async (req: Request, res: Response) => {
  try {
    const { title, sprintGoal, status, startDate, endDate } = req.body;
    const sprint = new SprintModel({  userId: req.user?._id, title, sprintGoal, status, startDate, endDate });
    await sprint.save();
    res.status(201).json({ message: 'Sprint created successfully', sprint });
  } catch (error: Error | any) {
    res.status(500).json({ error: 'Failed to create sprint', details: error.message });
  }
};

// Controller to handle fetching all sprints
export const getAllSprints = async (req: Request, res: Response) => {
  try {
    const sprints = await SprintModel.find();
    res.status(200).json({ message: 'Fetched all sprints', sprints });
  } catch (error: Error | any) {
    res.status(500).json({ error: 'Failed to fetch sprints', details: error.message });
  }
};
