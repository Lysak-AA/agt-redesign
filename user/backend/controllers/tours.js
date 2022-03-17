const fs = require('fs');
const db = require("../database/database");
const config = require('../config/config');
const axios = require('axios');
const { isUserLoggedIn } = require('./login');
const { setUserObjectSearchHistory, getUserHistory } = require('./history');

module.exports = {
    async getHotelTours(req, res){
        let request = {
            header: {
                token: config.multiturToken,
                method: "Hotel.Offers"
            },
            request: {
                    hotel_id: req.body.hotel_id,
                    date_begin: req.body.date_begin,
                    date_end: req.body.date_end,
                    adult: +req.body.adult,
                    children: req.body.children,
                    meal_code: req.body.meal_code
                }
        }

        let tours = await axios.post(config.multiturAPI, JSON.stringify(request))
                        .then(response => response.data.response)
                        .catch(err => console.log(err));
        
        res.send(tours)
    },
    async getRouteTours(req, res){
        let request = {
            header: {
                token: config.multiturToken,
                method: "Hotel.Offers"
            },
            request: {
                date_begin: req.body.date_begin,
                date_end: req.body.date_end,
                adult: +req.body.adult,
                children: req.body.children,
                meal_code: req.body.meal_code,
                city_id: req.body.city_id,
                resort_id: req.body.resort_id,
                region_id: config.region_id
            }
        }

        let tours = await axios.post(config.multiturAPI, JSON.stringify(request))
        .then(response => response.data.response)
        .catch(err => console.log(err));

        let hotels = fs.readFileSync('./data/hotels.json', (err, data) => {
            if (err) throw err;
            
            return data;
        });

        hotels = JSON.parse(hotels);

        let hotelsToSend = [];
        
        hotels.response.forEach(hotel => {
            hotel.tours = [];
            tours.forEach(tour => {
                if(tour.hotel_id === hotel.id){
                    hotel.tours.push(tour);
                }
            });
            if(hotel.tours.length > 0){
                hotelsToSend.push(hotel);
            }
        })

        res.send(hotelsToSend);
    }
}