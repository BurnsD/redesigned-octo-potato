const mysql = require("mysql2");

// const connection = mysql.createConnection(
//     {
//       host: 'localhost', 
//       user: process.env.DB_USER,
//       password: process.env.DB_PASSWORD,
//       database: process.env.DB_NAME
//     }
//   );
  
  // Start Application
  connection.connect(function(err){
      if (err) throw err;
      start();
    });

    module.exports = connection;