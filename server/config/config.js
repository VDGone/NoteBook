"use strict";

const path = require('path');
const rootPath = path.normalize(path.join(__dirname, '/../../'));

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost:27017/NoteBook',
        port: process.env.PORT || 3000
    }
};