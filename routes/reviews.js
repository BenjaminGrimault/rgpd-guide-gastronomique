const express = require('express');
const mongoose = require('mongoose');
const Review = require('../models/review');
const router = express.Router();
const db = mongoose.connection;

router.post('/create', function(req, res, next) {
    const review = new Review({
        date: new Date(),
        text: req.body.text,
        stars: req.body.stars,
        restaurantId: req.body.restaurantId,
        userId: req.session.user._id,
        userName: req.session.user.username,
    });

    review.save(function(err, review) {
        if (err) {
            throw err;
        }

        res.redirect('/restaurants/id/' + req.body.restaurantId);
    });
});

module.exports = router;
