var should = require("chai").should();
var env    = require("../../lib/env");

describe("Env", function() {
    xit ("should return the config", function() {
        var config = env.config();
        config.test.should.eql("common");
    });
})