import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import UserError from "./UserError";
import { userFromToken } from "../services/token.service";
import { catchAsync } from "./catchAsync";

export default catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    req.user = await userFromToken(token);
    if (!req.user)
      next(new UserError("Invalid Access-Token", StatusCodes.BAD_REQUEST));

    next();
  }
);
