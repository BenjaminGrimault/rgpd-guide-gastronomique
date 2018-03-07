const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');
const router = express.Router();
const db = mongoose.connection;

// Page de création de compte
router.get('/create', function(req, res, next) {
    res.render('create-user');
});

// POST du formulaire de création de compte
router.post('/create', function(req, res, next) {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        newsletter: req.body.newsletter
    });

    user.save(function (err, user) {
        if (err) {
            throw err;
        }
        req.session.user = {
            username: req.body.username
        };
        res.redirect('/');
    });
});

module.exports = router;
