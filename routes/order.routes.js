const router = require ('express').Router()
const orderController = require('../controllers/order.controller')
const auth = require('../middlewares/auth')
//Crear orden 
router.post("/orders",auth, orderController.postOrder)

//Obtener Ordenes todas las ordenes (caso de user admin)
    router.get("/orders/:idUser?",auth,orderController.getOrders)

//Obtener una orden especifica por idOrder
    //---router.get("/orders/:id".orderController.getOrderById)
   
    
//Obtener ordenes por id de usuario 
    //--router.get("/orders/users/:id",orderController.getOrdersByUserId)

//Editar una orden
    //--router.put("/orders/:id")

//Borrar orden va a depender de nuestra app (opcional)
    //--router.delete("/orders/:id")


module.exports = router