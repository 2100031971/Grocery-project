import { Router } from "express";
import { Foodmodel } from "../models/Foodmodel.js";
import handler from "express-async-handler";

const router = Router();

// ✅ Get All Foods
router.get(
  "/",
  handler(async (req, res) => {
    const foods = await Foodmodel.find({});
    res.send(foods);
  })
);

// ✅ Get All Tags (Sorted by Count)
router.get(
  "/tags",
  handler(async (req, res) => {
    const tags = await Foodmodel.aggregate([
      { $unwind: "$tags" },
      {
        $group: {
          _id: "$tags",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          count: "$count",
        },
      },
    ]).sort({ count: -1 });

    const all = {
      name: "All",
      count: await Foodmodel.countDocuments(),
    };
    tags.unshift(all);

    res.send(tags);
  })
);

// ✅ Search Foods by Name
router.get(
  "/search/:searchTerm",
  handler(async (req, res) => {
    const { searchTerm } = req.params;
    const foods = await Foodmodel.find({
      name: { $regex: searchTerm, $options: "i" },
    });

    res.send(foods);
  })
);

// ✅ Get Foods by Tag
router.get(
  "/tag/:tag",
  handler(async (req, res) => {
    const { tag } = req.params;
    const foods = await Foodmodel.find({ tags: tag });

    res.send(foods);
  })
);

// ✅ Get Food by ID
router.get(
  "/:foodId",
  handler(async (req, res) => {
    const { foodId } = req.params;
    const food = await Foodmodel.findById(foodId);

    if (!food) {
      return res.status(404).send({ message: "Food not found" });
    }

    res.send(food);
  })
);

export default router;
