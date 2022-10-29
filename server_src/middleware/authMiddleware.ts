import jwt from "jsonwebtoken";
import Auth from "../models/authModel";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";

export const protect = asyncHandler(
  async (req: Request, res: Response, next) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        (<any>req).user = await Auth.findById((<any>decoded).id);

        next();
      } catch (error) {
        res.status(401).json({ privilegesErr: "not authorized, wrong token" });
      }
    }

    if (!token) {
      res.status(401).json({ privilegesErr: "not authorized, no token" });
    }
  }
);
