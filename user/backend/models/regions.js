const regions = {
    name: "regions",
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
            type: "VARCHAR(100)"
        },
    ],
    primary: "id",
    unique: "name"
}

module.exports = regions;