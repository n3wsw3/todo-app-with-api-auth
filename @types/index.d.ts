import { ITodo } from "../server/models/todo.model";

type Model = { id: string };

declare global {
  type DeleteRequest = Model;

  type Todo = ITodo & Model;
  type TodoUpdateRequest = Partial<ITodo>;
  type TodoCreateRequest = ITodo;
}
