import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    const token =
      req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token)
      return res
        .status(401)
        .json({ message: "No token, authorization denied." });

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = verified.userId;

    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    return res.status(401).json({ message: "Token verification failed." });
  }
};

export default isAuth;
