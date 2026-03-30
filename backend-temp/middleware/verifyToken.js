import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    // 1. Get token from cookie or Authorization header
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        status: "failed",
        message: "Unauthorized – No token provided",
      });
    }

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Attach user info to request
    req.userId = decoded.userId;

    next();
  } catch (err) {
    console.error("JWT verification error:", err.message);

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        status: "failed",
        message: "Token expired",
      });
    }

    return res.status(401).json({
      status: "failed",
      message: "Invalid token",
    });
  }
};
