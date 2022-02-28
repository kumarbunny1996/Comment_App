const express = require("express");
const {
  saveCommentToDB,
  getCommentsFromDB,
} = require("../InterActors/commentInterActor");
const { getUser } = require("../InterActors/userInterActor");
const authenticateToken = require("../middlewares/authenticate");
const router = express.Router();

const errorFunc = (err, res) => {
  let errObj = err.message
    ? err
    : {
        message: "user is deleted",
      };
  res.status(400).send(errObj);
};

const getCommentsDB = async (req) => {
  let { userId } = req;
  let query = { _id: userId };
  let user = await getUser(query);
  if (!user) return Promise.reject({ message: "there is no user" });
  return getCommentsFromDB().catch((err) =>
    Promise.reject(err)
  );
};

const getAllComments = async (req, res) => {
  getCommentsDB(req)
    .then((data) => res.status(200).send({ data }))
    .catch((err) => errorFunc(err, res));
};

const addCommentToDb = async (req) => {
  let {comment}  = req.body;
  console.log(comment); 
  if (comment === "") return Promise.reject({ message: "No comment" });
  let { userId } = req;
  let query = { _id: userId };
  let user = await getUser(query);
  if (!user) return Promise.reject({ mesage: "cannot find user" });
  let email = user.email;
  return saveCommentToDB({ email, comment })
    .catch((err) => Promise.reject(err));
};

const addComments = async (req, res) => {
  addCommentToDb(req)
    .then((data) => res.status(200).send({ message: "success", data }))
    .catch((err) => errorFunc(err, res));
};

router.post("/comment", authenticateToken, addComments);
router.get("/comments", authenticateToken, getAllComments);
module.exports = router;
