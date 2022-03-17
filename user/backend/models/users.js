const users = {
    name: "users",
    fields: [
        {
            name: "id",
            type: "INT",
            specialCondition: "AUTO_INCREMENT",
        },
        {
            name: "phone",
            type: "INT"
        },
        {
            name: "email",
            type: "VARCHAR(100)"
        },
        {
            name: "password",
            type: "VARCHAR(100)"
        }
    ],
    primary: "id",
    unique: "phone"
}

module.exports = users;