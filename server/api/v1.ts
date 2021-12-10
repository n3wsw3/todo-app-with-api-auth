import { createApp, H3Error } from "h3";
import routes from "../routes";
import mongoose from "mongoose";
import beautifyUnique from "../utils/uniqueValidationBeautifierPlugin";
import UserError from "../utils/UserError";
import { StatusCodes } from "http-status-codes";
import { ServerResponse } from "http";

export const n3sendError = (res: ServerResponse, error: any, code: number) => {
  res.statusCode = code;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ error }));
};

/**
 * Initialize mongodb connection
 */

var connection: typeof mongoose;
(async () => {
  if (!connection) {
    await mongoose
      .connect("mongodb://localhost/todo")
      .then((con) => {
        connection = con;
        console.log("Connected to MongoDB");
      })
      .catch((err) => console.error(`Could not connect to mongodb: ${err}`));
    mongoose.plugin(beautifyUnique);
  }
})();

const app = createApp({
  onError: (error, req, res) => {
    console.log(error);
    res.statusCode = 500;
    if (error instanceof H3Error) {
      n3sendError(res, error.statusMessage, error.statusCode);
    } else if (error instanceof UserError) {
      n3sendError(res, error.message, error.code);
    } else {
      n3sendError(res, error, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
});

app.use(routes);

export default app;
