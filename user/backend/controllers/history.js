const db = require('../database/database');
const insert = require('../sql/insert/index');

const setUserObjectSearchHistory = async function(req, objectType){
    let userAgent = await db.query(`SELECT * FROM user_agents WHERE agent='${req.headers['user-agent']}'`)
                                .then(response => response)
                                .catch(err => console.log(err));
    let historyRow;
        if(userAgent.length < 1){
            userAgent = await db.query(insert.insertOneRow('user_agents', { agent: req.headers['user-agent']}))
                                .then(response => response)
                                .catch(err => console.log(err));
            historyRow = await db.query(insert.insertOneRow('user_search_history', {
                agent_id: userAgent.insertId,
                object_id: req.body.hotel_id,
                object_type: objectType
            }))
            .then(response => response)
            .catch(err => console.log(err));

        } else {
            let isSameRowExists = await db.query(`SELECT * FROM user_search_history WHERE agent_id=${userAgent[0].id} AND object_id=${req.body.hotel_id}`)
                                        .then(response => response)
                                        .catch(err => console.log(err))
            if(isSameRowExists.length > 0){
                return;
            } else {
                historyRow = await db.query(insert.insertOneRow('user_search_history', {
                    agent_id: userAgent[0].id,
                    object_id: req.body.hotel_id,
                    object_type: objectType
                }))
                .then(response => response)
                .catch(err => console.log(err));
            }
        }
}

const getUserHistory = async function(req){
    let agetnId = await db.query(`SELECT * FROM user_agents WHERE agent='${req.headers['user-agent']}'`)
                    .then(response => response)
                    .catch(err => console.log(err));
    if(agetnId.length > 0){
        let objects = await db.query(`SELECT * FROM user_search_history WHERE agent_id=${agetnId[0].id}`)
                            .then(res => res)
                            .catch(err => err);
        return objects;
    } else {
        return false;
    }
}

module.exports = { setUserObjectSearchHistory, getUserHistory };