import { Router } from "express";
import hello from "./hello";
import auth from "./auth";

const router = Router();

router.use("/hello", hello);
router.use("/auth", auth);

export default router;