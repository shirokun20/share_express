// var mysql = require('mysql');
var data = {
    host: "localhost",
    user: "root",
    password: "",
    database: "belajar",
};

var qb = require('node-querybuilder').QueryBuilder(data, 'mysql', 'single');
// var con = mysql.createConnection(data);
// con.connect((err) => {
//     if (err) throw err;
// });
module.exports = qb;