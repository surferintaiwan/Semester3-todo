const express = require('express')
const router = express.Router()
const Todo = require('../models/todo.js')
const {authenticated} = require('../config/auth.js')

// 瀏覽所有todo
router.get('/', authenticated, (req, res) => {
    Todo.find({userId: req.user._id})
    .sort({name: 'desc'})
    .exec((err, todos) => {
        if (err) return console.error(err)
        return res.render('index', {todos: todos})
    })
})

// 新增一筆todo
router.post('/', authenticated, (req, res) => {
    // 建立todo model實例
    /*
    const todo = new Todo({
        name: req.body.name,
        userId: req.user._id
    })
    todo.save(err => {
        if (err) return console.error(err)
        return res.redirect('/')
    })
    */
   Todo.create({name: req.body.name, userId: req.user._id})
   res.redirect('/')
})

// 顯示進行新增的頁面
router.get('/new', authenticated, (req, res) => {
    res.render('new')
})

// 顯示不同todo的詳細頁面
router.get('/:id', authenticated, (req, res) => {
    Todo.findOne({_id: req.params.id, userId: req.user._id}, (err,todo) => {
        console.log(todo)
        return res.render('detail', {todo: todo})
    })
})

// 顯示不同todo的編輯頁面
router.get('/:id/edit',authenticated ,(req, res) => {
    Todo.findOne({_id: req.params.id, userId: req.user._id}, (err, todo) => {
        res.render('edit', {todo: todo})     
    })
})

// PUT修改todo
router.put('/:id',authenticated , (req, res) => {
    Todo.findOne({_id: req.params.id, userId: req.user._id},(err, todo) => {
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
router.delete('/:id', authenticated, (req, res) => {
    Todo.findOne({_id: req.params.id, userId: req.user._id}, (err, todo) => {
        if (err) return console.error(err)
        todo.remove(err, ()=> {
            if (err) return console.error(err)
            return res.redirect('/todos')
        })
    })
})



module.exports = router