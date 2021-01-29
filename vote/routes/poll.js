import express from 'express'
import mongoose from 'mongoose'

import Vote from '../models/Vote.js'
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
  Vote.find().then(votes => res.json({success: true, votes: votes}))
});

router.post('/', (req,res) => {
  const newVote = {
    os: req.body.os,
    points: 1
  }

  new Vote(newVote).save().then(vote => {
    pusher.trigger("os-poll", "os-vote", {
      points: parseInt(vote.points),
      os: vote.os
    });
  
    return res.json({success: true, message: 'Thanks for voting'})
  })

  
})

export default router;