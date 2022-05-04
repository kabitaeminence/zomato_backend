const foodData = require("../Models/FoodItem");
const multer = require('multer');
const path = require('path');

const create = async (req, res, error) => {

  try {
    let { resturantId, foodName, type, price, Image, userId, userAddressId } = req.body;
    const data = await foodData.create({...req.body,Image:req.file.path});
    
    console.log(data,"....................");
   // data.save();
    if (data) {
      return res.status(201).json({ message: "Created success", data: data })
    } else {
      return res.status(400).json({ error: error });
    }
  }
  catch (error) {
    return res.status(400).json({ message: "something went wrong", error: error });
  }
};

const get = async (req, res) => {
  try {
    const data = await foodData.find();
    console.log(data);
    return res.status(200).json({ message: "status okk", data: data });
  } catch (error) {
    return res.status(400).json({ message: "Bad Request", error: error });
  }
};

const getPopulate = async (req, res) => {
  try {
    const data = await foodData
      .find()
      .populate("userId")
      .populate("resturantId")
      .populate("userAddressId");
    console.log(data);
    return res.status(200).json({ message: "success", data: data });
  } catch (error) {
    return res.status(400).json({ message: "Bad Request", error: error });
  }
};

const patch = async (req, res) => {
  try {
    const _id = req.params.id;
    const data = await foodData.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    return res.status(200).json({ message: "success", data: data });
  } catch (e) {
    return res.status(500).json({ message: "somthing went wrong", e: e });
  }
};

const remove = async (req, res) => {
  try {
    const _id = req.params.id;
    const data = await foodData.deleteOne({ _id });
    return res.status(200).json({ message: "success", data: data });
  } catch (err) {
    return res.status(500).json({ message: "somthing went wrong", err: err });
  }
};

const list = async(req,res,error)=> {

  try{
    let criteria = {};

    let {id,foodName} = req.query

    if(id){
      criteria._id = id
    }

    if(foodName){
      criteria.foodName = {$regex : foodName}
    }
   
   const data = await foodData.find(criteria)

     if(data && data.length){

      res.send({message:'List',count: data.length,result:data})
    }
    else{
      res.send({message:"error",err:error})
    }

  }catch(error){
    res.send({message:"something went wrong",error:error})
  }
};

module.exports = {create,get,patch,remove,getPopulate,list};
