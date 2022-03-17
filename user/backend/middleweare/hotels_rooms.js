const hotelsRooms = {
  name: "hotels_rooms",
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
      name: "name",
      type: "VARCHAR(100)",
    },
    {
      name: "area",
      type: "VARCHAR(100)",
    },
    {
      name: "places_main",
      type: "VARCHAR(100)",
    },
    {
      name: "places_extra",
      type: "VARCHAR(100)",
    },
    {
      name: "places_inf",
      type: "VARCHAR(100)",
    },
    {
      name: "furniture",
      type: "VARCHAR(1000)",
    },
    {
      name: "description",
      type: "VARCHAR(1000)",
    },
  ],
  primary: "id",
  foreign: {
    key: "hotel_id",
    references: "hotels(multitur_id)"
}
};

module.exports = hotelsRooms;
