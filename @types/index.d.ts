import { ITodo } from "../server/models/todo.model";
import { IToken } from "../server/models/token.model";
import { IUser } from "../server/models/user.model";

type Model = { id: string };

type UITodo = Omit<ITodo, "user"> & { user: string };
type UIToken = Omit<IToken, "user">;
type UIUser = Omit<IUser, "password">;

declare global {
  type DeleteRequest = Model;

  type Todo = UITodo & Model;
  type TodoUpdateRequest = Partial<Omit<UITodo, "user">>;
  type TodoCreateRequest = UITodo;

  type User = UIUser & Model;
  type Token = UIToken;
}
