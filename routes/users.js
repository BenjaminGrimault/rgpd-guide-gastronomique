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

// Page de gestion de compte
router.get('/account', function(req, res, next) {
    if (! req.session.user) {
        res.render('login');
    } else {
        res.render('account', {
            email: req.session.user.email
        });
    }
});

router.post('/update', function(req, res, next) {
    let query = {email: req.session.user.email};
    // Si l'email est différent on le met à jour
    if(req.body.email != req.session.user.email){
        // On attribue le nouveau mail via l'update
        let update = {email: req.body.email};
        User.findOneAndUpdate(query, update, function(err, user){
            if(err){
                throw err;
            }
            // On modifie également l'email présent dans la variable de session
            req.session.user.email = req.body.email;
            console.log('Account successfully updated');
            res.redirect('/');
        });
    } else {
        // @TODO : Même chose pour l'inscription newsletter
        console.log('Account wasn\'t updated');
        res.redirect('/');
    }
});


module.exports = router;
