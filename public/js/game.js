// Define game utils
var client = new Client();

// Define Game
var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};
new Phaser.Game(config);

function preload ()
{
  console.log("preloading assests.");
}

function create ()
{
  // Add input detection
  this.input.keyboard.on("keydown_LEFT", function () {
    client.playerLeft();
  }, this);
  this.input.keyboard.on("keydown_RIGHT", function () {
    client.playerRight();
  }, this);
  this.input.keyboard.on("keydown_UP", function () {
    client.playerUp();
  }, this);
  this.input.keyboard.on("keydown_DOWN", function () {
    client.playerDown();
  }, this);
  this.input.keyboard.on("keydown_SPACE", function () {
    client.dropBomb();
  }, this);
}

function update ()
{
  //TODO: update
}