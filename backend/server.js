const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const app = express();

global.__basedir = __dirname;

// app.use(cors(corsOptions));
app.use(cors({ credentials: true, origin: "http://localhost:8081" }));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "blimanik-session",
    // keys: ['key1','key2'],
    secret: "COOKIE-SECRET", // should use as secret environment variable
    httpOnly: true,
    sameSite: "strict",
  })
);

// database
const db = require("./app/models");
const Role = db.role;

db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to blimanikBlog application." });
});

require("./app/routes/blogs.routes")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/file.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });
  Role.create({
    id: 2,
    name: "moderator",
  });
  Role.create({
    id: 3,
    name: "admin",
  });
}
