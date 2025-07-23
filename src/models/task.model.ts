import { Schema as MongooseSchema, model as MongooseModel, Document as MongooseDocument } from 'mongoose';

export interface ITask extends MongooseDocument {
  userStoryId: MongooseSchema.Types.ObjectId;
  title: string;
  status: 'to-do' | 'in-progress' | 'done';
  createdAt: Date;
}

const taskSchema = new MongooseSchema<ITask>({
  userStoryId: { type: MongooseSchema.Types.ObjectId, ref: 'UserStory', required: true, index: true },
  title: { type: String, required: true, trim: true },
  status: { type: String, enum: ['to-do', 'in-progress', 'done'], default: 'to-do', required: true },
  createdAt: { type: Date, default: Date.now },
});

export const TaskModel = MongooseModel<ITask>('Task', taskSchema);