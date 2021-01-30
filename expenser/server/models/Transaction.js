import mongoose from 'mongoose'

const TransactionSchema = new mongoose.Schema({
  text: {
    type: String,
    trim: true,
    required: [true, 'Please add some text']
  },
  amount: {
    type: Number,
    required: [true, 'Please ass positive and negative number']
  },
  createdAt:{
    type: Date,
    default: Date.now
  }
})

const Transaction = mongoose.model('transaction', TransactionSchema)
export default Transaction;