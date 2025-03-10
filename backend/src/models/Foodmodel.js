import { model, Schema } from 'mongoose';

const FoodSchema = new Schema(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true }, // Removed unique: true
        tags: { type: [String] },
        favorite: { type: Boolean, default: false },
        stars: { type: Number, default: 3 },
        imageUrl: { type: String, required: true },
        origins: { type: [String], required: true },
    },
    {
        toJSON: {
            virtuals: true,
        },
        toObject: {  // Fixed typo
            virtuals: true,
        },
        timestamps: true,
    }
);

export const Foodmodel = model('food', FoodSchema);
