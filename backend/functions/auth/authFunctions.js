const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const createJWT = (user) => {
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.TOKEN_SECRET
    );
  
    return token
}
  
const protect = (req, res, next) => {
    const bearer = req.headers.authorization
  
    if(!bearer) {
      return res.status(401).json({ message: 'Not authorized 1' })
    }
    
    const [, token] = bearer.split(' ')
    
    if (!token) {
      return res.status(401).json({ message: 'Not authorized 2' })
    }
    
    try {
      if (typeof process.env.TOKEN_SECRET !== 'string') {
        return res.status(401).json({ message: 'Not authorized 3' })
      }

      const payload = jwt.verify(token, process.env.TOKEN_SECRET)
      req.user = payload

      console.log(payload);
      return next()

    } catch(e) {
      return res.status(401).json({ message: 'Not authorized 4' })
    }
}

module.exports = { createJWT, protect };