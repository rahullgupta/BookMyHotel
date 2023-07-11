const mongoose = require("mongoose");

// url of the mongodb database
var mongoURL = "";

// connect to the database
mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });

var connection = mongoose.connection;

connection.on("error", () => {
  console.log("Connection failed");
});

connection.on("connected", () => {
  console.log("Connected");
});

module.exports = mongoose;
