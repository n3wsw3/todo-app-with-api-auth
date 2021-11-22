import { Router } from "express";

const router = Router();

router.get("/", (req, res) =>
  res.json([
    {
      id: "12345",
      message: "FÖRSTA TODO",
      user: "192319823",
    },
    {
      id: "23434",
      message: "ANDRA TODO",
      user: "192319823",
    },
  ] as Todo[])
);

export default router;
