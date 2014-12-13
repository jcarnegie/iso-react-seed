
var user = require("./api/user");

module.exports = [
    ["post", "/user", user.create],
    ["put", "/user/:id", user.update]
];
