const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema ({
    fullname: {
        type: String, 
        required : true, 
        minlength:3, 
        maxlength:80
    },
    email:{
        type:String, 
        requires:true,
        unique:true,
        minlength:10, 
        maxlength:80,
        trim:true,
        validate:{
            validator:(value)=>{
                const regex = /^[A-Za-z0-9._+\-']+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/
                
                return regex.test(value)

            }

        }
    },
    password:{
        type:String,
        required:true,
        minlength:4, 
        maxlength:80,
        trim:true
    },
    bornDate:{
        type:Date,
        required:true
    },
    location:{
        type:String
    },
    role:{
        type:String, 
        default:"CLIENT_ROLE", 
        enum:["ADMIN_ROLE","CLIENT_ROLE","USER_ROLE"]}

})

module.exports = mongoose.model("User",userSchema)