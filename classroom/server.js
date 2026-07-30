const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const cookieParser = require("cookie-parser");

app.use(cookieParser("secretCode"));

app.get("/getSignedCookie", (req, res) => {
    res.cookie("made-In", "India", { signed: true });
    res.send("Signed Cookie send")
});

app.get("/verify", (req, res) => {
    console.log(req.signedCookies);
    res.send("Verifies cookie")
})
app.get("/getCookies", (req, res) => {
    res.cookie("greet", "hello"); //Key Value pairs
    res.cookie("madeIN", "India"); //Key Value pairs
    res.send("Sent you cookies");
});

app.get("/greet", (req, res) => {
    let { name = "anonymous" } = req.cookies;
    res.send(`Hi ${name}`);
});
app.get("/", (req, res) => {
    console.log(req.cookies);
    res.send("hi I'm root");
});

// Users
app.use("/users", users);
// Posts
app.use("/posts", posts);


app.listen(3000, () => {
    console.log("server is listening on port 3000");
});