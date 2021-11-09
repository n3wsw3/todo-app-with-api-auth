import { UserDoc } from "../../server/models/user.model";

declare global {
  namespace Express {
    export interface Request {
      user: UserDoc | null;
    }
  }
}