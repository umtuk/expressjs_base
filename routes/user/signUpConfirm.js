var express = require('./node_modules/express');
var router = express.Router();

var DB = require('../libs/DB');
var pError = require('../libs/pError');

router.get('/SignUpConfirm', function(req, res, next) {
    var id = req.params.id;
    var confirmStr = req.params.confirmStr;

    // SELECT RequestSignUp
    var query = 'SELECT seq FROM RequestSignUp WHERE id = ? AND confirmStr = ?';
    var params = [id, confirmStr];
    DB.queryOnlyOne(query, params).then(
        results => {
            // DELETE RequestSignUp, UPDATE UserAccount
            var query = [
                'DELETE FROM RequestSignUp WHERE seq = ?',
                'UPDATE UserAccount SET ? WHERE id = ?',
            ]
            var params = [
                [results[0].seq],
                [{ type: 'confirmed' }, id],
            ]

            return Promise.all([
                DB.query(query[0], params[0]),
                DB.query(query[1], params[1]),
            ])
        }
    ).then(
        results => {
            console.log('GET /User/SignUpConfirm: Success');

            /*
                Open Success Web  
            */
           
            res.render('index', { title: 'Success' });
        }
    ).catch(
        error => {
            console.error('ERROR GET /User/SignUpConfirm: ' + error);
            if (pError.DB.process(error, res) != 0) {
                //
            } else {
                res.status(400).send(error);
            }
        }
    )
});

module.exports = router;
