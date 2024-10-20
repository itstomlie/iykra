import { NextFunction, Request, Response } from "express";
import semver from "semver";

export const versionMiddleware = function (version: string) {
  return function (req: Request, res: Response, next: NextFunction) {
    const requestVersion = req.headers["x-api-version"];

    if (!requestVersion || typeof requestVersion !== "string") {
      return next();
    }

    if (!semver.valid(requestVersion)) {
      res.status(400).json({ error: "Invalid api version format." });
    }

    if (semver.gte(requestVersion, version)) {
      return next();
    }

    return next("route");
  };
};
