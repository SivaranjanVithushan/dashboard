// const jwt = require('jsonwebtoken');
// const JWT_SECRET = process.env.JWT_SECRET || 'smart_secret_key';

// const authMiddleware = (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];

//   if (!token) return res.status(401).json({ message: 'Access denied' });

//   try {
//     const decoded = jwt.verify(token,"secret_123");
//     req.user = decoded;
//     next();
// } catch (err) {
//     console.error("JWT Verification Error:", err.message);
//     res.status(403).json({ message: "Invalid token" });
// }

// };

// module.exports = { authMiddleware };


const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET || "default_secret"; // Ensure it's the same as in loginAdmin

exports.authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Extract the token after "Bearer"

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded; // Attach decoded admin info to request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

