const mongoose = require('mongoose');

module.exports = function() {
    const schema = mongoose.Schema({
        address: {
           building: String,
           coord: [ Number, Number ],
           street: String,
           zipcode: String,
        },
        borough: String,
        cuisine: String,
        grades: [{ date: Date, grade: String, score: Number }],
        name: String,
        restaurant_id: String,
    });

    const model = mongoose.model('Restaurant', schema);

    return model;
}();
