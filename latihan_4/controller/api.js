var api = require("unirest");
var link = "https://smsgateway.me/api/v4/";
var token = "Masukan token api nya hehe";
exports.mengirim = (req, callback = null) => {
    api.post(link + 'message/send').headers({
        "Postman-Token": "ce0a5563-a764-4e21-88ac-ecdb192be5ed",
        "cache-control": "no-cache",
        "Content-Type": "application/json",
        "Authorization": token
    }).type("json").send([{
        "phone_number": req.phone_number,
        "message": req.message,
        "device_id": req.device_id
    }]).end(function(hasil) {
        if (callback != null) {
            callback(hasil);
        }
    });
}
exports.infodevice = (req, callback = null) => {
    api.get(link + 'device/' + req.device_id).headers({
        "Postman-Token": "ce0a5563-a764-4e21-88ac-ecdb192be5ed",
        "cache-control": "no-cache",
        "Authorization": token
    }).end(function(hasil) {
        if (callback != null) {
            callback(hasil);
        }
    });
}