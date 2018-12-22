// eslint-disable-next-line no-unused-vars
function Client() {
  this.socket = io();

  this.playerLeft = function(playerKey) {
    this.socket.emit("playerLeft", playerKey);
  };
  this.playerRight = function(playerKey) {
    this.socket.emit("playerRight", playerKey);
  };
  this.playerUp = function(playerKey) {
    this.socket.emit("playerUp", playerKey);
  };
  this.playerDown = function(playerKey) {
    this.socket.emit("playerDown", playerKey);
  };
  this.dropBomb = function(playerKey) {
    this.socket.emit("dropBomb", playerKey);
  };
}