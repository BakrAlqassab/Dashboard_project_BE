// const jwt = require('jsonwebtoken');

// module.exports = (req, res, next) => {
//     // Get the token from the header
//     const authHeader = req.header('Authorization');
//     console.log("authHeader")
    
//     if (!authHeader) {
//       return res.status(401).json({ message: 'No authorization token found' });
//     }

//     const token = authHeader.replace('Bearer ', '');



//     // Check if no token
//     if (!token) {
//         return res.status(401).json({ message: 'No token, authorization denied' });
//     }

//     try {
//         // Verify token
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         console.log("dedeoceded token")
//         console.log(dedeoceded)
//         // Attach user from payload to request object
//         req.user = decoded;
//         // Move to the next middleware
//         next();
//     } catch (error) {
//         res.status(401).json({ message: 'Token is not valid' });
//     }
// };



// const User = require('../models/User'); // Ensure the path to User model is correct

// const authMiddleware = async (req, res, next) => {
//   const authHeader = req.header('Authorization');
    
//   if (!authHeader) {
//     return res.status(401).json({ message: 'No authorization token found' });
//   }

//   const token = authHeader.replace('Bearer ', '');

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.userId);
    

//     if (!user) {
//       throw new Error('User not found');
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     res.status(401).send({ error: 'Please authenticate.' });
//   }
// };

// module.exports = authMiddleware;


const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Ensure the path to User model is correct

const authMiddleware = async (req, res, next) => {
  // Get the token from the header
  const authHeader = req.header('Authorization');
  
  if (!authHeader) {
    return res.status(401).json({ message: 'No authorization token found' });
  }

  const token = authHeader.replace('Bearer ', '');

  // Check if no token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Decoded token:", decoded);

    // Find the user by the ID in the token
    const user = await User.findById(decoded.userId);
    // console.log("User found:", user);

    if (!user) {
      throw new Error('User not found');
    }

    // Attach user from payload to request object
    req.user = user;
    
    // Move to the next middleware
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ message: 'Please authenticate.' });
  }
};

module.exports = authMiddleware;
