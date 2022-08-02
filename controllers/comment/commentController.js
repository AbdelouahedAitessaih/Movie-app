const {ObjectId} = require('bson');
const createError = require('http-errors');
const {Comment} = require('../../models')

const addComment = (req, res, next) => {

    if(!ObjectId.isValid(req.params.movieId)) {
        return next(createError(400));
    }

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

module.exports = {
    addComment
}