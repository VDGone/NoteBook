/* globals */

"use strict";

const auth = require("./auth");
const controllers = require("../controllers");

module.exports = function(app) {
    app.get("/register", controllers.users.getRegister);
    app.post("/register", controllers.users.postRegister);

    app.get("/login", controllers.users.getLogin);
    app.post("/login", auth.login);
    app.get("/logout", auth.logout);

    app.get("/profile", function (req, res){
        res.render("users/profile");
    });

    app.get("/", function(req, res) {
        res.render("index");
    });

    app.get("*", function(req, res) {
        res.render("index");
    });
};