const {MongoClient} = require('mongodb');

const _uri = process.env.MONGODB_URI;

const dbCon = (col, cb) => {
   MongoClient.connect(_uri)
       .then(async (client) => {
           const db = client.db('sample_mflix').collection(col);
           await cb(db);
           setTimeout(() => client.close(), 1500)
       })
       .catch((err) => {
           console.log(err);
       });
};

module.exports = dbCon;

