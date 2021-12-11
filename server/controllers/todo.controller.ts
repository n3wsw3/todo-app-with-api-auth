import { StatusCodes } from "http-status-codes";
import { Todo } from "../models/todo.model";
import { useBody } from "h3";
import { IncomingMessage, ServerResponse } from "http";
import { useAuthenticatedUser } from "../utils/isAuthenticated";

const Handler = <K = {}>(
  handle: <T extends K>(
    req: IncomingMessage,
    res: ServerResponse,
    params?: T
  ) => any
) => handle;

export const createTodo = async (req: IncomingMessage, res: ServerResponse) => {
  const todo: TodoCreateRequest = await useBody(req);
  const user = await useAuthenticatedUser(req);

  return await new Todo({ ...todo, user: user.id })
    .save()
    .then(async (todo) => {
      res.statusCode = StatusCodes.CREATED;
      return todo;
    });
};

export const getTodos = Handler(async (req, res) => {
  const user = await useAuthenticatedUser(req);

  return await Todo.find({ user: user.id });
});

export const getTodo = Handler<{ id: string }>(async (req, res, params) => {
  const user = await useAuthenticatedUser(req);

  return await Todo.findOne({ _id: params.id, user: user.id });
});

export const updateTodo = Handler<{ id: string }>(async (req, res, params) => {
  const user = await useAuthenticatedUser(req);
  const body = await useBody(req);

  delete body.user;
  delete body.id;

  const todo = await Todo.findOneAndUpdate(
    { _id: params.id, user: user.id },
    body,
    {
      returnDocument: "after",
    }
  );

  return todo;
});
