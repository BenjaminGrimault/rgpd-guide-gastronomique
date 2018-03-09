const express = require('express');
const mongoose = require('mongoose');
const Restaurant = require('../models/restaurant');
const Review = require('../models/review');
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
    let restaurant = undefined;
    let reviews = undefined;

    const render = function() {
        if (restaurant !== undefined && reviews !== undefined) {
            res.render('restaurant/view', {
                restaurant: restaurant,
                reviews: reviews,
            });
        }
    };

    Restaurant.findOne({restaurant_id: id}, function(err, doc) {
        if (err) {
            return console.error(err);
        }
        restaurant = doc;
        
        render();
    });

    Review.find({restaurantId: id}, function(err, docs) {
        if (err) {
            return console.error(err);
        }
        reviews = docs;

        render();
    });
});

module.exports = router;
