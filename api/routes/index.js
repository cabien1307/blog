const authRouter = require('./auth')
const categoryRouter = require('./category')
const postsRouter = require('./posts')
const usersRouter = require('./users')
const uploadRouter = require('./upload')


function route(app) {

    app.use('/auth', authRouter)
    app.use('/category', categoryRouter)
    app.use('/posts', postsRouter)
    app.use('/users', usersRouter)
    app.use('/upload', uploadRouter)

}

module.exports = route;