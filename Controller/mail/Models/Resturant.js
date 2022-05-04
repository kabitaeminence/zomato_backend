const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

const resturant = new mongoose.Schema({
  resturantName: { type: String },

  resturant_mobile_No: { type: Number, require: true },

  discount: { type: Number },

  email: {
    type: String,
    unique: [true, "Email id already present"],
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new error("invalide Email");
      }
    },
  },

  address: { type: String },
  open_time: { type: String },
  close_time: { type: String },
  // latitude: { type: Number },
  // longtude: { type: Number },
  coordinates : {type:[Number],default:[0,0]},



  createdAt: { type: Date, default: Date.now() },
  updateAt: { type: Date, default: Date.now() },
});
resturant.index({coordinates: '2dsphere'});

const resturants = mongoose.model("resturants", resturant);
module.exports = resturants;
