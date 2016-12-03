const usersController = require("./users-controller");
const categoriesController = require("./categories-controller");
const advertismentsController = require("./advertisments-controller");

module.exports = {
    users: usersController,
    categories: categoriesController,
    advertisments: advertismentsController
};