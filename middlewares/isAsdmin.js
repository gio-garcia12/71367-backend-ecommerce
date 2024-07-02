function isAdmin (req,res,next){

    if(req.user?.role == "ADMIN_ROLE"){
        next()
    }else{
        return res.status(400).send({
            ok:false,
            message:"no puede acceder a esta funcionn"
        })
    }
}

module.exports = isAdmin