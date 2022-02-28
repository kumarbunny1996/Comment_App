const express = require("express");
const { getUser } = require("../InterActors/userInterActor");
const authenticateToken = require("../middlewares/authenticate");
const router = express.Router();

const getUserData = async (req) => {
  let { userId } = req;
  query = { _id: userId };
  let user = await getUser(query);
  if (user == null) return Promise.reject({ message: "No user available" });
  return user;
};

const getProfile = async (req, res) => {
  getUserData(req)
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      let errObj = err.message
        ? err
        : {
            message: "user is deleted",
          };
      res.status(400).send(errObj);
    });
};

router.get("/profile", authenticateToken, getProfile);

module.exports = router;
