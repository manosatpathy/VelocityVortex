const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
const PORT = process.env.PORT;
const { sequelize } = require("./models");
const movieRoutes = require("./routes/movieRoute");
const curatedListRoutes = require("./routes/curatedListRoute");
const wishListRoute = require("./routes/wishListRoute");
const watchListRoute = require("./routes/watchListRoute");
const reviewRoute = require("./routes/reviewRoute");

app.use("/api/movies", movieRoutes);
app.use("/api", curatedListRoutes);
app.use("/api/movies", wishListRoute);
app.use("/api/movies", watchListRoute);
app.use("/api/movies", reviewRoute);

sequelize
  .authenticate()
  .then(() => console.log("database connected"))
  .catch((error) => {
    console.error("Unable to connect to database", error);
  });

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
