import { createApp, sendError } from "h3";
import routes from "../routes";
import mongoose from "mongoose";
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

const app = createApp({
  onError: (error, req, res) => {
    sendError(res, error);
  },
});

app.use(routes);

export default app;
