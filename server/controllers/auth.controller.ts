/**
 * All requests to the auth route will call a function in this controller file.
 */

import { User } from "../models/user.model";
import { StatusCodes } from "http-status-codes";
import { Token } from "../models/token.model";
import { createAuthenticationTokens } from "../services/token.service";

import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";

export const register = catchAsync(async (req: Request, res: Response) => {
  await new User(req.body).save().then((user) => {
    const token = createAuthenticationTokens(user);
    res.status(StatusCodes.CREATED).json({ token, user });
  });
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.isPasswordMatch(password))) {
    const token = await createAuthenticationTokens(user);

    return res.status(200).json({ token, user });
  }
  res
    .status(StatusCodes.UNAUTHORIZED)
    .send("Email and/or password is incorrect");
});

export const logout = catchAsync(async (req: Request, res: Response) => {
  const { token } = req.body;
  const t = await Token.findOne({ token });
  if (t) {
    await t.remove();
    return res.status(StatusCodes.OK).send("Logged out");
  }

  res.status(StatusCodes.NOT_FOUND).send("No such api token");
});

export const testToken = catchAsync(async (req: Request, res: Response) => {
  if (req.user) return res.status(200).send();
  else res.status(StatusCodes.BAD_REQUEST).send();
});
