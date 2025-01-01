const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    date: {
        type: Date,
        default: Date.now
    },
    venue: String,
    times: String,
    user_id: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);