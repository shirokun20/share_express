// Epressnya
var express = require('express');
// Dibuka dalamnya
var app = express();
// Port
var port = process.env.PORT || 3000;
// Body Parser
var bodyParser = require('body-parser');
// Cors
var cors = require('cors');
// menerima urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));
// dipakai
app.use(bodyParser.json());
// Corsnya
app.use(cors());
//routenya
var routes = require('./routes');
routes(app);
// output nya we
app.listen(port);
console.log(`Berjalan di port: ${ port }`);