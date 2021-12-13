import { IncomingMessage as IM, ServerResponse as SR } from "http";

export default async (req: IM, res: SR) => {
  console.log(req.url, req.method);
};
