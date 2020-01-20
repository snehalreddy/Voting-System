var express = require('express')
var logger = require('morgan')
var ejs = require('ejs')
var path = require('path')
var bodyParser = require('body-parser')

var admin = require('firebase-admin')

// creating a service account which requires a path to a json credentials file
var serviceAccount = require(path.join(__dirname, 'voting-app-with-node-firebase-adminsdk-clnwn-06633dd0cc.json'))
var firebaseAdmin = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://voting-app-with-node.firebaseio.com'
})

var database = firebaseAdmin.database()

// create authentication middleware
function isAuthenticated(req, res, next) {
    // check if the user is logged in
    // if they are attach them to the request object and call next
    // else send them to the login page with a message saying login
}

var app = express()

// Section for use and set
// for serving html and javascript
app.set('view engine', 'ejs')

// for sending static files
app.use(express.static('views'))
app.set('views', path.join(__dirname, 'views'))

// give server access to the user input
// to use json format for the transmission
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(logger('dev'))

// section for get and post
app.get('/', (req, res) => {
    // res.send('<h1>Voting machine software...!</h1>')

    var restaurantsRef = database.ref('/restaurants')

    restaurantsRef.once('value', (snapshot) => {
        console.log(snapshot.val())

        // sending all the data to the home.ejs file
        var data = snapshot.val()
        if(!data) {
            data = {}
        }

        res.render('home.ejs', {
            restaurants: data
        })
    })
})

app.post('/', (req, res) => {
    // send back a page with data from home.ejs
    // document.getElementByID is not available
    // var breakfast = req.body.breakfast
    // res.render('results.ejs', {data: breakfast})
})

var PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})