import express from 'express';
import {getTransactions} from '../controllers/transactionController.js'
const router = express.Router();

router.get('/', (req,res) => res.send("Hello"))

export default router;