import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { UserController } from '../controller/userController';


const router = express.Router();
const userController = new UserController();

// router.get('/fetch-user-data', authMiddleware, getUserData);
// router.post('/update-user-data', authMiddleware, updateUser);

router.get('/users', authMiddleware, userController.getAllUsers);

router.get(
  '/users/:userId',
  authMiddleware,
  userController.fetchUserData
);

router.patch(
  '/users/:userId',
  authMiddleware,
  userController.updateUserData
);


export default router;