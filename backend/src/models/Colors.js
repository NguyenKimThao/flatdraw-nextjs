const db = require('../lib/db');

const KEY_COLOR = 'color';

class Colors {
  static getColors(userId) {
    return new Promise((resolve, reject) => {
      const sqlCollection = `SELECT * FROM UserConfigs WHERE UserId = ? and Key = ?`;
      db.all(sqlCollection, [userId, KEY_COLOR], (err, result) => {
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

  static updateVersionCollection(collectionId, userId, versionId) {
    return new Promise((resolve, reject) => {
      const sqlUpdate = 'UPDATE Collections Set VersionId = ?, DateUpdated = ? WHERE Id = ? and UserId = ?';
      const paramsUpdate = [versionId, Date('now'), collectionId, userId];
      db.run(sqlUpdate, paramsUpdate, function (err, innerResult) {
        if (err) {
          return reject(err);
        }
        resolve(innerResult);
      });
    });
  }
}

module.exports = Colors;
