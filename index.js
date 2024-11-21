let express = require("express");
let app = express();
let path = require("path");
const port = 3000;
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "views")));

const knex = require("knex")({
  client: "pg",
  connection: {
    host: "localhost",
    user: "postgres",
    password: "Suicidecraddle",
    database: "TRACCOON",
    port: 5433,
  },
});

app.get("/", (req, res) => {
  res.render("index"); // Replace `null` with actual user data if available
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.post("/login", async (req, res) => {
  const email = req.body.email;

  await knex("USERS")
    .select()
    .where("EMAIL", email)
    .first()
    .then((user) => {
      res.render("homescreen", { DB: user });
    });
});
// .select("FIRSTNAME", "LASTNAME", "EMAIL", "EXPENSETYPEID", "AMOUT")

app.get("/signup", (req, res) => {
  res.render("createuser");
});
app.post("/createuser", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  let fname = req.body.fname.toUpperCase();
  let lname = req.body.lname.toUpperCase();
  await knex("USERS").insert({
    FIRSTNAME: fname,
    LASTNAME: lname,
    EMAIL: email,
    PASSWORD: password,
  });
  res.redirect("/");
});

app.listen(port, () => console.log("listening"));
