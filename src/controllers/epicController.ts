import { Request, Response } from 'express';
import {EpicModel} from '../models/epic.model';

// Controller to handle creating a new epic
export const createEpic = async (req: Request, res: Response) => {
  try {
    const epic = new EpicModel(req.body);
    await epic.save();
    res.status(201).json({ message: 'Epic created successfully', epic });
  } catch (error: Error | any) {
    res.status(500).json({ error: 'Failed to create epic', details: error.message });
  }
};

// Controller to handle fetching all epics
export const getAllEpics = async (req: Request, res: Response) => {
  try {
    const epics = await EpicModel.find();
    res.status(200).json({ message: 'Fetched all epics', epics });
  } catch (error : Error | any) {
    res.status(500).json({ error: 'Failed to fetch epics', details: error.message });
  }
};
