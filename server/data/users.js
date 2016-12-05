"use strict";

const User = require("mongoose").model("User");

module.exports = {
    create: (user, callback) => {
        User.create(user, callback);
    },
    publicUsers: (page, pageSize, date, callback) => {
        page = page || 1;
        pageSize = pageSize || 9;
        User
            .find(date)
            .sort({
                date: "desc"
            })
            .limit(pageSize)
            .skip((page - 1) * pageSize)
            .exec((err, foundUsers) => {
                if (err) {
                    callback(err);
                    return;
                }

                User.count().exec((err, numberOfUsers) => {
                    var data = {
                        users: foundUsers,
                        currentPage: page,
                        pageSize: pageSize,
                        total: numberOfUsers
                    };

                    callback(err, data);
                });
            })
    },
    getById: (id, user, callback) => {
        User.findOne({username: `${id}`}, (err, user) => {
            if (err) {
                callback("Not found! " + err);
            }
            let data = {
                firstName: user.firstName,
                lastName: user.lastName,
                city: user.city,
                email : user.email,
                profilePicture: user.profilePicture
            };
            callback(err, data)
        })
    } //,
    //update: (user, callback) => {
    //    User.update(user, callback);
    //}
};