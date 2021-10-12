import { IncomingMessage as IM, ServerResponse as SR } from "http";
import { RequestMethods } from "./methods";

type Delegate = (req: IM, res: SR) => void | Object;

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

  post(delegate: Delegate): RouteDelegator {
    this.addDelegate(RequestMethods.POST, delegate);
    return this;
  }

  get(delegate: Delegate): RouteDelegator {
    this.addDelegate(RequestMethods.GET, delegate);
    return this;
  }

  put(delegate: Delegate): RouteDelegator {
    this.addDelegate(RequestMethods.PUT, delegate);
    return this;
  }

  delete(delegate: Delegate): RouteDelegator {
    this.addDelegate(RequestMethods.DELETE, delegate);
    return this;
  }

  patch(delegate: Delegate): RouteDelegator {
    this.addDelegate(RequestMethods.PATCH, delegate);
    return this;
  }
}

export const useRouter = () => {
  return new RouteDelegator();
};
