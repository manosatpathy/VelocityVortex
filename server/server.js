const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
const PORT = process.env.PORT;
const moviesRoutes = require("./routes/moviesRoute");

app.use("/api/movies", moviesRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
