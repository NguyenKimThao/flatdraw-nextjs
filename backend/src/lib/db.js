const bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3').verbose();
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

    db.run(
      `CREATE TABLE Collections (
          Id INTEGER PRIMARY KEY AUTOINCREMENT,
          Name TEXT,
          Info TEXT,
          Desc TEXT,
          UserId INTEGER,
          VersionId INTEGER DEFAULT 0,
          DateCreated DATE,
          DateUpdated DATE
          )`,
      (err) => {}
    );
    db.run(
      `CREATE TABLE BoxLayers (
          Id TEXT NOT NULL,
          Name TEXT,
          Info TEXT,
          BoxGroup TEXT,
          Position TEXT,
          Show INTEGER,
          Type TEXT,
          Desc text,
          VersionId INTEGER NOT NULL,
          CollectionId INTEGER,
          UserId INTEGER,
          DateCreated DATE,
          DateUpdated DATE,
          PRIMARY KEY (Id, VersionId)
          )`,
      (err) => {}
    );

    db.run(
      `CREATE TABLE ServerConfigs (
          Key TEXT,
          Value TEXT
          )`,
      (err) => {
        if (err) {
          // Table already created
        } else {
          // Table just created, creating some rows
          const color_default = {
            color: 'hotpink',
            wireframe: 'yellow',
            choose: 'red',
            review: 'rgb(51, 51, 204)',
            label: 'Default',
          };
          const insert_default = 'INSERT INTO ServerConfigs (Key, Value) VALUES (?,?)';
          db.run(insert_default, ['color_default', JSON.stringify(color_default)]);
          const color = {
            default: {
              color: 'hotpink',
              wireframe: 'yellow',
              choose: 'red',
              review: 'rgb(51, 51, 204)',
              label: 'Default',
            },
            hotpink: {
              color: 'hotpink',
              wireframe: 'yellow',
              choose: 'red',
              review: 'rgb(51, 51, 204)',
              label: 'HotPink',
            },
            black: {
              color: 'black',
              wireframe: 'yellow',
              choose: 'red',
              review: 'rgb(51, 51, 204)',
              label: 'BLack',
            },
            grey: {
              color: 'rgb(153, 153, 102)',
              wireframe: 'yellow',
              choose: 'red',
              review: 'rgb(51, 51, 204)',
              label: 'Grey',
            },
            white: {
              color: 'rgb(255,255,255)',
              wireframe: 'yellow',
              choose: 'red',
              review: 'rgb(51, 51, 204)',
              label: 'White',
            },
          };
          const insert_color = 'INSERT INTO ServerConfigs (Key, Value) VALUES (?,?)';
          db.run(insert_color, ['color', JSON.stringify(color)]);
        }
      }
    );

    db.run(
      `CREATE TABLE UserConfigs (
          UserId INTEGER,
          Key TEXT,
          Value TEXT,
          PRIMARY KEY (UserId, Key)
          )`,
      (err) => {}
    );
    db.run(
      `CREATE TABLE UserClors (
          Id INTEGER PRIMARY KEY AUTOINCREMENT,
          UserId INTEGER,
          Key TEXT,
          Value TEXT,
          )`,
      (err) => {}
    );
  }
});

module.exports = db;
