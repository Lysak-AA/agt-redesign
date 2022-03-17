const hotels = {
  name: "hotels",
  fields: [
    {
      name: "id",
      type: "INT",
      specialCondition: "AUTO_INCREMENT",
    },
    {
      name: "multitur_id",
      type: "INT"
    },
    {
      name: "name",
      type: "VARCHAR(100)",
    },
    {
      name: "type",
      type: "VARCHAR(1000)",
    },
    {
      name: "address",
      type: "VARCHAR(1000)"
    },
    {
      name: "url",
      type: "VARCHAR(100)",
    },
    {
      name: "region_id",
      type: "INT",
    },
    {
      name: "resort_id",
      type: "INT",
    },
    {
      name: "city_id",
      type: "INT",
    },
    {
      name: "lat",
      type: "VARCHAR(100)",
    },
    {
      name: "lng",
      type: "VARCHAR(100)",
    },
  ],
  primary: "id",
  unique: "multitur_id",
};

module.exports = hotels;
