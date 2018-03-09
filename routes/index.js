const express = require('express');
const router = express.Router();
const CryptoJS = require("crypto-js");
const mongoose = require('mongoose');
const User = require('../models/user');
const db = mongoose.connection;

// Accueil
router.get('/', function(req, res, next) {
    if (! req.session.user) {
        res.redirect('/login');
    } else {
        res.render('index', {
            username: req.session.user.username
        });
    }
});

// Accès à la page de connexion
router.get('/login', function(req, res, next) {
    if (! req.session.user) {
        res.render('login');
    } else {
        res.redirect('/');
    }
});

// Réinitilisation du mot de passe par renvoi de mail
router.get('/reset-password', function(req, res, next) {
    res.render('reset-password');
});

// Si le mail est dans la base, on simule un envoi de mail
router.post('/reset-password', function(req, res, next) {
    User.find({email: req.body.email}, function(err, user) {
        if (err) {
            throw err;
        }
        if (user.length === 1) {
            res.render('message', {
                message: "Un mail contenant les instructions de réinitialisation de mot de passe vous à été envoyé."
            });
        } else {
            res.render('message', {
                message: "Nous sommes désolés mais cette adresse n'est pas connue de notre site."
            });
        }
    });
});

// Envoi du formulaire de connexion
router.post('/login', function(req, res, next) {
    let binds = {
        username: req.body.username
    };
    User.find(binds, function(err, user) {
        if (err) {
            throw err;
        }
        if(user.length > 0){
            user = user[0];
            if (user.password === CryptoJS.SHA256(req.body.password).toString()) {
                req.session.user = user;
                // On vide l'attribut password afin qu'il ne soit pas stocké dans la session (bien qu'il soit chiffré)
                req.session.user.password = '';
                res.redirect('/');
            } else {
                res.redirect('/login');
            }
        }
        res.redirect('/login');
    });
});

// Provoque la déconnexion
router.get('/cgu', function(req, res, next) {
    res.render('CGU');
});

// Provoque la déconnexion
router.get('/logout', function(req, res, next) {
    req.session.destroy();
    res.redirect('/login');
});

module.exports = router;
