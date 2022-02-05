const router = require("express").Router();
// const User = require("../models/user");
// const validator = require("validator");
const bcrypt = require("bcrypt");
const { User, validate } = require("../models/user");

// router.post("/signup", async (req, res) => {
//   //adding orders to the database
//   try {
//     const user = await User.create(req.body);

//     res.json(user);
//   } catch (error) {
//     res.send(error);
//   }
// });

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .send({ message: "User with given email already Exist!" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await new User({ ...req.body, password: hashPassword }).save();
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
