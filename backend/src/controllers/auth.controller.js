import bcryptjs from "bcryptjs";

import { User } from "../models/user.model.js";
import generateToken from "../utils/jwt.token.js";

export const signUp = async (req, res) => {
  try {
    const { fullName, email, password, mobile, role } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User Already Exists!" });
    }

    const hashedPassword = await bcryptjs.hash(
      password,
      process.env.SALT_ROUNDS
    );

    user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      mobile,
      role,
    });

    const token = await generateToken(user._id);

    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(201).json({ data: user });
  } catch (error) {
    console.log("Failed to signUp user! \n Error: ", error);
  }
};

export const login = async (req, res) => {
  try {
  } catch (error) {}
};

export const logout = async (req, res) => {
  try {
  } catch (error) {}
};
