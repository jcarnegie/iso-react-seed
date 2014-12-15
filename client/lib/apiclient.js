var r       = require("ramda");
var env     = require("../../lib/env");
var request = require("superagent");
var promise = require("es6-promise").Promise;
var config  = env.config();

var apiUrl = function(path) {
    return env.config().api.base + path;
};

var get = function(path, done) {
    request.get(apiUrl(path), function(err, res) {
        if (err) return done(err);
        done(null, res.body);
    });
};

var getPosts = function(offset, count, done) {
    var path = "/api/posts?offset=" + offset + "&count=" + count;
    get(path, function(err, posts) {
        done(err, { posts: posts });
    });
};

var getPost = function(postId, done) {
    get("/api/post/" + postId, function(err, post) {
        done(err, { post: post });
    });
};

module.exports = {
    getPosts: getPosts,
    getPost: getPost
};