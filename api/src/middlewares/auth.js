import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    if (!req.headers.authorization) throw Error("No token provided");

    const token = req.headers.authorization.split(" ")[1]; //number 1 indicate the second element of the bearer array

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { userId: decoded.userId };

    next();
  } catch (ex) {
    res.status(401).json({ message: ex.message });
  }
};
