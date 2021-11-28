import { createError, PHandle, send, MIMES, Handle } from "h3";
import { IncomingMessage, ServerResponse } from "http";

export interface Layer {
  route: string;
  handle: Handle;
  method?: string;
}

export type Stack = Layer[];

export interface RRequestOptions {
  method?: string;
}

export interface RRequest {
  (route: string, handle: [Handle], options?: RRequestOptions): Router;
}

export interface Router {
  (req: IncomingMessage, res: ServerResponse): Promise<any>;
  stack: Stack;
  _handle: PHandle;
  use: RRequest;
  post: RRequest;
  get: RRequest;
  put: RRequest;
}

export function createRouter(): Router {
  const stack: Stack = [];
  const _handle = createHandle(stack);

  //@ts-ignore
  const router: Partial<Router> = function (
    req: IncomingMessage,
    res: ServerResponse
  ) {
    return _handle(req, res);
  };

  router.stack = stack;
  router._handle = _handle;

  //@ts-ignore
  router.use = (route, handles, options = {}) => {
    handles.forEach((handle) =>
      router.stack.push({ route, handle, method: options.method })
    );
    return router;
  };

  router.post = (route, handles, options = {}) => {
    return router.use(
      route,
      handles,
      Object.assign(options, { method: "POST" })
    );
  };

  router.get = (route, handles, options = {}) => {
    return router.use(
      route,
      handles,
      Object.assign(options, { method: "GET" })
    );
  };

  router.put = (route, handles, options = {}) => {
    return router.use(
      route,
      handles,
      Object.assign(options, { method: "PUT" })
    );
  };

  return router as Router;
}

export function createHandle(stack: Stack): PHandle {
  return async function handle(req: IncomingMessage, res: ServerResponse) {
    // @ts-ignore express/connect compatibility
    req.originalUrl = req.originalUrl || req.url || "/";
    const reqUrl = req.url || "/";
    for (const layer of stack) {
      if (layer.route.length > 1) {
        if (!reqUrl.startsWith(layer.route)) {
          continue;
        }
        req.url = reqUrl.substr(layer.route.length) || "/";
      } else {
        req.url = reqUrl;
      }
      if (
        layer.method &&
        layer.method.toUpperCase() !== req.method.toUpperCase()
      ) {
        continue;
      }
      
      const val = await layer.handle(req, res);
      if (res.writableEnded) {
        return;
      }
      const type = typeof val;
      if (type === "string") {
        return send(res, val, MIMES.html);
      } else if (type === "object" && val !== undefined) {
        // Return 'false' and 'null' values as JSON strings
        if (val && val.buffer) {
          return send(res, val);
        } else if (val instanceof Error) {
          throw createError(val);
        } else {
          return send(res, JSON.stringify(val, null, 2), MIMES.json);
        }
      }
    }
    if (!res.writableEnded) {
      throw createError({ statusCode: 404, statusMessage: "Not Found" });
    }
  };
}
