require('dotenv').config();
const express = require('express');
const path = require('path');
const ejs = require('ejs');
const { distance } = require('fastest-levenshtein');

const app = express();
const port = 3002;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


const mysql = require('mysql2');

// Tạo một kết nối đến cơ sở dữ liệu
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

app.get('/search', (req, res) => {
    const searchTerm = req.query.term;

  if (!searchTerm) {
    res.render('search', { searchTerm: '', results: [] });
    return;
  }

  searchByName(searchTerm, (err, results) => {
    if (err) {
      res.render('error', { error: err });
      return;
    }

    res.render('search', { searchTerm: searchTerm, results: results });
  });
  });
  function searchByName(name, callback) {
    const query = 'SELECT * FROM users WHERE TRIM(usersname) = TRIM(?)';
    connection.query(query, [name], (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, results);
    });
  }
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Kết nối đến cơ sở dữ liệu
connection.connect((err) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return;
    }
    console.log('Connected to the database');
  });
  
  // Thực hiện truy vấn tìm kiếm

  
  // Đóng kết nối sau khi hoàn thành
  function closeConnection() {
    connection.end((err) => {
      if (err) {
        console.error('Error closing database connection:', err);
        return;
      }
      console.log('Database connection closed');
    });
  }
