import { Request, Response } from 'express';
import {TaskModel} from '../models/task.model';

// Controller to handle creating a new task
export const createTask = async (req: Request, res: Response) => {
  try {
    const task = new TaskModel(req.body);
    await task.save();
    res.status(201).json({ message: 'Task created successfully', task });
  } catch (error: Error | any) {
    res.status(500).json({ error: 'Failed to create task', details: error.message });
  }
};

// Controller to handle fetching all tasks
export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await TaskModel.find();
    res.status(200).json({ message: 'Fetched all tasks', tasks });
  } catch (error: Error | any) {
    res.status(500).json({ error: 'Failed to fetch tasks', details: error.message });
  }
};
