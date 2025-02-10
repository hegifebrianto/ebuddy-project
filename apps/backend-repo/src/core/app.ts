import express from 'express';
import { json } from 'express';
import userRoutes from '../routes/userRoutes';
import authRoutes from '../routes/authRoutes';

const app = express();

app.use(json());
app.use('/', userRoutes);
app.use("/auth", authRoutes); 


export default app;
