const mongoose = require('mongoose')
const Todo = require('../todo.js')
mongoose.connect('mongodb://localhost/todo', {useNewUrlParser: true})

const db = mongoose.connection


db.on('error', () => {
    console.log('DB error!')
})

db.once('open', () => {
    console.log('DB connected!')
    for(var i=0; i<10; i++){
        Todo.create({name:'myname-'+i})
    }

   console.log('done')
})

