"use strict";

const mongoose = require("mongoose");

module.exports.init = () => {
    let messageSchema = mongoose.Schema({
        creator: { type: String, unique: true },
        createDate: { type: Date },
        content: {type: String}
    });

    let Message = mongoose.model("Message", messageSchema);
};