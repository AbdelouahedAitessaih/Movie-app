/**
 * Comment model
 * @module models/Comment
 * @requires module:configuration
 */

const Joi = require('@hapi/joi');
const {dbCon} = require('../configuration');

class Comment {

    /**
     * Returns a comment instance
     * @param {Object} commentData - comment input
     */
    constructor(commentData) {
        this.data = commentData;
        this.data.createdAt = new Date();
        this.data.modifiedAt = new Date();
    }

    /**
     * Validates comment text
     * @param {string} text - comment text
     * @static
     * @returns {?object}
     */
    static validate (text) {
        const validation = Joi.string().max(300).validate(text);

        if(validation.error) {
            const error = new Error(validation.error.message);
            error.statusCode = 400;
            return error;
        }

        return null;
    }

    /**
     * Adds comment into db
     * @returns {Promise} return if the comment added or not
     */
    save() {
        return new Promise((resolve, reject) => {

            dbCon('comments', async (db, db2) => {

                try {
                    const comment = await db.insertOne(this.data);
                    await db2.updateOne({_id: this.data['movieId']}, {
                        '$push': {
                            comments: {
                                '$each': [{_id: comment.insertedId, name: this.data['name'], text: this.data['text']}],
                                '$slice': -10
                            }
                        }
                    })
                    resolve();
                }catch (e) {
                    reject(e);
                };

            },'movies');

        });
    }

    /**
     * Updates comment
     * @param {ObjectId} commentId - comment id
     * @param {string} text - text comment
     * @returns {Promise} return if the comment updated or not
     * @static
     */
    static edit(commentId, text) {
        return new Promise((resolve, reject) => {
            dbCon('comments', async (db) => {
               try {
                   await db.updateOne({_id: commentId}, {'$set': {text},
                              '$currentDate': {modifiedAt: true}});
                   resolve();
               } catch (err) {
                   reject(err);
               }
            });
        });
    }

    /**
     * Deletes comment
     * @param {ObjectId} commentId - comment id
     * @returns {Promise} return if the comment deleted or not
     * @static
     */
    static delete(commentId) {
        return new Promise((resolve, reject) => {
            dbCon('comments', async (db) => {
               try {
                   await db.deleteOne({_id: commentId});
                   resolve();
               } catch (err) {
                   reject(err);
               }
            });
        });
    }
}

module.exports = Comment;