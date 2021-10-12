import { useRouter } from "../utils/routeDelegator";
import { useBody } from "h3";

const router = useRouter();

router.get(async (req, res) => {
  return "Hello Api!";
});

router.post(async (req, res) => {
  const body = await useBody(req);

  return body;
});

export default router.routes();
