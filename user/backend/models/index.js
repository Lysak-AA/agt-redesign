const grabAllFiles = require("../services").grabAllFilesInModule;

const models = {};

grabAllFiles(models, __dirname, "index.js");

module.exports = models;
