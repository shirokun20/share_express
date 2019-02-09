'use strict'
var response = require('../res/index');
var qb = require('../conn/index');
var Joi = require('joi');
var fs = require('fs');
var api = require('./api');

// Path
var path = require('path');
// Mengambil data
exports.sendSms = (req, res) => {
    const { error } = validasi(req.body);
    if (error) return response.err({
        message: error.details[0].message
    }, res);
    api.mengirim(req.body, (e) => {
        if (e.error) return response.err({
            message: e.error.message
        }, res);

      response.ok(e.body, res);
    });
}
const validasi = (belajar) => {
    const schema = {
        phone_number: Joi.string().min(12).required(),
        message: Joi.string().min(3).required(),
        device_id: Joi.string().required()
    };
    return Joi.validate(belajar, schema);
}
exports.index = (req, res) => {
    response.ok('Selamat datang di belajar RestApi dengan Express', res);
}