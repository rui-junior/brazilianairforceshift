const express = require('express')
const app = express()

const cookieparser = require('cookie-parser')
app.use(cookieparser())

app.set("view engine", "ejs")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

const routes = require('./routes/routes')
app.use(routes)

try {

    app.listen(3000)
    console.log('servidor on')
    const db = require('./db/connection')

} catch (error) {
    
    console.log(error)

}