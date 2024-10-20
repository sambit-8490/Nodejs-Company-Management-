const jwt = require('jsonwebtoken');
console.log("Before Middleware");

const authMiddleware = (req, res, next) => {
    console.log("inside Middleware");
    const token = req.header('Authorization')?.split(' ')[1];
    
    
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        console.log("Middleware start");
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Assuming decoded token contains username and role
        console.log("Middleware Success");
        
        next();
    } catch (error) {
        console.log("Invalid token");
        
        return res.status(400).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;
