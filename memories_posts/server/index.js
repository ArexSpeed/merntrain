import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv';
import connectDB from './db.js';
import postRoutes from './routes/posts.js'

const app = express();
dotenv.config();
connectDB();

// set limit in send file from req (fe img)
app.use(bodyParser.json({limit: '30mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}))
app.use(cors())

//routes below cors to retriew data in client
app.use('/posts', postRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

