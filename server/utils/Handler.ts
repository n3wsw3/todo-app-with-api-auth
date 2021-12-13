import { IncomingMessage, ServerResponse } from "http";

/**
 * Automatically types the server middleware
 * complete with params specified in the route.
 * @param handle serverMiddleware
 * @returns
 */
export const Handler = <K = {}>(
  handle: <T extends K>(
    req: IncomingMessage,
    res: ServerResponse,
    params?: T
  ) => any
) => handle;
