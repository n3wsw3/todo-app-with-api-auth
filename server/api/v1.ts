import express, { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import UserError from "../utils/UserError";
import routes from "../routes";
import beautifyUnique from "../utils/uniqueValidationBeautifierPlugin";

/**
 * Initialize mongodb connection
 */
var connection: typeof mongoose;
(async () => {
  if (!connection) {
    connection = await mongoose.connect("mongodb://localhost/todo");
    mongoose.plugin(beautifyUnique);
    console.log("Connected to MongoDB");
  }
})();

const app = express();

app.use(express.json());

app.use("/", routes);

app.use(
  (err: Error | string, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof mongoose.Error.ValidationError) {
      res.status(StatusCodes.BAD_REQUEST).json(err.errors);
    } else if (err instanceof mongoose.Error) {
      res.status(StatusCodes.BAD_REQUEST).json(err.message);
    } else if (err instanceof UserError) {
      res.status(err.code).send(err.message);
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send("Internal Server Error");
    }
  }
);

export default app;
