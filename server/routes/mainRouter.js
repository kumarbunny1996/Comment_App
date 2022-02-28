const cors = require("cors");
const bodyParser = require("body-parser");
const registerRouter = require("./registerRouter");
const loginRouter = require("./loginRouter");
const forgotRouter = require("./forgotRouter");
const userRouter = require("./userRouter");
const commentRouter = require("./commentRouter");

const init = (app) => {
  app.use(cors());
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use("/api/register", registerRouter);
  app.use("/api/login", loginRouter);
  app.use("/api/forgot", forgotRouter);
  app.use("/api/user", userRouter);
  app.use("/api/user", commentRouter);
};

module.exports = init;
