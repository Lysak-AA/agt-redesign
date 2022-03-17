module.exports = {
  port: process.env.PORT || 3001,
  host: process.env.HOST || "localhost",
  db: {
    database: "agt_db",
    port: process.env.DB_PORT || 8889,
    host: process.env.DB_HOST || "localhost",
    user: "root",
    password: "root",
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || "secret",
  },
  multiturToken: "fc34828756b15358200aaf559428748e",
  multiturAPI: "https://www.multitour.ru/api/v2/",
  region_id: 4052,
  // adminSecret: "hhfgttdtTTthdjkjskdj77363638skjshfHHGhjdkj",
  // massagistUploadPath: "../client/public/img/massagists/",
  // mail: {
  //   host: "mail.hostland.ru",
  //   port: 2525,
  //   secure: false,
  //   auth: {
  //     user: "info@js-web.ru",
  //     pass: 'lawtrend5882'
  //   }
  // }
};
