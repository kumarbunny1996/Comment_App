const express = require("express");
const { compareHash } = require("../Dependencies/encrypt");
const { getUser } = require("../InterActors/userInterActor");
const router = express.Router();

const getUserPswd = async (req) => {
  let { email, secret } = req.body;
  if (!email || !secret)
    return Promise.reject({ message: "unable to get password" });
  let query = { email };
  let requirements = { password: 1, email: 1, secret: 1 };
  let user = await getUser(query, requirements);
  if (!user) return Promise.reject({ message: "unable to find a user" });
  let isCorrectSecret = compareHash(secret, user.secret);
  console.log(user);
  if (isCorrectSecret) {
    return {
      password: user.password,
    };
  } else {
    return Promise.reject({ message: "Incorrect secret key" });
  }
};

const forgotPassword = async (req, res) => {
  getUserPswd(req)
    .then((resObj) => {
      let { password } = resObj;
      if (!password) {
        res.status(400).send({ message: "Invalid Secret key" });
      } else {
        res.status(200).send({
          logged_in: true,
          message: "secret is valid",
          password,
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

router.post("/", forgotPassword);

module.exports = router;
