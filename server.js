// Dependencies
require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");

// Server
var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var PORT = process.env.PORT || 3000;
var CONST = require("./constants");

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
    console.log("New connection established.");

    // Handle user disconnect
    socket.on(CONST.DISCONNECT, function() {
      console.log("Connection terminated.");
    });

    // Handle game input
    socket.on(CONST.PLAYER_LEFT, function(conn) {
      console.log("player moved left", conn);
    });
    socket.on(CONST.PLAYER_RIGHT, function(conn) {
      console.log("player moved right"), conn;
    });
    socket.on(CONST.PLAYER_UP, function(conn) {
      console.log("player moved up", conn);
    });
    socket.on(CONST.PLAYER_DOWN, function(conn) {
      console.log("player moved down", conn);
    });
    socket.on(CONST.DROP_BOMB, function(conn) {
      console.log("player dropped a bomb", conn);
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
