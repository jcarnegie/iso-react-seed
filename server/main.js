var r               = require("ramda");
var env             = require("../lib/env");
var react           = require("react");
var layout          = require("../client/layouts/app.html.mustache");
var morgan          = require("morgan");
var express         = require("express");
var routeList       = require("./routes");
var clientRouteList = require("../client/routes");
var routeshelper    = require("./lib/routeshelper");

var config = env.config();
var app    = express();

// logging
app.use(morgan("dev"));

// configure static directories
app.use(express.static("dist/client"));

// configure server-side api + client routes
routeshelper.setServerRoutes(app, routeList);
routeshelper.setClientRoutes(app, clientRouteList, layout);

app.listen(3000, function() {
    console.log("listening on 3000");
});