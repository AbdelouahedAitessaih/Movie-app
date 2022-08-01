const {MongoClient} = require('mongodb');

const _uri = 'mongodb+srv://abdelouahed:GMWop9j2BWS5ZF7u@cluster0.q2lmu.mongodb.net/sample_mflix?retryWrites=true&w=majority';

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

