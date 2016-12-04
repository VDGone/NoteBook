"use strict";

const EVENT = require('../data/events');

const CONTROLLER_NAME = 'events';

module.exports = {
    getEvent: (req, res) => {
        let event = req.body,
            user = req.user,
            data = {
                title: event.title,
                creator: user,
                place: event.place,
                date: event.date,
                description: event.description
            };

        res.render(CONTROLLER_NAME + "/create", data);
    },
    postEvent: (req, res) => {
        let event = req.body;
        let user = req.user;

        EVENT.postEvent(
            event,
            {
                username: user.username
            },
            (err, event) => {
                if (err) {
                    let data = {
                        title: event.title,
                        place: event.place,
                        description: event.description,
                        errorMessage: err
                    };
                    console.log(data);
                    res.render(CONTROLLER_NAME + '/create', data);
                }
                else {
                    res.redirect(`/${CONTROLLER_NAME}/details/${event._id}`);
                    console.log(JSON.stringify(event));
                }
            });
    },
    getPublic: function (req, res) {
        var page = req.query.page;
        var pageSize = req.query.pageSize;
        EVENT.publicEvents(page, pageSize, EVENT.Date, (err, data) => {
            if (err) {
                res.sendStatus(404);
            }

            res.render(CONTROLLER_NAME + '/public', {
                data: data
            });
        });
    },
    getEventById: (req, res) => {
        let id = req.params.id;
        let event = req.body;
        console.log("67 event");
        console.log(event);
        EVENT.getById(id, event, (err, data) => {
            console.log("68 events-controller.js");
            console.log(data);
            console.log(data._id);
            if (err) {
                res.sendStatus(404);
            }
            res.render(CONTROLLER_NAME + '/details', {
                data: data
            });
        });
    }
};

/*module.exports = {
    getEvents: (req, res) => EVENT.w()
        .then(event => {
            let data = {
                title: event.title,
                creator: event.creator || req.user,
                place: event.place,
                descripion: event.descripion
            }

            res.render(CONTROLLER_NAME, data);
        }),
    createSuperhero: (req, res) => {
        let { title, creator, place, descripion } = req.body;

        return EVENT.createEvent(title, creator, place, descripion)
            .then(
            event => {
                // res.render(`/${CONTROLLER_NAME}/:${event.id}`);
                res.redirect(`/${CONTROLLER_NAME}/details/${event.id}`)
            })
            .catch(err => {
                res.status(400)
                    .send(err);
            });
    }
};*/