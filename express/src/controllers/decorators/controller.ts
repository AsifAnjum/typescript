import "reflect-metadata";
import { AppRouter } from "../../app-router";
import { Methods } from "./methods.enum";

export function controller(routePrefix: string) {
  return function (target: Function) {
    const router = AppRouter.getInstance();
    Object.getOwnPropertyNames(target.prototype).forEach((key) => {
      const routeHandler = target.prototype[key];
      const path = Reflect.getMetadata("path", target.prototype, key);
      const method: Methods = Reflect.getMetadata(
        "method",
        target.prototype,
        key,
      );

      if (path) {
        router[method](`${routePrefix}${path}`, routeHandler);
      }
    });
  };
}
