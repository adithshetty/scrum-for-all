import { Schema as MongooseSchema, model as MongooseModel, Document as MongooseDocument } from 'mongoose';

export interface IGoal extends MongooseDocument {
  userId: MongooseSchema.Types.ObjectId;
  title: string;
  description?: string;
  targetDate?: Date;
  status: 'not-started' | 'in-progress' | 'completed';
  createdAt: Date;
}

const goalSchema = new MongooseSchema<IGoal>({
  userId: { type: MongooseSchema.Types.ObjectId, ref: 'User', required: true, index: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  targetDate: { type: Date },
  status: { type: String, enum: ['not-started', 'in-progress', 'completed'], default: 'not-started', required: true },
  createdAt: { type: Date, default: Date.now },
});

export const GoalModel = MongooseModel<IGoal>('Goal', goalSchema);