const express = require('express')
const router = express.Router()
const Todo = require('../models/todo.js')
const {authenticated} = require('../config/auth.js')

// 透過轉址瀏覽所有todo
router.get('/', authenticated, (req, res) => {
    res.redirect('/todos')
})

module.exports = router