import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

// Interface to define the properties of a User document
export interface IUser extends Document {
  email: string;
  hashedPassword?: string; // Optional because it won't be sent back to the client
  name: string;
  createdAt: Date;
  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  hashedPassword: { type: String, required: true },
  name: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now },
});

// Middleware: Hash password before saving a new user
userSchema.pre('save', async function (next) {
  if (!this.isModified('hashedPassword')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.hashedPassword = await bcrypt.hash(this.hashedPassword as string, salt);
    return next();
  } catch (e) {
    // Ensure error is passed to the next middleware
    if (e instanceof Error) {
        return next(e);
    }
    return next(new Error('Password hashing failed'));
  }
});

// Method to compare candidate password with the stored hash
userSchema.methods.comparePassword = function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.hashedPassword as string);
};

export const UserModel = model<IUser>('User', userSchema);