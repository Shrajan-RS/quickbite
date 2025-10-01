import bcryptjs from "bcryptjs";
import crypto from "crypto";

import { User } from "../models/user.model.js";
import generateToken from "../utils/jwt.token.js";
import { sendMail } from "../utils/mail.js";
import { log } from "console";

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

    return res.status(201).json({ message: "User Create Successfully!" });
  } catch (error) {
    res.status(500).json({ message: `Failed To SignUp` });

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

    return res.status(200).json({ message: "User Logged In Successfully!" });
  } catch (error) {
    res.status(500).json({ message: `failed to login` });
    console.log("Failed to login user! \n Error: ", error);
  }
};

export const sendResetOTP = async (req, res) => {
  try {
    const { email } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User Does Not Exists!" });
    }

    const OTP = crypto.randomInt(100000, 1000000).toString();

    user.resetOtp = OTP;
    user.otpExpires = Date.now() + 5 * 60 * 1000;

    await user.save();

    // await sendMail(email, OTP);
    return res.status(200).json({ message: "OTP sent successfully!" });
  } catch (error) {
    res.status(500).json({ message: `failed to send OTP` });
    console.log("Failed to send OTP to " + email + " \n Error: ", error);
  }
};

export const verifyResetOTP = async (req, res) => {
  try {
    const { email, OTP } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User Does Not Exists!" });
    }

    if (OTP !== user.resetOtp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or Expired OTP!" });
    }

    user.isOtpVerified = true;
    user.resetOtp = undefined;
    user.otpExpires = undefined;

    await user.save();

    return res
      .status(200)
      .json({ message: "OTP Verified Successfully!", data: user });
  } catch (error) {
    res.status(500).json({ message: `failed to verify OTP` });
    console.log("Failed to verify OTP \n Error: ", error);
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User Does Not Exists!" });
    }

    if (!user.isOtpVerified) {
      return res.status(400).json({ message: "OTP Verification Required!" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Password Mismatch!" });
    }

    const hashedPassword = await bcryptjs.hash(
      confirmPassword,
      Number(process.env.SALT_ROUNDS)
    );

    user.password = hashedPassword;
    user.isOtpVerified = false;

    await user.save();

    return res
      .status(200)
      .json({ message: "Password Reset Was Successfully!" });
  } catch (error) {
    res.status(500).json({ message: `failed to Reset Password ` });
    console.log("Failed to Reset Password  \n Error: ", error);
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
