var advertisments = require('../data/advertisments');

var Category = require("mongoose").model("Category");

var CONTROLLER_NAME = 'advertisments';

module.exports = {
    getAdd: function (req, res) {
        let advertisment = req.body;
        res.render(CONTROLLER_NAME + '/add-advertisment', {
            title: advertisment.title,
            description: advertisment.description,
            price: advertisment.price,
            type: advertisment.type,
            picture: advertisment.picture
        });
    },
    create: function (req, res) {
        let advertisment = req.body;
        let user = req.user;
        advertisments.create(advertisment)
    },
    getPublic: function (req, res) {
        let page = req.query.page;
        let pageSize = req.query.pageSize;

        advertisments.publicAdvertisments(page, pageSize, advertisments.Date, function (err, data) {
            res.render(CONTROLLER_NAME + '/advertisments', {
                data: data
            });
        });
    },
    getCategoryById: function (req, res) {
        let id = req.params.id;
        let category = req.body;
        advertisments.getById(id, category, function (err, data) {
            res.render(CONTROLLER_NAME + '/details', {
                data: data
            });
        });
    }
};