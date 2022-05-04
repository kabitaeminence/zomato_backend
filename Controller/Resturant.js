const resturantData = require("../Models/Resturant");

const create = async (req, res, error) => {
  try {
    const { resturantName, resturant_mobile_No, discount, email, address, open_time, close_time, latitude, longitude }
      = req.body;
    let resturant = {
      resturantName,
      resturant_mobile_No,
      discount,
      email,
      address,
      open_time,
      close_time,
      currentLocation: [latitude, longitude]
    }

    const data = await resturantData.create(resturant);
    console.log(data);
    if (data) {
      return res.status(201).json({ message: "Created success", data: data });
    } else {
      return res.send({ error: error });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: "something went wrong", error: error });
  }
};
const get = async (req, res) => {
  try {
    const data = await resturantData.find();
    return res.status(200).json({ message: "status ok", data: data });
  } catch (error) {
    console.log(error);
  }
};

const patch = async (req, res) => {
  try {
    const _id = req.params.id;
    const data = await resturantData.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    return res.status(200).json({ message: "success", data: data });
  } catch (e) {
    return res.status(400).json({ message: "Bad Request", e: e });
  }
};

const remove = async (req, res) => {
  try {
    const _id = req.params.id;
    const data = await resturantData.deleteOne({ _id });
    return res.status(200).json({ message: "success", data: data });
  } catch (err) {
    return res.status(500).json({ message: "Bad Request", err: err });
  }
};

const findLocation = async (req, res, error) => {
  console.log("akakakak")

  //var maxDistance = req.query.distance || 8;
  //console.log(maxDistance,"............")

  // maxDistance /= 6371;
  // console.log(maxDistance,"...........")
  //const { longitude, latitude, maxDistance } = req.query;

  // var coords = [];
  const latitude = parseFloat(req.query.latitude);
  const longitude = parseFloat(req.query.longitude);

  console.log(longitude, "++++++++++++++")

  
  const data = await resturantData.
    // aggregate([{
    //   "$geoNear": {
    //     "near": {
    //       "type": "Point",
    //       "currentLocation": [latitude, longitude]
    //     },
    //     "spherical": true,
    //     "maxDistance": 10 * 1609,
    //     "distanceField": "distance"
    //   }
    // }])
  //   aggregate([
  //     { "$geoNear": {
  //         "near": { 
  //             "type": "Point", 
  //             "coordinates": [ latitude , longitude]
  //         },
  //         "distanceField": "dist.calculated",
  //         "maxDistance": 2,
  //         "includeLocs": "dist.location",
  //         "num": 5,
  //         "spherical": true
  //     }}
  // ])
  aggregate([
    {$geoNear: {
        near: {type: 'Point',coordinates: [latitude,longitude]},
        distanceField: 'd',
        key: 'coordinates'}}
    ])
  

  //   $geoNear: {
  //     near: { type: 'Point', currentLocation: [latitude, longitude] },
  //     spherical: true, distanceField: 'distance', maxDistance: 7000,
  //       }
  // }

  //     ])
  // aggregate ([{
  //   currentLocation: {
  //   $near: {
  //   $geometry: {
  //   // type: "Point" ,
  //   coordinates: [latitude,longitude ]
  //   },
  //   $maxDistance: 4,
  //   $minDistance: 0
  //   }
  //   }
  // }])
  if (data) {
    return res.status(200).send({ "message": "location", result: data })
  } else {
    return res.status(400).send({ error: error })
  }
}

module.exports = { create, get, patch, remove, findLocation };
