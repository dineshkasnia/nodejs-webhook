const mysql = require('mysql2');
let connection = mysql.createConnection({
    host:'192.46.215.131',
    port:'3306',
    user:'tutorsgig_webhook',
    password:'w#(OeObQ9er,',
    database:'tutorsgig_webhook'
});


connection.connect((error) => {
    if(error){
        console.log(JSON.stringify(error,undefined, 2));
    }
    else{
        console.log('connected');
    }
});
// let a = 1;
// let b = 2;
// let c = 3;

// let sql = 'INSERT INTO webhook(business_account_id, phone_number_id, message_id) VALUES('+a+', '+b+', '+c+')';
// connection.query(sql, (err, rows) => {
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log('submitted');
//     }
// });

module.exports = connection;