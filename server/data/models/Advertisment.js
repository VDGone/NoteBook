"use strict";

const mongoose = require("mongoose");

module.exports.init = () => {
    let advertismentSchema = mongoose.Schema({
        title: { type: String },
        description: { type: String },
        date: { type: Date },
        price: { type: Number },
        type: { type: Object },
        picture: {type: String },
        comments: [{ type: Object }]
    });

    let Advertisment = mongoose.model("Advertisment", advertismentSchema);
};