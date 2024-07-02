const express = require('express')
const router = express.Router()
const productController = require('../controllers/product.controller')
//Get products

router.get('/products', productController.getProducts)


//get products by id
//post products
//delete products (id)
//put products (id)




module.exports = router