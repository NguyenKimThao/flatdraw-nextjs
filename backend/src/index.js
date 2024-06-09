const http = require('http');

const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const server = http.createServer(app);
const TOKEN_KEY = 'TokenCheckAll';
const db = require('./lib/db');
const utils = require('./lib/utils');
const boxLayer = require('./models/BoxLayer');
const BoxLayer = require('./models/BoxLayer');
const Collections = require('./models/Collections');
const ServerConfigs = require('./models/ServerConfigs');
const UserConfig = require('./models/UserConfig');

app.use(bodyParser.urlencoded({ extended: false, limit: '500mb' }));
app.use(bodyParser.json({ limit: '500mb' }));

app.use(cookieParser());
// app.use(cors({ maxAge: 864000 }));
app.use(express.static('public'));

// app.use('/', function (rep, res) {
//   res.sendfile('./public/index.html');
// });
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://103.168.58.223:8011'); // Thay 'http://example.com' bằng origin của ứng dụng của bạn
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, If-None-Match');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

const auth = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies['x-access-token'];

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

app.use(function (req, res, next) {
  res.fullUrl = req.method + ' ' + req.protocol + '://' + req.get('host') + req.originalUrl;
  utils.log('recv', res.fullUrl, req.query, req.body);

  res.send_success = (data) => {
    utils.log('send_success', res.fullUrl);
    res.status(200).json({ error: 0, data: data, message: 'Success' });
  };

  res.send_error = (error = -100, message = 'Unknow') => {
    utils.log('send_error', res.fullUrl, error, message);
    res.status(200).json({ error: error, data: {}, message: message });
  };

  res.send_exec = (error = -100, ex = null) => {
    utils.log('send_exec', res.fullUrl, error, ex);
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
        expiresIn: '30d', // 60s = 60 seconds - (60m = 60 minutes, 2h = 2 hours, 2d = 2 days)
      });

      user.token = token;
      res.cookie('x-access-token', token, { maxAge: 86400000, httpOnly: true, secure: false, sameSite: 'lax' });
      return res.send_success(user);
    });
  } catch (err) {
    return res.send_exec(-100, err);
  }
});

app.post('/api/logout', async (req, res) => {
  try {
    res.cookie('x-access-token', '', { expires: 0, httpOnly: true,  secure: false, sameSite: 'lax' });
    return res.send_success({});
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

////////// collection
function convert_collection(row) {
  try {
    return {
      id: row.Id,
      name: row.Name,
      info: row.Info,
      desc: row.Desc,
      dateCreated: row.DateCreated,
      dateUpdated: row.DateUpdated,
    };
  } catch (ex) {
    return null;
  }
}
async function send_collection(req, res, id) {
  try {
    const sql = 'SELECT * FROM Collections WHERE Id = ? and UserId = ?';
    const params = [id, req.user.userId];
    db.all(sql, params, (err, result) => {
      if (err) {
        return res.send_exec(-102, err);
      }
      console.log('result', result);
      if (result.length != 1) {
        return res.send_error(-103, 'Has error in sql');
      }
      const collection = convert_collection(result[0]);
      if (!collection) {
        return res.send_error(-103, 'Has error in convert data');
      }
      res.send_success(collection);
    });
  } catch (err) {
    res.send_exec(-100, err);
  }
}

app.get('/api/get_collections', auth, (req, res) => {
  try {
    const sql = 'SELECT * FROM Collections WHERE UserId = ?';
    db.all(sql, req.user.userId, (err, result) => {
      if (err) {
        return res.send_exec(-102, err);
      }
      let collections = [];
      result.forEach(function (row) {
        const collection = convert_collection(row);
        if (!collection) {
          return res.send_error(-103, 'Has error in convert data');
        }
        collections.push(collection);
      });
      res.send_success({
        collections: collections,
        length: result.length,
      });
    });
  } catch (err) {
    res.send_exec(-100, err);
  }
});

app.get('/api/get_collection', auth, (req, res) => {
  try {
    let id = req.query.id;
    if (!id) {
      res.send_error(-101, 'Miss field');
      return;
    }
    send_collection(req, res, id);
  } catch (err) {
    res.send_exec(-100, err);
  }
});

app.post('/api/create_collection', auth, (req, res) => {
  try {
    const { name, info, desc } = req.body;

    if (!name) {
      res.send_error(-101, 'Miss field');
      return;
    }

    const dateNow = Date('now');
    const sql = 'INSERT INTO Collections (Name, Info, Desc, VersionId, UserId, DateCreated, DateUpdated) VALUES (?,?,?,?,?,?,?)';
    const params = [name, info, desc, 0, req.user.userId, dateNow, dateNow];
    const user = db.run(sql, params, function (err, innerResult) {
      if (err || this.lastId <= 0) {
        return res.send_exec(-105, err);
      }
      send_collection(req, res, this.lastID);
    });
    console.log('user', user);
  } catch (err) {
    res.send_exec(-100, err);
  }
});

app.post('/api/update_collection', auth, (req, res) => {
  try {
    const { id, name, info, desc } = req.body;

    if (!id || !name) {
      res.send_error(-101, 'Miss field');
      return;
    }
    const sql = 'UPDATE Collections Set Name = ?, Info = ? , Desc = ?, DateUpdated = ? WHERE Id = ? and UserId = ?';
    const params = [name, info, desc, Date('now'), id, req.user.userId];
    const res = db.run(sql, params, function (err, innerResult) {
      if (err) {
        return res.send_exec(-105, err);
      }
      send_collection(req, res, id);
    });
  } catch (err) {
    res.send_exec(-100, err);
  }
});

app.post('/api/delete_collection', auth, async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      res.send_error(-101, 'Miss field');
      return;
    }
    const sql = 'DELETE FROM Collections WHERE Id = ? and UserId = ?';
    const params = [id, req.user.userId];
    db.run(sql, params, function (err, innerResult) {
      if (err) {
        return res.send_exec(-105, err);
      }
      res.send_success({
        id: id,
      });
    });
  } catch (err) {
    res.send_exec(-100, err);
  }
});

//////////////////////
app.get('/api/get_layers', auth, async (req, res) => {
  try {
    const collectionId = req.query.collectionId;

    if (!collectionId) {
      res.send_error(-101, 'Miss field');
      return;
    }

    let collection = await Collections.getCollection(collectionId, req.user.userId);

    if (!collection) {
      res.send_error(-110, 'Not found collection Id');
      return;
    }
    console.log('has colection', collection.Id, collection.VersionId);

    const layers = await BoxLayer.getBoxLayer(collectionId, collection.VersionId, req.user.userId);
    res.send_success({
      layers: layers,
      length: layers.length,
      versionLayer: collection.VersionId,
    });
  } catch (err) {
    res.send_exec(-100, err);
  }
});

app.post('/api/update_version_layer', auth, async (req, res) => {
  try {
    const collectionId = req.query.collectionId;

    if (!collectionId) {
      res.send_error(-101, 'Miss field');
      return;
    }

    const { layers } = req.body;
    if (!layers) {
      res.send_error(-101, 'Miss field');
      return;
    }

    let collection = await Collections.getCollection(collectionId, req.user.userId);

    if (!collection) {
      res.send_error(-110, 'Not found collection Id');
      return;
    }
    console.log('has colection', collection.Id, collection.VersionId);

    collection.VersionId = collection.VersionId + 1;

    const dateNow = Date('now');
    const playerParams = [];

    for (let i in layers) {
      const layer = layers[i];
      const { id, name, info, boxGroup, position, show, type, desc } = layer;

      if (!name) {
        res.send_error(-101, 'Miss field');
        return;
      }

      const params = [
        id,
        name,
        utils.convertJsonString(info),
        utils.convertJsonString(boxGroup),
        utils.convertJsonString(position),
        utils.convertBoolToInt(show),
        type,
        desc,
        collectionId,
        collection.VersionId,
        req.user.userId,
        dateNow,
        dateNow,
      ];
      playerParams.push(params);
    }

    for (let i in playerParams) {
      const params = playerParams[i];
      await BoxLayer.updateBoxLayer(params);
    }

    await Collections.updateVersionCollection(collectionId, req.user.userId, collection.VersionId);

    await BoxLayer.deleteBoxLayer(collectionId, req.user.userId, collection.VersionId);

    return res.send_success({
      versionLayer: collection.VersionId,
    });
  } catch (err) {
    res.send_exec(-100, err);
  }
});

app.get('/api/get_colors', auth, async (req, res) => {
  try {
    let color = await UserConfig.getColors(req.user.userId);
    if (!color) {
      color = await ServerConfigs.getColors();
    }
    res.send_success(color);
  } catch (err) {
    res.send_exec(-100, err);
  }
});

app.get('/api/update_colors', auth, async (req, res) => {
  try {
    const { colors } = req.body;

    if (!colors) {
      return res.send_error(-101, 'Miss field');
    }

    let res = await UserConfig.updateColor(colors, req.user.userId);
    res.send_success({
      id: res,
    });
  } catch (err) {
    res.send_exec(-100, err);
  }
});

app.use(function (req, res) {
  res.send_error(-404, 'Not found');
});
// Start the server
const PORT = process.env.PORT || 8010;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
