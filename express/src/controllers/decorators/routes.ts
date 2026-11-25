import e, { RequestHandler } from "express";
import "reflect-metadata";
import { Methods } from "./methods.enum";
import { MetadataKeys } from "./metadata.keys";
// export function get(path: string) {
//   return function (target: any, key: string, descriptor: PropertyDescriptor) {
//     Reflect.defineMetadata("path", path, target, key);
//     Reflect.defineMetadata("method", "get", target, key);
//   };
// }
// export function post(path: string) {
//   return function (target: any, key: string, descriptor: PropertyDescriptor) {
//     Reflect.defineMetadata("path", path, target, key);
//     Reflect.defineMetadata("method", "post", target, key);
//   };
// }

interface RouteHandlerDescriptor extends PropertyDescriptor {
  value?: RequestHandler;
}

function routeBinder(method: string) {
  return function (path: string) {
    return function (
      target: any,
      key: string,
      descriptor: RouteHandlerDescriptor,
    ) {
      Reflect.defineMetadata(MetadataKeys.path, path, target, key);
      Reflect.defineMetadata(MetadataKeys.method, method, target, key);
    };
  };
}

export const get = routeBinder(Methods.get);
export const post = routeBinder(Methods.post);
export const patch = routeBinder(Methods.patch);
export const put = routeBinder(Methods.put);
export const del = routeBinder(Methods.delete);
