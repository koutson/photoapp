const express = require("express");
const Photo = require("../db/photoModel");
const router = express.Router();
const bodyParser = require("body-parser");
const fs = require('fs');
const fx = require('fs').promises;
const jwt = require('jsonwebtoken');
const { base64 } = require("js-md5");

const authen = (token) =>{
  try {
    var decoded = jwt.verify(token, 'hungPass');
    return decoded
  } catch(err) {
    return false
  }
}


router.post("/", async (request, response) => {});

router.get("/photosOfUser/:id", async (request, response) => {
  try {
    const token = request.headers.authorization.split(" ")
    const data = authen(token[1])
    if(data){
      const id = request.params.id;
      const photos = await Photo.find({ user_id: id });
      const result = []
      for (const photo of photos) {
        const contents = await fx.readFile(`image/${photo._id}.png`, { encoding: 'base64' })
        const update = { ...photo, base64: contents };
        result.push(update)
      }
      response.send(result);
    }
    else{
    response.status(401).send("bear not right")
  }
  } catch (error) {
    response.status(500).send({ error });
  }
});

router.post("/commentsOfPhoto/:photo_id", async (request, response) => {
  try {
    const token = request.headers.authorization.split(" ")
    const data = authen(token[1])
    if(data){
      const id = request.params.photo_id;
      const photos = await Photo.find({ _id: id });
      const comment = {
        comment: request.body.comment,
        date_time: Date.now,
        user_id: request.body.user_id
      };
      photos[0].comments.push(comment)
      const action = await Photo.updateOne({ _id: photos[0]._id },photos[0],)
      response.send("comment success");
    }
    else{
    response.status(401).send("bear not right")
  }
  } catch (error) {
    response.status(500).send({ error });
  }
});

router.post("/new",bodyParser.raw({ type: ['image/jpeg', 'image/png'], limit: '5mb' }), async (request, response) => {
  try {
    const token = request.headers.authorization.split(" ")
    const data = authen(token[1])
    if(data){
      const newPhoto = {
        date_time: Date.now(),
        user_id: data.user.user_id,
        comments: []
      }
      const photo = new Photo(newPhoto)
      await photo.save();
      fs.writeFile(`image/${photo._id}.png`, request.body,function(err, result) {
        if(err) console.log('error', err);
      })
      response.send("success")
    }
    else{
      response.status(401).send("bear not right")
      return
    }
  } catch (error) {
    response.status(400).send("file not found")
  }
});

module.exports = router;
