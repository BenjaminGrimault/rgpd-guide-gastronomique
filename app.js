const express = require('express');
const app = express();
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');

// Variables d'environnement
require('dotenv').load();

// Controllers
const index = require('./routes/index');
const users = require('./routes/users');

mongoose.connect(process.env.DB_URL + '/' + process.env.DB_NAME, {
    // Maintient 10 socket de connexion ouverts
    poolSize: 10,
}, function(error) {
    console.log(error || 'Connected successfully to database');
});

// Moteur de template des vues
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// A décommenter après avoir placé la favicon dans /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'Shhhhhht!',
    resave: true,
    saveUninitialized: true
}));

app.use('/', index);
app.use('/users', users);

// Capture les 404 et les passe au gestionnaire d'erreur
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Gestionnaire d'erreur
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
