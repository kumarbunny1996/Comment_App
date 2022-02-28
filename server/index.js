const express = require("express");
const mongoose = require("mongoose");
const init = require("./routes/mainRouter");
const { DB_CONNECTION_URL } = require("./utils/env");

const app = express();
init(app);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server is listening at ${PORT}`));

mongoose.set("debug", true);
mongoose.connect(
  DB_CONNECTION_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("Connected to DB")
);
mongoose.connection;
