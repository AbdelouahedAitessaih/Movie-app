const {dbCon} = require('../../configuration');
const {ObjectId} = require('bson');
const createError = require('http-errors');

const getMovies = (req, res, next) => {
  const pageNum = parseInt(req.query.page);

  if(isNaN(pageNum)) return next(createError(400));

  dbCon('movies', async (db) => {
     await db.find({}).skip((pageNum - 1) * 10).limit(10).toArray()
         .then((movies) => {
             res.json(movies);
         })
         .catch((err) => {
             return next(createError(err.statusCode));
         });
  });
}

const getMovie = (req, res, next) => {
  if(!ObjectId.isValid(req.params.id)) {
     return next(createError(400));
  }

  const _id = new ObjectId(req.params.id);

  dbCon('movies', async (db) => {
      await db.findOne({_id})
          .then((movie)=> {
              if(!movie) {
                  return next(createError(404));
              }
              res.json(movie);
          })
          .catch((err)=>{
              return next(createError(err.statusCode));
          });
  })
}

module.exports = {
    getMovies,
    getMovie
}