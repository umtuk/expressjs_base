var express = require('express');
var router = express.Router();

var DB = require('../libs/DB');
var pError = require('../libs/pError');

router.post('/DeleteAccount', function(req, res, next) {
    var id = req.body.id;
    var password = req.body.password;
    var accessToken = req.headers['x-access-token'];

    DB.utils.checkAccessToken(accessToken).then(
        results => {
            return DB.utils.checkPassword(id, password);
        }
    ).then(
        results => {
            var query = [
                'DELETE FROM UserAccount WHERE ID = ?',
                'DELETE FROM RequestSignUp WHERE ID = ?',
            ]
            var params = [
                [id],
                [id],
            ]
            if (results[0].type == DB.UserAccount.type.unconfirmed) {
                return Promise.all([
                    DB.query(query[0], params[0]),
                    DB.query(query[1], params[1]),
                ]);
            } else {
                return DB.query(query[0], params[0]);
            }
        }
    ).then(
        results => {
            console.log('POST /User/DeleteAccount: Success');

            res.status(200).send({
                id: id,
            })
        }
    ).catch(
        error => {
            console.error('ERROR POST /User/DeleteAccount: ' + error);
            if (pError.DB.process(error, res) != 0) {
                //
            } else {
                res.status(400).send(error);
            }
        }
    );
});

module.exports = router;