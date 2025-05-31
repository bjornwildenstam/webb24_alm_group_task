const express = require("express");
const sequelize = require("./config/database");

// Importera modeller
const User = require("./models/User");
const Accommodation = require("./models/Accommodation");

// Importera routes
const UserRouter = require("./routes/User");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// 🧩 Definiera relationer
User.hasMany(Accommodation, {
  foreignKey: "userId",
  onDelete: "CASCADE"
});
Accommodation.belongsTo(User, {
  foreignKey: "userId"
});

// Test database connection + sync
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");

    await sequelize.sync({ force: true }); // force: true = nollställ databasen varje gång
    console.log("Database synchronized");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testConnection();

// Routes
app.use("/users", UserRouter);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
