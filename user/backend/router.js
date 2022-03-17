// const cookieParser = require("cookie-parser");
const controllers = require("./controllers");
const middleweare = require("./middleweare");

module.exports = (app) => {
  app.post("/registration", controllers.registration);
  app.post("/login", controllers.login.login);
  
  app.post('/hotels', controllers.hotels.getHotels);
  app.post('/hotel', controllers.hotels.getHotel);
  app.post('/same-hotels', controllers.hotels.getSameHotels);
  app.post('/sanatories', controllers.sanatories.getSanatories);
  app.post('/get-user-history-objects', controllers.hotels.getUserHistoryHotels);

  app.post('/hotel-tours', controllers.tours.getHotelTours);
  app.post('/route-tours', controllers.tours.getRouteTours);
  
  app.get('/prices', controllers.prices);
};

