/**
 * All requests to the auth route will call a function in this controller file.
 */

import { User } from "../models/user.model";
import { StatusCodes } from "http-status-codes";
import { Token } from "../models/token.model";
import { IncomingMessage, ServerResponse } from "http";
import { useBody } from "h3";
import {
  sendErrorResponse,
  sendJsonResponse,
  sendMessageResponse,
} from "../utils/response";
import {
  createAuthenticationTokens,
  userFromToken,
} from "../services/token.service";
import mongoose from "mongoose";

export const register = async (req: IncomingMessage, res: ServerResponse) => {
  await new User(await useBody(req))
    .save()
    .then((user) => {
      const token = createAuthenticationTokens(user);
      sendJsonResponse(res, { token, user }, StatusCodes.CREATED);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        sendErrorResponse(res, err.errors, StatusCodes.BAD_REQUEST);
      } else if (err instanceof mongoose.Error) {
        sendErrorResponse(res, err.message, StatusCodes.BAD_REQUEST);
      } else {
        sendErrorResponse(
          res,
          "Internal Server Error",
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      }
    });
};

export const login = async (req: IncomingMessage, res: ServerResponse) => {
  const { email, password } = await useBody(req);
  const user = await User.findOne({ email });
  if (user && (await user.isPasswordMatch(password))) {
    const token = await createAuthenticationTokens(user);

    return sendJsonResponse(res, { token, user }, StatusCodes.OK);
  }

  sendErrorResponse(
    res,
    "Email and/or password is incorrect",
    StatusCodes.UNAUTHORIZED
  );
};

export const logout = async (req: IncomingMessage, res: ServerResponse) => {
  const { token } = await useBody(req);
  const t = await Token.findOne({ token });
  if (t) {
    await t.remove();
    return sendJsonResponse(res, "Logged out", StatusCodes.OK);
  }

  sendErrorResponse(res, "No such api token", StatusCodes.NOT_FOUND);
};

export const testToken = async (req: IncomingMessage, res: ServerResponse) => {
  const { token } = await useBody(req);

  const user = await userFromToken(token);

  if (user) return sendMessageResponse(res, "Success", StatusCodes.ACCEPTED);
  sendErrorResponse(res, "Token Not Valid", StatusCodes.BAD_REQUEST);
};
