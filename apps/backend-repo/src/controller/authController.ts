import { Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY;

export const signInUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required." });
      return;
    }

    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true
      }
    );

    res.status(200).json({ token: response.data.idToken });
  } catch (error: unknown) { // ✅ Explicitly define 'error' type
    if (error instanceof Error) {
      res.status(500).json({
        message: "Error generating token",
        error: error.message
      });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};
