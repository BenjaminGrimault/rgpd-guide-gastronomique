const express = require('express');
const router = express.Router();
const CryptoJS = require("crypto-js");
const mongoose = require('mongoose');
const User = require('../models/user');
const Review = require('../models/review');

// Page de création de compte
router.get('/create', function(req, res, next) {
    res.render('create-user');
});

// POST du formulaire de création de compte
router.post('/create', function(req, res, next) {
    const user = new User({
        username: req.body.username,
        password: CryptoJS.SHA256(req.body.password),
        email: req.body.email,
        newsletter: req.body.newsletter
    });

    user.save(function (err, user) {
        if (err) {
            throw err;
        }
        req.session.user = user;
        // On vide l'attribut password afin qu'il ne soit pas stocké en session
        req.session.user.password = '';
        res.redirect('/');
    });
});

// Page de la suppression de compte
router.get('/delete', function(req, res, next) {
    if (! req.session.user) {
        res.render('login');
    } else {
        res.render('delete-users');
    }
});

// POST de la suppression de compte
router.post('/delete', function(req, res, next) {
    // On recherche l'user courant
    User.find({email: req.session.user.email}, function(err, user){
        if(err){
            throw err;
        }
        // Stockage de son Id pour effacement des avis liés
        let id = user[0]._id;
        // Delete de l'user
        User.deleteOne(query, function(err, user){
            if(err){
                throw err;
            }
            console.log('Account successfully deleted');
            Review.deleteMany({_id: id}, function(err){
                if(err){
                    throw err;
                }
                console.log('Reviews successfully deleted');
                // Destruction de la session et déplacement sur la page de login
                req.session.destroy();
                res.redirect('/login');
            });
        });
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
