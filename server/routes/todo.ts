import { createRouter } from "../utils/router";

const router = createRouter();

router.get("/", [
  (req, res) => [
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
  ],
]);

export default router;
