const express = require('express')
const populateDB = require('./populate-db.js')
const bodyParser = require('body-parser')
const app = express()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/fetch/', function(request, response) {
    .catch((err) => {
        console.log(err)
        response.sendStatus(500)
    })
})

app.get('/movie/:movieName', function(request, response) {
    .catch((err) => {
        console.log(err)
        response.sendStatus(500)
    })
})



app.listen(8080)