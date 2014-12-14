
var api    = require("./lib/api");
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
        state: function(context, done) {
            api.getPosts(0, 10, function(err, data) {
                done({ posts: data });
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
                done({ post: data });
            });
        }
    }
];