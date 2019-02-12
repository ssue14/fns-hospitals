const mysql = require('mysql');

// Database Connection for Production

 let config = {
     user: process.env.SQL_USER,
     database: process.env.SQL_DATABASE,
     password: process.env.SQL_PASSWORD,
}

 if (process.env.INSTANCE_CONNECTION_NAME && process.env.NODE_ENV === 'production') {
   config.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
}

let connection = mysql.createConnection(config);

// Database Connection for Development

/*let connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_PASS,
});*/

connection.connect(function(err) {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }
    console.log('Connected as thread id: ' + connection.threadId);
});

module.exports = connection;