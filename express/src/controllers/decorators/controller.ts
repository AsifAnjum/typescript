import "reflect-metadata";
import { AppRouter } from "../../app-router";
import { Methods } from "./methods.enum";
import { MetadataKeys } from "./metadata.keys";
import { RequestHandler } from "express";

function bodyValidators(keys: string[]): RequestHandler {
  return function (req: Req, res: Res, next: Next) {
    if (!keys || keys.length === 0) {
      return next();
    }
    if (!req.body) {
      res.status(422).send("Invalid Request");
      return;
    }

    for (const key of keys) {
      if (!req.body[key]) {
        res.status(422).send(`Missing property ${key}`);
        return;
      }
    }

    next();
  };
}

export function controller(routePrefix: string) {
  return function (target: Function) {
    const router = AppRouter.getInstance();
    Object.getOwnPropertyNames(target.prototype).forEach((key) => {
      const routeHandler = target.prototype[key];
      const path = Reflect.getMetadata(
        MetadataKeys.path,
        target.prototype,
        key,
      );
      const method: Methods = Reflect.getMetadata(
        MetadataKeys.method,
        target.prototype,
        key,
      );

      const middlewares =
        Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) ||
        [];

      const requiredBodyProps =
        Reflect.getMetadata(MetadataKeys.validator, target.prototype, key) ||
        [];

      const validator = bodyValidators(requiredBodyProps);

      if (path) {
        router[method](
          `${routePrefix}${path}`,
          ...middlewares,
          validator,
          routeHandler,
        );
      }
    });
  };
}
