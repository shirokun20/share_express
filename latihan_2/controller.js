'use strict'
var response = require('./res');
var qb = require('./conn');
var Joi = require('joi');
exports.users = (req, res) => {
    qb.get('person', (err, output) => {
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
exports.updateUser = (req, res) => {
	const {error} = validasi(req.body);
    if (error) return response.err({
                message: error.details[0].message
            }, res);

    var data = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
    };
    var whereNya = {
        id: req.params.user_id
    };
    qb.where(whereNya).update('person', data, (err, output) => {
        if (err) {
            response.err({
                message: err
            }, res);
        } else {
            var {
                affectedRows
            } = output;
            if (affectedRows == 1) {
                var hasil = {
                    message: "Berhasil mengubah person",
                }
                response.ok(hasil, res);
            } else {
                var hasil = {
                    message: "Gagal mengubah person",
                }
                response.err(hasil, res);
            }
        }
    });
}
exports.deleteUser = (req, res) => {
    var whereNya = {
        id: req.params.user_id
    };
    qb.where(whereNya).delete('person', (err, output) => {
        if (err) {
            response.err({
                message: err
            }, res);
        } else {
            var {
                affectedRows
            } = output;
            if (affectedRows == 1) {
                var hasil = {
                    message: "Berhasil menghapus person",
                }
                response.ok(hasil, res);
            } else {
                var hasil = {
                    message: "Gagal menghapus person",
                }
                response.err(hasil, res);
            }
        }
    });
}
exports.createUser = (req, res) => {
    const {error} = validasi(req.body);
    if (error) return response.err({
                message: error.details[0].message
            }, res);

    var data = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
    };
    qb.insert('person', data, (err, output) => {
        if (err) {
            response.err({
                message: err
            }, res);
        } else {
            var hasil = {
                message: "Berhasil menambah person",
                result: {
                    InID: output.insertId
                },
            }
            response.ok(hasil, res);
        }
    });
}

const validasi = (belajar) => {
    const schema = {
        first_name: Joi.string().min(3).required(),
        last_name: Joi.string().min(3).required()
    };
    return Joi.validate(belajar, schema);
}

exports.index = (req, res) => {
    response.ok('Selamat datang di belajar RestApi dengan Express', res);
}