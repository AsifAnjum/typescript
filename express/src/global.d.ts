import {
  Request as ExpressRequest,
  Response as ExpressResponse,
  NextFunction as ExpressNextFunction,
} from "express";

declare global {
  type Req<
    P = any,
    ResBody = any,
    ReqBody = any,
    ReqQuery = any,
    Locals extends Record<string, any> = Record<string, any>,
  > = ExpressRequest<P, ResBody, ReqBody, ReqQuery, Locals>;

  type Res<
    ResBody = any,
    Locals extends Record<string, any> = Record<string, any>,
  > = ExpressResponse<ResBody, Locals>;

  type Next = ExpressNextFunction;
}
