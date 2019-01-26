'use strict'
module.exports = (app) => {
    var controllerNya = require('./controller');
    app.route('/').get(controllerNya.index);
    app.route('/api/users').get(controllerNya.users);
    app.route('/api/users/:user_id').get(controllerNya.findUsers);
    app.route('/api/users/').post(controllerNya.createUser);
    app.route('/api/users/:user_id').put(controllerNya.updateUser);
    app.route('/api/users/:user_id').delete(controllerNya.deleteUser);
}