var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
var expect = chai.expect;
var request;

// Setting up the chai http plugin
chai.use(chaiHttp);

// Describe tests
describe("POST /api/player", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function() {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it("should insert player without errors", function(done) {
    request.post("/api/player")
      .type("form")
      .send({playerName: "Player 1", playerHashkey: "2121432414", currentScore: 25000, highScore: 32000 })
      .end(function(err, res) {
        var responseStatus = res.status;
        var responseBody = res.body;
        console.log(responseBody);

        expect(err).to.be.null;
        expect(responseStatus).to.equal(200);

        expect(responseBody)
          .to.be.an("object")
          .that.includes({ playerName: "Player 1", playerHashkey: "2121432414", currentScore: "25000", highScore: "32000" });

        done();
      });
  });
});