const Product = require('../models/product.model')




async function getProducts(req,res){
    try{
       const queryCat = req.query.category
        const products = await Product.find({category: queryCat ? queryCat: { $ne: null}}).populate("category", "name")
        res.status(200).send({
            ok:true,
            message:"los productos se muestran correctamente",
            products
        })
    
    }catch(error){
        console.log(error)
        res.status(500).send({
            ok:false,
            message:"Error al obtener los productos"
        })
    }

}




async function getProductById(req,res){
    

    try{
    const id = req.params.id
     const product = await Product.findById(id).populate("category","name")

        if (!product){
            return res.status(404).send({
                ok:false,
                message: "no se pudo obtener el prooducto"
            })
        }

        res.status(200).send({
            ok:false,
            message: "producto obtenido correctamente",
            product
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            ok: false,
            message:"Error al obtener el producto"
        })
    }
}




async function deleteProduct(req,res){
    
    try{
        const id = req.params.id
        const product = await Product.findByIdAndDelete(id)
   
           if (!product){
               return res.status(404).send({
                   ok:false,
                   message: "no se pudo borrar el prooducto"
               })
           }
   
           res.status(200).send({
               ok:false,
               message: "producto borrado correctamente",
               product
           })
       }catch(error){
           console.log(error)
           res.status(500).send({
               ok: false,
               message:"Error al borrar el producto"
           })
       }

}




// Crear productos
async function postProduct(req,res){
    try{


   
        const product = new Product(req.body)

        if (req.file?.filename){
        product.image = req.file.filename
        }

        const newProduct = await product.save()
        res.status(201).send({
            ok:true,
            message:"Producto creado correctamente",
            product:newProduct
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            ok:false,
            message:"Error al crear producto"
        })
    }
}   





async function updateProduct(req,res){
 
    try{
        const id = req.params.id
        const data = req.body

        if(req.file?.filename){
            data.image = req.file.filename 
        }else{
            delete data.image
        }

        data.updatedAt = Date.now()
        const product = await Product.findByIdAndUpdate(id, data,{new:true})
   
           if (!product){
               return res.status(404).send({
                   ok:false,
                   message: "no se pudo actualizar el prooducto"
               })
           }
   
           res.status(200).send({
               ok:false,
               message: "producto actualizado correctamente",
               product
           })
       }catch(error){
           console.log(error)
           res.status(500).send({
               ok: false,
               message:"Error al actualizar el producto"
           })
       }

    }



module.exports = {
    getProducts,
    getProductById,
    deleteProduct,
    postProduct,
    updateProduct
}