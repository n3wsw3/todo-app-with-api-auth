import auth from "./auth";
import todo from "./todo";

import { createRouter } from "../utils/router";

const router = createRouter();

router.use("/auth", [auth]);
router.use("/todo", [todo]);

export default router;
