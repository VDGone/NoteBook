"use strict";

const mongoose = require("mongoose");

//add models
const UserModel = require("../data/models/User");
const CategoryModel = require("../data/models/Category");
const EventModel = require("../data/models/Event");

module.exports = function(config) {
    mongoose.Promise = global.Promise; // removes the error in the console for depricated promises.
    mongoose.connect(config.db);
    let db = mongoose.connection;

    db.once("open", function(err) {
        if (err) {
            console.log("Database could not be opened: " + err);
            return;
        }

        console.log("Database up and running...")
    });

    db.on("error", function(err){
        console.log("Database error: " + err);
    });

    // init models
    UserModel.init();
    CategoryModel.init();
    EventModel.init();
};