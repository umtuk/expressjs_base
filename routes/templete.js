var express = require('express');
var router = express.Router();

var DB = require('./libs/DB');
var pError = require('./libs/pError');

router.get('/templete', function(req, res, next) {
    var id = req.params.id;
    var accessToken = req.headers['x-access-token'];
    DB.utils.checkAccessToken(accessToken, id).then(
        results => {

            res.status(200).send(results);
        }
    ).catch(
        error => {
            console.log("ERROR GET /User/SignOut: " + error);
            if (pError.DB.process(error, res) != 0) {
                //
            } else {
                res.status(400).send(error);
            }
        }
    );
});

module.exports = router;