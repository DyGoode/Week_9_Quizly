const jwt = require('jsonwebtoken')

const unprotectedRoutes = [
    '/auth/login',
    '/auth/register',
    '/graphql'
]

const authenticate = (req, res, next) => {
    console.log("Hello Malcolm in the Middle")
    const token = req.cookies.JWT || ''
    console.log(token)
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET)

        req.verifiedUser = verified

        console.log("User verification successful!")
        next()
    }
    catch(err) {
        // Handle the case where user is not authenticate
        console.log("User verification failed!")

        if (unprotectedRoutes.includes(req.path)) {
            next()
        } else {
            res.redirect('/auth/login')
        }
    }
}






module.exports = { authenticate }