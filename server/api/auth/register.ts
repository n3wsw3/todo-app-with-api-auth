import { register } from "../../controllers/auth.controller";
import { useRouter } from "../../utils/routeDelegator";

export default useRouter().post(register).routes();
