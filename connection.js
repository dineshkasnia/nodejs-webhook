const mysql = require('mysql2');
var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'webhook'
});
var connection = mysqlConnection.connect((err) => {
    if(err){
        console.log('error:'+JSON.stringify(err, undefined, 2));
    }
    else{
        console.log('connection is ok');
    }
})

module.exports = connection;