"use strict";

const mongoose = require("mongoose");

//add models
const UserModel = require("../data/models/User");
const CategoryModel = require("../data/models/Category");
const AdvertismentModel = require("../data/models/Advertisment");

module.exports = function(config) {
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
    AdvertismentModel.init();
};