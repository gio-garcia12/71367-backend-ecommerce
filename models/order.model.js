const mongoose = require('mongoose')
const Schema = mongoose.Schema
const orderSchema = new Schema ({
    
    products:[
        {
            product: {type: Schema.Types.ObjectId,required: true, ref: "Product"},
            price:{type: Number, required: true, min:0, max:20000},
            quantity: {type: Number,required: true, min: 1, default: 1}       
        }
    ],

    user:{type: Schema.Types.ObjectId, required:true, ref: "User"},
    createdAt:{type: Number, default: Date.now},
    updatedAt:{type: Number, default: Date.now},
    total: {type: Number, required: true},
    status:{type: String, required: true, default: "open", enum:["open","inprogess", "delivered","cancelled"]},
    active:{ type: Boolean, default: true},
    
})



/*
    products:[
    {
        idProducto: ObjectId(),
        price,
        quantity
    },
    ],
    createdAt: fecha creacion 
    payment:{
    type: '',
    date:
    },
    user:ObjectId()
    updatedAt: fecha de actualizacion
    total
    status: 'pending', 'completed', 'canceled'
    address
    closerdAt
    receivedAt
    active: boolean
    borrado logico o fisico 


*/


                                //orders
module.exports = mongoose.model('Order', orderSchema)