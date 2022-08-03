/**
 * Movie controller
 * @module controllers/movie/movieController
 */

const {dbCon} = require('../../configuration');
const {ObjectId} = require('bson');
const createError = require('http-errors');

/**
 * Get movies with pagination
 * @function getMovies
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Callback} next - callback
 */
const getMovies = (req, res, next) => {
  const pageNum = parseInt(req.query.page);

  if(isNaN(pageNum)) return next(createError(400));

  dbCon('movies',
      /**
       * @callback dbCallback
       * @param {Object} db - database operations object
       */
     async (db) => {
     await db.find({}).sort({year:-1}).skip((pageNum - 1) * 10).limit(10).toArray()
         .then((movies) => {
             res.json(movies);
         })
         .catch((err) => {
             return next(createError(err.statusCode));
         });
  });
}

/**
 * Get one movie
 * @function getMovie
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Callback} next - callback
 */
const getMovie = (req, res, next) => {
  if(!ObjectId.isValid(req.params.id)) {
     return next(createError(400));
  }

  const _id = new ObjectId(req.params.id);

  dbCon('movies',
      /**
       * @callback dbCallback
       * @param {Object} db - database operations object
       */
      async (db) => {
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