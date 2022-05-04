const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FoodItem = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  userAddressId: { type: Schema.Types.ObjectId, ref: "UserAddress" },

  resturantId: { type: Schema.Types.ObjectId, ref: "resturants" },

  foodName: { type: String },
  type: { type: String, enum: ["veg", "non-veg"] },
  price: { type: Number },
  Image: { type: String },
  createdAt: { type: Date, default: Date.now() },
  updateAt: { type: Date, default: Date.now() },
});
const FoodItems = mongoose.model("FoodItem", FoodItem);
module.exports = FoodItems;
