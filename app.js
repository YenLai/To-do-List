const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/todo-list')

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