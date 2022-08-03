/**
 * Comment routes
 * @module routes/comment
 * @requires module:controllers
 * @requires module:middlewares
 */


const {Router} = require('express');
const {getComments, addComment, updateComment, deleteComment} = require('../controllers');
const {auth} = require('../middlewares');

/**
 * @type {Object}
 * @namespace commentRouter
 */
const router = Router();

router
      /**
       * @function get
       * @param {string} /comments/:movieId
       * @param {Callback} auth {@link module:middlewares/auth~auth}
       * @param {Callback} getComments {@link module:controllers/comment/commentController~getComments}
       */
      .get('/comments/:movieId', auth, getComments)
       /**
        * @function post
        * @param {string} /comments/:movieId
        * @param {Callback} auth {@link module:middlewares/auth~auth}
        * @param {Callback} addComment {@link module:controllers/comment/commentController~addComment}
        */
      .post('/comments/:movieId', auth, addComment)
       /**
        * @function put
        * @param {string} /comments/:commentId
        * @param {Callback} auth {@link module:middlewares/auth~auth}
        * @param {Callback} updateComment {@link module:controllers/comment/commentController~updateComment}
        */
      .put('/comments/:commentId', auth, updateComment)
       /**
        * @function delete
        * @param {string} /comments/:commentId
        * @param {Callback} auth {@link module:middlewares/auth~auth}
        * @param {Callback} deleteComment {@link module:controllers/comment/commentController~deleteComment}
        */
      .delete('/comments/:commentId', auth, deleteComment);

module.exports = router;