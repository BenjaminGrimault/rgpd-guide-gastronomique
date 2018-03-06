const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');
const router = express.Router();
const db = mongoose.connection;

router.get('/create', function(req, res, next) {
    res.render('create-user');
});

router.post('/create', function(req, res, next) {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
    });

    user.save(function (err, user) {
        if (err) {
            return console.error(err);
        } else {
            return console.log('User créé');
        }
    });

    // Là je bypass en créant l'user et en le ramenant à l'accueil
    req.session.user = {
        username: req.body.username
    };
    res.redirect('/');
});

module.exports = router;
