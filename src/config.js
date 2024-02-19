import mongoose from "mongoose";
const connect = mongoose.connect("mongodb://127.0.0.1:27017/login-tut");

// check db connnected or not
connect
  .then(() => {
    console.log("Database connection successfully");
  })
  .catch((err) => {
    console.log(err);
  });

// Create a schema
const LoginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// collection user
const collection = new mongoose.model("users", LoginSchema);

export default collection;
