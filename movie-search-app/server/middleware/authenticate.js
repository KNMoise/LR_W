const jwt = require('jsonwebtoken');

// Middleware for authenticating users with optional role validation
const authenticate = (requiredRole = null, allowGuest = false) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // Allow guest access if it's enabled for this route
      if (allowGuest) {
        req.user = { role: 'guest' };  // Assign a guest user role
        return next();
      }
      return res.status(401).json({ error: 'Unauthorized: Token missing or invalid' });
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      // Role-based access control
      if (requiredRole && req.user.role !== requiredRole) {
        return res.status(403).json({ error: 'Forbidden: Insufficient privileges' });
      }

      next();
    } catch (error) {
      return res.status(401).json({ error: 'Unauthorized: Invalid or expired token' });
    }
  };
};

module.exports = authenticate;
