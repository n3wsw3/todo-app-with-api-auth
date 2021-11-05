import { logout } from "../../controllers/auth.controller";
import { useRouter } from "../../utils/routeDelegator";

export default useRouter().post(logout).routes();
