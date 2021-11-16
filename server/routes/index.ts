import { Router } from "express";
import hello from "./hello";
import auth from "./auth";
import todo from "./todo";

const router = Router();

router.use("/hello", hello);
router.use("/auth", auth);
router.use("/todo", todo);

export default router;