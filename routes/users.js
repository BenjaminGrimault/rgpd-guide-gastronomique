module.exports = function(db){
	const express = require('express');
	const router = express.Router();
	const assert = require('assert');

	router.get('/create', function(req, res, next) {
		db.collection('Users').find({}).toArray(function(err, users){
			assert.equal(err, null);
			console.log('Bite !');
			console.log(users);
		});
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

	return router;
}
