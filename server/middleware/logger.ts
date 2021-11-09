import mongoose from "mongoose";
import { IncomingMessage as IM, ServerResponse as SR } from "http";
import beautifyUnique from "../utils/uniqueValidationBeautifierPlugin";

var connection: typeof mongoose;

(async () => {
  if (!connection) {
    connection = await mongoose.connect("mongodb://localhost/todo");
    mongoose.plugin(beautifyUnique);
    console.log("Connected to MongoDB");
  }
})();

export default async (req: IM, res: SR) => {
  console.log(req.url, req.method);
};
