const usersController = require("./users-controller");
const categoriesController = require("./categories-controller");
const eventsController = require("./events-controller");

module.exports = {
    users: usersController,
    categories: categoriesController,
    events: eventsController
};