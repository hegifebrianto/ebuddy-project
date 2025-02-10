"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const userCollection_1 = require("../repository/userCollection");
const firebase_functions_1 = require("firebase-functions");
class UserController {
    constructor() {
        this.getAllUsers = async (req, res) => {
            try {
                const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
                const lastDoc = req.query.lastDoc ? JSON.parse(req.query.lastDoc) : undefined;
                const { users, lastDoc: newLastDoc } = await this.userRepo.getAllUsers(pageSize, lastDoc);
                return res.json({
                    success: true,
                    data: users,
                    pagination: {
                        lastDoc: newLastDoc ? JSON.stringify(newLastDoc) : null
                    }
                });
            }
            catch (error) {
                firebase_functions_1.logger.error('Error in getAllUsers:', error);
                return res.status(500).json({
                    success: false,
                    error: 'Internal server error'
                });
            }
        };
        this.fetchUserData = async (req, res) => {
            try {
                const userId = req.params.userId;
                const user = await this.userRepo.getUser(userId);
                if (!user) {
                    return res.status(404).json({
                        success: false,
                        error: 'User not found'
                    });
                }
                return res.json({
                    success: true,
                    data: user
                });
            }
            catch (error) {
                firebase_functions_1.logger.error('Error in fetchUserData:', error);
                return res.status(500).json({
                    success: false,
                    error: 'Internal server error'
                });
            }
        };
        this.updateUserData = async (req, res) => {
            try {
                const updateRequest = {
                    userId: req.params.userId,
                    data: req.body
                };
                const updated = await this.userRepo.updateUser(updateRequest);
                return res.json({
                    success: true,
                    data: updated
                });
            }
            catch (error) {
                firebase_functions_1.logger.error('Error in updateUserData:', error);
                return res.status(500).json({
                    success: false,
                    error: 'Internal server error'
                });
            }
        };
        this.userRepo = new userCollection_1.UserRepository();
    }
}
exports.UserController = UserController;
//# sourceMappingURL=userController.js.map