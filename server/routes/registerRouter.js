const express = require("express");
const router = express.Router();
const { saveUserToDB, getUser } = require("../InterActors/userInterActor");
const { hash } = require("../Dependencies/encrypt");

const saveUser = async (req) => {
  let { email, password, secret } = req.body;
  if (!email || !password || !secret)
    return Promise.reject({ message: "User not found" });
  let query = { email };
  let user = await getUser(query);
  if (user) return Promise.reject({ message: "User already exists" });
  // password = await hash(password);
  secret = await hash(secret);
  let userObj = { email, password, secret };
  return saveUserToDB(userObj).catch((err) => Promise.reject(err));
};

const handleRegister = async (req, res) => {
  saveUser(req)
    .then(() => {
      let success = {
        created_account: true,
        msg: "Your account has successfully created",
      };
      res.status(200).send(success);
    })
    .catch((err) => {
      let error = err.message
        ? err
        : {
            message: "Unable to create Account",
          };
      res.status(400).send(error);
    });
};

router.post("/", handleRegister);

module.exports = router;
