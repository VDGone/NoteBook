"use strict";

const mongoose = require("mongoose");

module.exports.init = () => {
    let eventSchema = mongoose.Schema({
        title: {type: String},
        creator: { type: String },
        picture: { type: String },
        date: { type: Date, default: Date.now()},
        place: { type: String },
        description: { type: String }
    });

    let Event = mongoose.model("Event", eventSchema);
};