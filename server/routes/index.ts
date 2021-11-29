import hello from "./hello";
import auth from "./auth";
import todo from "./todo";

import { createRouter } from "../utils/router";

const router = createRouter();

router.use("/hello", [hello]);
router.use("/auth", [auth]);
router.use("/todo", [todo]);

export default router;
