import { IncomingMessage as IM, ServerResponse as SR } from "http";

type Delegate = (req: IM, res: SR) => void | Object;

enum RequestMethods {
  GET = "GET",
  HEAD = "HEAD",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  CONNECT = "CONNECT",
  OPTIONS = "OPTIONS",
  TRACE = "TRACE",
  PATCH = "PATCH",
}

type route = (delegate: Delegate) => RouteDelegator;

class RouteDelegator {
  delegateMap = new Map<RequestMethods, Delegate>();

  private addDelegate(method: RequestMethods, delegate: Delegate) {
    this.delegateMap.set(method, delegate);
  }

  private delegate(req: IM, res: SR): void | Object {
    const method = (req.method || "") as RequestMethods;
    if (!this.delegateMap.has(method)) {
      throw new Error(`Trying to call undefined delegate for ${method}`);
    }
    return this.delegateMap.get(method)(req, res);
  }

  routes(): Delegate {
    return (req, res) => {
      return this.delegate(req, res);
    };
  }

  post: route = (delegate) => {
    this.addDelegate(RequestMethods.POST, delegate);
    return this;
  };

  get: route = (delegate) => {
    this.addDelegate(RequestMethods.GET, delegate);
    return this;
  };

  put: route = (delegate) => {
    this.addDelegate(RequestMethods.PUT, delegate);
    return this;
  };

  delete: route = (delegate) => {
    this.addDelegate(RequestMethods.DELETE, delegate);
    return this;
  };

  patch: route = (delegate) => {
    this.addDelegate(RequestMethods.PATCH, delegate);
    return this;
  };
}

export const useRouter = () => {
  return new RouteDelegator();
};
