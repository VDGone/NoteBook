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

    app.get("/profile", auth.isAuthenticated, controllers.users.getProfile);

    app.get("/advertisments", controllers.advertisments.getPublic);

    app.get("/users", controllers.users.getPublic);
    app.get('/users/:id', controllers.users.getUserById);
    
    app.get("/categories", controllers.categories.getPublic);
    app.get('/categories/details/:id', controllers.categories.getCategoryById);
    app.get("/categories/create", auth.isAuthenticated, controllers.categories.getCreate);
    app.post("/categories/create", auth.isAuthenticated, controllers.categories.postCreate);

    app.get("/", function(req, res) {
        res.render("index");
    });

    app.get("*", function(req, res) {
        res.render("index");
    });
};