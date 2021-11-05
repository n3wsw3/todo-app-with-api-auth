import { useRouter } from "../utils/routeDelegator";
import { useBody } from "h3";

const router = useRouter();

router.get((req, res) => "Hello Api!!");

router.post(async (req, res) => {
  return await useBody(req);
});

export default router.routes();
