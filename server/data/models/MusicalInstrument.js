"use strict";

const mongoose = require("mongoose");

module.exports.init = () => {
    let musicalInstrumentSchema = mongoose.Schema({
        name: { type: String },
        type: { type: String },
        price: { type: String },
        comments: [{ type: Object }],
        description: { type: String }
    });

    let MusicalInstrument = mongoose.model("MusicalInstrument", musicalInstrumentSchema);
};