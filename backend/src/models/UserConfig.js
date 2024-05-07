const db = require('../lib/db');

const KEY_COLOR = 'color';

class UserConfig {
  static getColors(userId) {
    return new Promise((resolve, reject) => {
      const sqlCollection = `SELECT * FROM UserConfigs WHERE Key = ? and UserId = ?`;
      db.all(sqlCollection, [KEY_COLOR, userId], (err, result) => {
        if (err) {
          return reject(err);
        }

        if (!result || result.length != 1 || result[0] == null) {
          return resolve(null);
        }

        try {
          resolve(JSON.parse(result[0]));
        } catch (ex) {
          return reject(ex);
        }
      });
    });
  }

  static updateColor(color, userId) {
    return new Promise((resolve, reject) => {
      const sqlUpdate = 'REPLACE INTO  UserConfigs (UserId, Key,Value)  Values ( ?, ? , ?)';
      const paramsUpdate = [userId, KEY_COLOR, JSON.stringify(color)];
      db.run(sqlUpdate, paramsUpdate, function (err, innerResult) {
        if (err) {
          return reject(err);
        }
        resolve(innerResult);
      });
    });
  }
}

module.exports = UserConfig;
