const authRouter = require('./auth');

module.exports = (app) => {

    app.use('/auth', authRouter);

    app.get('/',(req,res,next)=> {
        res.json({
            message: "Welcome to the Homepage"
        });
    });
}