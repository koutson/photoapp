const express = require("express");
const app = express();
const cors = require("cors");
const dbConnect = require("./db/dbConnect");
const UserRouter = require("./routes/UserRouter");
const PhotoRouter = require("./routes/PhotoRouter");
const AccountRouter = require("./routes/AccountRouter")
// const CommentRouter = require("./routes/CommentRouter");
const bodyParser = require("body-parser");
 
app.use(bodyParser.json()); // for JSON data
app.use(bodyParser.urlencoded({ extended: true }));

dbConnect();

app.use(cors());
app.use(express.json());
app.use("/api/user", UserRouter);
app.use("/api/photos", PhotoRouter);
app.use("/api/account", AccountRouter);

app.get("/", (request, response) => {
  response.send({ message: "Hello from photo-sharing app API!" });
});

app.listen(8081, () => {
  console.log("server listening on port 8081");
});
