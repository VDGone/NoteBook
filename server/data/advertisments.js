"use strict";

var Advertisment = require("mongoose").model("Advertisment");

module.exports = {
    create: (advertisment, user, callback) => {
        if (advertisment.title < 0 || advertisment.description < 0) {
            callback("Invalid category!");
            return;
        }

        Advertisment.create(advertisment, callback);
    },
    publicAdvertisments: (page, pageSize, date, callback) => {
        page = page || 1;
        pageSize = pageSize || 9;
        Advertisment
            .find(date)
            .sort({
                date: "desc"
            })
            .limit(pageSize)
            .skip((page - 1) * pageSize)
            .exec((err, foundAdvertisments) => {
                if (err) {
                    callback(err);
                    return;
                }

                Advertisment.count().exec((err, numberOfAdvertisments) => {
                    var data = {
                        advertisments: foundAdvertisments,
                        currentPage: page,
                        pageSize: pageSize,
                        total: numberOfAdvertisments
                    };

                    callback(err, data);
                });
            })
    },
    getById: function (id, category, callback) {
        Advertisment.findOne(id).exec((err, category) => {
            if (err) {
                callback("Not found! " + err);
            }
            var data = {
                title: category.title,
                items: category.items,
                description: category.description,
                picture: category.picture
            };
            callback(err, data)
        })
    },
    getByCategory: (id, user, callback) => {
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
    }
};