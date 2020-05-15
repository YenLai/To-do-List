const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')

mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('method'))
app.use(routes)

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')


// 取得 mongoose.connect() 連上的默認 Connection object
const db = mongoose.connection

//db.on => register a listener to monitor if there is error 
db.on('error', () => {
  console.log('mongodb error!')
})

//db.once => a listener which can be only triggered once
db.once('open', () => {
  console.log('mongodb connected!')
})


app.listen(3000, () => {
  console.log('app is running on http://localhost:3000.')
})