const express = require('express')
const router = express.Router()
const Todo = require('../models/todo.js')

// 瀏覽所有todo
router.get('/', (req, res) => {
    Todo.find()
    .sort({name: 'desc'})
    .exec((err, todos) => {
        if (err) return console.error(err)
        return res.render('index', {todos: todos})
    })
})

// 新增一筆todo
router.post('/', (req, res) => {
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

// 顯示進行新增的頁面
router.get('/new', (req, res) => {
    res.render('new')
})

// 顯示不同todo的詳細頁面
router.get('/:id', (req, res) => {
    Todo.findById(req.params.id,(err,todo) => {
        return res.render('detail', {todo: todo})
    })
})

// 顯示不同todo的編輯頁面
router.get('/:id/edit', (req, res) => {
    Todo.findById(req.params.id, (err, todo) => {
        res.render('edit', {todo: todo})     
    })
    
})

// PUT修改todo
router.put('/:id', (req, res) => {
    Todo.findById(req.params.id,(err, todo) => {
        if (err) return console.error(err)
        todo.name = req.body.name
        if (req.body.done) {
            todo.done = true
        } else {
            todo.done = false
        }
        todo.save(err, () => {
            if (err) return console.error(err)
            return res.redirect('/todos/' + todo.id)
        })
    })    
})

// DELETE刪除todo
router.delete('/:id', (req, res) => {
    Todo.findById(req.params.id, (err, todo) => {
        if (err) return console.error(err)
        todo.remove(err, ()=> {
            if (err) return console.error(err)
            return res.redirect('/todos')
        })
    })
})



module.exports = router