import jwt from 'jsonwebtoken';
import { ENV } from "../lib/env.js"

// In production, use process.env.JWT_SECRET
const SHARED_SECRET_KEY = ENV.JWT_SECRET_KEY; 

export const authenticateUser = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Verify using the same secret and algorithm as your FastAPI app
        const decoded = jwt.verify(token, SHARED_SECRET_KEY, {
            algorithms: ['HS256'] // Explicitly matching FastAPI's default
        });
        
        req.user = decoded; 
        next();
    } catch (err) {
        return res.status(403).json({ message: "Forbidden: Invalid or expired token" });
    }
};