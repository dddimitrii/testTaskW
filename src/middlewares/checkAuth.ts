require("dotenv").config;
import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";

export function checkAuth(req: Request, res: Response, next: NextFunction) {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "Пользователь не авторизован" });
    }

    const decodedData = jwt.verify(token, `${process.env.JWT_SECRET}`);
    req.user = decodedData;
    next();
  } catch (e) {
    console.log(e);
    return res.status(403).json({ message: "Пользователь не авторизован" });
  }
}
