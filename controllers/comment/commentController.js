/**
 * Comment controller
 * @module controllers/comment/commentController
 */

const {ObjectId} = require('bson');
const createError = require('http-errors');
const {Comment} = require('../../models');
const {dbCon} = require("../../configuration");

/**
 * Get comments by movie with pagination
 * @function getComments
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Callback} next - callback
 */
const getComments = (req,res, next) => {

    checkIdValidity(req.params.movieId, next);

    const movieId = new ObjectId(req.params.movieId);

    const pageNum = parseInt(req.query.page);

    if(isNaN(pageNum)) return next(createError(400));

    dbCon('comments',
        /**
         * @callback dbCallback
         * @param {Object} db - database operations object
         */
        async (db) => {
        await db.find({movieId}).sort({createdAt:-1}).skip((pageNum - 1) * 10).limit(10).toArray()
            .then((comments) => {
                res.json(comments);
            })
            .catch((err) => {
                return next(createError(err.statusCode));
            });
    });
}

/**
 * Add comment
 * @function addComment
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Callback} next - callback
 */
const addComment = (req, res, next) => {

    checkIdValidity(req.params.movieId, next);

    const error = Comment.validate(req.body['text']);
    if(error) {
        return next(error);
    }

    const commentData = { text : req.body['text']};
    commentData.userId = new ObjectId(req.user['_id']);
    commentData.name = req.user['name'];
    commentData.email = req.user['email'];
    commentData.movieId = new ObjectId(req.params['movieId']);

    const comment = new Comment(commentData);

    comment.save()
        .then(() => {
            res.status(201).json({
                message: 'Your comment has been successfully created'
            })
        })
        .catch(err => next(createError(500)));
}

/**
 * Update comment
 * @function updateComment
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Callback} next - callback
 */
const updateComment = (req, res, next) => {

    checkIdValidity(req.params.commentId, next);

    const commentId = new ObjectId(req.params.commentId);

    const error = Comment.validate(req.body['text']);
    if(error) {
        return next(error);
    }

    Comment.edit(commentId, req.body['text'])
        .then(() => {
            res.json({
                message: 'Comment updated successfully !'
            })
        }).catch(err => next(createError(500)));
}

/**
 * Delete comment
 * @function deleteComment
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Callback} next - callback
 */
const deleteComment = (req, res, next) => {

    checkIdValidity(req.params.commentId, next);

    const commentId = new ObjectId(req.params.commentId);

    Comment.delete(commentId)
        .then(() => {
            res.json({
                message: 'Comment deleted successfully !'
            })
        }).catch(err => next(createError(500)));
}

/**
 * Check if id is valid
 * @function checkIdValidity
 * @param {string} id - id to check
 * @param {Callback} next - callback
 */
const checkIdValidity = (id, next) => {
    if(!ObjectId.isValid(id)) {
        return next(createError(400));
    }
}

module.exports = {
    getComments,
    addComment,
    updateComment,
    deleteComment
}