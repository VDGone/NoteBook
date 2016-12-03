"use strict";

const mongoose = require("mongoose");

module.exports.init = () => {
    let eventSchema = mongoose.Schema({
        creator: { type: Object },
        date: { type: Date },
        place: { type: String },
        description: { type: String }
    });

    let Event = mongoose.model("Event", eventSchema);
};