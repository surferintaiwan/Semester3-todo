const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')


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

// 設定method-override
app.use(methodOverride('_method'))

// 路由
app.use('/', require('./routes/homes.js'))
app.use('/todos', require('./routes/todos.js'))

app.listen(port,()=>{
    console.log(`http://localhost:${port} is starting!`)
})