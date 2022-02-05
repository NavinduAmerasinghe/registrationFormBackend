const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

//import the routes
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

//middleware
app.use(express.json());
app.use(cors());

//routes middlware
// app.use("/user", userRoute);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("hello world");
});

const port = process.env.PORT || 9000;

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DataBase Connected Successfully !");
  });

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

// const newUser = new User(req.body);
// newUser
//   .save()
//   .then((newUser) => {
//     res.json(newUser);
//   })
//   .catch((err) => res.json(err));
