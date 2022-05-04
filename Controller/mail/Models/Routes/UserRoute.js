const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../Models/User');
const Controller = require('../Controller/UserController');

const {SignUp} = require('../Controller/UserController')
const {login} = require('../Controller/UserController')
const {update} = require('../Controller/UserController')
const {list} = require('../Controller/UserController')
const {findOtp} = require('../Controller/UserController')
const {checkOtp} = require('../Controller/UserController')

const auth = require("../TokenManager/token")
const {profile} = require('../Controller/UserController')

const {deleteall} = require('../Controller/UserController')
const router = express.Router();


router.post('/user/SignUp',SignUp);
router.post('/user/login',login,);
router.post('/user/find',auth,findOtp);
router.post('/user/checkOtp',checkOtp);

router.put('/user/update',update);
router.get('/user/list',list);

router.delete('/user/delete',deleteall)


module.exports = router

