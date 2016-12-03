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
    getCategoryByTitle: function (req, res) {
        var title = req.params.title;
        var category = req.body;
        categories.getByTitle(title, category, function (err, data) {
            res.render(CONTROLLER_NAME + '/category', {
                data: data
            },
            console.log(data));
        });
    },
    postAdd: function(req,res) {
        let title = req.params.title;
        let  category = req.body;
        categories.getByTitleAndUpdate(title,category,function(err,data){
        })
        res.redirect('/');
    }
};