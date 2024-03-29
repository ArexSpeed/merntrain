import express from 'express';
import authRoutes from './routes/auth';
import subsRoutes from './routes/subs';
import articlesRoutes from './routes/article';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();

dotenv.config();


mongoose.connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("connected to db");
    app.use(express.json());
    app.use(cors());
    app.use("/auth", authRoutes);
    app.use("/subs", subsRoutes);
    app.use("/articles", articlesRoutes);
    app.listen(5000, () => {
      console.log('Server listening');
    });
  })
  .catch((error) => {
    console.log({ error });
    throw new Error(error);
  })

