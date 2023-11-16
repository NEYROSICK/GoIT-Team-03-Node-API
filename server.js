const app = require("./app");
const mongoose = require("mongoose");

require("dotenv").config();

const PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_HOST;

mongoose
  .connect(uriDb)
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `\nDatabase connection\x1b[32m succesful\x1b[0m. Use our API on port:\x1b[33m ${PORT}\x1b[0m`
      );
    });
  })
  .catch((err) => {
    console.log(
      `Server not\x1b[31m running\x1b[0m. Error message: ${err.message}`
    );
    process.exit(1);
  });
