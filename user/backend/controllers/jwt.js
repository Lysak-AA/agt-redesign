const jwt = require("jsonwebtoken");
const config = require("../config/config");

function jwtSignUser(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK,
  });
}

function verifyAdmin(token) {
  return jwt.verify(token, config.authentication.jwtSecret);
}

function verifyMassagist(token) {
  const verified = jwt.verify(token, config.authentication.jwtSecret, (err, data) => {
   if(err){
     return err
   } else return data;
  })
  return verified;
}

module.exports = { jwtSignUser, verifyAdmin, verifyMassagist };
