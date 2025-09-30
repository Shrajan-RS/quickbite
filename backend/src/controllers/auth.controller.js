import bcryptjs from "bcryptjs";

import { User } from "../models/user.model.js";
import generateToken from "../utils/jwt.token.js";

export const signUp = async (req, res) => {
  try {
    const { fullName, email, password, mobileNumber, role } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User Already Exists!" });
    }

    const hashedPassword = await bcryptjs.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      mobileNumber,
      role,
    });

    const token = await generateToken(newUser._id);

    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(201).json({ data: newUser });
  } catch (error) {
    res.status(500).json({ message: `failed to signUp ${error}` });

    console.log("Failed to signUp user! \n Error: ", error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User Does Not Exists!" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({
        message: "Invalid Credentials",
      });

    const token = await generateToken(user._id);

    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ message: `failed to login ${error}` });
    console.log("Failed to login user! \n Error: ", error);
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logged Out Successfully!" });
  } catch (error) {
    res.status(500).json({ message: `failed to log out ${error}` });
    console.log("Failed to login out user! \n Error: ", error);
  }
};
