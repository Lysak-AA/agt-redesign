const userAgents = {
    name: "user_agents",
    fields: [
        {
            name: "id",
            type: "INT",
            specialCondition: "AUTO_INCREMENT",
        },
        {
            name: "agent",
            type: "VARCHAR(1000)"
        },
    ],
    primary: "id",
    unique: "agent"
}

module.exports = userAgents;