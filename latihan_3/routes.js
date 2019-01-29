'use strict'
module.exports = (app) => {
    var controllerNya = require('./controller');
	const upload = require('./upload');
    
    app.route('/').get(controllerNya.index);
    app.route('/api/upload').get(controllerNya.uploads);
    app.route('/api/upload/:tid').get(controllerNya.findUpload);
    // app.route('/api/upload/:id').get(controllerNya.findUploads);
    app.route('/api/upload/').post(upload.single('gambar'), controllerNya.createUpload);
    app.route('/api/upload/:tid').delete(controllerNya.deleteUpload);
    app.route('/api/upload/:tid').put(upload.single('gambar'), controllerNya.updateUpload);
    // app.route('/api/upload/:id').delete(controllerNya.deleteUpload);
}
