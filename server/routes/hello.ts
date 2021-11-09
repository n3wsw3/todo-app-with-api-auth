import { Router } from "express";

const router = Router();

router.get("/", (_, res) => res.send("Hello Api!"));
router.post("/", (req, res) => {
  res.json(req.body);
})

export default router;