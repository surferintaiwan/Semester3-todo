const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const Todo = require('./models/todo.js')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')


// 設定handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// 設定body-parser
app.use(bodyParser.urlencoded({ extended: true }))

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
// 透過轉址瀏覽所有todo
app.get('/', (req, res) => {
    res.redirect('/todos')
})

// 瀏覽所有todo
app.get('/todos', (req, res) => {
    Todo.find((error, todos) => {
        if (error) return console.error(error)
        console.log(todos)
        return res.render('index', {todos: todos})
    })
})

// 新增一筆todo
app.post('/todos', (req, res) => {
    // 建立todo model實例
    /*
    const todo = new Todo({
        name: req.body.name
    })
    todo.save(err => {
        if (err) return console.error(err)
        return res.redirect('/')
    })
    */
   Todo.create({name: req.body.name})
   res.redirect('/')
    
})

app.get('/todos/new', (req, res) => {
    res.render('new')
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