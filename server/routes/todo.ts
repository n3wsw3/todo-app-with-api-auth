import { Router } from "express";

const router = Router();

router.get("/", (req, res) => res.json([{
    id: "12345",
    title: "FÖRSTA TODO",
    user: "192319823"
}, {
    id: "23434",
    title: "ANDRA TODO",
    user: "192319823"
}]))

export default router;
