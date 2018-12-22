module.exports = function(sequelize, DataTypes) {
  var Player = sequelize.define("Player", {
    playerName: DataTypes.STRING,
    playerHashkey: DataTypes.STRING,
    currentScore: DataTypes.INTEGER,
    highScore: DataTypes.INTEGER
  });
  return Player;
};
