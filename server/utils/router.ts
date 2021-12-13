/**
 * Copy of h3 router with modifications to allow for path
 * arguments and specify request methods.
 *
 * Using express doesn't currently work.
 */
import { createError, PHandle, send, MIMES } from "h3";
import { IncomingMessage, ServerResponse } from "http";
import { Match, match } from "./path-matcher";

export type RouteInfo = {
  [key: string]: string;
};

export type Handle<P extends RouteInfo = any, T = any> = (
  req: IncomingMessage,
  res: ServerResponse,
  params?: P
) => T;

export interface Layer {
  route: string;
  handle: Handle<any>;
  method?: string;
}

export type Stack = Layer[];

export interface RRequestOptions {
  method?: string;
}

export interface RRequest {
  <P extends RouteInfo>(
    route: string,
    handle: [Handle<P>],
    options?: RRequestOptions
  ): Router;
}

export interface Router {
  (req: IncomingMessage, res: ServerResponse): Promise<any>;
  stack: Stack;
  _handle: PHandle;
  use: RRequest;
  post: RRequest;
  get: RRequest;
  put: RRequest;
  patch: RRequest;
  delete: RRequest;
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
  router.use = <P extends RouteInfo>(
    route,
    handles: Handle<P>[],
    options: RRequestOptions = {}
  ) => {
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

  router.patch = (route, handles, options = {}) => {
    return router.use(
      route,
      handles,
      Object.assign(options, { method: "PATCH" })
    );
  };

  router.delete = (route, handles, options = {}) => {
    return router.use(
      route,
      handles,
      Object.assign(options, { method: "DELETE" })
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
      let result: Match;
      if (layer.route.length > 1) {
        const matcher = match(layer.route, {
          decode: decodeURIComponent,
          end: false,
        });
        result = matcher(reqUrl);
        if (!result) {
          continue;
        }
        req.url = reqUrl.substr(result.path.length) || "/";
      } else {
        req.url = reqUrl;
      }
      if (
        layer.method &&
        layer.method.toUpperCase() !== req.method.toUpperCase()
      ) {
        continue;
      }

      const val = await layer.handle(req, res, result ? result.params : {});
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
