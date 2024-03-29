import express from "express";
import { body, validationResult } from 'express-validator';
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { checkAuth } from "../middleware/checkAuth";
import { stripe } from "../utils/stripe";

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

  const customer = await stripe.customers.create(
    {
      email,
    },
    {
      apiKey: process.env.STRIPE_SECRET_KEY,
    }
  );

  const newUser = await User.create({
    email,
    password: hashedPassword,
    stripeCustomerId: customer.id
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
        stripeCustomerId: customer.id
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
        email: user.email,
        stripeCustomerId: user.stripeCustomerId
      }
    }
  })
})

export default router;
