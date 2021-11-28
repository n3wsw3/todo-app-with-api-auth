import { createRouter } from "../utils/router";
import { send, useBody, MIMES } from "h3";

const router = createRouter();

router.get("/", [(_, res) => "HELLO API!"]);
router.post("/", [
  async (req, res) => {
    return await send(res, await useBody(req), MIMES.json);
  },
]);

export default router;
