const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");


app.get("/", (req, res) => {
    res.send("hi I'm root");
})

// Users
app.use("/users", users);
// Posts
app.use("/posts", posts);


app.listen(3000, () => {
    console.log("server is listening on port 3000");

})