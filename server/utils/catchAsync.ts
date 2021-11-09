import { NextFunction, Request, Response } from 'express';

/**
 * Wraps an error handler around controller functions.
 *
 * Async functions return Promises. When errors are thrown
 * inside of them we need to catch the error using the
 * ".catch" promise function and then send it as an error
 * to the express error handler, by using next("error").
 *
 * If we don't do this the whole program will crash when,
 * for example, mongoose throws a validation error.
 */
export const catchAsync =
  <T>(fn: (req: Request, res: Response, next: NextFunction) => Promise<T>) =>
    (req: Request, res: Response, next: NextFunction): void => {
      Promise.resolve(fn(req, res, next)).catch(err => next(err));
    };