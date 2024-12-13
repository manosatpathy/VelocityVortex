const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
const PORT = process.env.PORT;
const { sequelize } = require("./models");
const movieRoutes = require("./routes/movieRoute");
const curatedListRoutes = require("./routes/curatedListRoute");

app.use("/api/movies", movieRoutes);
app.use("/api/curated-lists", curatedListRoutes);

sequelize
  .authenticate()
  .then(() => console.log("database connected"))
  .catch((error) => {
    console.error("Unable to connect to database", error);
  });

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
