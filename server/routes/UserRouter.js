const express = require("express");
const User = require("../db/userModel");
const Information = require("../db/userInformationModel");
const router = express.Router();
const jwt = require('jsonwebtoken');

const authen = (token) =>{
  try {
    var decoded = jwt.verify(token, 'hungPass');
    console.log(token);
    return decoded
  } catch(err) {
    return false
  }
}

router.post("/", async (request, response) => {});

router.get("/list", async (request, response) => {
  try {
    const token = request.headers.authorization.split(" ")
    const data = authen(token[1])
    if(data){
      const users = await Information.find().select("user_id last_name first_name");
      response.send(users);
    }
    else{
      response.status(401).send("bear not right")
    }
  } catch (error) {
    response.status(500).send({ error });
  }
});

router.get("/:id", async (request, response) => {
  try {
    const token = request.headers.authorization.split(" ")
    const data = authen(token[1])
    if(data){
    const id = request.params.id;
    const user = await Information.find({ user_id: id });
    response.send(user);
    }
    else{
      response.status(401).send("bear not right")
    }
  } catch (error) {
    response.status(500).send({ error });
  }
});

module.exports = router;
