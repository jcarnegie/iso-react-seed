
require("./assets/app.styl");

var r           = require("ramda");
var env         = require("../lib/env");
var react       = require("react");
var router      = require("./lib/router");
var routesList  = require("./routes");
var urlUtil     = require("url");
var querystring = require("querystring");

var pageAction = router.reactPageAction("#page");

// setup routing
var routes = r.reduce(router.configureRoute(pageAction), router.create(), routesList);

// route clicks
// todo: explore if this will be a performance issue - do we need to hook all
//       <a>'s on the page instead?
document.addEventListener("click", router.handleClicks(routes));

// popstate stuff (back button, etc)
window.onpopstate = router.handlePopState(routes);