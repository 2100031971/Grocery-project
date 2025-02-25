import { connect, set } from 'mongoose';
import UserModel from '../models/Usermodel.js'; 
import { Foodmodel } from '../models/Foodmodel.js'; 
import { sampleuser, sampledata } from '../data.js';
import bcrypt from 'bcrypt';

const PASSWORD_HASH_SALT_ROUNDS = 10;
set('strictQuery', true);

export const dbconnect = async () => {
    try {
        console.log("🔗 Connecting to MongoDB at:", process.env.MONGO_URI);

        await connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('✅ MongoDB connected successfully');

        await seedUsers();
        await seedFoods();
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        process.exit(1); // Stop process if DB fails to connect
    }
};

async function seedUsers() {
    const usersCount = await UserModel.countDocuments();
    if (usersCount > 0) {
        console.log('✅ Users seed is already done!');
        return;
    }

    for (let user of sampleuser) {
        user.password = await bcrypt.hash(user.password, PASSWORD_HASH_SALT_ROUNDS);
        await UserModel.create(user);
    }

    console.log('✅ Users seed is done!');
}

async function seedFoods(){
    const foods = await Foodmodel.countDocuments();
    if (foods > 0) {
        console.log('✅ Foods seed is already done!');
        return;
    }
    
    for (const food of sampledata) {
        food.imageUrl = `/foods/${food.imageUrl}`;
        await Foodmodel.create(food);
    }

    console.log('✅ Foods seed is done!');
}
