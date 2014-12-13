
var Home   = require("./pages/home.jsx");
var Signup = require("./pages/signup.jsx");

/**
 * List of routes. Each route has these parameters:
 *
 * - path
 * - component
 * - state
 * - beforeFilter
 * - afterFilter
 * - timeout
 */
module.exports = [
    {
        path: "/",
        component: Home,
        state: function(context, done) {
            done({ foo: "bar", blarty: "harhar!" });
        }
    },
    {
        path: "/signup",
        component: Signup
    }
];