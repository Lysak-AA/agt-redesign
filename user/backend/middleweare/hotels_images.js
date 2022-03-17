const hotelsImages = {
  name: "hotels_images",
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
      name: "url",
      type: "VARCHAR(1000)",
    },
  ],
  primary: "id",
  unique: "url",
  foreign: {
    key: "hotel_id",
    references: "hotels(multitur_id)"
}
};

module.exports = hotelsImages;
