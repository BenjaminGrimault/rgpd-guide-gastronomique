const mongoose = require('mongoose');

module.exports = function() {
    let schema = mongoose.Schema({
        username: String,
        password: String,
        email: String,
    });

    let model = mongoose.model('User', schema);

    return model;
}();
