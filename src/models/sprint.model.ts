import { Schema as MongooseSchema, model as MongooseModel, Document as MongooseDocument } from 'mongoose';

export interface ISprint extends MongooseDocument {
  userId: MongooseSchema.Types.ObjectId;
  title: string;
  sprintGoal?: string;
  status: 'upcoming' | 'active' | 'completed';
  startDate: Date;
  endDate: Date;
  createdAt: Date;
}

const sprintSchema = new MongooseSchema<ISprint>({
  userId: { type: MongooseSchema.Types.ObjectId, ref: 'User', required: true, index: true },
  title: { type: String, required: true, trim: true },
  sprintGoal: { type: String, trim: true },
  status: { type: String, enum: ['upcoming', 'active', 'completed'], default: 'upcoming', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const SprintModel = MongooseModel<ISprint>('Sprint', sprintSchema);