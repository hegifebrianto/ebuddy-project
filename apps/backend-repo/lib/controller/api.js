"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.getUserData = void 0;
const userCollection_1 = require("../repository/userCollection");
const getUserData = async (req, res) => {
    try {
        const userId = req.body.userId;
        const user = await (0, userCollection_1.fetchUserData)(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching user data', error });
    }
};
exports.getUserData = getUserData;
const updateUser = async (req, res) => {
    try {
        const userId = req.body.userId;
        const updateData = req.body;
        await (0, userCollection_1.updateUserData)(userId, updateData);
        res.json({ message: 'User updated successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating user data', error });
    }
};
exports.updateUser = updateUser;
//# sourceMappingURL=api.js.map