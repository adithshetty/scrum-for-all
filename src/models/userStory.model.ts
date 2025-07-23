import { Schema as MongooseSchema, model as MongooseModel, Document as MongooseDocument } from 'mongoose';

export interface IUserStory extends MongooseDocument {
  epicId: MongooseSchema.Types.ObjectId;
  sprintId?: MongooseSchema.Types.ObjectId;
  title: string;
  description?: string;
  status: 'to-do' | 'in-progress' | 'done';
  storyPoints?: number;
  createdAt: Date;
}

const userStorySchema = new MongooseSchema<IUserStory>({
  epicId: { type: MongooseSchema.Types.ObjectId, ref: 'Epic', required: true, index: true },
  sprintId: { type: MongooseSchema.Types.ObjectId, ref: 'Sprint', index: true }, // Optional
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  status: { type: String, enum: ['to-do', 'in-progress', 'done'], default: 'to-do', required: true },
  storyPoints: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

export const UserStoryModel = MongooseModel<IUserStory>('UserStory', userStorySchema);