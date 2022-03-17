const db = require("../database/database");
const insert = require('../sql/insert');
const services = require('../services');
const config = require('../config/config');
const axios = require('axios');
const fs = require('fs');

const getCurrentPrices = async function (req, res){
        let period = services.dateFormat(true, 14);
        let request = {
            header:{
                token: config.multiturToken,
                method: "Hotel.Offers"
            },
            request: {
                    region_id: config.region_id,
                    date_begin: period.checkInDate,
                    date_end: period.checkOutDate,
                    adult: 2,
                }
        }
    
        let prices = await axios.post(config.multiturAPI, JSON.stringify(request))
                            .then(response => response.data.response)
                            .catch(err => console.log(err))

        const hotels = await db.query('SELECT * FROM prices').then(response => response).catch(err => console.log(err));


        hotels.forEach(hotel => {
            hotel.prices = [];
            prices.forEach(price => {
                if(price.hotel_id === hotel.hotel_id){
                    hotel.prices.push(price.price);
                }
            })
        });

        hotels.forEach(hotel => {
            hotel.minprice = 0;
            let minprice = 2000000;
            hotel.prices.forEach(price => {
                if(price < minprice){
                    minprice = price;
                }
            })
            hotel.minprice = Math.round(minprice / 14);
            if(hotel.minprice > 100000){
                hotel.minprice = 0;
            }
        });


        for(hotel of hotels){
            await db.query(`UPDATE prices SET min_price='${hotel.minprice}' WHERE hotel_id='${hotel.hotel_id}'`)
        }

        res.send('ok')
}

// const getCurrentPrices = async function(req, res){
//     let hotels = fs.readFileSync('./data/hotels.json', (err, data) => {
//         if(err) throw err;

//         data = JSON.parse(data);

//         return data;

//     });

//     hotels = JSON.parse(hotels)

//     for(hotel of hotels.response){
//         await db.query(insert.insertOneRow('prices', {
//             hotel_id: hotel.id,
//             min_price: 0
//         }))
//         console.log(hotel.id)
//     }

//     res.send('ok')
// }


module.exports = getCurrentPrices;