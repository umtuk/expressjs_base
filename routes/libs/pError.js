var pError = function() {};

pError.DB.queryEmptyError = {
    existSet: 'pError queryEmpty: Exist set.',
};
pError.DB.queryExistError = {
    emptySet: 'queryExist: Empty set.',
};
pError.DB.queryOnlyOneError = {
    emptySet: 'queryOnlyOne: Empty set.',
    severalSets: 'queryOnlyOne: Several sets exist.',
};
pError.DB.utils.checkAccessTokenError = {
    emptySet: 'checkAccessToken: queryOnlyOne: Empty set.',
    severalSets: 'checkAccessToken: queryOnlyOne: Several sets exist.',
    expire: 'checkAccessToken: Access token has expired.',
    incorrect: 'checkAccessToken: Access Token does not match.',
};
pError.DB.utils.checkPasswordError = {
    emptySet: 'checkPasswordHash: queryOnlyOne: Empty set.',
    severalSets: 'checkPasswordHash: queryOnlyOne: Several sets exist.',
    incorrect: 'checkPasswordHash: The ID and password are incorrect.'
}
pError.DB.process = function(err, res) {
    return(
        pError.DB.processEmpty(err, res) +
        pError.DB.processExist(err, res) +
        pError.DB.processOnlyOne(err, res) +
        pError.DB.processCheckAccessToken(err, res) +
        pError.DB.processCheckPassword(err, res)
    );
}
pError.DB.processEmpty  = function(err, res) {
    if (err = pError.DB.queryEmptyError.existSet) {
        res.status(400).send(err);
        return 1;
    } else {
        return 0;
    }
}
pError.DB.processExist  = function(err, res) {
    if (err = pError.DB.queryExistError.emptySet) {
        res.status(400).send(err);
        return 1;
    } else {
        return 0;
    }
}
pError.DB.processOnlyOne  = function(err, res) {
    if (err = pError.DB.queryOnlyOneError.emptySet) {
        res.status(400).send(err);
        return 1;
    }
    else if (err = pError.DB.queryOnlyOneError.severalSets) {
        res.status(400).send(err);
        return 1;
    } else {
        return 0;
    }
}
pError.DB.processCheckAccessToken  = function(err, res) {
    if (err = pError.DB.utils.checkAccessTokenError.emptySet) {
        res.status(400).send(err);
        return 1;
    }
    else if (err = pError.DB.utils.checkAccessTokenError.severalSets) {
        res.status(400).send(err);
        return 1;
    }
    else if (err = pError.DB.utils.checkAccessTokenError.expire) {
        res.status(400).send(err);
        return 1;
    } else if (err = pError.DB.utils.checkAccessTokenError.incorrect) {
        res.status(400).send(err);
        return 1;
    } else {
        return 0;
    }
}
pError.DB.processCheckPassword = function(err, res) {
    if (err = pError.DB.utils.checkPasswordError.emptySet) {
        res.status(400).send(err);
        return 1;
    }
    else if (err = pError.DB.utils.checkPasswordError.severalSets) {
        res.status(400).send(err);
        return 1;
    }
    else if (err = pError.DB.utils.checkPasswordError.incorrect) {
        res.status(200).send(err);
        return 1;
    } else {
        return 0;
    }
}

module.exports = pError;