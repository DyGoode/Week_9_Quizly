// module imports
const express = require('express')
const dotenv = require('dotenv')
const { graphqlHTTP } = require('express-graphql')
const cookieParser = require('cookie-parser')

// local imports
const { connectDB } = require('./src/db')
const schema = require('./src/graphql/schema')
const { authenticate } = require('./src/middleware/auth')
const { userData } = require('./src/middleware/userData')


dotenv.config()

const app = express()

connectDB()

app.use(cookieParser())

// bringing in a schema
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

// set the view engine to ejs
app.set("view engine", "ejs")


// update location of views folder that res.render pulls from
app.set("views", "./src/templates/views")

app.use(express.urlencoded({ extended: true }))

app.use(authenticate)
app.use(userData)

//initilalize Routes
require('./src/routes')(app)

app.listen(process.env.PORT, () => {
    console.log(`Server now running on PORT ${process.env.PORT}`)
});