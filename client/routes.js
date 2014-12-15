
var api    = require("./lib/apiclient");
var Home   = require("./pages/home.jsx");
var Post   = require("./pages/post.jsx");
var Signup = require("./pages/signup.jsx");

/**
 * List of routes. Each route has these properties:
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

        // Todo: create some sugar to make this more config-like
        // something like:
        //     state: api.getPosts
        // context and done are automatically passed in, or maybe
        // we change it so that all API methods return a promise.
        // that's probably a better functional approach.
        state: function(context, done) {
            api.getPosts(0, 10, function(err, data) {
                done(null, { posts: data });
            });
        }
    },
    {
        path: "/signup",
        component: Signup
    },
    {
        path: "/post/:id",
        component: Post,
        state: function(context, done) {
            api.getPost(context.params.id, function(err, data) {
                done(err, { post: data });
            });
        }
    }
];