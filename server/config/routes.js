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
    app.get('/users/:id',controllers.users.getUserById);
    
    app.get("/categories", controllers.categories.getPublic);
    app.get('/categories/:title', controllers.categories.getCategoryByTitle);
    app.get('/categories/:title/add', controllers.advertisments.getAdd);
    app.post('/categories/:title/add', controllers.categories.postAdd);
    app.get('/categories/:title/:id', function(req,res){
        res.render("categories/details")
    });
    app.get("/categories/create", auth.isAuthenticated, controllers.categories.getCreate);
    app.post("/categories/create", auth.isAuthenticated, controllers.categories.postCreate);

    app.get("/", function(req, res) {
        res.render("index");
    });

    app.get("*", function(req, res) {
        res.render("index");
    });
};