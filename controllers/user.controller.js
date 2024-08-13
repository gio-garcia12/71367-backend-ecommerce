//const userModel = require('../models/user.model')
const User = require('../models/user.model')
const bcrypt = require("bcrypt")
const saltRounds = 10
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET


async function getUserById(req,res){
    try{
        const id = req.params.id;
        const user = await User.findById(id).select({password:0,borndate:0})

        if(!user){
            return res.status(404).send({
                ok:false,
                message:"no se encontro el usuario "
            })
        }
        res.status(200).send({
            ok:true,
            message:"usuuario encontrado "

        })
    }catch (error){
        console.log(error)
        res.status(500).send({
            ok:false,
            message:"no se puede encontrar usuario"
        })
} 
}





async function getUsers (req,res){

    try {
        console.log(req.query)
        const limiteUsuarios = req.query.limit || 2
        const page = req.query.page || 0

        const[users,total] = await Promise.all([
            User.find()
                            .select ({password:0})
                            .collation({locale:'es'})
                            .sort({fullname:1})
                            .limit(limiteUsuarios)
                            .skip(page * limiteUsuarios),
                            User.countDocuments()
        ])

       // const users = await User.find()
        //                    .select ({password:0})
        //                    .collation({locale:'es'})
          //                  .sort({fullname:1})
          //                  .limit(limiteUsuarios)
          //                  .skip(page * limiteUsuarios)
       // const total = await User.countDocuments()

        res.status(200).send({
            ok:true,
            message:"Usuarios obtenidos correctamente",
            users,
            total
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            ok: false,
            message: "Error al obtener usuarios"
        })
    }

    


}

/*function postUser(req,res){

    if(req.user.role != "ADMIN_ROLE"){
        req.body.role = "CLIENT_ROLE"
    }
    
    req.body.role = "CLIENT_ROLE"
    const user= new User(req.body)

    console.log(user)

    user.save()
        .then(()=>{
            res.send(user)
        }).catch(error =>{
            res.send("Error al crear usuario")
        })


   // res.send("POST users desde controlador")


}*/


async function postUser (req,res){
        try{

            if(req.user?.role != "ADMIN_ROLE"){               
            
                req.body.role ="CLIENT_ROLE"
            }

            //encryptar contraseña 

            req.body.password = await bcrypt.hash(req.body.password,saltRounds)

            const user = new User (req.body)

            const newUser = await user.save()
            
            //borrar la propiedad password antes de responder a la peticion 
            newUser.password = undefined

            res.status(201).send(newUser)


        } catch (error){
            res.status(500).send("error AL CREAR EL USUARIO")
            console.log(error)
        }
    }



async function deleteUser (req,res){

    try {

        

        const id = req.params.id
        
const deletedUser =await  User.findByIdAndDelete(id)

if(!deletedUser){
return res.status(404).send({
    ok:false,
    message:"no se encontro el ususario que desea borrar "
})
}


res.status(200).send ({
    ok:true,
    message:"el usuario fue borrado"
})

    }catch(error){
        console.log(error)
        res.status(500).send({
            ok:false,
            message:"error al borrar usuario"
        })
    }


  




}



async function updateUser(req,res){

    try{
        const id = req.params.id

        if(req.user.role != 'ADMIN_ROLE' && req.user._id != id){
            return res.status(400).send({
                ok: false,
                message: "no se puede editar este usuario "
            })
        }

        
        const newData = req.body

        //hashear password en el update
        newData.password = undefined
        if(req.user.role != 'ADMIN_ROLE'){
            newData.role  = undefined

        }

       // }

       
        
       const updUser = await User.findByIdAndUpdate(id,newData,{new:true})

if(!updUser){
   return res.status(404).send({
        ok:false,
        message:"no se encontro el usuario"
    })
}

        res.status(200).send({
            ok:true,
            message:"usuario modificado"
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            ok:false,
            message:"no se pudo editar el usuario"
        })
    }
}




async function login (req, res){
    try{

        const email = req.body.email?.toLowerCase()
        const password = req.body.password
        if(!email || !password){
            return res.status(400).send({
                ok:false,
                message:"email y password son requeridos"
            })
        }

        console.log(email,password)

        const user = await User.findOne({email:{ $regex: email,$options: "i"}}) 

        console.log(user)

        if(!user){
            return res.status(404).send({
                ok:false,
                message:"Datos incorrectos"
            })
        }

        const match = await bcrypt.compare(password, user.password)

  

        if (!match){
            return res.status(400).send({
                ok:false,
                message: "Datos incorrectos"
            })
        }
    user.password = undefined
    const token  = jwt.sign(user.toJSON(),secret,{expiresIn:'1h'})


        res.status(200).send({
            ok:true,
            message:"login correcto",
            user,
            token
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            ok:false,
            message:"error e login"
        })
    }






  //obtener email y password que me envie el usuario en el body
  // Checar que el usuario existe y de ser asi lo obtengo 
  // si el ususario n o existe 404
  //
 
}




module.exports = {
    getUsers,
    postUser,
    deleteUser,
    updateUser,
    getUserById,
    login
}
