/**
 * User model
 * @module models/User
 * @requires module:configuration
 * @requires module:validators
 */

const {dbCon} = require('../configuration');
const {userValidator, loginValidator} = require('../validators');
const {hashSync, compareSync} = require('bcryptjs');

class User {

    /**
     * Returns a user instance
     * @param {Object} userData - user input
     */
    constructor(userData) {
        this.userData = {...userData};
    };

    /**
     * Adds user into db
     * @param {Callback} cb - called after user has been added
     */
    save(cb) {
        dbCon('users', async (db) => {
            try {
                const hashedPass = hashSync(this.userData['password'], 12);
                this.userData['password'] = hashedPass;
                this.userData['verified'] = false;
                await db.insertOne(this.userData);
                cb();
            }catch (e) {
                cb(e);
            }

        });
    }

    /**
     * Checks if user exists
     * @returns {Promise} return if the user exists or not
     */
    checkExistance() {
        return new Promise((resolve, reject) => {
           dbCon('users', async (db) => {
               try {
                   const user = await db.findOne({'$or': [{name: this.userData['name']},{
                           email: this.userData['email']
                       }]});

                   if(!user){
                       resolve({
                           check: false
                       })
                   } else if(this.userData['name'] === user.name) {
                       resolve({
                           check: true,
                           message: 'This name already exists'
                       })
                   } else if(this.userData['email'] === user.email) {
                       resolve({
                           check: true,
                           message: 'This email already in use'
                       })
                   }
               }catch (err) {
                   reject(err);
               }
           })
        });
    }

    /**
     * Validates user object
     * @param {Object} userData - user input
     * @static
     */
    static validate(userData) {
        const result = userValidator.validate(userData);
        return result;
    };

    /**
     * Login
     * @param {Object} userData - user input
     * @returns {Promise} return if the user exists or not
     * @static
     */
    static login(userData) {
        return new Promise((resolve, reject) => {

            const validation = loginValidator.validate(userData);
            if(validation.error) {
                const error = new Error(validation.error.message);
                error.statusCode = 400;
                return resolve(error);
            }

            dbCon('users', async (db) => {
               try {
                   // const user = await db.findOne({email: userData['email']}, {projection: {email: 1, password: 1}});
                   const user = await db.findOne({email: userData['email']});
                   const check = compareSync(userData['password'], user.password);

                if(!user || !check) {
                    const error = new Error('Please enter valid email and password.');
                    error.statusCode = 404;
                    return resolve(error);
                }

                resolve(user);

               } catch (e) {
                   reject(e);
               }
            });

        });

    }
}

module.exports = User;