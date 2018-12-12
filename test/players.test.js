var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
var expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

var request;

describe("GET /api/highscores", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function() {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it("should find all examples", function(done) {
    // Add some examples to the db to test with
    db.Player.bulkCreate([
      { playerName: "Player 1", playerHashkey: "2121432414", currentScore: 25000, highScore: 32000 },
      { playerName: "Player 2", playerHashkey: "432904328901", currentScore: 26000, highScore: 33000 },
      { playerName: "Player 3", playerHashkey: "483920943789", currentScore: 27000, highScore: 34000 }
    ]).then(function() {
      // Request the route that returns all examples
      request.get("/api/highscores").end(function(err, res) {
        var responseStatus = res.status;
        var responseBody = res.body;

        // Run assertions on the response
        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody)
          .to.be.an("array")
          .that.has.lengthOf(3);

        expect(responseBody[0])
          .to.be.an("object")
          .that.includes({ playerName: "Player 1", playerHashkey: "2121432414", currentScore: 25000, highScore: 32000 });

        expect(responseBody[1])
          .to.be.an("object")
          .that.includes({ playerName: "Player 2", playerHashkey: "432904328901", currentScore: 26000, highScore: 33000 });

        expect(responseBody[2])
          .to.be.an("object")
          .that.includes({ playerName: "Player 3", playerHashkey: "483920943789", currentScore: 27000, highScore: 34000 });

        // The `done` function is used to end any asynchronous tests
        done();
      });
    });
  });
});
