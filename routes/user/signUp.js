var express = require('./node_modules/express');
var router = express.Router();

var DB = require('../libs/DB');
var hash = require('../libs/hash');
var pError = require('../libs/pError');

router.post('/SignUp', function(req, res, next) {
    var userAccount = req.body;
    userAccount.type = DB.UserAccount.type.unconfirmed;

    // is Empty
    var query = "SELECT seq FROM UserAccount WHERE id = ? OR email = ?"
    var params = [userAccount.id, userAccount.email];
    DB.queryEmpty(query, params).then(
        results => {
            // Add hash data
            var hashed = hash.saltHash(userAccount.password);
            userAccount.salt = hashed.salt;
            userAccount.passwordHash = hashed.hash;

            userAccount.accessTime = new Date().getTime();
            userAccount.accessToken = hash.saltHash(userAccount.accessTime).hash;

            // INSERT INTO UserAccount, RequestSignUp
            var query = [
                'INSERT INTO UserAccount SET ?',
                'INSERT INTO RequestSignUp SET ?',
            ];
            var params = [
                [UserAccount],
                {
                    id: userAccount.id,
                    email: userAccount.email,
                    requestedTime: new Date().getTime(),
                    confirmStr: hash.genRandomString(64),
                },
            ];
            return Promise.all([
                DB.query(query[0], params[0]),
                DB.query(query[1], params[1]),
            ]);
        }
    ).then(
        results => {
            console.log("POST /User/SignUp: Success");

            /*
                Send Email
            */

            res.status(200).send({
                name: userAccount.name,
                id: userAccount.id,
                gender: userAccount.gender,
                email: userAccount.email,
                type: userAccount.type,
                accessToken: userAccount.accessToken,
                accessTime: userAccount.accessTime,
            });
        }
    ).catch(
        error => {
            console.error('ERROR POST /User/SignUp: ' + error);
            if (pError.DB.process(error, res) != 0) {
                //
            } else {
                res.status(400).send(error);
            }
        }
    );
});

module.exports = router;