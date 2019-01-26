'use strict'
exports.ok = (hasilnya, res) => {
    var data = {
        status: 200,
        values: hasilnya,
    };
    res.json(data);
    res.end();
}
exports.err = (hasilnya, res) => {
    var data = {
        status: 404,
        values: hasilnya,
    };
    res.json(data);
    res.end();
}