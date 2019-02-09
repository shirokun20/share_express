'use strict'
module.exports = (app) => {
    var controllerNya = require('../controller/sms');
    app.route('/').get(controllerNya.index);
    app.route('/api/sms/').post(controllerNya.sendSms);
}
