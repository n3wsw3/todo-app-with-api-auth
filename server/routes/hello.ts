import { createRouter } from "../utils/router";
import { send, useBody, MIMES } from "h3";

const router = createRouter();

router.get("/", [() => "HELLO API!"]);
router.post("/", [
  async (req, res) => {
    return await send(res, await useBody(req), MIMES.json);
  },
]);
router.put<{ id: string }>("/:id/hej", [
  async (_, res, params) => {
    return await send(res, params.id);
  },
]);

export default router;
