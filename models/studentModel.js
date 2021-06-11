const mongoose = require('mongoose');

const studentModel = new mongoose.Schema({
    sid: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    batch: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('student', studentModel);