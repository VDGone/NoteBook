/* globals */

"use strict";

const auth = require("./auth");
const controllers = require("../controllers");

module.exports = function (app) {
    app.get("/register", controllers.users.getRegister);
    app.post("/register", controllers.users.postRegister);

    app.get("/login", controllers.users.getLogin);
    app.post("/login", auth.login);
    app.get("/logout", auth.logout);

    app.get("/profile", auth.isAuthenticated, controllers.users.getProfile);

    app.get("/users", controllers.users.getPublic);
    app.get('/users/:id',controllers.users.getUserById);
    
    app.get("/categories", controllers.categories.getPublic);
    app.get("/categories/create", auth.isAuthenticated, controllers.categories.getCreate);
    app.post("/categories/create", auth.isAuthenticated, controllers.categories.postCreate);
    app.get('/categories/:title', controllers.categories.getCategoryByTitle);
    app.get('/categories/:title/add', controllers.categories.getAddAdvertisment);
    app.post('/categories/:title/add', controllers.categories.postAddAdvertisment);
    app.get('/categories/:title/:id', function(req,res){
        res.render("categories/details")
    });

    app.get("/events", controllers.events.getPublic);
    app.get("/events/details/:id", controllers.events.getEventById);
    app.get("/events/create", auth.isAuthenticated, controllers.events.getEvent);
    app.post("/events/create", auth.isAuthenticated, controllers.events.postEvent);

    app.get("/", function (req, res) {
        res.render("index");
    });

    app.get("*", function (req, res) {
        res.render("index");
    });
};