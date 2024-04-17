import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
export const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Authentication token missing' });
        }
        const decoded = jwt.verify(token, config.jwtSecret);
        // Add the decoded user information to the request object
        req.user = decoded;
        next();
    }
    catch (err) {
        console.error(err);
        res.status(403).json({ error: 'Invalid authentication token' });
    }
};
//# sourceMappingURL=auth.js.map