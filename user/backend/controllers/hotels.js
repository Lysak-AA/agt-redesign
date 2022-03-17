const fs = require('fs');
const db = require("../database/database");
const insert = require("../sql/insert/index");
const { isUserLoggedIn } = require('./login');
const { setUserObjectSearchHistory, getUserHistory } = require('./history');


module.exports = {
    async getHotels(req, res){
        let hotels = fs.readFileSync('./data/hotels.json', (err, data) => {
            if (err) throw err;
            
            return data;
        });

        hotels = JSON.parse(hotels);

        let hotelsToSend = [];
        
        hotels.response.forEach(hotel => {
            if(hotel.type){
                if(hotel.type === "Санаторий" || hotel.type === "Пансионат" || hotel.type === "СКК"){
                    return;
                } else {
                    hotelsToSend.push(hotel)
                }
            } else {
                hotelsToSend.push(hotel)
            }
        });

        let prices = await db.query(`SELECT * FROM prices WHERE min_price > 0`).then(response => response).catch(err => console.log(err));
        
        hotelsToSend.forEach(hotel => {
            hotel.minprice = null;
            prices.forEach(price => {
                if(hotel.id === price.hotel_id){
                    hotel.minprice = price.min_price;
                }
            })
        })

        res.send(hotelsToSend);

    },
    async getHotel(req, res){
        if(!isUserLoggedIn(req)){
            await setUserObjectSearchHistory(req, 'hotel');
        } else {
            console.log('user logged in')
        }
        

        const hotelID = req.body.hotel_id;
        let hotels = fs.readFileSync('./data/hotels.json', (err, data) => {
            if (err) throw err;
            
            return data;
        });

        hotels = JSON.parse(hotels);
        
        let hotel = hotels.response.filter(hotel => hotel.id === hotelID);

        res.send(hotel[0]);

    },
    async getSameHotels(req, res){
        if(req.body.option === 'stars'){
            let hotels = fs.readFileSync('./data/hotels.json', (err, data) => {
                if (err) throw err;
                
                return data;
            });

            hotels = JSON.parse(hotels);

            let sameHotels = hotels.response.filter(hotel => +hotel.desc["Звёздность"] === +req.body.hotel_stars && hotel.type != "Санаторий" && hotel.type != "Пансионат" && hotel.type != "СКК")
           res.send(sameHotels);
        }
    },
    async getUserHistoryHotels(req, res){
        let userObjects = await getUserHistory(req);
        if(userObjects){
            let objects = fs.readFileSync('./data/hotels.json', (err, data) => {
                if (err) throw err;
                
                return data;
            });
            objects = JSON.parse(objects);
            let objectsToSend = [];
            objects.response.forEach(obj => {
                userObjects.forEach(userObj => {
                    if(userObj.object_id === obj.id){
                        objectsToSend.push(obj);
                    }
                });
            });

            res.send(objectsToSend);
        } else {
            res.send({ err: 'no any objects '})
        }
    }
} 
        




              
    
