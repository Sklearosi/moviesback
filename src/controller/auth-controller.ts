import { Request, Response } from "express";
import User from "models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import addUserSchema from "../schemas/add-user-schema.js";
import { sendVerificationLink } from "../mail/edge.js";
import Movie from "../models/Movie.js";

function generateRandomToken(length:any) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters.charAt(randomIndex);
  }

  return token;
}

export const createUser = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const validator = await addUserSchema(body);

    const { value, error } = validator.validate(body);

    if (error) {
      return res.status(401).json(error.details);
    }

    const { name, email, password } = value;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    
    const token = generateRandomToken(32); 

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      token, 
    });

    newUser.save();
    await sendVerificationLink(email, name, "https://www.google.com");

    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(401).json(error);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne(
      { email },
      {
        _id: 0,
        __v: 0,
      }
    ).select("+password");

    if (!user) {
      return res.status(401).json({ message: "user not found" });
    }

    const result = await bcrypt.compare(password, user.password);

    if (result) {
      const signData = {
        name: user.name,
        id: user.id,
      };

      
      const token = jwt.sign(signData, process.env.JWT_SECRET!);

      return res.status(200).json({ ...signData, token });
    }
  } catch (error) {
    return res.status(401).json(error);
  }
};

export const getAllUser = async (req: Request, res: Response) => {
  const data = await User.find();

  return res.status(200).json(data);
};

export const getMovies = async (req: Request, res: Response) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve movies.' });
  }
};
