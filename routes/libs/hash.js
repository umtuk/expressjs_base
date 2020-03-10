var hash = function() {};

hash.crypto = require('crypto');

hash.saltLength = 16;

hash.genRandomString = function(length) {
    return hash.crypto.randomBytes(Math.ceil(length / 2))
            .toString('hex')
            .slice(0, length);
}

hash.sha256 = function(string, salt) {
    var hashed = hash.crypto.createHmac('sha256', salt);
    hashed.update(string);
    var value = hashed.digest('hex');
    return {
        salt: salt,
        hash: value
    };
}

hash.sha512 = function(string, salt) {
    var hashed = hash.crypto.createHmac('sha512', salt);
    hashed.update(string);
    var value = hashed.digest('hex');
    return {
        salt: salt,
        hash: value
    };
}

hash.saltHash = function(string) {
    var salt = hash.genRandomString(hash.saltLength);
    var hashData = hash.sha512(string, salt);

    return hashData;
}

module.exports = hash;