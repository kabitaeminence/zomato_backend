const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../Models/User');
const Controller = require('../Controller/UserController');

const {add} = require('../Controller/UserAddress')

const router = express.Router();


router.post('/address/add',add);


module.exports = router

