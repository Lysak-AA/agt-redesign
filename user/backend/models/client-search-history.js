const clientSearchHistory = {
    name: "client_search_history",
    fields: [
        {
            name: "id",
            type: "INT",
            specialCondition: "AUTO_INCREMENT",
        },
        {
            name: "user_id",
            type: "INT"
        },
        {
            name: "object_id",
            type: "INT"
        },
        {
            name: "object_type",
            type: "VARCHAR(100)"
        }
    ],
    primary: "id",
    foreign: {
        key: "user_id",
        references: "users(id)"
    }
}

module.exports = clientSearchHistory;