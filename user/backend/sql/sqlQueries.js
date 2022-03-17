module.exports = {
  createDatabase(dbName) {
    return `CREATE DATABASE IF NOT EXISTS ${dbName}`;
  },
  dropDatabase(dbName) {
    return `DROP DATABASE ${dbName}`;
  },
  createTableUsers() {
    return `CREATE TABLE IF NOT EXISTS users(
                    id INT AUTO_INCREMENT,
                    username VARCHAR(100),
                    phone VARCHAR(100),
                    email VARCHAR(100),
                    password VARCHAR(100),
                    avatar VARCHAR(100),
                    isBanned BOOLEAN,
                    isAdmin BOOLEAN,
                    register_date DATETIME,
                    update_date DATETIME,
                    PRIMARY KEY (id),
                    UNIQUE KEY (phone))`;
  },
  createTableAdmins() {
    return `CREATE TABLE IF NOT EXISTS admins(
                    id INT AUTO_INCREMENT,
                    name VARCHAR(100),
                    phone VARCHAR(100),
                    email VARCHAR(100),
                    password VARCHAR(100),
                    avatar VARCHAR(100),
                    register_date DATETIME,
                    update_date DATETIME,
                    PRIMARY KEY (id),
                    UNIQUE KEY (phone))`;
  },
  createTableCities() {
    return `CREATE TABLE IF NOT EXISTS cities(
                    id INT AUTO_INCREMENT,
                    name VARCHAR(100),
                    register_date DATETIME,
                    update_date DATETIME,                    
                    PRIMARY KEY (id),
                    UNIQUE KEY (name))`;
  },
};
