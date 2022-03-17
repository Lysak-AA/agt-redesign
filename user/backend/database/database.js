const config = require("../config/config");
const mysql = require("mysql");
const sql = require("../sql/sqlQueries");
const models = require("../models");
const createTable = require("../sql/tables/createTable");

module.exports = {
  _initialSession() {
    return mysql.createPool({
      port: config.db.port,
      host: config.db.host,
      user: config.db.user,
      password: config.db.password,
      connectionLimit: 10,
    });
  },
  _session() {
    return mysql.createPool({
      port: config.db.port,
      host: config.db.host,
      user: config.db.user,
      password: config.db.password,
      database: config.db.database,
      connectionLimit: 100,
    });
  },
  _createDatabase(name) {
    return new Promise((resolve, reject) => {
      this._initialSession().query(
        sql.createDatabase(name),
        (error, results, fields) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });
  },
  _createTable(sql) {
    return new Promise((resolve, reject) => {
      this._session().query(sql, (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },
  async initDatabase(name) {
    await this._createDatabase(name).then(() =>
      console.log("База данных успешно создана...")
    );

    for (key in models) {
      await this._createTable(
        createTable(
          models[key].name,
          models[key].fields,
          models[key].primary,
          models[key].unique,
          models[key].foreign
        )
      ).then(() =>
        console.log(`Таблица ${models[key].name} успешно создана...`)
      );
    }
    console.log("База данных готова к работе.");
  },
  dropDatabase(name) {
    return new Promise((resolve, reject) => {
      this._session().query(
        sql.dropDatabase(name),
        (error, results, fields) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });
  },
  query(sql) {
    return new Promise((resolve, reject) => {
     const pool = this._session()
     pool.query(sql, (error, results, fields) => {
        if (error) {
          reject(error);
          pool.end();
        } else {
          resolve(results);
          pool.end();
        }
      });    
    });
  },
  forMultipleQueries(sql) {
    return new Promise((resolve, reject) => {
      let pool = this._session();
      pool.getConnection();
      pool.query(sql, (err, results, fields) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
      pool.end();
    });
  },
};
