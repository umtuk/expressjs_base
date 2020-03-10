var fs = require('fs');
var fastCsv = require('fast-csv')

var DB = function() {};

DB.mysql = require('mysql');
DB.connection = DB.mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ubuntu',
    database: 'test'
});
DB.connection.connect();

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


var DBDev = function() {};

DBDev.insert = function() {
    console.log('insert: ');

    fs.readFile('./utils/insert', 'utf8', function(err, query) {
        DB.query(query).then(
            results => {
                console.log('Success');
                console.log(results);
            }
        ).catch(
            error => {
                console.log(error);
            }
        );
    });
}

DBDev.toCsv = function(table) {
    return new Promise((resolve, reject) => {
        console.log("DBToCsv: ");

        var query = 'DESC ' + table
        DB.query(query).then(
            results => {
                var field = results[0],field;

                var query = 'SELECT * FROM ' + table;
                return DB.query(query);
            }
        ).then(
            results => {
                results.unshift(field);

                var ws = fs.createWriteStream('DB/csv/' + table + '.csv');
                var jsonData = JSON.parse(JSON.stringify(results));

                fastCsv
                    .write(jsonData, {header: true})
                    .on('finish', function() {
                        console.log('Success', fileName);
                    })
                .pipe(ws);

                resolve();
            }
        ).catch(
            error => {
                console.log(error);
            }
        );
    });
}

// DBDev.insert();
DBDev.toCsv('UserInfo')
    .then(toCsv('RequestSignUp'));