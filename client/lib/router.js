var r           = require("ramda");
var react       = require("react");
var urlUtil     = require("url");
var querystring = require("querystring");

var makeRouteRegexp = function(routeUrl) {
    return new RegExp("^" + routeUrl.replace(/:[^\/]+/g, "([^\/]+)") + "$");
};

var getRouteParamNames = function(routeUrl) {
    var matches = routeUrl.match(/(:[^\/]+)/g);
    if (matches === null) return [];

    var removeLeadingColon = function(s) { return s.replace(/^:/, ""); };
    var removeColons = r.map(removeLeadingColon);
    return removeColons(matches);
};

/**
 * Public interface
 */
var create = function() {
    return {
        routes: []
    }
};

/**
 * Public interface
 */
var add = function(routes, routeUrl, fn) {
    var copy = r.cloneDeep(routes);

    copy.routes.push({
        matcher: makeRouteRegexp(routeUrl),
        paramNames: getRouteParamNames(routeUrl),
        routeUrl: routeUrl,
        fn: fn
    });

    return copy;
};

/**
 * Public interface
 */
var match = function(routes, uri) {
    var matches = function(route) {
        return uri.match(route.matcher);
    };

    var route = r.find(matches, routes.routes);

    if (route) {
        var matches = uri.match(route.matcher);
        var params = r.zipObj(route.paramNames, r.tail(matches));
        route.fn(route, params);
    }

    return route;
};

/**
 * Public interface
 */
var reactPageAction = r.curry(function(containerSelector, component) {
    return function(route, params) { 
        var context = {
            params: params,
            query: querystring.parse(window.location.search),
            state: (typeof $state === "object") ? $state : {}
        };

        var element = react.createFactory(component);
        var conextualElement = react.withContext(context, function() { return element(context); });
        var domElement = document.querySelector(containerSelector);
        react.render(conextualElement, domElement);
    }
});

/**
 * Public interface
 */
var configureRoute = r.curry(function(pageActionFn, routes, route) {
    var path      = r.get("path", route);
    var component = r.get("component", route);
    return add(routes, path, pageActionFn(component));
});

/**
 * Public interface
 */
var handleClicks = r.curry(function(routes, e) {
    // ignore clicks to elements other than <a>'s
    if (e.target.localName !== "a") return;

    var parsedUrl = urlUtil.parse(e.target.href);
    var path = parsedUrl.pathname + (parsedUrl.search || "");

    var route = null;
    if (route = match(routes, path)) {
        e.preventDefault();
        e.stopPropagation();
        history.pushState({}, route.pageTitle || document.title, path);
    }
});

/**
 * Public interface
 */
var handlePopState = r.curry(function(routes, e) {
    var parsedUrl = urlUtil.parse(window.location.href);
    var path = parsedUrl.pathname + (parsedUrl.search || "");
    match(routes, path);
});

/**
 * Public interface
 */
module.exports = {
    create: create,
    add: add,
    match: match,
    reactPageAction: reactPageAction,
    configureRoute: configureRoute,
    handleClicks: handleClicks,
    handlePopState: handlePopState
}