const categories = require('../data/categories');

const CONTROLLER_NAME = 'categories';

module.exports = {
    getCreate: function (req, res) {
        let category = req.body;
        res.render(CONTROLLER_NAME + '/create', {
            title: category.title,
            description: category.description,
            picture: category.picture,
            items: category.items
        });
    },
    postCreate: function (req, res) {
        let category = req.body;
        let user = req.user;
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
        let page = req.query.page;
        let pageSize = req.query.pageSize;

        categories.publicCategories(page, pageSize, categories.Date, function (err, data) {
            res.render(CONTROLLER_NAME + '/public', {
                data: data
            });
        });
    },
    getCategoryByTitle: function (req, res) {
        let title = req.params.title;
        let category = req.body;
        categories.getByTitle(title, category, function (err, data) {
            res.render(CONTROLLER_NAME + '/category', {
                data: data
            },
            console.log(data));
        });
    },
    getAddAdvertisment: function (req, res) {
        let advertisment = req.body;
        res.render(CONTROLLER_NAME + '/add-advertisment', {
            title: advertisment.title,
            description: advertisment.description,
            price: advertisment.price,
            type: advertisment.type,
            picture: advertisment.picture
        });
    },
    postAddAdvertisment: function(req,res) {
        let title = req.params.title;
        let  category = req.body;
        categories.getByTitleAndUpdate(title,category,function(err,data){
        })
        res.redirect('/');
    }
};