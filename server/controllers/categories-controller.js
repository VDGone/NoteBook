var categories = require('../data/categories');

var CONTROLLER_NAME = 'categories';

module.exports = {
    getCreate: function (req, res) {
        var category = req.body;
        res.render(CONTROLLER_NAME + '/create', {
            title: category.title,
            description: category.description,
            picture: category.picture,
            items: category.items
        });
    },
    postCreate: function (req, res) {
        var category = req.body;
        var user = req.user;
        categories.create(
            category,
            {
                username: user.username
            },
            function (err, category) {
                if (err) {
                    var data = {
                        title: category.title,
                        description: category.description,
                        picture: category.picture,
                        errorMessage: err
                    };
                    res.render(CONTROLLER_NAME + '/create', data);
                }
                else {
                    res.redirect('/categories/details/' + category._id);
                    console.log(JSON.stringify(category));
                }
            })
    },
    getPublic: function (req, res) {
        var page = req.query.page;
        var pageSize = req.query.pageSize;

        categories.publicCategories(page, pageSize, categories.Date, function (err, data) {
            res.render(CONTROLLER_NAME + '/public', {
                data: data
            });
        });
    },
    getCategoryById: function (req, res) {
        var id = req.params.id;
        var category = req.body;
        categories.getById(id, category, function (err, data) {
             console.log(data);
            res.render(CONTROLLER_NAME + '/details', {
                data: data
            });
        });
    }
};