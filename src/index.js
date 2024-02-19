import express from "express";
import morgan from "morgan";
import userController from "../controllers/userController.js";

const app = express();
const PORT = 5000;

// use EJS as the view engine
app.set("view engine", "ejs");
// static file
app.use(express.static("public"));

// convert data into json format
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

// apply morgan
app.use(morgan("common"));

// Render UI
app.get("/", (req, res) => {
  res.render("home");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/signup", (req, res) => {
  res.render("signup");
});

// Register user
app.post("/signup", userController.signup);

// Login user
app.post("/login", userController.login);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
