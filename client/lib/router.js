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
var add = function(routes, routeUrl, component, fn) {
    var copy = r.cloneDeep(routes);

    copy.routes.push({
        matcher: makeRouteRegexp(routeUrl),
        paramNames: getRouteParamNames(routeUrl),
        routeUrl: routeUrl,
        component: component,
        fn: fn
    });

    return copy;
};

var find = function(routes, path) {
    var matches = function(route) {
        return path.match(route.matcher);
    };

    return r.find(matches, routes.routes);
}

/**
 * Public interface
 */
var match = function(routes, path) {
    var route = find(routes, path);

    if (route) {
        var matches = path.match(route.matcher);
        var params = r.zipObj(route.paramNames, r.tail(matches));
        route.fn(route, params);
    }

    return route;
};

/**
 * Public interface
 */
var reactPageAction = r.curry(function(containerSelector, component) {
    return reactPageActionWithState(null, containerSelector, component);
});

var reactPageActionWithState = r.curry(function(state, containerSelector, component) {
    return function(route, params) { 
        var context = {
            params: params,
            query: querystring.parse(window.location.search),
            state: state || {}
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
    return add(routes, path, component, pageActionFn(component));
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
var init = r.curry(function(routes, containerSelector, url, e) {
    var parsedUrl = urlUtil.parse(url);
    var path = parsedUrl.pathname + (parsedUrl.search || "");
    var route = find(routes, path);

    if (route) {
        var matches = path.match(route.matcher);
        var params  = r.zipObj(route.paramNames, r.tail(matches));
        var state   = (typeof $state === "object") ? $state : {};
        var action  = reactPageActionWithState(state, containerSelector, path);
        action(route, params);
    }
});

/**
 * Public interface
 */
module.exports = {
    create: create,
    add: add,
    match: match,
    init: init,
    reactPageAction: reactPageAction,
    configureRoute: configureRoute,
    handleClicks: handleClicks,
    handlePopState: handlePopState
}