const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Todo = require('./models/todo')

mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))

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

app.get('/todos/new', (req, res) => {
  res.render('new')
})

app.post('/todos', (req, res) => {
  const name = req.body.name       // 從 req.body 拿出表單裡的 name 資料
  return Todo.create({ name })     // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('detail', { todo }))
    .catch(error => console.log(error))
})

app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch(error => console.log(error))
})

app.post('/todo/:id', (req, res) => {
  const id = req.params.id
  name = req.body.name
  return Todo.findById(id)
    .then((todo) => {
      todo.name = name
      todo.save()
    })
    .then(() => res.redirect(`/todos/${id}/edit`))
    .catch(error => console.log(error))
})



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