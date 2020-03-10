var express = require('express');
var router = express.Router();

var DB = require('../libs/DB');
var pError = require('../libs/pError');

router.get('/SignOut', function(req, res, next) {
    var id = req.params.id;
    var accessToken = req.headers['x-access-token'];
    DB.utils.checkAccessToken(accessToken, id).then(
        results => {
            var query = 'UPDATE UserAccount SET accessTime = 0 WHERE id = ?';
            var params = [id];

            return DB.query(query, params);
        }
    ).then(
        results => {
            console.log("GET /User/SignOut: Success");

            res.status(200).send({
                id: id,
            });
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