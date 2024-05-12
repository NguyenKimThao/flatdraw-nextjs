const db = require('../lib/db');
const utils = require('../lib/utils');

function convert_layer(row) {
  try {
    return {
      id: row.Id,
      name: row.Name,
      info: utils.converJson(row.Info),
      boxGroup: utils.converJson(row.BoxGroup),
      position: utils.converJson(row.Position),
      show: utils.convertIntToBool(row.Show),
      type: row.Type,
      desc: row.Desc,
      dateCreated: row.DateCreated,
      dateUpdated: row.DateUpdated,
    };
  } catch (ex) {
    return null;
  }
}
class BoxLayer {
  static getBoxLayer(collectionId, versionId, userId) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM BoxLayers WHERE CollectionId = ? and VersionId = ? and UserId = ?';
      const params = [collectionId, versionId, userId];
      db.all(sql, params, (err, result) => {
        if (err) {
          return reject(err);
        }
        let layers = [];
        result.forEach(function (row) {
          const layer = convert_layer(row);
          if (!layer) {
            return resolve(null);
          }
          layers.push(layer);
        });
        resolve(layers);
      });
    });
  }
  static updateBoxLayer(params) {
    return new Promise((resolve, reject) => {
      const sql =
        'INSERT INTO BoxLayers (Id, Name, Info, BoxGroup, Position, Show ,Type, Desc, CollectionId, VersionId, UserId, DateCreated, DateUpdated) VALUES (?,?,?, ?,?,?, ?,?,?, ?,?,?, ?)';
      db.run(sql, params, function (err, innerResult) {
        if (err) {
          return reject(err);
        }
        resolve(innerResult);
      });
    });
  }
  static deleteBoxLayer(collectionId, userId, versionId) {
    return new Promise((resolve, reject) => {
      const params = [collectionId, userId, versionId - 50];
      const sql = 'DELETE FROM BoxLayers WHERE CollectionId = ? and UserId = ? and VersionId <= ?';
      db.run(sql, params, function (err, innerResult) {
        if (err) {
          return reject(err);
        }
        resolve(innerResult);
      });
    });
  }
}

module.exports = BoxLayer;
