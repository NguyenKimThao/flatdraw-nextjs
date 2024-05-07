const db = require('../lib/db');

const KEY_COLOR = 'color';

class ServerConfigs {
  static getColors() {
    return new Promise((resolve, reject) => {
      const sqlCollection = `SELECT * FROM ServerConfigs WHERE Key = ?`;
      db.all(sqlCollection, [KEY_COLOR], (err, result) => {
        if (err) {
          return reject(err);
        }

        if (!result || result.length != 1 || result[0] == null) {
          return resolve(null);
        }

        try {
          resolve(JSON.parse(result[0].Value));
        } catch (ex) {
          return reject(ex);
        }
      });
    });
  }
}

module.exports = ServerConfigs;
