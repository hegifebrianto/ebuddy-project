import express from "express";
import { signInUser } from "../controller/authController"; // Ensure correct import

const router = express.Router();

// Correctly define the route
router.post("/get-token", signInUser);

export default router;
