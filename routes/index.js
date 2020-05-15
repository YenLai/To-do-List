// 定義總路由
const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const todos = require('./modules/todos')

//引入路由模組
router.use('/', home)
router.use('/todos', todos)

//匯出路由器
module.exports = router

