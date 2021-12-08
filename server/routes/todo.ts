import {
  createTodo,
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

export default router;
