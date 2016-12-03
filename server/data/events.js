"use strict";

const EVENT = require("mongoose").model("Event");

module.exports = {
    postEvent: (event, user, callback) => {
        if (event.title.length < 0 || event.description.length < 0) {
            callback("Invalid event!");
            return;
        }
        // console.log(event);

        EVENT.create(event, callback);
    },
    publicEvents: (page, pageSize, date, callback) => {
        page = page || 1;
        pageSize = pageSize || 9;
        EVENT
            .find(date)
            .sort({
                date: "desc"
            })
            .limit(pageSize)
            .skip((page - 1) * pageSize)
            .exec((err, foundEvents) => {
                if (err) {
                    console.log("ERROOOOR");
                    callback(err);
                    return;
                }

                EVENT.count().exec((err, numberOfEvents) => {
                    var data = {
                        events: foundEvents,
                        currentPage: page,
                        pageSize: pageSize,
                        total: numberOfEvents
                    };

                    callback(err, data);
                });
            })
    },
    getById: function (id, event, callback) {
        EVENT.findOne({ _id: id }, (err, event) => {
            console.log(event + "events.js" + " 46row");
            if (err) {
                callback("Not found! " + err);
            }
            let data = {
                title: event.title,
                place: event.place,
                description: event.description
            };
            callback(err, data)
        })
    }
};

/*module.exports = {
    getEvents() {
        return new Promise((resolve, reject) => {
            Event.find((err, events) => {
                if (err) {
                    return reject(err);
                }
                return resolve(events);
            });
        });
    },
    getEventById(id) {
        //TODO: Validation
        return new Promise((resolve, reject) => {
            Event.findOne({ _id: id }, (err, event) => {
                if (err) {
                    return reject(err);
                }

                return resolve(event);
            })
        })
    },
    createEvent: (title, creator, place, description) => {
        if (title.length === 0) {
            return Promise.reject({ reason: "Title cannot be empty!" });
        }

        let event = new Event({
            title,
            creator,
            place,
            description
        });

        return new Promise((resolve, reject) => {
            Event.save(err => {
                if (err) {
                    reject(err);
                }

                return resolve(event);
            });
        })
    }
};*/