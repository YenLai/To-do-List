const mongoose = require('mongoose')
const Schema = mongoose.Schema


const todoSchema = new Schema({
  name: {
    type: String,
    required: true
  }
})

// 以後使用Todo來代表 todoSchema
module.exports = mongoose.model('Todo', todoSchema) 