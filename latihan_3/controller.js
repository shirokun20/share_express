'use strict'
var response = require('./res');
var qb = require('./conn');
var Joi = require('joi');
var fs = require('fs');
// Path
var path = require('path');
// Mengambil data
exports.uploads = (req, res) => {
    qb.get('tupload', (err, output) => {
        if (err) {
            response.err({
                message: 'terjadi error'
            }, res);
        } else {
            if (output.length > 1) {
                response.ok(output, res);
            } else {
                response.err({
                    message: 'Tidak ada data.'
                }, res);
            }
        }
    })
}
exports.findUpload = (req, res) => {
    qb.where({
        id: req.params.tid
    }).get('tupload', (err, output) => {
        if (err) {
            response.err({
                message: err
            }, res);
        } else {
            if (output.length > 1) {
                response.ok(output, res);
            } else {
                response.err({
                    message: 'Tidak ada data.'
                }, res);
            }
        }
    });
}
exports.updateUpload = (req, res) => {
    if (req.file != null) {
        qb.where({
            'id': req.params.tid
        }).get('tupload', (err, output) => {
            if (err) {
                response.err({
                    message: err
                }, res);
            } else {
                if (output.length >= 1) {
                    // console.log(output[0].image);
                    if (fs.existsSync(path.join(__dirname + '/public/images/' + output[0].image))) {
                        fs.unlink(path.join(__dirname + '/public/images/' + output[0].image));
                    }
                    var where = {
                        'id': req.params.tid
                    }
                    var data = {
                        image: req.file.filename,
                    };
                    qb.where(where).update('tupload', data, (errNya, output) => {
                        if (errNya) {
                            response.err({
                                message: errNya
                            }, res);
                        } else {
                            var {
                                affectedRows
                            } = output;
                            if (affectedRows == 1) {
                                var hasil = {
                                    message: "Berhasil mengubah T Upload",
                                }
                                response.ok(hasil, res);
                            } else {
                                var hasil = {
                                    message: "Gagal mengubah T Upload",
                                }
                                response.err(hasil, res);
                            }
                        }
                    });
                } else {
                    response.err({
                        message: 'Gagal mengubah T Upload'
                    }, res);
                }
            }
        });
    } else {
        response.err({
            message: "Gagal mengubah T Uploads"
        }, res);
    }
}
exports.deleteUpload = (req, res) => {
    qb.where({
        'id': req.params.tid
    }).get('tupload', (err, output) => {
        if (err) {
            response.err({
                message: err
            }, res);
        } else {
            if (output.length >= 1) {
                // console.log(output[0].image);
                if (fs.existsSync(path.join(__dirname + '/public/images/' + output[0].image))) {
                    fs.unlink(path.join(__dirname + '/public/images/' + output[0].image));
                }
                var where = {
                    'id': req.params.tid
                }
                qb.where(where).delete('tupload', (errNya, output) => {
                    if (errNya) {
                        response.err({
                            message: errNya
                        }, res);
                    } else {
                        var {
                            affectedRows
                        } = output;
                        if (affectedRows == 1) {
                            var hasil = {
                                message: "Berhasil menghapus T Upload",
                            }
                            response.ok(hasil, res);
                        } else {
                            var hasil = {
                                message: "Gagal menghapus T Upload",
                            }
                            response.err(hasil, res);
                        }
                    }
                });
            } else {
                response.err({
                    message: 'Gagal menghapus T Upload'
                }, res);
            }
        }
    });
}
exports.createUpload = (req, res) => {
    if (req.file != null) {
        var data = {
            image: req.file.filename,
        };
        qb.insert('tupload', data, (err, output) => {
            if (err) {
                response.err({
                    message: err
                }, res);
            } else {
                var hasil = {
                    message: "Berhasil menambah T Uploads",
                    result: {
                        InID: output.insertId
                    },
                }
                response.ok(hasil, res);
            }
        });
    } else {
        response.err({
            message: "Gagal menambah T Uploads"
        }, res);
    }
}
exports.index = (req, res) => {
    response.ok('Selamat datang di belajar RestApi dengan Express', res);
}