const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const BoomieSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [3, 'Name must be at least 3 characters.']
    },
    alive: {
        type: Boolean
    },
    birthday: {
        type: Date
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
    hunger: {
        type: Number
    },
    lastFed: {
        type: Number
    },
    lifespan: {
        type: Number
    }
}, { timestamps: true });

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: [3, 'Username must be at least 3 characters.']
    },
    email: {
        type: String,
        minLength: [5, 'Email must be at least 5 characters.'],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email."
        }
    },
    password: {
        type: String,
        minLength: [8, 'Password must be at least 8 characters.']
    },
    boomies: {
        type: [BoomieSchema]
    }
}, { timestamps: true });

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});

UserSchema.virtual('confirmPassword')
    .get( () => this._confirmPassword )
    .set( value => this._confirmPassword = value );

UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Passwords must match.');
    }
    next();
});

module.exports.User = mongoose.model('User', UserSchema);