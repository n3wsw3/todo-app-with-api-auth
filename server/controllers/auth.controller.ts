/**
 * All requests to the auth route will call a function in this controller file.
 */

import { User } from "../models/user.model";
import { StatusCodes } from "http-status-codes";
import { Token } from "../models/token.model";
import { createAuthenticationTokens } from "../services/token.service";

import { IncomingMessage, ServerResponse } from "http";
import { useBody } from "h3";
import { useAuthenticatedUser } from "../utils/isAuthenticated";

export const register = async (req: IncomingMessage, res: ServerResponse) => {
  return await new User(await useBody(req)).save().then(async (user) => {
    const token = createAuthenticationTokens(user);
    res.statusCode = StatusCodes.CREATED;
    return { token, user };
  });
};

export const login = async (req: IncomingMessage, res: ServerResponse) => {
  const { email, password } = await useBody(req);
  const user = await User.findOne({ email });
  if (user && (await user.isPasswordMatch(password))) {
    const token = await createAuthenticationTokens(user);

    return { token, user };
  }

  res.statusCode = StatusCodes.UNAUTHORIZED;
  return "Email and/or password is incorrect";
};

export const logout = async (req: IncomingMessage, res: ServerResponse) => {
  const { token } = await useBody(req);
  const t = await Token.findOne({ token });
  if (t) {
    await t.remove();
  }

  res.statusCode = StatusCodes.OK;
  return "Logged out";
};

export const testToken = async (req: IncomingMessage, res: ServerResponse) => {
  const user = await useAuthenticatedUser(req);
  if (user) {
    res.statusCode = 200;
    return "SUCCESS";
  } else {
    res.statusCode = StatusCodes.BAD_REQUEST;
    return "NOT AUTHENTICATED";
  }
};
