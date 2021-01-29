import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import bodyParser from 'body-parser'
import cors from 'cors'
import poll from './routes/poll.js'
import connectDB from './config/db.js'

dotenv.config()
connectDB();

const app = express();

//Set public folder
const __dirname = path.resolve(); // -> use in ES6 to start __dirname
app.use(express.static(path.join(__dirname, 'public')))

//Body parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

//Enable Cors
app.use(cors());

app.use('/poll', poll);

const PORT = 5000;

app.listen(PORT, () => console.log(`Server starting on port ${PORT}`))