import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    cart: { type: Array, default: [] }  // ✅ Added cart field
}, { timestamps: true });

const Usermodel = mongoose.model("User", UserSchema);
export default Usermodel;
