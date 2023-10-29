const express = require('express');
const app = express();
const PORT = 3004;
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('postProject.db');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

db.serialize(() => {
  db.run(
    'CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, text TEXT)'
  );
  db.run(
    'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password TEXT)'
  );
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/allPosts', (req, res) => {
  db.all('SELECT * FROM messages', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Ошибка сервера' });
    } else {
      res.json(rows);
    }
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Ошибка сервера' });
    } else if (!row) {
      res.status(401).json({ error: 'Неверное имя пользователя или пароль' });
    } else {
      const hashedPassword = row.password;
      if (bcrypt.compareSync(password, hashedPassword)) {
        res.status(200).json({ message: 'Успешная авторизация' });
      } else {
        res.status(401).json({ error: 'Неверное имя пользователя или пароль' });
      }
    }
  });
});

app.post('/registration', (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, saltRounds);

  db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], function (err) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Ошибка сервера' });
    } else {
      res.status(200).json({ message: 'Регистрация успешна' });
    }
  });
});

app.post('/addPost', (req, res) => {
  const { username, text } = req.body;
  db.run('INSERT INTO messages (username, text) VALUES (?, ?)', [username, text], function (err) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Ошибка сервера' });
    } else {
      const messageId = this.lastID;
      db.get('SELECT * FROM messages WHERE id = ?', [messageId], (err, row) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Ошибка сервера' });
        } else {
          res.json(row);
        }
      });
    }
  });
});

app.delete('/deletePost/:messageId', (req, res) => {
  const messageId = req.params.messageId;
  db.run('DELETE FROM messages WHERE id = ?', [messageId], function (err) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Ошибка сервера' });
    } else {
      db.all('SELECT * FROM messages', (err, rows) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Ошибка сервера' });
        } else {
          res.json(rows);
        }
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
