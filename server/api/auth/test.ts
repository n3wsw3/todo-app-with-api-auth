import { testToken } from "../../controllers/auth.controller";
import { useRouter } from "../../utils/routeDelegator";

export default useRouter().post(testToken).routes();
