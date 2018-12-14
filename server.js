// Dependencies
require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");

// Server
var app = require("express")();
var http = require("http").Server(app);
serverSocket = require("socket.io")(http);
var PORT = process.env.PORT || 3000;
// var CONST = require("./constants");
var Lobby = require("./lobby");
var Play = require("./play");

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
  serverSocket.on("connection", function(client) {
    console.log("New player has connected: " + client.id);
  
    client.on("enter lobby", Lobby.onEnterLobby);
    client.on("leave lobby", Lobby.onLeaveLobby);
    client.on("create game", Lobby.onCreateGame);
  
    client.on("enter pending game", Lobby.onEnterPendingGame);
    client.on("leave pending game", Lobby.onLeavePendingGame);
  
    client.on("start game", Play.onStartGame);
  
    client.on("update player position", Play.updatePlayerPosition);
    client.on("create bomb", Play.createBomb);
    client.on("pick up spoil", Play.onPickUpSpoil);
  
    client.on("player died", Play.onPlayerDied);
    client.on("leave game", Play.onLeaveGame);
  
    client.on("disconnect", onClientDisconnect);
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

function onClientDisconnect() {
  if (this.socket_game_id === null) {
    console.log("Player was not be inside any game...");
    return;
  }
  console.log("Player was inside game...");

  // If game is pending then use Lobby.
  Lobby.onLeavePendingGame.call(this);

  // If game is non-pending then use Play.
  Play.onDisconnectFromGame.call(this);
}

module.exports = app;
