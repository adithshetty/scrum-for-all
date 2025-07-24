import { Request, Response } from 'express';
import {UserStoryModel} from '../models/userStory.model';

// Controller to handle creating a new user story
export const createUserStory = async (req: Request, res: Response) => {
  try {
    const userStory = new UserStoryModel(req.body);
    await userStory.save();
    res.status(201).json({ message: 'User story created successfully', userStory });
  } catch (error: Error | any) {
    res.status(500).json({ error: 'Failed to create user story', details: error.message });
  }
};

// Controller to handle fetching all user stories
export const getAllUserStories = async (req: Request, res: Response) => {
  try {
    const userStories = await UserStoryModel.find();
    res.status(200).json({ message: 'Fetched all user stories', userStories });
  } catch (error: Error | any) {
    res.status(500).json({ error: 'Failed to fetch user stories', details: error.message });
  }
};
