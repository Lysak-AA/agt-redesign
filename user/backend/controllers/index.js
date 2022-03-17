// const fs = require("fs");
const grabFiles = require("../services");
const controllers = {};

grabFiles.grabAllFilesInModule(controllers, __dirname, "index.js");

module.exports = controllers;
