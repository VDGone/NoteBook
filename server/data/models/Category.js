"use strict";

const mongoose = require("mongoose");

module.exports.init = () => {
    let categorySchema = mongoose.Schema({
        title: { type: String, unique: true },
        picture: { type: String },
        items: [{type: mongoose.Schema.Types.Object }],
        description: {type: String}
    });

    let Category = mongoose.model("Category", categorySchema);
};