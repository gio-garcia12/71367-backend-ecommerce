const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema ({
    name: { type:String, 
            required: true, 
            unique: true, 
            index:true,
            trim:true,
            minlength:2,
            maxlength:80
        },
      viewValue:{
        type:String,
        required: true,
        unique:true,
        trim:true,
        minlength:2,
        maxlength:80
      },
    description:{
            type:String,
            maxlength:300,
            minlength:0
    }        
})

module.exports = mongoose.model ("Category", categorySchema)