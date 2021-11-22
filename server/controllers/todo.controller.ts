import { StatusCodes } from "http-status-codes";
import { Todo } from "../models/todo.model";
import { catchAsync } from "../utils/catchAsync";

export const createTodo = catchAsync(async (req, res) => {
  await new Todo(req.body).save().then((todo) => {
    res.status(StatusCodes.CREATED).json(todo);
  });
});
