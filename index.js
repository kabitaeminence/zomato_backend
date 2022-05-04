const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multer = require('multer')
var fs = require('fs')
var path = require('path')

const cron = require('node-cron');

// cron.schedule('* * * * *', () => {
//   console.log('running a task every minute');
// });

const cors = require('cors');
var app = express();
const Routes = require('./Routes/UserRoute')
const Route1 = require('./Routes/UserAddressRoute')
const resturant_Routes = require("./Routes/ResturantRoutes");

const food_routes = require("./Routes/FoodItemRoutes");

const Router = express.Router();
mongoose.connect('mongodb://localhost:27017/zomato');
mongoose.Promise = global.Promise;
app.use(cors())
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.use('/',Routes);
app.use('/',Route1);

app.use("/resturant", resturant_Routes);
app.use("/fooditem", food_routes);

cron.schedule("0 0 29 * *", () => {
  if (date.getToday() ===  "1") {
    // that's the last day
   doSomeTasks()
  } 
});

app.use((req,res,next) => { 
  next()
});
    
app.listen(process.env.port || 5000,function() {
console.log('welcome!')
})
