const controller_food = require("../Controller/FoodItem");
const checkStatus = require("../TokenManager/auth");
const express = require("express");
const path = require('path');
const fs = require('fs');
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './Uploads')
      console.log("uplode any image")
    },
    filename: function (req, file, cb) {
        const filename = file.originalname.toLocaleLowerCase().split(" ").join("-") 
      cb(null, filename)
    }
  });
  var upload = multer({ storage: storage,

    fileFilter: (req, file, cb) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png|webp)$/)) {
        return cb(new Error("Please upload an Image!!"));
      }
      cb(undefined, true);
  
    },
  });

const router = express.Router();

router.get("/populateData", controller_food.getPopulate);
router.get("/", controller_food.get);
router.get("/list", controller_food.list);


router.post("/",upload.single('Image'), controller_food.create);
router.patch("/:id", controller_food.patch);
router.delete("/:id", controller_food.remove);

module.exports = router;
