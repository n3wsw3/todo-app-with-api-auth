import { ServerResponse as SR } from "http";
import { IM } from "../../server";
import { userFromToken } from "../services/token.service";

export default async (req: IM, res: SR) => {
  const token = req.headers.authorization;
  req.user = await userFromToken(token);
  req.isAuthenticated = () => !!req.user;
};
