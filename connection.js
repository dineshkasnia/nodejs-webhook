const mysql = require('mysql2');
let connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'webhook',
    port:'3001'
});


connection.connect();


// let sql = "INSERT INTO webhook(business_account_id, phone_number_id, message_id) VALUES('1', '2', '3')";
// connection.query(sql, (err, rows) => {
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log('submitted');
//     }
// });

module.exports = connection;