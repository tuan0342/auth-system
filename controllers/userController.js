import bcrypt from "bcrypt";
import collection from "../src/config.js";

const userController = {
  signup: async (req, res) => {
    const data = {
      name: req.body.username,
      password: req.body.password,
    };

    // check if the user already exists in the db
    const existingUser = await collection.findOne({ name: data.name });

    if (existingUser) {
      res.send("User already exists. Please choose a different username");
    } else {
      // has the password using bcrypt
      const saltRounds = 10; // Number of salt round for bcrypt
      const hashedPassword = await bcrypt.hash(data.password, saltRounds);

      data.password = hashedPassword; // Replace the hash password with original password

      const userdata = await collection.insertMany(data);
      console.log(userdata);
    }
  },

  login: async (req, res) => {
    try {
      const check = await collection.findOne({ name: req.body.username });
      if (!check) {
        res.send("User name cannot found");
        return;
      }

      // compare the hash password from the db with the plain text
      const isPasswordMatch = await bcrypt.compare(
        req.body.password,
        check.password
      );
      if (isPasswordMatch) {
        res.render("home");
      } else {
        res.send("wrong password");
      }
    } catch (error) {
      res.send("wrong details: ", error);
    }
  },
};

export default userController;
