const express = require("express");
const session = require('express-session');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");

module.exports = function (app, config) {
    app.set("view engine", "pug");
    app.set("views", config.rootPath + "/server/views");
    app.use(cookieParser());
    app.use(session({ secret: 'purple unicorn' }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(config.rootPath + "/public"));
    app.use(function (req, res, next) {
        if (req.session.error) {
            var msg = req.session.error;
            req.session.error = undefined;
            app.locals.errorMessage = msg;
        }
        else {
            app.locals.errorMessage = undefined;
        }

        next();
    });
    app.use(function (req, res, next) {
        if (req.user) {
            app.locals.currentUser = req.user;
        }
        else {
            app.locals.currentUser = undefined;
        }

        next();
    });
};