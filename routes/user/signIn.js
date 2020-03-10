var express = require('./node_modules/express');
var router = express.Router();

var DB = require('../libs/DB');
var hash = require('../libs/hash');
var pError = require('../libs/pError');

router.post('/SignIn', function(req, res, next) {
    var id = req.body.id;
    var password = req.body.password;

    var userAccount;

    DB.utils.checkPassword(id, password).then(
        results => {
            userAccount = results[0];

            // UPDATE hash data FROM UserAccount
                var hashed = hash.saltHash(params.password);
                var accessTime = new Date().getTime();
                var accessToken = hash.saltHash(accessTime).hash;

                var query = 'UPDATE UserAccount SET ? WHERE ID = ?';
                var params = [
                    {
                        salt: hashed.salt,
                        passwordHash: hashed.hash,
                        accessTime: accessTime,
                        accessToken: accessToken,
                    },
                    userAccount.id
                ];
                return DB.query(query, params);
        }
    ).then(
        results => {
            console.log("POST /User/SignIn: Success");
            res.status(200).send({
                name: userAccount.name,
                id: userAccont.id,
                gender: userAccount.gender,
                email: userAccount.email,
                type: userAccount.type,
                accessTime: accessTime,
                accessToken: accessToken,
            });
        }
    ).catch(
        error => {
            console.error('ERROR POST /User/SignIn: ' + error);
            if (pError.DB.process(error, res) != 0) {
                //
            } else {
                res.status(400).send(error);
            }
        }
    );
});

module.exports = router;