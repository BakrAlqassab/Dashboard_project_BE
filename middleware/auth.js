const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Get the token from the header
    const token = req.header('Authorization').replace('Bearer ', '');
//     console.log("Token being verified:", token);
// console.log("JWT Secret for Verification:", process.env.JWT_SECRET);


    // Check if no token
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Attach user from payload to request object
        req.user = decoded;
        // Move to the next middleware
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};
