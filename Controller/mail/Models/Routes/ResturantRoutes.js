const controller = require("../Controller/Resturant");

const express = require("express");

const router = express.Router();
router.get("/findLocation",controller.findLocation)

router.get("/", controller.get);

router.post("/", controller.create);
router.patch("/:id", controller.patch);
router.delete("/:id", controller.remove);

module.exports = router;
