const express = require("express");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require('body-parser')
const cors = require("cors");

app.use(cors({
  origin: "http://localhost:3000", // Allow requests from React
  credentials: true, // Allow cookies & authorization headers
}));


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static("public"));

const adminRoutes = require('./Route/admin');
const studentRoutes = require('./Route/student');

app.use('/api/admin', adminRoutes);
app.use('/api/student', studentRoutes);



const uri = "mongodb+srv://sivananthini611:Nanthini@cluster0.xjqtp.mongodb.net/data";
const PORT = process.env.PORT || 8080;
let connection = mongoose.connect(uri);

connection
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection established");

      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("connection failed", err);
  });