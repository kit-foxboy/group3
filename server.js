// Dependencies
require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");

// Server
var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Data Model
var db = require("./models");

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Sync database and start server
db.sequelize.sync(syncOptions).then(function() {
  
  // Handle incoming socket connections
  io.on("connection", function(socket) {
    console.log("New player joined.");

    // Handle user disconnect
    socket.on("disconnect", function() {
      console.log("Player has left.");
    });
  });

  // Start http server
  http.listen(PORT, function() {
    console.log(
      "==> 🌎  HTTP server listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
