const findLocation = function(req, res, next) {  
    var limit = req.query.limit || 10;

    // get the max distance or set it to 8 kilometers
    var maxDistance = req.query.distance || 8;

    // we need to convert the distance to radians
    // the raduis of Earth is approximately 6371 kilometers
    maxDistance /= 6371;
    console.log(maxDistance,"...........")
    // get coordinates [ <longitude> , <latitude> ]
    var coords = [];
    coords[0] = req.query.longitude;
    coords[1] = req.query.latitude;

    // find a location
    Location.find({
      loc: {
        $near: coords,
        $maxDistance: maxDistance
      }
    }).limit(limit).exec(function(err, locations) {
      if (err) {
        return res.json(500, err);
      }

      res.json(200, locations);
    });
}

const Location = function(req, res,error, next) {  
    var limit = req.query.limit || 10;
  
    // get the max distance or set it to 8 kilometers
    var maxDistance = req.query.distance || 8;
  
    // we need to convert the distance to radians
    // the raduis of Earth is approximately 6371 kilometers
    maxDistance /= 6371;
    console.log(maxDistance,"...........")
    // get coordinates [ <longitude> , <latitude> ]
    //var coords = [];
    const {longitude , latitude} = req.query
    let location = {
    longitude,
    latitude
    }
  
    console.log(location)
  
    // find a location
    const data = resturantData.find({
      loc: {
        $near: req.query,
        $maxDistance: maxDistance
      }
    })
    console.log(data)
    if(data){
      return res.status(200).send({"message":"location",result:data})
    }else{
      return res.status(400).send({error:error})
    }
  }

// var coords = [];
//     coords[0] = 233.876;
//     coords[1] = 87.765;
     
// const km = 1;

// var maxDistance = km / 8;
// console.log(maxDistance)

// var locQuery = (coords, distance) => {
//     return { loc: { $near: { $geometry: { type: "Point", coordinates: coords }, $maxDistance: parseInt(distance)}}}
// }
// console.log(locQuery(),".....................")
