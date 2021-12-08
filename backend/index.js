const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const constants = require("./constants");
const app = express();
const PORT = constants.port || 5000;
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
require("./db");
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    },
});

require("dotenv").config();
// Bodyparser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());

// Load passport strategies
const localSignupStrategy = require("./passport/local-signup");
const localLoginStrategy = require("./passport/local-login");
passport.use("local-signup", localSignupStrategy);
passport.use("local-login", localLoginStrategy);

const auth = require("./routes/auth");
const categories = require("./routes/categories")
const comments = require("./routes/comments")
const posts = require("./routes/posts")
const users = require("./routes/user")
const search = require("./routes/search")

app.use("/api/auth", auth);
app.use("/api/categories", categories)
app.use("/api/comments", comments)
app.use("/api/posts", posts)
app.use("/api/users", users)
app.use("/api/search", search)
io.on('connection', (socket) => {
    console.log('a user connected on ' + socket.id);
});

server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});