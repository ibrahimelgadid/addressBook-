//---------------------------------------------|
//           All required modules
//---------------------------------------------|
import { Request, Response } from "express";

import bcrypt from "bcryptjs";
import validateRegistrationInputs from "../validation/registerValidate";
import Auth from "../models/authModel";
import validateLoginInputs from "../validation/loginValidate.";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

//---------------------------------------------|
//           Register functionality
//---------------------------------------------|
export const register = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { username, email, password } = req.body;
    const { isValid, errors } = validateRegistrationInputs(req.body);
    if (!isValid) return res.status(400).json(errors);

    const userExists = await Auth.findOne({ email });

    if (userExists) {
      errors.email = "This email already exists";
      return res.status(400).json(errors);
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new Auth({
        username,
        email,
        password: hashedPassword,
      });

      const newUserAdded = await newUser.save();

      if (newUserAdded) {
        res.status(201).json(newUserAdded);
      } else {
        res.status(400).json({ RegErr: "Failed to create user" });
      }
    }
  }
);

//---------------------------------------------|
//           Login functionality
//---------------------------------------------|
export const login = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;

    const { isValid, errors } = validateLoginInputs(req.body);
    if (!isValid) return res.status(400).json(errors);

    const user = await Auth.findOne({ email });
    if (!user) {
      errors.email = "This email is not exists";
      return res.status(404).json(errors);
    } else {
      const matchPass = await bcrypt.compare(password, user.password);

      if (!matchPass) {
        errors.password = "Wrong password";
        return res.status(404).json(errors);
      } else {
        res.status(200).json({
          _id: user._id,
          username: user.username,
          email: user.email,
          token: generateToken(user.id, user.username, user.email),
        });
      }
    }
  }
);

//---------------------------------------------|
//           generate token functionality
//---------------------------------------------|
const generateToken = (id: string, username: string, email: string): string => {
  return jwt.sign({ id, username, email }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
