const express = require("express");
const cors = require("cors");
const { PORT } = require("./src/config");
const router = require("./src/routes");
const { notFoundHandler, errorHandler } = require("./src/middlewares/common");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to dashboard-insight-backend" });
});

app.use(router); // Binding all routes

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening on port: http://localhost:${PORT}`);
});
