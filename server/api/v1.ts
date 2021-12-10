import { createApp, sendError, send, MIMES, H3Error } from "h3";
import routes from "../routes";
import mongoose from "mongoose";
import beautifyUnique from "../utils/uniqueValidationBeautifierPlugin";
import UserError from "../utils/UserError";
import { StatusCodes } from "http-status-codes";

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

const app = createApp({
  onError: (error, req, res) => {
    console.log(error);
    res.statusCode = 500;
    if (error instanceof H3Error) {
      res.statusCode = error.statusCode;
      send(res, { message: error.message, error }, MIMES.json);
    } else if (error instanceof UserError) {
      res.statusCode = StatusCodes.BAD_REQUEST;
      res.end(JSON.stringify({ message: error.message }));
    }
    // send(res, error, MIMES.json);
    res.end(JSON.stringify(error));
  },
});

app.use(routes);

export default app;
