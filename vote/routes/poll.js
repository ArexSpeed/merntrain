import express from 'express'
import Pusher from 'pusher'
const router = express.Router();

const pusher = new Pusher({
  appId: "1147028",
  key: "2155ad4346ba1aed215f",
  secret: "3daf78d43a970263664c",
  cluster: "eu",
  useTLS: true
});

router.get('/', (req,res) => {
  res.send('Poll')
});

router.post('/', (req,res) => {
  pusher.trigger("os-poll", "os-vote", {
    points: 1,
    os: req.body.os
  });

  return res.json({success: true, message: 'Thanks for voting'})
})

export default router;