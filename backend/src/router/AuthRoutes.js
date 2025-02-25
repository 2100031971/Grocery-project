import { Router } from "express";
import jwt from "jsonwebtoken";
import handler from "express-async-handler";
import Usermodel from "../models/Usermodel.js";
import bcrypt from "bcrypt";

const router = Router();
const PASSWORD_HASH_SALT_ROUNDS = 10;

let loggedInUsersCount = 0; // ✅ Track the number of users logged in

router.post(
  "/login",
  handler(async (req, res) => {
    const { email, password } = req.body;
    const user = await Usermodel.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send("Invalid email or password");
    }

    loggedInUsersCount++; // ✅ Increase count on login

    res.send(generateTokenResponse(user));
  })
);

// ✅ API to get logged-in user count
router.get(
  "/admin/logged-in-users",
  handler(async (req, res) => {
    res.json({ count: loggedInUsersCount });
  })
);

// ✅ JWT Token Generation
const generateTokenResponse = (user) => {
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );

  return {
    id: user._id,
    email: user.email,
    name: user.name,
    isAdmin: user.isAdmin,
    token,
  };
};

export default router;
