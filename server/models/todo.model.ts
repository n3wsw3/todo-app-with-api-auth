import mongoose from "mongoose";

export interface ITodo {
  message: string;
  user: mongoose.ObjectId;
  test?: string;
  isDone: boolean;
}

export interface TodoDoc extends ITodo, mongoose.Document {}

const TodoSchema = new mongoose.Schema<TodoDoc>(
  {
    message: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    test: {
      type: String,
      required: false,
    },
    isDone: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      transform: (doc, ret: TodoDoc) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

export const Todo = mongoose.model<TodoDoc>("Todo", TodoSchema);
