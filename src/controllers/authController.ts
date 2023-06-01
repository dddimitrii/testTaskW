require("dotenv").config;
import User from "../models/user";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

const generateAccessToken = (id: Types.ObjectId) => {
  const payload = {
    id,
  };
  const secretKey = `${process.env.JWT_SECRET}`;
  return jwt.sign(payload, secretKey, { expiresIn: "24h" });
};

class AuthController {
  async registration(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;
      const candidate = await User.findOne({ email });
      if (candidate) {
        return res
          .status(400)
          .json({ message: "Пользователь с таким именем уже существует" });
      }
      const hashPassword = await bcrypt.hash(
        password,
        7
      );
      const user = new User({ username, email, password: hashPassword });
      await user.save();

      const token = generateAccessToken(user._id);

      return res.json({ token });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Registration error" });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: `Пользователь не найден` });
      }
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: `Введен неверный пароль` });
      }
      const token = generateAccessToken(user._id);
      return res.json({ token });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Login error" });
    }
  }
}
export default new AuthController();
