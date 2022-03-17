const userSearchHistory = {
    name: "user_search_history",
    fields: [
        {
            name: "id",
            type: "INT",
            specialCondition: "AUTO_INCREMENT",
        },
        {
            name: "agent_id",
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
        key: "agent_id",
        references: "user_agents(id)"
    }
}

module.exports = userSearchHistory;