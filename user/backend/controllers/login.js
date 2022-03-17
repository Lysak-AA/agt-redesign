const bcrypt = require('bcrypt');
const db = require("../database/database");
const jwt = require("./jwt");
const select = require("../sql/select");

const login = async function (req, res) {
  if(req.body.person === 'massagist'){
    const massagist = await db
      .query(select.selectItemByOneValue('massagists', 'phone', req.body.phone))
      .catch((err) => res.send(err));
      if(massagist.length > 0){
        if(massagist[0].isBanned){
          res.send('Ваш аккаунт заблокирован')
        } else {
          const isPasswordValid = await bcrypt.compare(req.body.password, massagist[0].password);
    
          if (isPasswordValid) {
            const token = jwt.jwtSignUser({
              id: massagist[0].id,
              name: massagist[0].username,
              phone: massagist[0].phone,
              city: massagist[0].city,
              status: massagist[0].status,
            });

            massagist[0].password = 'fuckHackers'

    const massagistPhotos = await db.query(select.selectItemByOneValue('massagists_photos', 'massagist_id', massagist[0].id))
                            .catch(err => console.log(err));

    const massagistFinance = await db.query(select.selectItemByOneValue('massagists_balances', 'massagist_id', massagist[0].id)).catch(err => console.log(err));

            res.send({ 
              user: massagist[0],
              token: token,
              status: massagist[0].status,
              photos: massagistPhotos,
              finance: massagistFinance[0]
            });
  
          } else {
            res.send("Некорректный пароль");
          }
        }
      } else {
        res.send('Такого аккаунта не существует')
      }
  }
  if(req.body.person === 'saloon'){
    const saloon = await db
      .query(select.selectItemByOneValue('saloons', 'phone', req.body.phone))
      .catch((err) => res.send(err));
      if(saloon.length > 0){
        if(saloon[0].isBanned){
          res.send('Ваш аккаунт заблокирован')
        } else {
          const isPasswordValid = await bcrypt.compare(req.body.password, saloon[0].password);
    
          if (isPasswordValid) {
            const token = jwt.jwtSignUser({
              id: saloon[0].id,
              name: saloon[0].username,
              phone: saloon[0].phone,
              city: saloon[0].city,
              sex: saloon[0].sex,
              status: saloon[0].status,
            });
            res.send({ user: {
              id: saloon[0].id,
              name: saloon[0].username,
              phone: saloon[0].phone,
              city: saloon[0].city,
              sex: saloon[0].sex,
            }, token: token, status: saloon[0].status });
  
          } else {
            res.send("Некорректный пароль");
          }
        }
      } else {
        res.send('Такого аккаунта не существует')
      }
  }
  if(req.body.person === 'client'){
    const client = await db
      .query(select.selectItemByOneValue('clients', 'phone', req.body.phone))
      .catch((err) => res.send(err));
      if(client.length > 0){
        if(client[0].isBanned){
          res.send('Ваш аккаунт заблокирован')
        } else {
          const isPasswordValid = await bcrypt.compare(req.body.password, client[0].password);
    
          if (isPasswordValid) {
            const token = jwt.jwtSignUser({
              id: client[0].id,
              name: client[0].username,
              phone: client[0].phone,
              city: client[0].city,
              sex: client[0].sex,
              status: client[0].status,
            });
            res.send({ user: {
              id: client[0].id,
              name: client[0].username,
              phone: client[0].phone,
              city: client[0].city,
              sex: client[0].sex,
            }, token: token, status: client[0].status });
  
          } else {
            res.send("Некорректный пароль");
          }
        }
      } else {
        res.send('Такого аккаунта не существует')
      }
  } 
};

const isUserLoggedIn = function(req){
  if(req.headers.session_id){
    return true;
  } else {
    return false;
  }
}

// const isUserAgentInDatabase = async function(req){
//   let userAgent = 
// }

module.exports = { login, isUserLoggedIn };
