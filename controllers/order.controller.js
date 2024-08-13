const Order = require('../models/order.model')
const Product = require('../models/product.model')


async function postOrder (req,res){
    try{

        if(req.user._id != req.body.user){
            return res.status(400).send({
                ok:false,
                message: "no puedes crear una orden para otro usuario"
            })
        }

        if (req.body.products.length==0){
            return res.status(400).send({
                ok: false,
                message:"la orden no puede estar vacia "
            })
        }


        console.log(req.body)
        await orderProductPriceVerification(req.body.products, req.body.total)

        const order = new Order(req.body)

        //Crear una funcion que lea cada producto que recibio y uno por uno intrernamente haga un doble check con el valor de precio del producto almacenado en la base de datos 

        const newOrder = await order.save()

        res.status(201).send({
            ok:true,
            message: "orden creada correctamente",
            order: newOrder
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            ok:false,
            message: "error al crear la orden "
        })
    }



//res.status(200).send("Crear orden")
}

async function orderProductPriceVerification(products, total){
    try{
        let totalOrder = 0
        for (let prod of products){

            if (!prod.product) {
                throw new Error(`El producto no tiene un ID válido.`);
            }

            totalOrder += prod.price * prod.quantity
            const product = await Product.findById(prod.product)

            if (!product || product.price != prod.price){
                throw new Error(`El producto con id ${prod.product} no existe o el precio no concide`)
            }

        }

 if(totalOrder != total){
    throw new Error("El total no es correcto ")
 }

    }catch(error){
        console.log(error)
        throw new Error("error al verificar el precio de los productos ")
    }
}



async function getOrders(req, res){

try{

const id = req.params.idUser    

let filter

if(req.user.role == "ADMIN_ROLE"){
    filter = id ? {user: id}: {}
}else{
    filter = {user:req.user._id}
}
    

//const filter = req.user.role == "ADMIN_ROLE"
    //                 ? id ? {user: req. id} :{}
  //                   :{user: req.user._id}


    const orders = await Order.find(filter)
                                    .populate("user","fullname email")
                                    .populate("products.product")
    
    if(!orders.length){
        return res.status(404).send({
            ok:false,
            message: "no se encontraron ordenes"
        })
    }

    return res.status(200).send({
        ok: true,
        message: "ordenes obtenidas correctamente ",
        orders
    })

}catch(error){
    console.log(error)
    return res.status(500).send({
        ok: false,
        message: "error al obtener ordenes "
    })
}

}




module.exports = {
    postOrder,
    getOrders
}
