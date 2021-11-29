import { ITodo } from "../server/models/todo.model";

type Model = { id: string };

type UITodo = Omit<ITodo, "user"> & { user: string };

declare global {
  type DeleteRequest = Model;

  type Todo = UITodo & Model;
  type TodoUpdateRequest = Partial<UITodo>;
  type TodoCreateRequest = UITodo;
}
