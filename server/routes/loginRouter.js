const express = require("express");
const { generateAuthToken } = require("../Dependencies/authToken");
const { compareHash } = require("../Dependencies/encrypt");
const { getUser } = require("../InterActors/userInterActor");
const router = express.Router();

const getUserLogin = async (req) => {
  let { email, password } = req.body;
  if (!email || !password)
    return Promise.reject({ message: "unable to login" });
  let query = { email };
  let requirements = { password: 1, email: 1 };
  let user = await getUser(query, requirements);
  if (!user) return Promise.reject({ message: "unable to find a user" });
  // let isCorrectPswd = compareHash(password, user.password);
  let isCorrectPswd = password === user.password;
  console.log(user);
  if (isCorrectPswd) {
    delete user.password;
    let { _id, email } = user;
    let authToken = generateAuthToken({ _id, email });
    return {
      token: authToken,
      user,
    };
  } else {
    return Promise.reject({ message: "Incorrect Password" });
  }
};

const handleLogin = async (req, res) => {
  getUserLogin(req)
    .then((resObj) => {
      let { token, user } = resObj;
      if (!token) {
        res.status(400).send({ message: "Invalid Token" });
      } else {
        res.status(200).send({
          logged_in: true,
          message: "token is valid",
          token,
          user,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      let errObj = err.message
        ? err
        : {
            code: 0,
            message: "Unable to find user",
          };
      res.status(400).send(errObj);
    });
};

router.post("/", handleLogin);

module.exports = router;
