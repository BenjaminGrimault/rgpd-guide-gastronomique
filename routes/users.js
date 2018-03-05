var express = require('express');
var router = express.Router();

router.get('/create', function(req, res, next) {
    res.render('create-user');
});

router.post('/create', function(req, res, next) {
    // @WARNING : Ajouter ici l'insertion d'un nouvel user
    // Là je bypass en créant l'user et en le ramenant à l'accueil
    req.session.user = {
        username: req.body.username
    }
    res.redirect('/');
});

module.exports = router;
