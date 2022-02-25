const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/mainRouter");
const { DB_CONNECTION_URL } = require("./utils/env");

const app = express();
app.use(router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is listening at ${PORT}`));

mongoose.connect(
  DB_CONNECTION_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("Connected to DB")
);
mongoose.connection;
