const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')

// 判別開發環境
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

// 設定handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// 設定body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// 連線到資料庫伺服器
// 加上 { useNewUrlParser: true }
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/todo', { useUnifiedTopology: true })

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

// 設定express-session
app.use(session({
    secret: 'your secret key',
    resave: false,
    saveUninitialized: true
}))

// 使用connect flash
app.use(flash())

// 設定passport
app.use(passport.initialize())
app.use(passport.session())

// 載入passport config(後面的passport代表把參數帶回去給passport.js使用)
require('./config/passport.js')(passport)
// 登入後可以取得使用者的資訊方便我們在 view 裡面直接使用
app.use((req, res, next) => {
    res.locals.user = req.user
    res.locals.isAuthenticated = req.isAuthenticated()
    res.locals.success_msg = req.flash('success_msg')
    res.locals.warning_msg = req.flash('warning_msg')
    next()
})

// 設定method-override
app.use(methodOverride('_method'))

// 路由
app.use('/', require('./routes/homes.js'))
app.use('/todos', require('./routes/todos.js'))
app.use('/users', require('./routes/user.js'))
app.use('/auth', require('./routes/auths.js'))

app.listen(process.env.PORT || port,()=>{
    console.log(`http://localhost:${port} is starting!`)
})