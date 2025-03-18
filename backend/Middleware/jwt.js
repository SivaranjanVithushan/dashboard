const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'smart_secret_key';

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const decoded = jwt.verify(token,"secret_123");
    req.user = decoded;
    next();
} catch (err) {
    console.error("JWT Verification Error:", err.message);
    res.status(403).json({ message: "Invalid token" });
}

};

module.exports = { authMiddleware };
