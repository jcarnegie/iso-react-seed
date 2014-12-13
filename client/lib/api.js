var env     = require("../../lib/env");
var request = require("superagent");
var base    = env.api.base;

module.exports = {
    signup: function(user, cb) {
        var url = base + "/signup";
        request.post(url).send(user).end(cb);
    },

    login: function(username, password, cb) {
        var url = base + "/login";
        var data = { username: username, password: password };
        request.put(url).send(data).end(cb);
    },

    updateUser: function(id, user, cb) {
        var url = base + "/user/" + id;
        request.post(url).send(data).end(cb);
    },

    createSubscriber: function(subscriberProps, cb) {

    },

    updateSubscriber: function(id, subscriberProps, cb) {
        
    }
};