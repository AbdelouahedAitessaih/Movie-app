const {dbCon} = require('../configuration');
const {userValidator, loginValidator} = require('../validators');
const {hashSync, compareSync} = require('bcryptjs');

class User {
    constructor(userData) {
        this.userData = {...userData};
    };

    save(cb) {
        dbCon('users', async (db) => {
            try {
                const hashedPass = hashSync(this.userData['password'], 12);
                this.userData['password'] = hashedPass;
                await db.insertOne(this.userData);
                cb();
            }catch (e) {
                cb(e);
            }

        });
    }

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

    static validate(userData) {
        const result = userValidator.validate(userData);
        return result;
    };

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