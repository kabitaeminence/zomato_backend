const jwt = require("jsonwebtoken");

function checkStatus(req, res, next) {
  const authHeader = req.headers["authorization"];
  console.log(authHeader);

  if (!authHeader)
    return res.status(400).send({
      error: "Authorization Required",
      message: "Failed to authenticate token.",
    });

  jwt.verify(
    authHeader,
    "longer-secret-key-is-better",
    function (err, decoded) {
      console.log(decoded, "ooooooooooooooooooooooooo");
      if (err)
        return res
          .status(401)
          .send({ error: err, message: "Failed to authenticate token." });

      req.user = decoded.checkPhone;
      if (decoded.checkPhone.role == 2) {
        next();
      } else {
        return res.status(404).send({ message: "Invalid user token" });
      }
    }
  );
}
module.exports = checkStatus;
