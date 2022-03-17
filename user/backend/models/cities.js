const cities = {
    name: "cities",
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
            name: "region_id",
            type: "INT"
        },
        {
            name: "name",
            type: "VARCHAR(100)"
        },
    ],
    primary: "id",
    unique: "name",
    foreign: {
        key: "region_id",
        references: "regions(id)"
    }
}

module.exports = cities;