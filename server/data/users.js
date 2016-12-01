"use strict";

const User = require("mongoose").model("User");

module.exports = {
    create: (user, callback) => {
        User.create(user, callback);
    } //,
    //update: (user, callback) => {
    //    User.update(user, callback);
    //}
};