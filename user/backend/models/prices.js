const prices = {
    name: "prices",
    fields: [
      {
        name: "id",
        type: "INT",
        specialCondition: "AUTO_INCREMENT",
      },
      {
        name: "hotel_id",
        type: "INT"
      },
      {
        name: "min_price",
        type: "VARCHAR(100)",
      },
    ],
    primary: "id",
    unique: "hotel_id",
  };
  
  module.exports = prices;