const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const petRouter = require("./routes/api/pets");
const userPetRouter = require("./routes/api/userPets");
const authRouter = require("./routes/api/auth");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/pets", petRouter);
app.use("/api/userpets", userPetRouter);
app.use("/api/auth", authRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.use((err, req, res, next) => {
  let { status = 500, message = "Server error" } = err;

  if (message.includes("ENOENT")) {
    message = "Server Error";
  }

  if (err.code === 11000) {
    message = "Server Error. Duplicate data";
  }

  res.status(status).json({ message });
});

module.exports = app;
