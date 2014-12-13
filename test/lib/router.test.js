var should = require("chai").should();
var routes = require("../../lib/router.js");

describe("Router", function() {

    var r = null;

    beforeEach(function() {
        r = routes.create();
    });

    it ("should create a new routes object", function() {
        r.should.eql({ routes: [] });
    });

    it ("should add a new route to the routes object", function() {
        var route = "/test";
        var fn    = function() {};
        var newRoutes = routes.add(r, route, fn);

        newRoutes.should.not.eql(r);
        newRoutes.routes[0].routeUrl.should.eql(route);
        newRoutes.routes[0].matcher.should.eql(new RegExp("^" + route + "$"));
        newRoutes.routes[0].paramNames.should.eql([]);
        newRoutes.routes[0].fn.should.eql(fn);
    });

    it ("should add a parameterized route to the routes object", function() {
        var route = "/user/:id";
        var fn    = function() {};
        var newRoutes = routes.add(r, route, fn);

        newRoutes.should.not.eql(r);
        newRoutes.routes[0].routeUrl.should.eql(route);
        newRoutes.routes[0].matcher.should.eql(new RegExp("^/user/([^/]+)$"));
        newRoutes.routes[0].paramNames.should.eql(["id"]);
    });

    it ("should add a route with multiple parameters", function() {
        var route = "/post/:postId/comment/:commentId";
        var fn    = function() {};
        var newRoutes = routes.add(r, route, fn);

        newRoutes.should.not.eql(r);
        newRoutes.routes[0].routeUrl.should.eql(route);
        newRoutes.routes[0].matcher.should.eql(new RegExp("^/post/([^/]+)/comment/([^/]+)$"));
        newRoutes.routes[0].paramNames.should.eql(["postId", "commentId"]);
    });

    it ("should match a route to a url", function(done) {
        var route = "/user/:id";

        var fn = function(route, params) {
            params.id.should.eql("20");
            done();
        };

        var newRoutes = routes.add(r, route, fn);

        routes.match(newRoutes, "/user/20")
    });
});