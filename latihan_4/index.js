// express
var express = require('express');
// Dibuka didalamnya
var app = express();
// Port
var port = process.env.PORT || 3000;
// Body Parser
var bodyParser = require('body-parser');
// Cors
var cors = require('cors');
// Form data
var multer = require('multer');
var upload = multer();
// menerima urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));
// dipakai
app.use(bodyParser.json());
// Corsnya
app.use(cors());// haha
// Form data
app.use(upload.array()); 
app.use(express.static('public'));
//routenya
var routes = require('./routes');
routes(app); 
// output nya we
app.listen(port);
console.log(`Berjalan di port: ${ port }`);