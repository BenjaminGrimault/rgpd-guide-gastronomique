const mongoose = require('mongoose');

module.exports = function() {
    const schema = mongoose.Schema({
        username: String,
        password: String,
        email: String,
        newsletter: String,
    });

    const model = mongoose.model('User', schema);

    return model;
}();
