var express = require('express');
var router = express.Router();

// Accueil
router.get('/', function(req, res, next){
    if(!req.session.user){
        res.redirect('/login');
    } else {
        res.render('index', {
            username: req.session.user.username
        });
    }
});

// Accès à la page de connexion
router.get('/login', function(req, res, next){
    if(!req.session.user){
        res.render('login');
    } else {
        res.redirect('/');
    }
});

// Réinitilisation du mot de passe
router.get('/reset-password', function(req, res, next){
    res.render('reset-password');
});

// Envoi du formulaire de connexion
router.post('/login', function(req, res, next){
    // @WARNING : bypass de la logique backend de connexion pour le moment
    req.session.user = {
        username: req.body.username
    }
    res.redirect('/');
});

// Provoque la déconnexion
router.post('/logout', function(req, res, next){
    req.session.destroy();
    res.redirect('/login');
});

module.exports = router;
