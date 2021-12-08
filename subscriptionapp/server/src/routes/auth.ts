import express from "express";
import { body, validationResult } from 'express-validator';
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { checkAuth } from "../middleware/checkAuth";

const router = express.Router();

router.post(
  '/signup', 
  body("email").isEmail().withMessage("The email is invalid"), 
  body("password").isLength({ min: 5}).withMessage("Password is too short"), 
  async(req, res) => {
  const validationErrors = validationResult(req);

  if(!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map((error) => {
      return {
        msg: error.msg
      }
    });

    return res.json({ errors, data: null });
  }
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if(user) {
    return res.json({
      errors: [
        {
          msg: "Email already in use"
        }
      ],
      data: null
    })
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    email,
    password: hashedPassword
  });

  const token = await jwt.sign(
    {email: newUser.email},
    process.env.JWT_SECRET as string,
    {
      expiresIn: 360000
    }
  )

  res.json({
    errors: [],
    data: {
      token,
      user: {
        id: newUser._id,
        email: newUser.email,
      }
    }
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if(!user) {
    return res.json({
      errors: [
        {
          msg: "Invalids credentials, wrong email"
        }
      ],
      data: null
    })
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if(!isMatch) {
    return res.json({
      errors: [
        {
          msg: "Invalids credentials, wrong password"
        }
      ],
      data: null
    })
  }

  const token = await jwt.sign(
    {email: user.email},
    process.env.JWT_SECRET as string,
    {
      expiresIn: 360000
    }
  )

  return res.json({
    errors: [],
    data: {
      token,
      user: {
        id: user._id,
        email: user.email
      }
    }
  })
});

router.get('/me', checkAuth, async (req, res) => {
  //res.send(req.user);
  const user = await User.findOne({ email: req.user });

  return res.json({
    errors: [],
    data: {
      user: {
        id: user._id,
        email: user.email
      }
    }
  })
})

export default router;