const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/category.controller')

//get categorys 
router.get("/categories",categoryController.getCategories)
// post categories 
router.post("/categories",categoryController.createCategory)

module. exports = router 