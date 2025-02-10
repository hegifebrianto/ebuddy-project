"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInUser = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY;
const signInUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Email and password are required." });
            return;
        }
        const response = await axios_1.default.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`, {
            email,
            password,
            returnSecureToken: true
        });
        res.status(200).json({ token: response.data.idToken });
    }
    catch (error) { // ✅ Explicitly define 'error' type
        if (error instanceof Error) {
            res.status(500).json({
                message: "Error generating token",
                error: error.message
            });
        }
        else {
            res.status(500).json({ message: "Unknown error occurred" });
        }
    }
};
exports.signInUser = signInUser;
//# sourceMappingURL=authController.js.map