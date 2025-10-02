import { User } from "../models/user.model.js";
import app from "../app.js";

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId)
      return res.status(400).json({ message: "User Id Is Not Found!" });

    const user = await User.findById(userId);

    if (!user) return res.status(400).json({ message: "User Not Found!" });

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Current User Error! ", error });
  }
};
