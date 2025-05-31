const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Accommodation = sequelize.define("Accommodation", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  postalCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rent: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rooms: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

// ✅ Lägg till relationerna här
User.hasMany(Accommodation, {
  foreignKey: "userId",
  onDelete: "CASCADE"
});
Accommodation.belongsTo(User, {
  foreignKey: "userId"
});

module.exports = Accommodation;