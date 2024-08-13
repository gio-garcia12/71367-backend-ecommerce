const express = require('express')
const router = express.Router()
const productController = require('../controllers/product.controller')
const auth = require('../middlewares/auth')
const isAdmin = require ('../middlewares/isAsdmin')
const upload = require('../middlewares/upload')
//Get products

router.get("/products", productController.getProducts)


//get products by id
router.get('/products/:id', productController.getProductById)

//post products
// to do auth, isAdmin
router.post('/products',[upload],productController.postProduct)
//delete products (id)
router.delete('/products/:id',[auth,isAdmin],productController.deleteProduct)
//put products (id)
router.put('/products/:id', [auth,isAdmin, upload],productController.updateProduct)




module.exports = router
