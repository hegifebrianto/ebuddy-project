"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const userController_1 = require("../controller/userController");
const router = express_1.default.Router();
const userController = new userController_1.UserController();
// router.get('/fetch-user-data', authMiddleware, getUserData);
// router.post('/update-user-data', authMiddleware, updateUser);
router.get('/users', authMiddleware_1.authMiddleware, userController.getAllUsers);
router.get('/users/:userId', authMiddleware_1.authMiddleware, userController.fetchUserData);
router.patch('/users/:userId', authMiddleware_1.authMiddleware, userController.updateUserData);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map