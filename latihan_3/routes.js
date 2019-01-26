'use strict'
module.exports = (app) => {
    var controllerNya = require('./controller');
	const upload = require('./upload');
    
    app.route('/').get(controllerNya.index);
    app.route('/api/upload').get(controllerNya.uploads);
    // app.route('/api/upload/:id').get(controllerNya.findUploads);
    app.route('/api/upload/').post(upload.single('gambar'), controllerNya.createUpload);
    // app.route('/api/upload/:id').put(controllerNya.updateUpload);
    // app.route('/api/upload/:id').delete(controllerNya.deleteUpload);
}
