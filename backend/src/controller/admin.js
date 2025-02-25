import express from 'express';
import Usermodel from '../models/Usermodel.js'; // Ensure correct model import

const router = express.Router();

router.get('/logged-in-users', async (req, res) => {
    try {
        const users = await Usermodel.find({ isLoggedIn: true }); // Modify based on your schema
        res.json(users);
    } catch (error) {
        console.error("Error fetching logged-in users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
router.get('/users', async (req, res) => {
    try {
        const users = await Usermodel.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default router;
