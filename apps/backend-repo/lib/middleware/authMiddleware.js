"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const firebaseConfig_1 = require("../config/firebaseConfig");
const firebase_functions_1 = require("firebase-functions");
const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                error: 'Unauthorized - No token provided'
            });
        }
        const token = authHeader.split('Bearer ')[1];
        if (process.env.FUNCTIONS_EMULATOR || process.env.NODE_ENV === 'development') {
            if (token === 'test-token') {
                firebase_functions_1.logger.info('Using test token in emulator/development mode');
                return next();
            }
        }
        await firebaseConfig_1.auth.verifyIdToken(token);
        return next();
    }
    catch (error) {
        firebase_functions_1.logger.error('Auth error:', error);
        return res.status(401).json({
            success: false,
            error: 'Unauthorized - Invalid token'
        });
    }
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=authMiddleware.js.map