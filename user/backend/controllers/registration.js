const bcrypt = require('bcrypt');
const config = require("../config/config");
const db = require("../database/database");
const fs = require('fs');
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const insert = require('../sql/insert');
const select = require("../sql/select");

function jwtSignUser(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK,
  });
}

const registration = async function (req, res) {
  const userHash = await bcrypt.hash(req.body.password, saltRounds).catch(err => console.log(err))

  if(req.body.person === 'massagist'){
    const massagist = {
      username: req.body.name,
      phone: req.body.phone,
      password: userHash,
      city: req.body.city,
      isBanned: 0,
      status: "massagist",
    };
    
    const newMassagist = await db
      .query(insert.insertOneRow('massagists', massagist))
      .then(() => {
        return db.query(select.selectItemByOneValue("massagists", 'phone', massagist.phone));
      })
      .catch((err) => res.send(err.code));

    await db.query(insert.insertOneRow('massagists_bets', {
      massagist_id: newMassagist[0].id,
      bet: 0
    }))  
    await db.query(insert.insertOneRow('massagists_balances', {
      massagist_id: newMassagist[0].id,
      balance: 0,
      bonus: 200
    }))  
    const token = jwtSignUser({
      id: newMassagist[0].id,
      username: newMassagist[0].username,
      phone: newMassagist[0].phone,
      city: newMassagist[0].city,
      status: newMassagist[0].status
  });

  fs.mkdir(config.massagistUploadPath + newMassagist[0].id, (err) => {
    if(err){
      console.log(err)
    }
  });

  newMassagist[0].password = 'fuckHackers';

  const massagistFinance = await db.query(select.selectItemByOneValue('massagists_balances', 'massagist_id', newMassagist[0].id)).catch(err => console.log(err));


  res.send({
    user: newMassagist[0],
    token: token,
    status: newMassagist[0].status,
    photos: [],
    finance: massagistFinance[0]
  });

  } else if(req.body.person === 'saloon'){
    const saloon = {
      username: req.body.name,
      phone: req.body.phone,
      password: userHash,
      city: req.body.city,
      isBanned: 0,
      status: "saloon",
      remember: 0
    };
    
    const newSaloon = await db
      .query(insert.insertOneRow('saloons', saloon))
      .then(() => {
        return db.query(select.selectItemByOneValue("saloons", 'phone', saloon.phone));
      })
      .catch((err) => res.send(err.code));

    const token = jwtSignUser({
      id: newSaloon[0].id,
      username: newSaloon[0].username,
      phone: newSaloon[0].phone,
      city: newSaloon[0].city,
      status: newSaloon[0].status
  });

  res.send({
    user: {
      id: newSaloon[0].id,
      name: newSaloon[0].username,
      phone: newSaloon[0].phone,
      city: newSaloon[0].city,      
    },
    token: token,
    status: newSaloon[0].status
  });

  } else if (req.body.person === 'client'){
    const client = {
      username: req.body.name,
      phone: req.body.phone,
      password: userHash,
      city: req.body.city,
      isBanned: 0,
      sex: "undefined",
      status: "client",
      remember: 0
    };
    
    const newClient = await db
      .query(insert.insertOneRow('clients', client))
      .then(() => {
        return db.query(select.selectItemByOneValue("clients", 'phone', client.phone));
      })
      .catch((err) => res.send(err.code));

    const token = jwtSignUser({
      id: newClient[0].id,
      username: newClient[0].username,
      phone: newClient[0].phone,
      city: newClient[0].city,
      sex: newClient[0].sex,
      status: newClient[0].status
  });

  res.send({
    user: {
      id: newClient[0].id,
      name: newClient[0].username,
      phone: newClient[0].phone,
      city: newClient[0].city,
      sex: newClient[0].sex,
    },
    token: token,
    status: newClient[0].status
  });
  }
};

module.exports = registration;
