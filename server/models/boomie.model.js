const mongoose = require('mongoose');

const BoomieSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [3, 'Name must be at least 3 characters.']
    },
    species: {
        type: String
    },
    str: {
        type: Number
    },
    spd: {
        type: Number
    },
    hp: {
        type: Number
    },
    lastFed: {
        type: Date
    },
    hunger: {
        type: Number
    },
    age: {
        type: Number
    },
    lifespan: {
        type: Number
    }
}, { timestamps: true });

module.exports.Boomie = mongoose.model('Boomie', BoomieSchema);