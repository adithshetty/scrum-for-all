import { Schema as MongooseSchema, model as MongooseModel, Document as MongooseDocument } from 'mongoose';

export interface IEpic extends MongooseDocument {
  goalId: MongooseSchema.Types.ObjectId;
  title: string;
  description?: string;
  status: 'not-started' | 'in-progress' | 'completed';
  order: number;
  createdAt: Date;
}

const epicSchema = new MongooseSchema<IEpic>({
  goalId: { type: MongooseSchema.Types.ObjectId, ref: 'Goal', required: true, index: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  status: { type: String, enum: ['not-started', 'in-progress', 'completed'], default: 'not-started', required: true },
  order: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const EpicModel = MongooseModel<IEpic>('Epic', epicSchema);