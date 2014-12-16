var r       = require("ramda");
var env     = require("../../lib/env");
var request = require("superagent");
var Promise = require("es6-promise").Promise;
var config  = env.config();

var apiUrl = function(path) {
    return env.config().api.base + path;
};

// var get = function(path, done) {
//     request.get(apiUrl(path), function(err, res) {
//         if (err) return done(err);
//         done(null, res.body);
//     });
// };

var get = function(path, prop) {
    return new Promise(function(resolve, reject) {
        request.get(apiUrl(path), function(err, res) {
            if (err) return reject(err);
            resolve(res.body);
        });
    });
};

var getPosts = function(offset, count) {
    offset = offset || 0;
    count  = count || 10;
    var path = "/api/posts?offset=" + offset + "&count=" + count;
    return get(path);
};

var getPost = function(postId, done) {
    return get("/api/post/" + postId);
};

module.exports = {
    getPosts: getPosts,
    getPost: getPost
};