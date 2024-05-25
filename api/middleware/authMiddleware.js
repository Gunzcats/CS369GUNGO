const jwt = require('jsonwebtoken');

function authenticateJWT(req, res, next) {
    
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        
        console.error('JWT verification error:', err); 
        return res.status(403).json({ message: 'Invalid JWT token' });
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401); // Unauthorized
  }
}

module.exports = authenticateJWT;
