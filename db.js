const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();  

// console.log('Host:', process.env.HOST);
// console.log('User:', process.env.USER);
// console.log('Password:', process.env.PASSWORD);
// console.log('Database:', process.env.DATABASE);


const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

connection.connect((error) => {
  if (error) {
    console.error('Kesalahan koneksi:', error);
    return;
  }
  console.log('Terhubung ke database MySQL');
});
// connection.connect(error => {
//   if (error) throw error;
//   console.log("Successfully connected to the database.");
// });

module.exports = connection;
