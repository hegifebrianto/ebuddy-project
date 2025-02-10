"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controller/authController"); // Ensure correct import
const router = express_1.default.Router();
// Correctly define the route
router.post("/get-token", authController_1.signInUser);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map