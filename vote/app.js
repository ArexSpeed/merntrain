import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express();

//Set public folder
const __dirname = path.resolve(); // -> use in ES6 to start __dirname
app.use(express.static(path.join(__dirname, 'public')))

//Body parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

//Enable Cors
app.use(cors());

const PORT = 5000;

app.listen(PORT, () => console.log(`Server starting on port ${PORT}`))