'use strict'
var response = require('./res');
var qb = require('./conn');
var Joi = require('joi');
var fs = require('fs');
// Path
var path = require('path');
// Mengambil data
exports.uploads = (req, res) => {
    qb.get('tuplod', (err, output) => {
        if (err) {
            response.err({
                message: 'terjadi error'
            }, res);
        } else {
            response.ok(output, res);
        }
    })
}
exports.findUsers = (req, res) => {
    qb.where({
        id: req.params.user_id
    }).get('person', (err, output) => {
        if (err) {
            response.err({
                message: err
            }, res);
        } else {
            response.ok(output, res);
        }
    });
}
// exports.updateUser = (req, res) => {
//  const {error} = validasi(req.body);
//     if (error) return response.err({
//                 message: error.details[0].message
//             }, res);
//     var data = {
//         first_name: req.body.first_name,
//         last_name: req.body.last_name,
//     };
//     var whereNya = {
//         id: req.params.user_id
//     };
//     qb.where(whereNya).update('person', data, (err, output) => {
//         if (err) {
//             response.err({
//                 message: err
//             }, res);
//         } else {
//             var {
//                 affectedRows
//             } = output;
//             if (affectedRows == 1) {
//                 var hasil = {
//                     message: "Berhasil mengubah person",
//                 }
//                 response.ok(hasil, res);
//             } else {
//                 var hasil = {
//                     message: "Gagal mengubah person",
//                 }
//                 response.err(hasil, res);
//             }
//         }
//     });
// }
exports.deleteUpload = (req, res) => {
    qb.where({
        'id': req.params.tid
    }).get('tuplod', (err, output) => {
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
                qb.where(where).delete('tuplod', (errNya, output) => {
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
        qb.insert('tuplod', data, (err, output) => {
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