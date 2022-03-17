const fs = require('fs');
const db = require("../database/database");


module.exports = {
    async getSanatories(req, res){
        let sanatories = fs.readFileSync('./data/hotels.json', (err, data) => {
            if (err) throw err;
            
            return data;
        });

        sanatories = JSON.parse(sanatories);

        let sanatoriesToSend = [];
        
        sanatories.response.forEach(sanatory => {
            if(sanatory.type){
                if(sanatory.type === "Санаторий" || sanatory.type === "Пансионат" || sanatory.type === "СКК"){
                    sanatoriesToSend.push(sanatory)
                } else {
                    return;
                }
            }
        });

        let prices = await db.query(`SELECT * FROM prices WHERE min_price > 0`).then(response => response).catch(err => console.log(err));
        
        sanatoriesToSend.forEach(sanatory => {
            sanatory.minprice = null;
            prices.forEach(price => {
                if(sanatory.id === price.hotel_id){
                    sanatory.minprice = price.min_price;
                }
            })
        })

        res.send(sanatoriesToSend);

    }
} 
        




              
    
