const express = require("express");
const cookieParser = require('cookie-parser');
const app = express();
const config = require("./config/config");
const cors = require("cors");
const db = require("./database/database");
const insert = require('./sql/insert');
const fs = require("fs");

app.use(cookieParser());
app.use(cors());
app.use(express.json())
require("./router")(app);

app.listen(config.port, () =>
  console.log(`Server is running on port ${config.port}`)
);


// db.dropDatabase(config.db.database);

// db.initDatabase(config.db.database);

// const saveImages = async function(){
//   // let hotelsFromDatabase = await db.query('SELECT * FROM hotels').then(res => res).catch(err => console.log(err));

//   let hotelsFromJSON = fs.readFileSync('./data/hotels.json', (err, data) => {
//     if(err) throw err;

//     return data;
//   });

//   hotelsFromJSON = JSON.parse(hotelsFromJSON);

//   hotelsFromJSON = hotelsFromJSON.response;

//   for(hotel of hotelsFromJSON){
//     if(hotel.rooms.length > 0){
//       for(room of hotel.rooms){
//         await db.query(insert.insertOneRow('hotels_rooms', {
//           hotel_id: hotel.id,
//           name: room.name,
//           area: room.area,
//           places_main: room.places_main,
//           places_extra: room.places_extra,
//           places_inf: room.places_inf,
//           furniture: room.in_room,
//           description: room.description || ""
//         })).then(res => console.log('room added')).catch(err => console.log(err))
//       };
//       console.log('end')
//     }
//   }
  


// }


// saveImages();





