import { StatusCodes } from "http-status-codes";
import { Todo } from "../models/todo.model";
import { useBody } from "h3";
import { IncomingMessage, ServerResponse } from "http";

export const createTodo = async (req: IncomingMessage, res: ServerResponse) => {
  return await new Todo(await useBody(req)).save().then(async (todo) => {
    res.statusCode = StatusCodes.CREATED;
    return todo;
  });
};
