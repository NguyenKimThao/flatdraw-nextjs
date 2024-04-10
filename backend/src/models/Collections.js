const db = require('../lib/db');

class Collections {
  static getCollection(collectionId, userId) {
    return new Promise((resolve, reject) => {
      const sqlCollection = 'SELECT * FROM Collections WHERE Id = ? and UserId = ?';
      db.all(sqlCollection, [collectionId, userId], (err, result) => {
        if (err) {
          return reject(err);
        }

        if (!result || result.length != 1 || result[0] == null) {
          return resolve(null);
        }

        resolve(result[0]);
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

module.exports = Collections;
