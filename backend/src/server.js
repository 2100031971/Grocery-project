import dontenv from 'dotenv';
dontenv.config();
import express from 'express';
import cors from 'cors';
import foodRouter from './router/food.router.js';
import userRouter from "./router/user.js"; 
import adminRoutes from './controller/admin.js';


import { dbconnect } from './config/database.config.js';
dbconnect();

const app = express();
app.use(express.json());
app.use(
    cors({
        credentials: true,
        origin: ['http://localhost:5173'], // ✅ Change this to match your frontend port
    })
);



app.use(express.json()); // Ensure JSON body parsing is enabled
app.use('/api/foods', foodRouter); // Fix missing "/"

app.use('/api/users', userRouter);

app.get('/', (req, res) => {
    res.send('Welcome to the Food API!');
});
app.get('/api/admin/total-users', async (req, res) => {
    try {
        const totalUsers = await User.countDocuments(); // Fetch total users
        res.json({ count: totalUsers });
    } catch (error) {
        console.error("Error fetching total users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.use("/api/admin", adminRoutes); 

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
