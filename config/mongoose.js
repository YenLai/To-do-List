const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })

// 取得 mongoose.connect() 連上的默認 Connection object
const db = mongoose.connection

//db.on => register a listener to monitor if there is error 
//db.once => a listener which can be only triggered once
db.on('error', () => console.log('mongodb error !'))
db.once('open', () => console.log('mongodb connected !'))

module.exports = db