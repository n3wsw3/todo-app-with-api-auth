import {
  login,
  logout,
  register,
  testToken,
} from "../controllers/auth.controller";
import { createRouter } from "../utils/router";

const router = createRouter();

router.post("/login", [login]);
router.post("/logout", [logout]);
router.post("/register", [register]);
router.post("/test", [testToken]);

export default router;
