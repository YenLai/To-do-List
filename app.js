const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Todo = require('./models/todo')

mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })

const app = express()

// add hbs to application list
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
// enable hbs this application
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  Todo.find()
    .lean()
    .then(todos => res.render('index', { todos }))
    .catch(error => console.error(error))
})

const db = mongoose.connection

//db.on => register a listener to monitor if there is error 
db.on('error', () => {
  console.log('mongodb error!')
})

//db.once => a listener which can be only triggered once
db.once('open', () => {
  console.log('mongodb connected!')
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(3000, () => {
  console.log('app is running on http://localhost:3000.')
})