const UserController = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = function(app) {
    app.post('/api/users/new', UserController.createUser);
    app.post('/api/users/login', UserController.login);
    app.get('/api/users/logout', UserController.logout);
    app.get('/api/users', UserController.getAllUsers);
    app.get('/api/users/:id', authenticate, UserController.getOneUser);
    app.put('/api/users/:id', UserController.updateUser);
    app.delete('/api/users/:id', UserController.deleteUser);
    app.get('/api/users/random', UserController.getRandomUser);
}