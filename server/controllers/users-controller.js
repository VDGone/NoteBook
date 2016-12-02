"use strict";

const encryption = require("../utilities/encryption");
const users = require("../data/users");

const CONTROLLER_NAME = "users";
const DEFAULT_USERPICTURE = "http://www.freelanceme.net/Images/default%20profile%20picture.png";

module.exports = {
    getRegister: function (req, res, next) {
        res.render(CONTROLLER_NAME + "/register")
    },
    postRegister: function (req, res, next) {
        let newUserData = req.body;
        if(newUserData.profilePicture == ""){
            newUserData.profilePicture = DEFAULT_USERPICTURE;
        }
        if (newUserData.password != newUserData.confirmPassword) {
            req.session.error = "Passwords do not match!";
            res.redirect("/register");
        }
        else {
            newUserData.salt = encryption.generateSalt();
            newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
            users.create(newUserData, function (err, user) {
                if (err) {
                    console.log("Failed to register new user: " + err);
                    return;
                }

                req.logIn(user, function (err) {
                    if (err) {
                        res.status(400);
                        return res.send({ reason: err.toString() });
                    }
                    else {
                        res.redirect("/");
                    }
                })
            });
        }
    },
    getLogin: function (req, res, next) {
        res.render(CONTROLLER_NAME + "/login");
    },
    getProfile: function (req, res, next) {
        res.render(CONTROLLER_NAME + "/profile");
    },
    postProfile: function (req, res, next) {
        let newUserData = req.body;
        users.create(newUserData, function (err, user) {
            if (err) {
                console.log("Failed to register new user: " + err);
                return;
            }

            req.logIn(user, function (err) {
                if (err) {
                    res.status(400);
                    return res.send({ reason: err.toString() }); // TODO:
                }
                else {
                    res.redirect("/");
                }
            })
        });
    }
};