import { Router } from "express"; 
import jwt from 'jsonwebtoken';
import { BAD_REQUEST } from "../constants/https.js";
import handler from 'express-async-handler';
import Usermodel from '../models/Usermodel.js';
import bcrypt from 'bcrypt';

const PASSWORD_HASH_SALT_ROUNDS = 10;
const router = Router();

// ✅ LOGIN ROUTE (Clears Cart on Login)
router.post('/login', handler(async (req, res) => {
    const { email, password } = req.body;
    const user = await Usermodel.findOne({ email });

    if (!user) {
        return res.status(BAD_REQUEST).send('Username or password is invalid');
    }

    // 🔥 Compare entered password with stored hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        return res.status(BAD_REQUEST).send('Username or password is invalid');
    }

    // 🔥 Clear Cart When User Logs In
    user.cart = [];  // ✅ Assuming `cart` is a field in `Usermodel`
    await user.save(); // ✅ Save updated user in DB

    // Send token response
    res.send(generateTokenResponse(user));
}));

// ✅ REGISTER ROUTE (With Password Hashing)
router.post('/register', handler(async (req, res) => {
    const { name, email, password, address } = req.body;

    // Check if user already exists in MongoDB
    const existingUser = await Usermodel.findOne({ email });
    if (existingUser) {
        return res.status(BAD_REQUEST).send('User already exists, please login!');
    }

    // 🔥 Hash password before saving
    const hashedPassword = await bcrypt.hash(password, PASSWORD_HASH_SALT_ROUNDS);

    // ✅ Create & save new user in MongoDB
    const newUser = await Usermodel.create({
        name,
        email,
        password: hashedPassword,  // Store hashed password
        address,
        isAdmin: false,
        cart: []  // ✅ Initialize empty cart
    });

    // Send token response
    res.send(generateTokenResponse(newUser));
}));

// ✅ JWT Token Generation
const generateTokenResponse = (user) => {
    const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET,  // Use environment variable for security
        {
            expiresIn: '30d',
        }
    );

    return {
        id: user._id,
        email: user.email,
        name: user.name,
        address: user.address,
        isAdmin: user.isAdmin,
        cart: user.cart,  // ✅ Send cart in response
        token,
    };
};

export default router;
