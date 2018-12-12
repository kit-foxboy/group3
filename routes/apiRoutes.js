var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/highscores", function(req, res) {
    db.Player.findAll({}).then(function(results) {
      res.json(results);
    });
  });

  // Create a new example
  app.post("/api/player", function(req, res) {
    db.Player.create(req.body).then(function(results) {
      res.json(results.dataValues);
    });
  });

  // Delete an example by id
  app.delete("/api/players/:id", function(req, res) {
    db.Player.destroy({ where: { id: req.params.id } }).then(function(results) {
      res.json(results);
    });
  });
};
