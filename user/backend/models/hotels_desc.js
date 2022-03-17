const hotelsDesc = {
  name: "hotels_desc",
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
      name: "level",
      type: "VARCHAR(100)"
    },
    {
      name: "conference_hall",
      type: "VARCHAR(100)"
    },
    {
      name: "place",
      type: "VARCHAR(1000)"
    },
    {
      name: "placing",
      type: "VARCHAR(1000)"
    },
    {
      name: "children",
      type: "VARCHAR(100)"
    },
    {
      name: "menu",
      type: "VARCHAR(1000)"
    },
    {
      name: "services",
      type: "VARCHAR(1000)"
    },
    {
      name: "sport",
      type: "VARCHAR(1000)"
    },
    {
      name: "beach",
      type: "VARCHAR(1000)"
    },
    {
      name: "far_from_sea",
      type: "VARCHAR(1000)"
    },
    {
      name: "specials",
      type: "VARCHAR(1000)"
    },
    {
      name: "docs",
      type: "VARCHAR(1000)"
    },
    {
      name: "outcome_time",
      type: "VARCHAR(100)"
    },
    {
      name: "price_includes",
      type: "VARCHAR(1000)",
    },
    {
      name: "transfer",
      type: "VARCHAR(1000)"
    },
    {
      name: "beach_type",
      type: "VARCHAR(100)"
    },
    {
      name: "parking",
      type: "VARCHAR(100)"
    },
    {
      name: "conditioner",
      type: "VARCHAR(100)"
    },
    {
      name: "getting_water",
      type: "VARCHAR(1000)"
    },
    {
      name: "one_person_placing",
      type: "VARCHAR(100)"
    },
    {
      name: "free_wifi",
      type: "VARCHAR(100)"
    },
    {
      name: "free_services",
      type: "VARCHAR(1000)"
    },
    {
      name: "room_amount",
      type: "VARCHAR(100)"
    },
    {
      name: "year",
      type: "VARCHAR(100)"
    },
    {
      name: "period",
      type: "VARCHAR(100)"
    },
    {
      name: "rooms",
      type: "VARCHAR(1000)"
    },
    {
      name: "menu_secondary",
      type: "VARCHAR(1000)"
    },
    {
      name: "congress",
      type: "VARCHAR(1000)"
    },
    {
      name: "special_conditions",
      type: "VARCHAR(1000)"
    },
    {
      name: "info",
      type: "VARCHAR(1000)"
    },
    {
      name: "opened_pool",
      type: "VARCHAR(100)"
    },
    {
      name: "banket_hall",
      type: "VARCHAR(100)"
    },
    {
      name: "for_children",
      type: "VARCHAR(1000)"
    },
    {
      name: "cildren_room",
      type: "VARCHAR(1000)"
    },
    {
      name: "animation",
      type: "VARCHAR(100)"
    },
    {
      name: "buffet",
      type: "VARCHAR(100)"
    },
    {
      name: "room_kitchen",
      type: "VARCHAR(100)"
    },
    {
      name: "reconstruction_year",
      type: "VARCHAR(100)"
    },
    {
      name: "area",
      type: "VARCHAR(100)"
    },
    {
      name: "all_inclusive",
      type: "VARCHAR(100)"
    },
    {
      name: "all_inclusive_services",
      type: "VARCHAR(1000)"
    },
    {
      name: "family_rest",
      type: "VARCHAR(100)"
    },
    {
      name: "fitness_center",
      type: "VARCHAR(100)"
    },
    {
      name: "stars",
      type: "VARCHAR(100)"
    },
    {
      name: "year_of_open",
      type: "VARCHAR(100)"
    },
    {
      name: "animals",
      type: "VARCHAR(100)"
    },
    {
      name: "restaurant",
      type: "VARCHAR(100)"
    },
    {
      name: "sauna",
      type: "VARCHAR(100)"
    },
    {
      name: "billiard",
      type: "VARCHAR(100)"
    },
    {
      name: "closed_pool",
      type: "VARCHAR(100)"
    },
    {
      name: "spa_center",
      type: "VARCHAR(100)"
    },
    {
      name: "child_min",
      type: "VARCHAR(100)"
    },
    {
      name: "new",
      type: "VARCHAR(100)"
    },
    {
      name: "hotel_specials",
      type: "VARCHAR(1000)"
    },
    {
      name: "bar",
      type: "VARCHAR(100)"
    },
    {
      name: "attention",
      type: "VARCHAR(1000)"
    },
    {
      name: "children_healing_from",
      type: "VARCHAR(100)"
    },
    {
      name: "children_healing",
      type: "VARCHAR(100)"
    },
    {
      name: "healing_base",
      type: "VARCHAR(1000)"
    },
    {
      name: "healing_programms",
      type: "VARCHAR"
    },
    {
      name: "important_info",
      type: "VARCHAR(1000)"
    },
    {
      name: "without_menu",
      type: "VARCHAR(100)"
    },
    {
      name: "breakfast",
      type: "VARCHAR(100)"
    },
    {
      name: "children_bads",
      type: "VARCHAR(100)"
    },
    {
      name: "bathhouse",
      type: "VARCHAR(100)"
    },
    {
      name: "turkish_bath",
      type: "VARCHAR(100)"
    },
    {
      name: "laundry",
      type: "VARCHAR(100)"
    },
    {
      name: "hamam",
      type: "VARCHAR(100)"
    },
    {
      name: "caffee",
      type: "VARCHAR(100)"
    },
    {
      name: "healing_profile",
      type: "VARCHAR(1000)"
    },
    {
      name: "water",
      type: "VARCHAR(100)"
    }
    
  ],
  primary: "id",
  foreign: {
    key: "hotel_id",
    references: "hotels(multitur_id)"
}
};

module.exports = hotelsDesc;
