// lib/models/task-model.ts
import mongoose, { Document, Schema, Types } from "mongoose";

export interface ITaskDocument extends Document {
  title: string;
  column: Types.ObjectId;
  createdAt: Date;
}

export interface ITask {
  _id: string;
  title: string;
  column: string; // column id
  createdAt: string;
}

const TaskSchema = new Schema<ITaskDocument>(
  {
    title: { type: String, required: true },
    column: {
      type: Schema.Types.ObjectId,
      ref: "Column",
      required: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

export const Task =
  mongoose.models.Task || mongoose.model<ITaskDocument>("Task", TaskSchema);
