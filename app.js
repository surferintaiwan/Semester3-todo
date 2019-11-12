const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const Todo = require('./models/todo.js')

// 連線到資料庫伺服器
// 加上 { useNewUrlParser: true }
mongoose.connect('mongodb://localhost/todo', { useUnifiedTopology: true })

// mongoose 連線後透過 mongoose.connection 拿到 Connection 的物件
const db = mongoose.connection

// 連線異常
db.on('error', () => {
    console.log('mongoDB error!')
})

// 連線正常
db.once('open', () => {
    console.log('mondoDB connnected!')
})

app.get('/', (req,res) => {
    res.send('123')
})

app.listen(port,()=>{
    console.log(`http://localhost:${port} is starting!`)
})