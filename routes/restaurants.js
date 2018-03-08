const express = require('express');
const mongoose = require('mongoose');
const Restaurant = require('../models/restaurant');
const router = express.Router();
const db = mongoose.connection;

router.get('/', function(req, res, next) {
    const limit = 12;
    const page = req.query.page - 0 || 0;
    const skip = page * limit;

    Restaurant.find({}, null, {
        limit: limit,
        skip: skip,
    }, function(err, restaurants) {
        res.render('restaurant/restaurants', {
            restaurants: restaurants,
            previousPage: (page > 0 ? page - 1 : page),
            nextPage: page + 1,
        });
    });
});

router.get('/id/:restaurant_id', function(req, res, next) {
    const id = req.params.restaurant_id;

    Restaurant.findOne({restaurant_id: id}, function(err, restaurant) {
        if (err) {
            return console.error(err);
        }

        res.render('restaurant/view', {
            restaurant: restaurant,
        });
    });
});

module.exports = router;
