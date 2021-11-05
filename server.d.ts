import { IncomingMessage } from "http";
import { UserDoc } from "./server/models/user.model";

interface IM extends IncomingMessage {
  user: UserDoc;
}
