import { Router } from "express";
import { login, logout, register, testToken } from "../controllers/auth.controller";
import isAuthenticated from "../utils/isAuthenticated";

const router = Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/register", register);
router.post("/test", isAuthenticated, testToken);

export default router;