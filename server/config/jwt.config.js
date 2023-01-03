const jwt = require("jsonwebtoken");

module.exports.authenticate = (req, res, next) => {
    jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY, (err, payload) => {
        if (err || payload.id !== req.params.id) {
            res.status(401).json({verified: false});
        } else {
            console.log(payload);
            next();
        }
    });
}