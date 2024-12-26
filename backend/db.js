// db.js
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',  
  user: 'root',        
  password: 'root',  
  database: 'university_db',  
});

module.exports = pool;
