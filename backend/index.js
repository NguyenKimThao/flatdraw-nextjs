const express = require('express');
const http = require('http');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const server = http.createServer(app);
const TOKEN_KEY = 'TokenCheckAll';
const DBSOURCE = 'usersdb.sqlite';
let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message);
    throw err;
  } else {
    const salt = bcrypt.genSaltSync(10);

    db.run(
      `CREATE TABLE Users (
          Id INTEGER PRIMARY KEY AUTOINCREMENT,
          Name text,
          Username text, 
          Email text, 
          Password text,             
          Salt text,    
          Token text,
          DateLoggedIn DATE,
          DateCreated DATE
          )`,
      (err) => {
        if (err) {
          // Table already created
        } else {
          // Table just created, creating some rows
          const insert = 'INSERT INTO Users (Name, Username, Email, Password, Salt, DateCreated) VALUES (?,?,?,?,?,?)';
          db.run(insert, ['Thaonk', 'taonuaa004', 'taonuaa004@gmail.com', bcrypt.hashSync('123456', salt), salt, Date('now')]);
        }
      }
    );
  }
});
function log(...msg) {
  console.log(new Date(), msg);
}

const auth = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies['x-access-token'];

  console.log('token', token, req.cookies['x-access-token'], req.cookies);
  if (!token) {
    return res.send_error(-401, 'A token is required for authentication');
  }
  try {
    const decoded = jwt.verify(token, TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.send_error(-401, 'Invalid token');
  }
  return next();
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
// app.use(cors({ maxAge: 864000 }));
app.use(express.static('public'));

// app.use('/', function (rep, res) {
//   res.sendfile('./public/index.html');
// });
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Thay 'http://example.com' bằng origin của ứng dụng của bạn
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, If-None-Match');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(function (req, res, next) {
  res.fullUrl = req.method + ' ' + req.protocol + '://' + req.get('host') + req.originalUrl;
  log('recv', res.fullUrl, req.query, req.body);

  res.send_success = (data) => {
    log('send_success', res.fullUrl);
    res.status(200).json({ error: 0, data: data, message: 'Success' });
  };

  res.send_error = (error = -100, message = 'Unknow') => {
    log('send_error', res.fullUrl, error, message);
    res.status(200).json({ error: error, data: {}, message: message });
  };

  res.send_exec = (error = -100, ex = null) => {
    log('send_exec', res.fullUrl, error, ex);
    try {
      let msg = 'Unknow';
      try {
        if (ex) msg = '' + ex.message;
      } catch (error) {
        try {
          msg = '' + ex;
        } catch (error) {}
      }
      res.status(200).json({ error: error, data: {}, message: msg });
    } catch (error) {}
  };
  next();
});

app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    // Make sure there is an Email and Password in the request
    if (!(username && password)) {
      return res.send_error(-101, 'All input is required');
    }

    const sql = 'SELECT * FROM Users WHERE Username = ?';
    db.all(sql, username, function (err, rows) {
      if (err) {
        return res.send_exec(-102, err);
      }

      let users = [];
      rows.forEach(function (row) {
        users.push(row);
      });

      if (users.length == 0) {
        return res.send_error(-103, 'Username không tồn tại');
      }

      const PHash = bcrypt.hashSync(password, users[0].Salt);

      if (PHash != users[0].Password) {
        return res.send_error(-104, 'Password không đúng');
      }

      // * CREATE JWT TOKEN
      const user = { userId: users[0].Id, name: users[0].Name, username: users[0].Username, email: users[0].Email };
      const token = jwt.sign(user, TOKEN_KEY, {
        expiresIn: '2d', // 60s = 60 seconds - (60m = 60 minutes, 2h = 2 hours, 2d = 2 days)
      });

      user.token = token;
      res.cookie('x-access-token', token, { maxAge: 86400000, httpOnly: true, secure: true, sameSite: 'none' });
      return res.send_success(user);
    });
  } catch (err) {
    return res.send_exec(-100, err);
  }
});

app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password, name } = req.body;

    if (!username || !email || !password) {
      res.send_error(-101, 'Miss field');
      return;
    }
    let userExists = false;

    const sql = 'SELECT * FROM Users WHERE Email = ?';
    await db.all(sql, username, (err, result) => {
      if (err) {
        return res.send_exec(-102, err);
      }
      if (result.length != 0) {
        return res.send_error(-103, 'User Already Exist. Please Login');
      }

      const salt = bcrypt.genSaltSync(10);

      const data = {
        Name: name,
        Username: username,
        Email: email,
        Password: bcrypt.hashSync(password, salt),
        Salt: salt,
        DateCreated: Date('now'),
      };

      const sql = 'INSERT INTO Users (Name, Username, Email, Password, Salt, DateCreated) VALUES (?,?,?,?,?,?)';
      const params = [data.Name, data.Username, data.Email, data.Password, data.Salt, Date('now')];
      const user = db.run(sql, params, function (err, innerResult) {
        if (err) {
          return res.send_exec(-105, err);
        }
      });
      res.send_success({
        username: username,
      });
    });
  } catch (err) {
    res.send_exec(-100, err);
  }
});
///
app.get('/api/get_info', auth, (req, res) => {
  console.log('req', req.user);
  res.send_success(req.user);
});

app.use(function (req, res) {
  res.send_error(-404, 'Not found');
});
// Start the server
const PORT = process.env.PORT || 8010;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
