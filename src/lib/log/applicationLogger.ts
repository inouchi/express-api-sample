import { Request, Response, NextFunction } from "express";
import logger from "./logger";

export default () => {
  return (err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.application.error(err.message);
    next(err);
  }
};