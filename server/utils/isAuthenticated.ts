import { StatusCodes } from "http-status-codes";
import UserError from "./UserError";
import { userFromToken } from "../services/token.service";
import { IncomingMessage } from "http";

export const useAuthenticatedUser = async (req: IncomingMessage) => {
  const token = req.headers.authorization;
  const user = await userFromToken(token);
  if (!user)
    throw new UserError("Invalid Access-Token", StatusCodes.BAD_REQUEST);
  return user;
};
