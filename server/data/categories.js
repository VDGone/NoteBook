"use strict";

var Category = require("mongoose").model("Category");

module.exports = {
    create: (category, user, callback) => {
        if (category.title < 0 || category.description < 0) {
            callback("Invalid category!");
            return;
        }

        Category.create(category, callback);
    },
    publicCategories: (page, pageSize, date, callback) => {
        page = page || 1;
        pageSize = pageSize || 9;
        Category
            .find(date)
            .sort({
                date: "desc"
            })
            .limit(pageSize)
            .skip((page - 1) * pageSize)
            .exec((err, foundCategories) => {
                if (err) {
                    callback(err);
                    return;
                }

                Category.count().exec((err, numberOfCategories) => {
                    var data = {
                        categories: foundCategories,
                        currentPage: page,
                        pageSize: pageSize,
                        total: numberOfCategories
                    };

                    callback(err, data);
                });
            })
    },
<<<<<<< HEAD
    getById: function (id, category, callback) {
        Category.findById(id, (err, category) => {
            // console.log(category);
=======
    getByTitle: function (title, category, callback) {
        Category.findOne({title: `${title}`}, (err, category) => {
>>>>>>> refs/remotes/origin/gogo
            if (err) {
                callback("Not found! " + err);
            }
            let data = {
                title: category.title,
                items: category.items,
                description: category.description,
                picture: category.picture
            };
            callback(err, data)
        })
    },
    getByTitleAndUpdate: function (title,category, callback) {
        Category.update({title: `${title}`},{$push: {items: category}}).exec();
    } 
};