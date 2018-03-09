const mongoose = require('mongoose');

module.exports = function() {
    const schema = mongoose.Schema({
        date: Date,
        text: String,
        stars: Number,
        restaurantId: Number,
        userId: String,
        userName: String,
    });

    const model = mongoose.model('Review', schema);

    return model;
}();
