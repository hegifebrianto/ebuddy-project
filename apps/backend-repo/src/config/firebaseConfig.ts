import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();


const app = admin.initializeApp({
  projectId: 'hegy-project'
});

export const db = admin.firestore(app);
export const auth = admin.auth(app);