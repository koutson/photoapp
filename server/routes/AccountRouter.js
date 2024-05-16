const express = require("express");
const md5 = require('js-md5');
const Account = require("../db/userModel");
const User = require("../db/userInformationModel");
const jwt = require('jsonwebtoken')
const router = express();

router.post("/", async (request, response) => {});

router.post("/user", async (request, response) => {
  try {
    request.body.password = md5(request.body.password);
    const account = await Account.findOne({username : request.body.username})
    if (account) {
        response.status(400).json({ message: "tài khoản đã tồn tại" });
    }
    else {
        const account1 = new Account(request.body)
        await account1.save();
        const information = {
          first_name : request.body.first_name,
          last_name: request.body.last_name,
          location: request.body.location,
          description: request.body.description,
          occupation : request.body.occupation,
          user_id : account1._id
        }
        const user = new User(information);
        await user.save();
        response.send("dang ky thanh cong")
    }
  } catch (error) {
    response.status(500).send({ error });
  }
});

router.post("/admin/login", async (request, response) => {
    try {
      request.body.password = md5(request.body.password);
      const account = await Account.findOne({username : request.body.username,password : request.body.password})
      if (account) {
        const user = await User.findOne({user_id:account._id})
        // response.send(user)
        const accessToken = jwt.sign({user}, 'hungPass', {
          expiresIn: '1d',
        });
        response.json({accessToken})
      } else {
        response.status(401).json({ message: "Tên đăng nhập hoặc mật khẩu không đúng" });
      }
    } catch (error) {
      response.status(500).send({ error });
    }
  });

module.exports = router;
