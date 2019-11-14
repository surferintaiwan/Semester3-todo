const express = require('express')
const router = express.Router()
const Todo = require('../models/todo.js')

// 透過轉址瀏覽所有todo
router.get('/', (req, res) => {
    res.redirect('/todos')
})

module.exports = router