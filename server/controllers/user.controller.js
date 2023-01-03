const { User } = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


// module.exports.createUser = (req, res) => {
//     User.create(req.body)
//         .then(user => res.json({ msg: "success!", user: user }))
//         .catch(err => res.status(400).json(err));
// }

// CREATE WITH LOGIN
module.exports.createUser = (req, res) => {
    User.create({...req.body, boomies: []})
        .then(user => {
            console.log('user: ', user);
            const userToken = jwt.sign({
                id: user._id
            }, process.env.SECRET_KEY);

            res
                .cookie('usertoken', userToken, {
                    httpOnly: true
                })
                .json({ msg: 'success!', user: user });
        })
        .catch(err => res.status(400).json(err));
}

module.exports.getAllUsers = (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.json(err));
}

module.exports.getOneUser = (req, res) => {
    User.findOne({_id: req.params.id})
        .then(user => res.json(user))
        .catch(err => res.status(400).json(err));
}

module.exports.updateUser = (req, res) => {
    User.findOneAndUpdate({_id: req.params.id}, req.body, {runValidators: true, new: true})
        .then(updatedUser => res.json(updatedUser))
        .catch(err => res.status(400).json(err));
}

module.exports.deleteUser = (req, res) => {
    User.deleteOne({_id: req.params.id })
        .then(deleteConfirmation => res.json(deleteConfirmation))
        .catch(err => res.json(err));
}

module.exports.getRandomUser = (req, res) => {
    User.find()
        .then(users => {
            const randIndex = Math.floor(Math.random() * users.length);
            return res.json(users[randIndex]);
        })
        .catch(err => res.json(err));
}

module.exports.login = async(req, res) => {
    const user = await User.findOne({ username: req.body.username });

    if (user === null) {
        // username not found in users collection
        return res.sendStatus(400);
    }

    // if we made it this far, we found a user with this username
    // let's compare the supplied password to the hashed password in the database
    const correctPassword = await bcrypt.compare(req.body.password, user.password);

    if (!correctPassword) {
        // password wasn't a match!
        return res.sendStatus(400);
    }

    // if we made it this far, the password was correct
    const userToken = jwt.sign({
        id: user._id
    }, process.env.SECRET_KEY);

    // note that the response object allows chained calls to cookie and json
    res
        .cookie("usertoken", userToken, {
            httpOnly: true
        })
        .json({ msg: 'success!' , id: user._id});
}

module.exports.logout = (req, res) => {
    res.clearCookie('usertoken');
    res.sendStatus(200);
}