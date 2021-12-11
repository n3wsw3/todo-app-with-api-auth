import {
  createTodo,
  deleteTodo,
  getTodo,
  getTodos,
  updateTodo,
} from "../controllers/todo.controller";
import { createRouter } from "../utils/router";

const router = createRouter();

router.get("/", [getTodos]);
router.post("/", [createTodo]);

router.get<{ id: string }>("/:id", [getTodo]);
router.patch<{ id: string }>("/:id", [updateTodo]);
router.delete<{ id: string }>("/:id", [deleteTodo]);

export default router;
