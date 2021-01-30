import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import transactions from './routes/transactions.js'
import connectDB from './db.js'

dotenv.config()
connectDB();



const app = express();

app.use(express.json());

app.use('/api/transactions', transactions)

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`))