import express from 'express'
const router = express.Router();

router.get('/', (req,res) => {
  res.send('Poll')
});


export default router;