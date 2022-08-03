/**
 * Database configuration
 * @module configuration/db
 */

const {MongoClient} = require('mongodb');

const _uri = process.env.MONGODB_URI;

/**
 * @function dbCon
 * @param {string} col - collection name
 * @param {Callback} cb - callback for database operations
 * @param {string} [col2] - collection name
 */
const dbCon = (col, cb, col2) => {
   MongoClient.connect(_uri)
       .then(async (client) => {
           const db = client.db('sample_mflix').collection(col);
           const db2 = col2 !== undefined ? client.db('sample_mflix').collection(col2) : "nothing";
           await cb(db, db2);
           setTimeout(() => client.close(), 1500)
       })
       .catch((err) => {
           console.log(err);
       });
};

module.exports = dbCon;

