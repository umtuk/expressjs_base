var express = require('./node_modules/express');
var router = express.Router();

var DB = require('../libs/DB');
var hash = require('../libs/hash');
var pError = require('../libs/pError');

router.get('/UpdateAccess', function(req, res, next) {
    var id = req.params.id;
    var accessToken = req.headers['x-access-token'];

    DB.utils.checkAccessToken(accessToken, id).then(
        results => {
            var id = results[0].id;
            var accessTime = new Date().getTime();
            var accessToken = hash.saltHash(accessTime);

            var query = 'UPDAtE UserAccount SET ? WHERE id = ?'
            var params = [
                {
                    accessToken: accessToken,
                    accessTime: accessTime,
                },
                id
            ];
            return DB.query(query, params);
        }
    ).then(
        results => {
            console.log('GET /User/UpdateAccess: Success.');

            res.status(200).send({
                id: id,
                accessTime: accessTime,
                accessToken: accessToken,
            });
        }
    ).catch(
        error => {
            console.log('GET /User/UpdateAccess: ' + error);
            if (pError.DB.process(error, res) != 0) {
                //
            } else {
                res.status(400).send(error);
            }
        }
    )
});

module.exports = router;