const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const Todo = require('./models/todo.js')
const exphbs = require('express-handlebars')

// 設定handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')


// 連線到資料庫伺服器
// 加上 { useNewUrlParser: true }
mongoose.connect('mongodb://localhost/todo', { useUnifiedTopology: true })

// mongoose 連線後透過 mongoose.connection 拿到 Connection 的物件
const db = mongoose.connection

// 資料庫監控
// 連線異常
db.on('error', () => {
    console.log('mongoDB error!')
})

// 連線正常
db.once('open', () => {
    console.log('mondoDB connnected!')
})

// 路由
app.get('/', (req, res) => {
    res.render('index')
})

app.get('/todos', (req, res) => {
    res.send('顯示所有todo')
})

app.get('/todos/new', (req, res) => {
    res.send('新增todo頁面')
})

app.get('/todos/:id', (req, res) => {
    res.send('顯示這個id的todo的詳細資料')
})

app.post('/todos', (req, res) => {
    res.send('建立todo')
})

app.get('/todos/:id/edit', (req, res) => {
    res.send('取得修改todo的頁面')
})

app.post('/todos/:id/edit', (req, res) => {
    res.send('修改todo')
})

app.post('/todos/:id/delete', (req, res) => {
    res.send('刪除todo')
})



app.listen(port,()=>{
    console.log(`http://localhost:${port} is starting!`)
})