var hash = require('../libs/hash');

var DB = function() {};

DB.mysql = require('mysql');

DB.connection = DB.mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ubuntu',
    database: 'test'
});
DB.connection.connect();

DB.UserAccount.gender = {
    male: 'm',
    female: 'f',
}
DB.UserAccount.type = {
    unconfirmed: 'unconfirmed',
    confirmed: 'confirmed',
}

DB.query = function(query, params) {
    return new Promise((resolve, reject) => {
        this.connection.query(query, params, function(error, results, field) {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
}

DB.queryEmpty = function(query, params) {
    return new Promise((resolve, reject) => {
        DB.query(query, params).then(
            results => {
                if (results.length == 0) {
                    console.log('queryEmpty: Success.')
                    resolve();
                } else {
                    reeject('ERROR queryIsEmpty: Exist set.')
                }
            }
        ).catch(
            error => {
                reject(error);
            }
        )
    });
}

DB.queryExist = function(query, params) {
    return new Promise((resolve, reject) => {
        DB.query(query, params).then(
            results => {
                if (results.length > 0) {
                    console.log('queryEmpty: Success.')
                    resolve();
                } else {
                    reeject('Empty set.')
                }
            }
        ).catch(
            error => {
                reject('queryExist: ' + error);
            }
        )
    });
}

DB.queryOnlyOne = function(query, params) {
    return new Promise((resolve, reject) => {
        DB.query(query, params).then(
            results => {
                if (results.length == 1) {
                    console.log('queryOnlyOne: Success.')
                    resolve();
                } else if (results.length == 0) {
                    reeject('Empty set.')
                } else if (results.length > 1) {
                    reeject('Several sets exist.')
                }
            }
        ).catch(
            error => {
                reject('queryOnlyOne: ' + error);
            }
        )
    });
}

DB.utils = function() {};

DB.utils.checkAccessToken = function(accessToken, id) {
    return new Promise((resolve, reject) => {
        var query = 'SELECT accessToken, accessTime FROM UserAccount WHERE id = ?';
        var params = [id];
        DB.queryOnlyOne(query, params).then(
            results => {
                var accessTimeLimit = (results[0].accssTime - 0) + 10 * 60 * 1000;
                if (accessToken == results[0].accessToken) {
                    if (accessTimeLimit < new Date().getTime()) {
                        reject('checkAccessToken: Access token has expired.');
                    } else {
                        console.log('checkAccessToken: Success.');
                        resolve(results);
                    }
                } else {
                    reject('checkAccessToken: Access Token does not match.');
                }
            }
        ).catch(
            error => {
                reject('checkAccessToken: ' + error);
            }
        );
    });
}

DB.utils.checkPassword = function(id, password) {
    return new Promise((resolve, reject) => {
        var query = 'SELECT name, id, gender, email, type, salt, passwordHash FROM UserAccount WHERE id = ?';
        var params = [id];
        DB.queryOnlyOne(query, params).then(
            results => {
                var passwordHash = hash.sha512(password, results[0].salt);
                if (passwordHash == results[0].passwordHash) {
                    console.log('checkPasswordHash: Success.');

                    delete results[0].salt;
                    delete results[0].passwordHash;

                    resolve(results);
                } else {
                    reject('checkPasswordHash: The ID and password are incorrect.');
                }
            }
        ).check(
            error => {
                reject('checkPasswordHash: ' + error);
            }
        );
    });
}

module.exports = DB;