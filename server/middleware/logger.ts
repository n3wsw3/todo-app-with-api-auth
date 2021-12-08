import { IncomingMessage as IM, ServerResponse as SR } from "http";
import { useCookies } from "h3";

export default async (req: IM, res: SR) => {
  console.log(
    req.url,
    req.method,
    await useCookies(req),
    req.headers.authorization ?? ""
  );
};
