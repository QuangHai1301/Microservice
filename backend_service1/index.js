require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3001;
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
  });

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return;
    }
    console.log('Connected to the database');
  });
  app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
  });
  
  app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    // Kiểm tra thông tin đăng nhập
    const query = 'SELECT * FROM users WHERE TRIM(usersname) = TRIM(?) AND TRIM(password) = TRIM(?)';
    connection.query(query, [username, password], (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
  
      if (results.length === 0) {
        res.status(401).json({ error: 'Invalid username or password' });
        return;
      }
      res.sendFile(__dirname + '/main.html');
      // Đăng nhập thành công
      // res.redirect('/main.html'); // Chuyển hướng đến trang dashboard sau khi đăng nhập thành công
    });
  });


  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });