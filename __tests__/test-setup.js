// test-setup.js
process.env.NODE_ENV = "test";
const sequelize = require("../src/config/database");
const User = require("../src/models/User");
const Accommodation = require("../src/models/Accommodation"); // <- relationen initieras här


require("../src/models/Accommodation");

beforeAll(async () => {
  await sequelize.sync();
});

afterAll(async () => {
  await sequelize.close();
});

module.exports = { sequelize, User, Accommodation };